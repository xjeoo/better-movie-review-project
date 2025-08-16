import { X } from "lucide-react";

const VideoModal = ({
  videoKey,
  closeModal,
}: {
  videoKey: string;
  closeModal: () => void;
}) => {
  const youtubeUrl = "https://www.youtube.com/embed/";
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
        <iframe
          src={youtubeUrl + videoKey}
          allowFullScreen={true}
          className="w-full aspect-video rounded-md border-1 border-neutral-500"
        ></iframe>
      </div>
    </>
  );
};

export default VideoModal;
