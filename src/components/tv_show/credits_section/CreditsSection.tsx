import { TvShowCastMember, TvShowCrewMember } from "@/types/tvshows/tvshows";
import CastCarousel from "./cast_carousel/CastCarousel";
import CrewCarousel from "./crew_carousel/CrewCarousel";
import { Clapperboard, Video } from "lucide-react";

const CreditsSection = ({
  cast,
  crew,
}: {
  cast: TvShowCastMember[];
  crew: TvShowCrewMember[];
}) => {
  return (
    <div>
      {cast.length > 0 && (
        <div className="w-full">
          <h3 className="flex gap-2 items-center text-2xl md:text-4xl text-white mb-3">
            <Clapperboard className="size-8" />
            <span>Cast</span>
          </h3>
          <CastCarousel cast={cast} />
        </div>
      )}
      {crew.length > 0 && (
        <div className="mt-4">
          <h3 className="flex gap-2 items-center text-2xl md:text-4xl text-white mb-3">
            <Video className="size-8" />
            <span>Crew</span>
          </h3>
          <CrewCarousel crew={crew} />
        </div>
      )}
    </div>
  );
};

export default CreditsSection;
