import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const movieId = searchParams.get("id");

    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const movies = await api("similar", movieId);

    return NextResponse.json(movies, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch similar movies" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
