"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { backDropPath780 } from "@/constants/movies";
import { ImageType } from "@/types/movies/movies";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

const ImageSection = ({ images }: { images: ImageType }) => {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    null
  );
  const closeModal = () => {
    setSelectedImagePath(null);
  };
  return (
    <>
      {selectedImagePath && (
        <ImageModal path={selectedImagePath} closeModal={closeModal} />
      )}
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className="!p-0 bg-black ">
          {images.backdrops.map((image, index) => (
            <CarouselItem key={index + image.file_path} className="basis-auto">
              <button className="relative h-[160px] aspect-video cursor-pointer md:hover:opacity-90">
                <Image
                  src={backDropPath780 + image.file_path}
                  alt="backdrop"
                  fill
                  sizes="20vw"
                  loading={index > 4 ? "lazy" : "eager"}
                  className="rounded-md select-none"
                  onClick={() => setSelectedImagePath(image.file_path)}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default ImageSection;
