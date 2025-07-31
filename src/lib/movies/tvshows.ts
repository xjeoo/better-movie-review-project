import { options } from "@/constants/movies";
import { videoResult } from "@/types/content";


export async function getTvShowById(showId: string){
  const infoUrl = `https://api.themoviedb.org/3/tv/${showId}`;
  const videoUrl = `https://api.themoviedb.org/3/tv/${showId}/videos`
  const contentRatingsUrl = `https://api.themoviedb.org/3/tv/${showId}/content_ratings`
  const recommendationsUrl = `https://api.themoviedb.org/3/tv/${showId}/recommendations`;
  const castUrl = `https://api.themoviedb.org/3/tv/${showId}/aggregate_credits`;


  
  const [infoRes, videoRes, contentRatingsRes, recommendationRes, castRes] = await Promise.all([
    await fetch(infoUrl, options),
    await fetch(videoUrl, options),
    await fetch(contentRatingsUrl, options),
    await fetch(recommendationsUrl, options),
    await fetch(castUrl, options),
  ])
  const recommendations = await recommendationRes.json();
  

  const contentRatingsJson = await contentRatingsRes.json()
  const usRating = contentRatingsJson.results.filter((rating: {iso_3166_1: string, rating: string})=>rating.iso_3166_1 === 'US') ;
  const finalRating = usRating ? usRating : contentRatingsJson.results.filter((rating: {iso_3166_1: string, rating: string})=>rating.rating)

  const videos = await videoRes.json();
  const officialTrailers = videos.results.filter(
    (video: videoResult) =>
      video.name.toLowerCase().includes("trailer") &&
      video.name.toLowerCase().includes("official")&&
      video.site.toLowerCase().includes("youtube")
  );
  const finalTrailers = officialTrailers.length === 0 ? videos.results.filter(
    (video: videoResult) =>
      video.name.toLowerCase().includes("trailer") &&
      video.site.toLowerCase().includes("youtube") 
  ) : officialTrailers;
  
  const credits = await castRes.json()
  const cast = credits.cast.slice(0,15);
  const crew = credits.crew.slice(0,15);


  return {
    data: await infoRes.json(),
    video: finalTrailers,
    ageRating: finalRating[0]?.rating || 'N/A',
    recommendations: recommendations.results.slice(0,10),
    cast: cast,
    crew: crew,
  }
}


