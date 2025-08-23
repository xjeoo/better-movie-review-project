import { getDefaultTvShows } from "@/lib/shows_page/shows_page";
import ContentCarousel from "../custom_ui/content_carousel/ContentCarousel";

const TvShowsPageInfo = async () => {
  const shows = await getDefaultTvShows();
  console.log(shows);
  return (
    <div className="flex flex-col items-center gap-15 mb-15">
      <div className="w-[95vw]">
        <h2 className="text-4xl font-semibold mb-3">On the air</h2>
        <ContentCarousel type="tv" content={shows.on_the_air} />
      </div>
      <div className="w-[95vw]">
        <h2 className="text-4xl font-semibold mb-3">Popular</h2>
        <ContentCarousel type="tv" content={shows.popular} />
      </div>
      <div className="w-[95vw]">
        <h2 className="text-4xl font-semibold mb-3">Top Rated</h2>
        <ContentCarousel type="tv" content={shows.top_rated} />
      </div>
    </div>
  );
};

export default TvShowsPageInfo;
