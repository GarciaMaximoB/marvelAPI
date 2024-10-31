import { apiAxiosInstance } from "../(helpers)/apiAxiosInstance";
import { NextResponse } from "next/server";
import { IComic } from "@/types";
import { serverAxiosInstance } from "../(helpers)/serverAxiosInstace";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "20";
  const nameStartsWith = searchParams.get("nameStartsWith") || "";
  const characters = searchParams.get("characters") || undefined;
  const order = searchParams.get("order") || "";
  const source = searchParams.get("source");

  const pageNumber = parseInt(page, 10);
  const size = parseInt(pageSize, 10);

  if (isNaN(pageNumber) || isNaN(size) || pageNumber < 1 || size < 1) {
    return NextResponse.json(
      { error: "Invalid pagination parameters." },
      { status: 400 }
    );
  }

  try {
    let totalUserComics = 0;
    let userComics: IComic[] = [];
    let marvelTotal = 0;

    if (!source || source === "user") {
      const userComicsResponse = await serverAxiosInstance.get("/usercomics");
      userComics = userComicsResponse.data;
      totalUserComics = userComics.length;
    }

    if (!source || source === "API") {
      const marvelTotalResponse = await apiAxiosInstance.get("/comics", {
        params: {
          format: "comic",
          dateRange: "1939-01-01,2025-01-01",
          titleStartsWith: nameStartsWith || undefined,
          characters: characters,
          limit: 1,
        },
      });
      marvelTotal = marvelTotalResponse.data.data.total;
    }

    const total = totalUserComics + marvelTotal;
    const startIndex = (pageNumber - 1) * size;
    const endIndex = pageNumber * size;

    let resultComics: IComic[] = [];

    if ((!source || source === "user") && startIndex < totalUserComics) {
      const userStart = startIndex;
      const userEnd = Math.min(endIndex, totalUserComics);
      resultComics = userComics.slice(userStart, userEnd);

      if ((!source || source === "API") && endIndex > totalUserComics) {
        const marvelStart = 0;
        const marvelEnd = endIndex - totalUserComics;
        const marvelResponse = await apiAxiosInstance.get("/comics", {
          params: {
            format: "comic",
            dateRange: "1939-01-01,2025-01-01",
            limit: marvelEnd,
            offset: marvelStart,
            titleStartsWith: nameStartsWith || undefined,
            characters: characters,
            orderBy: order,
          },
        });
        const marvelComics = marvelResponse.data.data.results.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            characters: item.characters,
            pageCount: item.pageCount,
            source: "API",
          })
        );
        resultComics = resultComics.concat(marvelComics);
      }
    } else if (!source || source === "API") {
      const marvelStart = startIndex - totalUserComics;
      const marvelResponse = await apiAxiosInstance.get("/comics", {
        params: {
          format: "comic",
          dateRange: "1939-01-01,2025-01-01",
          titleStartsWith: nameStartsWith || undefined,
          limit: size,
          offset: marvelStart,
          characters: characters,
          orderBy: order,
        },
      });
      const marvelComics = marvelResponse.data.data.results.map(
        (item: any) => ({
          id: item.id,
          title: item.title,
          thumbnail: item.thumbnail,
          characters: item.characters,
          pageCount: item.pageCount,
          source: "API",
        })
      );
      resultComics = marvelComics;
    }

    return NextResponse.json({ data: resultComics, total });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Error al obtener los comics" },
      { status: 500 }
    );
  }
}
