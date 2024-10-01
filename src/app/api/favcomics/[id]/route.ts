import { serverAxiosInstance } from "../../(helpers)/serverAxiosInstace";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await serverAxiosInstance.delete(`/favcomics/${id}`);

    if (res.status === 200) {
      return NextResponse.json({ message: "Cómic eliminado correctamente." });
    } else {
      return NextResponse.json(
        { error: "Error al eliminar el cómic." },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("Error al hacer la solicitud DELETE:", error);
    return NextResponse.json(
      { error: "Error al eliminar el cómic de favoritos" },
      { status: 500 }
    );
  }
}
