import { getSession } from "@/lib/sessionUtils";
import Image from "next/image";
import React from "react";

const UserComponent = async () => {
  const session = await getSession();

  return (
    <button className="flex items-center cursor-pointer hover:bg-dark-transparent px-2 py-1 rounded-xl">
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
      />{" "}
      <span className="text-[1.1em] font-semibold">
        {session?.username || "No user"}
      </span>
    </button>
  );
};

export default UserComponent;
