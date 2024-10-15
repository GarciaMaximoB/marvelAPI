import { NextApiRequest, NextApiResponse } from "next";
import { apiAxiosInstance } from "../(helpers)/apiAxiosInstance";
import { NextResponse } from "next/server";
import { IComic } from "@/types";
import { serverAxiosInstance } from "../(helpers)/serverAxiosInstace";
import { axiosInstance } from "@/services/api/axiosInstance";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "20";
  const pageNumber = parseInt(page, 10);
  const size = parseInt(pageSize, 10);

  if (isNaN(pageNumber) || isNaN(size) || pageNumber < 1 || size < 1) {
    return NextResponse.json(
      { error: "Invalid pagination parameters." },
      { status: 400 }
    );
  }

  try {
    const userComicsResponse = await serverAxiosInstance.get("/usercomics");
    const userComics = userComicsResponse.data;
    const totalUserComics = userComics.length; //2

    const marvelTotalResponse = await apiAxiosInstance.get("/comics", {
      params: {
        format: "comic",
        dateRange: "1939-01-01,2025-01-01",
        limit: 1,
      },
    });

    const marvelTotal = marvelTotalResponse.data.data.total; //49350

    const total = totalUserComics + marvelTotal;

    const startIndex = (pageNumber - 1) * size; //0
    const endIndex = pageNumber * size; //20

    let resultComics: IComic[] = [];

    if (startIndex < totalUserComics) {
      const userStart = startIndex;
      const userEnd = Math.min(endIndex, totalUserComics);
      const comicsFromUser = userComics.slice(userStart, userEnd);
      resultComics = comicsFromUser;

      if (endIndex > totalUserComics) {
        const marvelStart = 0;
        const marvelEnd = endIndex - totalUserComics;
        const marvelResponse = await apiAxiosInstance.get("/comics", {
          params: {
            format: "comic",
            dateRange: "1939-01-01,2025-01-01",
            limit: marvelEnd,
            offset: marvelStart,
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
        console.log(marvelComics);
        resultComics = resultComics.concat(marvelComics);
      }
    } else {
      const marvelStart = startIndex - totalUserComics;
      const marvelResponse = await apiAxiosInstance.get("/comics", {
        params: {
          format: "comic",
          dateRange: "1939-01-01,2025-01-01",
          limit: size,
          offset: marvelStart,
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
    NextResponse.json(
      { error: "Error al obtener los comics" },
      { status: 500 }
    );
  }
}
