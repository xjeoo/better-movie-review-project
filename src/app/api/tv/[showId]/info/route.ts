import { options } from "@/constants/movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ showId: string }> }
) {
  const { showId } = await params;
  
  try {
    const showUrl = `https://api.themoviedb.org/3/tv/${showId}`;
    const response = await fetch(showUrl, options);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    
    const responseData = {
      name: data.name,
      seasons: data.seasons,
      backdrop_path: data.backdrop_path
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching TV show info:", error);
    return NextResponse.json(
      { error: "Failed to fetch TV show info" },
      { status: 500 }
    );
  }
}
