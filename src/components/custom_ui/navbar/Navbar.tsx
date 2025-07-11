import Link from "next/link";
import React from "react";
import { SidebarTrigger } from "../../ui/sidebar";
import UserComponent from "../../UserComponent";

const Navbar = () => {
  return (
    <nav className=" w-full px-2 flex justify-between bg-dark-transparent h-[50px] items-center">
      <div className="flex  gap-6 text-[1.1em] pl-4">
        <SidebarTrigger className="cursor-pointer hover:bg-blue-primary" />
        <Link href={"/"} className="mr-10">
          Home
        </Link>
      </div>
      <UserComponent />
    </nav>
  );
};

export default Navbar;
