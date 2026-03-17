export async function getSeasonInfoForTvShow(showId: string, seasonNumber: number){
  const apiUrl = `/api/tv/${showId}/seasons?seasonNumber=${seasonNumber}`;

  const infoRes = await fetch(apiUrl);
  return await infoRes.json();
}

export async function getTvShowInfoForSeasonsPage(showId: string){
  const apiUrl = `/api/tv/${showId}/info`;

  const infoRes = await fetch(apiUrl);
  return await infoRes.json();
}
