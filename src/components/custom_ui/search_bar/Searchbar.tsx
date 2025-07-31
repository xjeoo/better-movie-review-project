"use client";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchItem from "./SearchItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const Searchbar = ({
  scrolled,
  colorType,
}: {
  scrolled: boolean;
  colorType: string | null;
}) => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const value = useDebouncedValue(text);
  const [results, setResults] = useState<any>(null); // trb definit tip
  const inputRef = useRef<HTMLInputElement>(null);

  const searchRoute = "https://api.themoviedb.org/3/search/multi";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
    },
  };

  const toggle = () => {
    setVisible((prev) => !prev);
    inputRef.current?.focus();
  };
  useEffect(() => {
    if (value.trim() === "") return;
    fetch(searchRoute + `?query=${value}`, options)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results.slice(0, 10));
      });
  }, [value]);

  return (
    <div
      className={cn(
        "relative group  outline-neutral-500 flex gap-1 items-center px-1.5 py-0.5 h-[40px] rounded-full",
        visible && "bg-dark-transparent focus-within:outline-1"
      )}
    >
      <button
        className="flex items-center w-fit h-full cursor-pointer"
        onClick={toggle}
      >
        <Search />
      </button>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={text}
        autoComplete="off"
        spellCheck="false"
        ref={inputRef}
        onChange={(e) => setText(e.currentTarget.value)}
        className={cn(
          "relative transition-[width] w-0 rounded-r-full outline-0",
          visible && "w-[110px] sm:w-60 pl-1.5"
        )}
      />
      {results && visible && (
        <ScrollArea
          className={cn(
            "!absolute right-0 py-2 hidden group-focus-within:flex flex-col gap-10 w-[200px] sm:w-full max-h-[400px] bottom-0 translate-y-full  rounded-xl border-x-1 border-b-1 border-neutral-500",
            scrolled || colorType === "static"
              ? "bg-black/90"
              : "bg-dark-transparent"
          )}
        >
          {results.length > 0 ? (
            results.map((item: any, index: number) => (
              <SearchItem key={index} item={item} />
            ))
          ) : (
            <span className="pl-2.5">No matches found</span>
          )}
        </ScrollArea>
      )}
    </div>
  );
};

export default Searchbar;
