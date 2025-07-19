import api from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await api("top");
    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch top movies" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
