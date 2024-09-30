import { serverAxiosInstance } from "../(helpers)/serverAxiosInstace";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await serverAxiosInstance.get("/favcomics");

    const comicsMap = new Map(
      res.data.map((comic: any) => [
        comic.id,
        {
          id: comic.id,
          title: comic.title,
          thumbnail: comic.thumbnail,
          characters: comic.characters,
          pageCount: comic.pageCount,
          source: "DATABASE",
        },
      ])
    );

    const comicsArray = Array.from(comicsMap.values());
    return NextResponse.json(comicsArray);
  } catch (error) {
    console.log({ error });
    NextResponse.json(
      { error: "Error al obtener los comics" },
      { status: 500 }
    );
  }
}

export async function DELETE(id: number) {
  try {
    const res = await serverAxiosInstance.delete(`/favcomics/${id}`);

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al agregar el comic" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await serverAxiosInstance.post("/favcomics", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Error al agregar el comic" },
      { status: 500 }
    );
  }
}
