import { multiSearchRoute } from "@/constants/content";
import { options } from "@/constants/movies";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")
  const response = await fetch(multiSearchRoute + `?query=${search}`, options)
  const data = await response.json();
  console.log('ceva', data)

  return NextResponse.json(data);

    
};
