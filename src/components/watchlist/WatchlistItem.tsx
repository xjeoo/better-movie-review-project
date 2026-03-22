"use client";

import { posterPath342 } from "@/constants/movies";
import { WatchlistItem as WatchlistItemType } from "@/types/content";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2, Eye, EyeOff, Clock } from "lucide-react";

const statusOptions = [
  { value: "Not watched", label: "Not watched", icon: EyeOff },
  { value: "Currently watching", label: "Watching", icon: Clock },
  { value: "Watched", label: "Watched", icon: Eye },
] as const;

const WatchlistItem = ({
  item,
  onDelete,
  onStatusChange,
}: {
  item: WatchlistItemType;
  onDelete: (contentId: string, type: string) => Promise<void>;
  onStatusChange: (
    contentId: string,
    type: string,
    newStatus: string,
  ) => Promise<void>;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === item.watchStatus) {
      setShowStatusMenu(false);
      return;
    }
    setIsUpdating(true);
    await onStatusChange(item.contentId, item.type, newStatus);
    setIsUpdating(false);
    setShowStatusMenu(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(item.contentId, item.type);
  };

  const currentStatus = statusOptions.find((s) => s.value === item.watchStatus);
  const StatusIcon = currentStatus?.icon || EyeOff;

  return (
    <div className="group relative bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
      <Link
        href={`/${item.type === "movie" ? "movie" : "tv"}/${item.contentId}`}
        className="block"
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={
              item.poster_path
                ? posterPath342 + item.poster_path
                : "/posterplaceholder.svg"
            }
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-3 space-y-2">
        <Link
          href={`/${item.type === "movie" ? "movie" : "tv"}/${item.contentId}`}
        >
          <h3 className="text-sm font-medium text-white truncate hover:text-blue-primary transition-colors">
            {item.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400 uppercase tracking-wide">
            {item.type}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              disabled={isUpdating}
              className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors disabled:opacity-50"
            >
              <StatusIcon size={12} />
              <span className="hidden sm:inline">{currentStatus?.label}</span>
            </button>

            {showStatusMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowStatusMenu(false)}
                />
                <div className="absolute right-0 bottom-full mb-1 z-20 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                  {statusOptions.map((status) => {
                    const Icon = status.icon;
                    return (
                      <button
                        key={status.value}
                        onClick={() => handleStatusChange(status.value)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                          item.watchStatus === status.value
                            ? "bg-blue-primary/20 text-blue-primary"
                            : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        <Icon size={14} />
                        {status.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-red-500 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-50"
        aria-label="Remove from watchlist"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default WatchlistItem;
