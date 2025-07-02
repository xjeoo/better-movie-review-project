import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="max-w-dvw flex justify-between text-[1.3em] items-center px-4 py-2">
      <Link
        href={"/"}
        className="flex items-center h-full px-1.5 outline-1 outline-blue-primary rounded-4xl"
      >
        <img src="/logo.svg" className="size-10" />
        <span className="ml-1">
          Movie<span className="text-blue-primary">Hub</span>
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
