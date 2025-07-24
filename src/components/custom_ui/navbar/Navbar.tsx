"use client";
import Link from "next/link";
import { userInfo } from "@/types/entites";
import UserBox from "./UserBox";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Searchbar from "../search_bar/Searchbar";

const Navbar = ({
  sidebar = false,
  session,
  colorType = "static",
}: {
  sidebar?: boolean;
  session: userInfo | null;
  colorType: "static" | "dynamic" | null;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 250); // schimbi pragul după nevoie
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full px-2 flex justify-between  h-[50px] items-center z-2000 [transition:background-color,550ms] backdrop-blur-md",
        scrolled || colorType === "static"
          ? "bg-black/85"
          : "bg-dark-transparent"
      )}
    >
      <div className="flex  gap-6 text-[1.1em] pl-4 flex-1">
        {sidebar && <Sidebar session={session} />}
        {/* <SidebarTrigger className="cursor-pointer hover:bg-blue-primary" /> */}
      </div>
      <Link
        href={"/"}
        className="hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:flex  items-center outline-0 outline-white rounded-4xl text-[1.2em] mx-auto"
      >
        <img src="/logo.svg" className="size-10 " />
        <span className="ml-0.5 font-semibold text-white ">
          Movie<span className="text-blue-primary font-bold">Hub</span>
        </span>
      </Link>
      <div className="flex gap-0.5 sm:gap-2 justify-end items-center h-full flex-2">
        <Searchbar />
        <UserBox session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
