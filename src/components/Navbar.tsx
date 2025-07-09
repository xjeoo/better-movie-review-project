import Link from "next/link";
import React from "react";
import UserComponent from "./UserComponent";

const Navbar = () => {
  return (
    <nav className="relative flex w-full justify-between bg-[#555] h-[50px] items-center px-10">
      <button>Menu</button>
      <Link
        href={"/"}
        className="flex items-center outline-0 outline-white rounded-4xl text-[1.2em]"
      >
        <img src="/logo.svg" className="size-10 " />
        <span className="ml-0.5 font-semibold ">
          Movie<span className="text-blue-primary font-bold">Hub</span>
        </span>
      </Link>
      <UserComponent />
    </nav>
  );
};

export default Navbar;
