"use client";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Searchbar = () => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const value = useDebouncedValue(text);
  const [results, setResults] = useState<any>(null); // trb definit tip

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
    console.log(visible);
  };
  useEffect(() => {
    if (value.trim() === "") return;
    fetch(searchRoute + `?query=${value}`, options)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results.slice(0, 10));
      });
  }, [value]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div
      className={cn(
        "relative group flex gap-1 items-center px-1.5 py-0.5 h-[40px] rounded-full",
        visible && "bg-dark-transparent"
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
        onChange={(e) => setText(e.currentTarget.value)}
        className={cn(
          "relative transition-[width] w-0 rounded-r-full outline-0",
          visible && "w-[100px] sm:w-60 pl-1.5"
        )}
      />
      {results && (
        <div className="absolute hidden group-focus-within:flex flex-col gap-3 w-full bottom-0 translate-y-full bg-black/50">
          {results.map((item: any, index: number) => (
            <Link
              href={`/${item.media_type}/${item.id}`}
              key={index}
              className="flex justify-between px-2"
            >
              {item.media_type === "movie" ? (
                <>
                  <span>{item.title}</span>
                  <span>{item.media_type}</span>
                </>
              ) : (
                <>
                  <span>{item.name}</span>
                  <span>{item.media_type}</span>
                </>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
