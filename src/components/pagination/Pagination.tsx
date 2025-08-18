"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationItem from "./PaginationItem";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  page = "1",
  maxPage,
}: {
  page: string;
  maxPage: string;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const pageNumber = parseInt(page) || 1;
  const total_pages = parseInt(maxPage);
  return (
    <div className="flex gap-3 mx-auto w-fit my-5 items-center">
      {pageNumber > 1 && ( // first and previous buttons
        <>
          <Link href={pathName + `?search=${search}&page=1`}>
            <ChevronFirst size={16} />
          </Link>
          <Link href={pathName + `?search=${search}&page=${pageNumber - 1}`}>
            <ChevronLeft size={16} />
          </Link>
        </>
      )}
      {(pageNumber === 1 || pageNumber === 2) && ( // version for first two pages
        <>
          <PaginationItem page="1" pathName={pathName} search={search || ""} />
          <PaginationItem page="2" pathName={pathName} search={search || ""} />
          <PaginationItem page="3" pathName={pathName} search={search || ""} />
          <span className="text-[18px] h-[24px] w-[24px] flex items-center justify-center rounded-full">
            ...
          </span>
        </>
      )}

      {pageNumber !== 1 &&
        pageNumber !== 2 &&
        pageNumber !== total_pages &&
        pageNumber !== total_pages - 1 && ( // version for pages that are not at start or at end
          <>
            <span className="text-[18px] flex items-center justify-center rounded-full">
              ...
            </span>
            <PaginationItem
              page={(pageNumber - 1).toString()}
              pathName={pathName}
              search={search || ""}
            />
            <PaginationItem
              page={page}
              pathName={pathName}
              search={search || ""}
            />
            <PaginationItem
              page={(pageNumber + 1).toString()}
              pathName={pathName}
              search={search || ""}
            />
            <span className="text-[18px] h-[24px] w-[24px] flex items-center justify-center rounded-full">
              ...
            </span>
          </>
        )}

      {(pageNumber === total_pages || pageNumber === total_pages - 1) && ( // version for last two pages
        <>
          <span className="text-[18px] h-[24px] w-[24px] flex items-center justify-center rounded-full">
            ...
          </span>
          <PaginationItem
            page={(total_pages - 2).toString()}
            pathName={pathName}
            search={search || ""}
          />
          <PaginationItem
            page={(total_pages - 1).toString()}
            pathName={pathName}
            search={search || ""}
          />
          <PaginationItem
            page={total_pages.toString()}
            pathName={pathName}
            search={search || ""}
          />
        </>
      )}

      {pageNumber < total_pages && ( // last and next buttons
        <>
          <Link href={pathName + `?search=${search}&page=${pageNumber + 1}`}>
            <ChevronRight size={16} />
          </Link>
          <Link href={pathName + `?search=${search}&page=${total_pages}`}>
            <ChevronLast size={16} />
          </Link>
        </>
      )}
    </div>
  );
};

export default Pagination;
