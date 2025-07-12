import { backDropPath720, posterPath500 } from "@/constants/movies";
import { getMovieById } from "@/lib/movies/movies";
import Image from "next/image";
import React from "react";

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  const youtubeUrl = "https://www.youtube.com/embed/";

  const movie = await getMovieById(movieId);

  console.log(movie);

  return (
    <div className="w-full h-full min-h-screen min-w-screen bg-gradient-to-b from-blue-900 to-black">
      <main className="pt-15 flex flex-col gap-10 ">
        <section className="relative flex flex-col w-[95%] lg:w-[80%] bg-gray-100 min-h-[720px] h-fit mx-auto rounded-md outline-1 outline-white">
          <div className="flex w-full">
            <div className="flex-1">text</div>
            <div className="relative flex-1 w-full lg:h-[300px]">
              {/* -----AICI SA CONTINUI SI SA MODIFIC CE AM FACUT---- */}
              <Image
                src={posterPath500 + movie.data.poster_path}
                alt="poster"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MoviePage;
