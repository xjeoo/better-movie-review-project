import Footer from "@/components/custom_ui/Footer";
import LogoutButton from "@/components/LogoutButton";
import { getDiscoverMovies } from "@/lib/movies/movies";
import React from "react";
import HomeCarousel from "@/components/custom_ui/carousel/HomeCarousel";

const HomePage = async () => {
  const movies = await getDiscoverMovies();

  return (
    <>
      <div className="flex-1 sm:flex w-full h-full flex-col">
        <HomeCarousel movies={movies} /> <LogoutButton />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
