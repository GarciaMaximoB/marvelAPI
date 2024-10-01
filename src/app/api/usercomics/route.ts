import { serverAxiosInstance } from "../(helpers)/serverAxiosInstace";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await serverAxiosInstance.get("/usercomics");
    console.log(data);

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
    console.log(userComics);
    return NextResponse.json(userComics);
  } catch (error) {
    console.log({ error });
    NextResponse.json(
      { error: "Error al obtener los comics del usuario" },
      { status: 500 }
    );
  }
}
