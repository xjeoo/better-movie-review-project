import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import GoogleButton from "@/components/GoogleButton";

const RegisterPage = () => {
  return (
    <>
      <div className="min-h-screen overflow-hidden pb-[70px] lg:pb-[140px] px-2 sm:px-0">
        <Image
          src="/sign-in-background.png"
          alt="background"
          fill
          className="object-cover blur-md"
        />
        <div
          className="bg-dark-transparent backdrop-brightness-90 backdrop-blur-xs 
          px-3 sm:px-10 pt-5 pb-10 rounded-md min-w-[250px] w-fit mx-auto mt-[70px] lg:mt-[140px] "
        >
          <Link
            href={"/"}
            className="flex items-center h-full px-1.5 outline-0 outline-white rounded-4xl mb-4 w-fit mx-auto text-[1.2em]"
          >
            <img src="/logo.svg" className="size-10 " />
            <span className="ml-0.5 font-semibold ">
              Movie<span className="text-blue-primary font-bold">Hub</span>
            </span>
          </Link>
          <hr className="text-black border-gray-300 mb-4 w-full" />
          <div className="flex flex-col gap-5 mt-7 mb-4 items-center">
            <GoogleButton />
            <p className="text-xl font-semibold">or</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
