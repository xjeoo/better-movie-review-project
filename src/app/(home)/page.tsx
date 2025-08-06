import Footer from "@/components/custom_ui/Footer";
import React from "react";
import HomeCarousel from "@/components/custom_ui/home_carousel/HomeCarousel";
import { getInfoForHomePage } from "@/lib/home_page/home_page";
import ContentCarousel from "@/components/custom_ui/content_carousel/ContentCarousel";

const HomePage = async () => {
  const { discover, popularMovies, popularTvShows } =
    await getInfoForHomePage();

  console.log(popularMovies);
  return (
    <>
      <div className="flex-1 sm:flex w-full h-full flex-col">
        <section>
          <HomeCarousel movies={discover} />
        </section>
        <section className="w-full px-5 sm:px-10 flex flex-col gap-[80px] sm:-mt-[150px] z-10 pb-40">
          <div>
            <h2 className="text-2xl sm:text-4xl mb-3">Trending Movies</h2>
            <ContentCarousel content={popularMovies} type="movie" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl mb-3">Trending TV Shows</h2>
            <ContentCarousel content={popularTvShows} type="tv" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
