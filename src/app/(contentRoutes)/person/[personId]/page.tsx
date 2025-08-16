import { posterPath500 } from "@/constants/movies";
import { getInfoForPeoplePage } from "@/lib/people/people";
import { formatDate } from "@/lib/utils";
import { CombinedCredits, PersonData } from "@/types/people/people";
import Image from "next/image";

const PersonPage = async ({
  params,
}: {
  params: Promise<{ personId: string }>;
}) => {
  const personId = (await params).personId;
  const {
    data,
    combined_credits, // o le folosesc cu carousele cred
  }: { data: PersonData; combined_credits: CombinedCredits } =
    await getInfoForPeoplePage(personId);

  console.log(combined_credits);
  return (
    <main className="flex flex-col w-full py-5 px-3 md:px-12 bg-gray-900">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex  gap-3">
          <div className="relative w-[200px] aspect-square mx-auto md:mx-0">
            <Image
              src={
                data.profile_path
                  ? posterPath500 + data.profile_path
                  : "/posterplaceholder.svg"
              }
              alt="profile photo"
              fill
              sizes="25vw"
              className="object-cover rounded-md h-fit"
            />
          </div>
        </div>
        <div className="flex flex-col items-center md:items-baseline gap-2">
          <h1 className="text-4xl font-semibold">
            {data.name ? data.name : "Unknown"}
          </h1>
          <div className="flex flex-col items-center md:items-baseline text-[1.1rem] text-neutral-300">
            {data.birthday && (
              <span className="flex gap-1.5 items-center">
                {"Born on " + formatDate(data.birthday)}
              </span>
            )}
            {data.place_of_birth && (
              <span className="text-center">
                {"Place of birth: " + data.place_of_birth}
              </span>
            )}
            {data.deathday && (
              <span>{"Died on " + formatDate(data.deathday)}</span>
            )}
          </div>
          <div className="h-fit mt-auto">
            {data.known_for_department && (
              <span className="text-white text-xl">
                {"Known for: " + data.known_for_department}
              </span>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p>{data.biography ? data.biography : "No available biography"}</p>
        </div>
      </section>
    </main>
  );
};

export default PersonPage;
