import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");
  if (!query) {
    return new NextResponse("Query parameter 'q' is required", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  console.log(`Search query: ${query}`);
  try {
    const movies = await api("search", query);
    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch search results" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
