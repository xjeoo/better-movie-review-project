import { decrypt } from "@/lib/auth/jwt";
import { getToken } from "@/lib/auth/sessionUtils";
import { deleteIfExistsFromWatchlist, existsInWatchlist, getUserWatchlist, savetoWatchlist, updateWatchlistItem } from "@/lib/user/watchlist";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){

  const token = await getToken();
  if(!token) return NextResponse.json({error: "Token missing"}, {status:401});

  const jwt  = await decrypt(token);
  if(!jwt) return NextResponse.json({error: "Invalid token"}, {status:403});
  const userId = jwt.data.userId.toString();
  if(!userId )return NextResponse.json({error: "User id missing"}, {status:400});

  const watchlist = await getUserWatchlist(userId);
  if(watchlist === null) return NextResponse.json({error: "Failed fetching watchlist"}, {status:500});
  return NextResponse.json({watchlist: watchlist}, {status:200});

}
export async function POST(request : NextRequest){


  const token = await getToken();
  if(!token) return NextResponse.json({error: "Token missing"}, {status:401});

  const {contentId, title, background_path, poster_path, type} = await request.json();

  const jwt  = await decrypt(token);
  if(!jwt) return NextResponse.json({error: "Invalid token"}, {status:403});
  const userId = jwt.data.userId.toString();

  if(!contentId || !userId )return NextResponse.json({error: "Item or user id missing"}, {status:400});
  
  const exists = await existsInWatchlist(contentId, userId, type);
  if(exists) return NextResponse.json({error: "Item already in watchlist"}, {status:401});

  const savedToWatchlist = await savetoWatchlist(contentId, userId, title, type, poster_path, background_path)
  if(!savedToWatchlist)return NextResponse.json({error: "Failed saving to watchlist"}, {status:500});


  return NextResponse.json({message: "Added to watchlist"}, {status:200});

}


export async function DELETE(request: NextRequest){

  const token = await getToken();
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

export async function PATCH(request: NextRequest){

  const token = await getToken();
  if(!token) return NextResponse.json({error: "Token missing"}, {status:401});

  const jwt  = await decrypt(token);
  if(!jwt) return NextResponse.json({error: "Invalid token"}, {status:403});
  const userId = jwt.data.userId.toString();

  const {contentId, type, newStatus} = await request.json();

  if(!contentId || !userId || !newStatus)return NextResponse.json({error: "Item, user id or new status missing"}, {status:400});
  
  // CHECK WATCHLISTMODEL TS FOR VALID STATUS VALUES
  if (newStatus !== "Not watched" && newStatus !== "Currently watching" && newStatus !== "Watched") {
    console.log("Invalid watch status:", newStatus);
    return NextResponse.json({ error: "Invalid watch status" }, { status: 400 });
  }
  
  const exists = await existsInWatchlist(contentId, userId, type);
  if(!exists) return NextResponse.json({error: "Item not in watchlist"}, {status:401});
  const updated = await updateWatchlistItem(contentId, userId, type, newStatus);
  if(!updated) return NextResponse.json({error: "Failed updating watchlist item"}, {status:500});

  return NextResponse.json({message: "Updated watchlist item"}, {status:200});
}