import Watchlist from "@/models/Watchlist";
import dbConnect from "../database";

export async function getUserWatchlist(userId: string) {
  await dbConnect();
  try {
    const watchlist = await Watchlist.find({ userId: userId }).sort({ createdAt: -1 });
    return watchlist;
  } catch (err) {
    console.log("Failed to fetch watchlist", err);
    throw new Error("Database failed fetching watchlist");
  }
}

export async function existsInWatchlist(
  contentId: string,
  userId: string | undefined,
  type: string,
) {
  await dbConnect();

  if (!userId) return false;
  try {
    const exists = await Watchlist.findOne({
      contentId: contentId,
      userId: userId,
      type: type,
    });
    if (exists) return true;
  } catch (err) {
    console.log(err);
    throw new Error("Database failed fetching watchlist");
  }

  return false;
}

export async function savetoWatchlist(
  contentId: string,
  userId: string,
  title: string,
  type: string,
  poster_path?: string,
  background_path?: string,
) {
  await dbConnect();
  try {
    const toSave = new Watchlist({
      contentId: contentId,
      userId: userId,
      title: title,
      poster_path: poster_path,
      background_path: background_path,
      type: type,
    });
    await toSave.save();
    return true;
  } catch (err) {
    console.log("Failed to save to watchlist", err);
    return false;
  }
}

export async function deleteIfExistsFromWatchlist(
  contentId: string,
  userId: string,
  type: string,
) {
  await dbConnect();
  try {
    const toDelete = await Watchlist.findOne({ contentId, userId, type });
    if (!toDelete) return true;
    await toDelete.deleteOne();
    return true;
  } catch (err) {
    console.log("Failed to delete from watchlist", err);
    return false;
  }
}

export async function updateWatchlistItem(
  contentId: string,
  userId: string,
  type: string,
  newStatus: string
){
  
  await dbConnect();
  try {
    const item = await Watchlist.findOne({ contentId, userId, type });
    if(!item) return false;
    item.watchStatus = newStatus;
    await item.save();
    return true;

   
  } catch (err) {
    console.log("Failed to update watchlist item", err);
    return false;
  }
}
