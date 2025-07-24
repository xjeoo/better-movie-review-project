"use client";
import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { useState } from "react";

const WatchlistButton = ({
  token,
  contentId,
  userId,
  type,
  isAdded,
}: {
  token: string | null;
  contentId: string;
  userId: string | undefined;
  type: string;
  isAdded: boolean;
}) => {
  const [addedState, setAddedState] = useState(isAdded);

  const handleAdd = async () => {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contentId: contentId,
        type: type,
      }),
    });
    const data = await res.json();
    if (data.message) setAddedState(true);
  };

  const handleDelete = async () => {
    const res = await fetch("/api/watchlist", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contentId: contentId,
        type: type,
      }),
    });
    const data = await res.json();
    if (data.message) setAddedState(false);
  };

  if (!userId) return null;

  return (
    <>
      {addedState ? (
        <button
          className="flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-blue-primary-darker hover:bg-blue-primary-darker-100 transition-colors text-white cursor-pointer mt-3"
          onClick={handleDelete}
        >
          <BookmarkCheck />
          <span>Remove from watchlist</span>
        </button>
      ) : (
        <button
          className="flex items-center gap-0.5 px-3 py-1.5 rounded-full border-1 border-white hover:border-blue-primary-darker hover:bg-blue-primary-darker transition-colors text-white cursor-pointer mt-3"
          onClick={handleAdd}
        >
          <BookmarkPlus />
          <span>Add to watchlist</span>
        </button>
      )}
    </>
  );
};

export default WatchlistButton;
