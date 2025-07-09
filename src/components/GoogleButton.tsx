"use client";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Autentifică cu Google
      await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Eroare login:", error);
    }
  };

  return (
    <button
      className="flex bg-gray-100 text-black w-full rounded-sm justify-center items-center py-1.5 hover:bg-white cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <img src="/icons/google.svg" alt="google" className="size-7" />
      <span className="text-xl font-semibold">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
