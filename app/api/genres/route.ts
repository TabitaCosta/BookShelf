import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Genre } from "@prisma/client";
import genres from "../../../components/library/LibraryClient";

export async function GET() {
  return NextResponse.json(genres);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json(
      { error: "O campo 'name' é obrigatório" },
      { status: 400 }
    );
  }

  const novoGenero: Genre = {
    id: randomUUID(),
    name: body.name,
  };

  genres.push(novoGenero);

  return NextResponse.json(novoGenero, { status: 201 });
}
