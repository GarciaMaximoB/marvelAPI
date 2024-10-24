import { NextResponse } from "next/server";
import { serverAxiosInstance } from "../../(helpers)/serverAxiosInstace";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, context: any) {
  const { params } = context;
  console.log(params);
  try {
    const { data } = await serverAxiosInstance.get(`/usercomics/${params.id}`);

    console.log(data);
    const userComic = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      sale_date: data.sale_date,
      description: data.description,
      pageCount: data.pageCount,
      source: "DATABASE",
    };

    return NextResponse.json(userComic);
  } catch (error) {
    console.log({ error });
    NextResponse.json(
      { error: "Error al obtener los comics del usuario" },
      { status: 500 }
    );
  }
}
