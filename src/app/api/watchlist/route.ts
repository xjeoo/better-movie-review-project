import { decrypt } from "@/lib/auth/jwt";
import { deleteIfExistsFromWatchlist, existsInWatchlist, savetoWatchlist } from "@/lib/user/watchlist";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if(!token) return NextResponse.json({error: "Token missing"}, {status:401});

  const {contentId, type} = await request.json();

  const jwt  = await decrypt(token);
  if(!jwt) return NextResponse.json({error: "Invalid token"}, {status:403});
  const userId = jwt?.data.userId.toString();

  if(!contentId || !userId )return NextResponse.json({error: "Item or user id missing"}, {status:400});
  
  const exists = await existsInWatchlist(contentId, userId, type);
  if(exists) return NextResponse.json({error: "Item already in watchlist"}, {status:401});

  const savedToWatchlist = await savetoWatchlist(contentId, userId, type)
  if(!savedToWatchlist)return NextResponse.json({error: "Failed saving to watchlist"}, {status:500});


  return NextResponse.json({message: "Added to watchlist"}, {status:200});

}


export async function DELETE(request: NextRequest){

  const token = request.headers.get('Authorization')?.split(' ')[1];
  if(!token) return NextResponse.json({error: "Token missing"}, {status:401});

  const {contentId, type} = await request.json();

  const jwt  = await decrypt(token);
  if(!jwt) return NextResponse.json({error: "Invalid token"}, {status:403});
  const userId = jwt?.data.userId.toString();

  if(!contentId || !userId )return NextResponse.json({error: "Item or user id missing"}, {status:400});
  
  const deleted = await deleteIfExistsFromWatchlist(contentId, userId, type)
  if(!deleted) return NextResponse.json({error: "Failed deleting item from watchlist"}, {status:500});

  return NextResponse.json({message: "Deleted from watchlist"}, {status:200});

}