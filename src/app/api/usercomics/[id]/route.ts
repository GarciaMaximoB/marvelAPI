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

export async function PUT(req: Request, context: any) {
  const { params } = context;
  try {
    const updateData = await req.json();
    const { data } = await serverAxiosInstance.put(
      `/usercomics/${params.id}`,
      updateData
    );

    console.log(data);
    const updatedUserComic = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      sale_date: data.sale_date,
      description: data.description,
      pageCount: data.pageCount,
      source: "DATABASE",
    };

    return NextResponse.json(updatedUserComic);
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Error al actualizar el cómic del usuario" },
      { status: 500 }
    );
  }
}
