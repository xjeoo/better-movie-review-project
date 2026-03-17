import { NextRequest, NextResponse } from "next/server";
import { options } from "@/constants/movies";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ showId: string }> }
) {
  const { searchParams } = new URL(request.url);
  const { showId } = await params;
  const seasonNumber = searchParams.get("seasonNumber");

  if (!seasonNumber) {
    return NextResponse.json(
      { error: "Season number is required" },
      { status: 400 }
    );
  }

  try {
    const seasonUrl = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}`;
    const response = await fetch(seasonUrl, options);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching season data:", error);
    return NextResponse.json(
      { error: "Failed to fetch season data" },
      { status: 500 }
    );
  }
}