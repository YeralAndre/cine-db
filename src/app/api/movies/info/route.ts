import api from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    if (!query) {
      return new NextResponse("Query parameter 'id' is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    console.log(`Search query: ${query}`);
    const movieInfo = await api("info", query);
    return new NextResponse(JSON.stringify(movieInfo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching movie info:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch movie info" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
