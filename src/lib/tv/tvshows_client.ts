export const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
    },
  };

export async function getSeasonInfoForTvShow(showId: string, seasonNumber: number){
  const infoUrl = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}`

  const infoRes = await fetch(infoUrl, options);
  return await infoRes.json()
}

export async function getTvShowInfoForSeasonsPage(showId: string){
  const url = `https://api.themoviedb.org/3/tv/${showId}`;

   const infoRes = await fetch(url, options);
   const data = await infoRes.json();
   const response = {
    name: data.name,
    seasons: data.seasons,
    backdrop_path: data.backdrop_path

   }
  return response
}