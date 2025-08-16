import { backDropPath1280 } from "@/constants/movies";
import { X } from "lucide-react";
import Image from "next/image";

const ImageModal = ({
  path,
  closeModal,
}: {
  path: string;
  closeModal: () => void;
}) => {
  return (
    <>
      <div
        className="fixed  grid place-items-center w-dvw h-dvh top-0 left-0 bg-black/75 z-3000"
        onClick={closeModal}
      />
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] aspect-video z-3001 ">
        <button
          className="absolute -right-3 md:-right-8 -top-10 cursor-pointer"
          onClick={closeModal}
        >
          <X size={24} />
        </button>
        <Image
          src={backDropPath1280 + path}
          alt="backdrop"
          fill
          sizes="90vw"
          className="rounded-xs border-1 border-neutral-600 z-10"
        />
      </div>
    </>
  );
};

export default ImageModal;
