"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("search_bar")?.toString() || "";
    if (searchValue.trim() !== "") router.push(`/movies?search=${searchValue}`);
    else router.push("/movies");
  };
  return (
    <div className="relative w-full my-10 h-[300px] md:h-[450px] bg-[url(/moviesPage/search_bar_background.webp)]">
      <div className="absolute -top-1 w-full h-[30px]  bg-gradient-to-b from-gray-950 to-transparent" />
      <div className="absolute -bottom-1 w-full h-[30px] bg-gradient-to-t from-gray-950 to-transparent" />
      {/* <div className="hidden md:inline-block absolute -left-1 h-full w-[30px] bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="hidden md:inline-block absolute -right-1 h-full w-[30px] bg-gradient-to-l from-gray-950 to-transparent" /> */}

      <div className=" gap-4 items-center justify-center h-full w-full bg-blue-950/80">
        <div className="w-full h-full grid place-items-center bg-black/20">
          <h2 className="text-3xl font-bold text-center">
            Find anything you&#39;re looking for with a search
          </h2>
          <form className="flex" action={handleSubmit}>
            <input
              type="text"
              name="search_bar"
              placeholder="Search for any movie"
              className="pl-3 py-1.5 text-[1.1rem] text-black w-[200px] md:w-[400px] bg-gray-200 shadow-2xl shadow-white/40 outline-0 border-2 border-blue-primary-darker rounded-l-full"
            />
            <button
              type="submit"
              className="text-[1.1rem] py-1.5 px-5 bg-blue-primary-darker md:hover:opacity-90 transition-opacity rounded-r-full cursor-pointer"
            >
              <Search />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
