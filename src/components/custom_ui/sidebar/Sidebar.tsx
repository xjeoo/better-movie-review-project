"use client";
import React, { useEffect, useState } from "react";
import { Clapperboard, Popcorn, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PanelLeftIcon } from "lucide-react";
import { userInfo } from "@/types/entites";

// might need session to add setting later, so disable eslint here for now !!!!!
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sidebar = ({ session }: { session: userInfo | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Movies",
      url: "/movies",
      icon: Clapperboard,
    },
    {
      title: "TV Shows",
      url: "/shows",
      icon: Popcorn,
    },

    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings,
    // },
  ];

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
    localStorage.setItem("sidebar_state", isOpen.toString());
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 90);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={toggle} className="flex items-center gap-3">
        <PanelLeftIcon className="size-8 p-1.5 rounded-lg text-white hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer" />
        <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      </button>
      <div
        className={cn(
          "fixed inset-0 w-screen h-dvh bg-black/60 backdrop-blur-sm z-[1000]",
          shouldRender ? "flex" : "hidden",
        )}
      >
        <div
          className={cn(
            "flex flex-col w-[85%] sm:w-[320px] h-full bg-gradient-to-b from-black via-zinc-950 to-black border-r border-zinc-800/50 shadow-2xl shadow-black/50",
            isOpen
              ? "animate-in slide-in-from-left duration-200 ease-out"
              : "animate-out slide-out-to-left duration-200 ease-in",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-primary to-blue-primary-darker flex items-center justify-center">
                <Clapperboard className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Menu</span>
            </div>
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-200 cursor-pointer"
            >
              <img
                src="/icons/leftarrow.svg"
                alt="close"
                className="w-4 h-4 invert opacity-70"
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-1">
              <p className="px-3 mb-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Navigation
              </p>
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  onClick={toggle}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-zinc-800/50 text-zinc-500 group-hover:bg-blue-primary/20 group-hover:text-blue-primary transition-all duration-200">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          {/* <div className="px-5 py-4 border-t border-zinc-800/50">
            <p className="text-xs text-zinc-600 text-center">
              © 2024 MovieReview
            </p>
          </div> */}
        </div>
        <div className="flex-1 h-full" onClick={toggle}></div>
      </div>
    </>
  );
};

export default Sidebar;
