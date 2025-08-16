"use client";

import { useState } from "react";
import VideoModal from "./VideoModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { videoResult } from "@/types/content";
import Image from "next/image";
import { Play } from "lucide-react";

const VideoSection = ({ videos }: { videos: videoResult[] }) => {
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);
  const closeModal = () => {
    setSelectedVideoKey(null);
  };
  return (
    <>
      {selectedVideoKey && (
        <VideoModal videoKey={selectedVideoKey} closeModal={closeModal} />
      )}
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className="!p-0 bg-black ">
          {videos.map((video, index) => (
            <CarouselItem key={video.id} className="basis-auto">
              <button
                className="relative h-[180px] aspect-video cursor-pointer md:hover:opacity-90 rounded-md overflow-hidden border-1 border-white"
                onClick={() => setSelectedVideoKey(video.key)}
              >
                <div className="absolute w-full h-full grid place-items-center top-0 left-0 bg-black/50 z-10">
                  <Play size={32} fill="white" />
                </div>
                <div className="absolute  top-1 left-2 z-20 font-semibold">
                  {video.name}
                </div>
                <Image
                  src={`https://img.youtube.com/vi/${video.key}/0.jpg
`}
                  alt="backdrop"
                  fill
                  sizes="20vw"
                  loading={index > 4 ? "lazy" : "eager"}
                  className="object-cover select-none"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default VideoSection;
