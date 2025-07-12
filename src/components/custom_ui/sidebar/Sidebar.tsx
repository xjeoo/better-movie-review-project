"use client";
import React, { useEffect, useState } from "react";
import { Clapperboard, Popcorn, Home, Search, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PanelLeftIcon } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Movies",
      url: "#",
      icon: Clapperboard,
    },
    {
      title: "TV Shows",
      url: "#",
      icon: Popcorn,
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
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
      <button onClick={toggle} className="flex gap-4">
        <PanelLeftIcon className="size-[1.7em] hover:bg-neutral-200 hover:text-black p-1 rounded-md cursor-pointer transition-colors" />
        <Separator orientation="vertical" />
      </button>
      <div
        className={cn(
          "fixed top-0 left-0 w-screen h-screen bg-light-dark-transparent z-1000 ",
          shouldRender ? "flex" : "hidden"
        )}
      >
        <div
          className={cn(
            "flex flex-col w-[70%] sm:w-[300px] bg-gradient-to-r from-black to-darker-transparent h-full py-3 px-2 border-r-1 border-neutral-500 rounded-md",
            isOpen
              ? "animate-in slide-in-from-left duration-100"
              : "animate-out slide-out-to-left duration-100"
          )}
        >
          <div className="flex flex-col items-end justify-start w-full h-fit bg-red gap-4 mt-2">
            <button
              onClick={toggle}
              className="p-2 mx-4 bg-neutral-800 cursor-pointer rounded-full hover:bg-black hover:invert"
            >
              <img
                src="/icons/leftarrow.svg"
                alt="back"
                className="size-4 invert"
              />
            </button>

            <Separator className="bg-neutral-500" />
          </div>
          <div className="flex flex-col gap-5 mt-8 px-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="flex items-center w-full rounded-sm hover:bg-neutral-700 h-[2.5em] pl-8"
              >
                <item.icon className="mr-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 h-full" onClick={toggle}></div>
      </div>
    </>
  );
};

export default Sidebar;
