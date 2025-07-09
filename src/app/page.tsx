import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full">
        HomePage <LogoutButton />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
