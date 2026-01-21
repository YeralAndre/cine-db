import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const genreId = searchParams.get("with_genres");
    const sortBy = searchParams.get("sort_by") || "popularity.desc";
    const language = searchParams.get("language") || "es-ES";
    const page = parseInt(searchParams.get("page") || "1", 10);

    if (!genreId) {
      return NextResponse.json(
        { error: "Genre ID is required" },
        { status: 400 }
      );
    }

    // Llamar al api.ts con tipo "discover"
    const movies = await api("discover", {
      with_genres: genreId,
      sort_by: sortBy,
      language: language,
      page: page,
    });

    return NextResponse.json(movies, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching discover movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
