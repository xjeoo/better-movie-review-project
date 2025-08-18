import Link from "next/link";
import React from "react";

const PaginationItem = ({
  page,
  pathName,
  search,
}: {
  page: string;
  pathName: string;
  search: string;
}) => {
  console.log(search, " ");
  return (
    <Link
      href={pathName + `?search=${search}&page=${page}`}
      className="text-[18px] h-[24px] w-[24px] flex items-center justify-center rounded-full hover:bg-white hover:text-black"
    >
      {page}
    </Link>
  );
};

export default PaginationItem;
