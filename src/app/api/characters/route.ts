import { NextResponse } from "next/server";
import { apiAxiosInstance } from "../(helpers)/apiAxiosInstance";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nameStartsWith = searchParams.get("nameStartsWith") || "";
  try {
    const { data } = await apiAxiosInstance.get("/characters", {
      params: {
        limit: 10,
        nameStartsWith: nameStartsWith || undefined,
      },
    });

    const characters = data.data.results.map((character: any) => {
      return {
        id: character.id,
        name: character.name,
      };
    });

    return NextResponse.json(characters);
  } catch (error) {
    console.log({ error });
    NextResponse.json(
      { error: "Error al obtener los personajes" },
      { status: 500 }
    );
  }
}
