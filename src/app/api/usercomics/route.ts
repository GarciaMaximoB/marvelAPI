import { serverAxiosInstance } from "../(helpers)/serverAxiosInstace";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await serverAxiosInstance.get("/usercomics");

    const userComics = data.map((comic: any) => {
      return {
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail,
        characters: comic.characters,
        pageCount: comic.pageCount,
        source: "DATABASE",
      };
    });
    return NextResponse.json(userComics);
  } catch (error) {
    console.log({ error });
    NextResponse.json(
      { error: "Error al obtener los comics del usuario" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await serverAxiosInstance.post("/usercomics", body, {
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
