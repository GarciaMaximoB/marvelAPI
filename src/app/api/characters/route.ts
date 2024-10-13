import { NextResponse } from "next/server";
import { apiAxiosInstance } from "../(helpers)/apiAxiosInstance";

export async function GET() {
  try {
    const { data } = await apiAxiosInstance.get("/characters", {
      params: {
        limit: 100,
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
      { error: "Error al obtener los comics" },
      { status: 500 }
    );
  }
}
