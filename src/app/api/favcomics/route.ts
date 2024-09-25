import { serverAxiosInstance } from "../(helpers)/serverAxiosInstace";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await serverAxiosInstance.get("/favcomics");

    const comics = res.data.map((comic: any) => {
      return {
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail,
        characters: comic.characters,
        pageCount: comic.pageCount,
        source: "DATABASE",
      };
    });

    return NextResponse.json(comics);
  } catch (error) {
    console.log({ error });
    NextResponse.json(
      { error: "Error al obtener los comics" },
      { status: 500 }
    );
  }
}
