import { options } from "@/constants/movies"
import { CombinedCredit, CombinedCredits } from "@/types/people/people";


async function getPersonById(personId: string){
  const url = `https://api.themoviedb.org/3/person/${personId}`

  const info = await fetch(url, options);

  return await info.json();
}

async function getCombinedCreditsByPersonId(personId: string){
  const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits`
  const info = await fetch(url, options);
  const data = await info.json()
  const cast = data.cast.slice(0,20);
  const crew = data.cast.slice(0,20)

  return {
    cast,crew
  };
}
export async function getInfoForPeoplePage(personId: string) {
  const [data, combined_credits] = await Promise.all([
    await getPersonById(personId),
    await getCombinedCreditsByPersonId(personId)
  ])

  return {
    data,
    combined_credits
  }
}