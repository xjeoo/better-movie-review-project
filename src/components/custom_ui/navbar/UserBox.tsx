// "use client"; // fac client cand fac dropdown-ul
import { userInfo } from "@/types/entites";
import Image from "next/image";
import Link from "next/link";

const UserBox = ({ session }: { session: userInfo | null }) => {
  return (
    <button className="flex items-center cursor-pointer md:hover:bg-gray-900 pl-4 pr-1 sm:pr-8 min-w-fit w-fit h-full ">
      {session ? (
        <>
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
          <span className="hidden sm:inline-block text-[1.1em] font-semibold">
            {session?.username || "No user"}
          </span>
        </>
      ) : (
        <>
          <Link href={"/login"} className="size-full flex items-center">
            Log In
          </Link>
        </>
      )}
    </button>
  );
};

export default UserBox;
