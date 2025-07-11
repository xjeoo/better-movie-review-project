import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex gap-4 w-full items-center bg-dark-transparent py-6 justify-center">
      <span>Data provided by: </span>
      <Image
        src="/tmdb.svg"
        alt="TMDB"
        width={60}
        height={40}
        className="h-[40px]"
      />
    </footer>
  );
};

export default Footer;
