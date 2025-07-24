import { getTvShowById } from "@/lib/movies/tvshows";

const TvShowPage = async ({
  params,
}: {
  params: Promise<{ showId: string }>;
}) => {
  const showId = (await params).showId;
  const showInfo = await getTvShowById(showId);
  console.log(showInfo);
  return <div>{showId}</div>;
};

export default TvShowPage;
