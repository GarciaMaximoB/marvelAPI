import { apiAxiosInstance } from "../../(helpers)/apiAxiosInstance";
import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { serverAxiosInstance } from "../../(helpers)/serverAxiosInstace";

export async function GET(req: NextApiRequest, context: any) {
  const { params } = context;
  try {
    const { data } = await apiAxiosInstance.get(`/comics/${params.id}`);

    const comic = data.data.results.map((comic: any) => {
      const saleDate =
        comic.dates.find((date: any) => date.type === "onsaleDate")?.date || "";

      const formattedSaleDate = saleDate ? saleDate.split("T")[0] : "";
      return {
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail,
        description: comic.description,
        sale_date: formattedSaleDate,
        characters: comic.characters,
        pageCount: comic.pageCount,
        source: "API",
      };
    });
    return NextResponse.json(comic);
  } catch (error) {
    console.log({ error });
    NextResponse.json({ error: "Error al obtener el comic" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await serverAxiosInstance.delete(`/usercomics/${id}`);

    if (res.status === 200) {
      return NextResponse.json({ message: "Cómic eliminado correctamente." });
    } else {
      return NextResponse.json(
        { error: "Error al eliminar el cómic." },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("Error al hacer la solicitud DELETE:", error);
    return NextResponse.json(
      { error: "Error al eliminar el cómic" },
      { status: 500 }
    );
  }
}
