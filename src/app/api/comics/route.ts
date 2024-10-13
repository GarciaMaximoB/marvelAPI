import { apiAxiosInstance } from "../(helpers)/apiAxiosInstance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await apiAxiosInstance.get("/comics", {
      params: {
        format: "comic",
        dateRange: "1939-01-01,2025-01-01",
      },
    });

    const comics = data.data.results.map((comic: any) => {
      return {
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail,
        characters: comic.characters,
        pageCount: comic.pageCount,
        source: "API",
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
