"use client";
import { userInfo } from "@/types/entites";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { List, LogOut, ChevronDown } from "lucide-react";

const UserBox = ({ session }: { session: userInfo | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.message) {
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleWatchlistClick = () => {
    setIsOpen(false);
    router.push("/watchlist");
  };

  return (
    <div className="relative h-full" ref={dropdownRef}>
      {session ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center cursor-pointer pl-4 pr-1 sm:pr-4 min-w-fit w-fit h-full transition-colors duration-200"
          >
            <Image
              src={
                session?.image === "none"
                  ? "/defaultavatar.png"
                  : (session?.image as string)
              }
              height={30}
              width={30}
              alt="avatar"
              className="rounded-full mr-1.5"
            />
            <span className="hidden sm:inline-block text-[1.1em] font-semibold">
              {session?.username || "No user"}
            </span>
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-gray-900/70 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in-0 zoom-in-95">
              <div className="px-4 py-3 border-b border-gray-800 bg-gray-950">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      session?.image === "none"
                        ? "/defaultavatar.png"
                        : (session?.image as string)
                    }
                    height={40}
                    width={40}
                    alt="avatar"
                    className="rounded-full"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-white truncate">
                      {session?.username}
                    </span>
                    <span className="text-sm text-gray-400 truncate">
                      {session?.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={handleWatchlistClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 md:hover:bg-gray-900 md:hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  <List className="w-4 h-4" />
                  <span>My Watchlist</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 md:hover:bg-gray-900 md:hover:text-red-300 transition-colors duration-150 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
          className="flex items-center cursor-pointer hover:text-zinc-300 px-4 sm:px-6 min-w-fit w-fit h-full transition-colors duration-200"
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default UserBox;
