import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { loginUser, loginWithGoogle } from "@/actions/auth";

const LoginPage = () => {
  return (
    <>
      <div className="min-h-screen overflow-hidden pb-40">
        <Image
          src="/sign-in-background.png"
          alt="background"
          fill
          className="object-cover blur-md"
        />
        <div
          className="bg-dark-transparent backdrop-brightness-90 backdrop-blur-xs 
          px-10 pt-5 pb-10 rounded-md min-w-[250px] w-fit mx-auto mt-[80px] lg:mt-[160px] "
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
            <Button
              onClick={loginWithGoogle}
              className="items-center bg-gray-100 py-5 cursor-pointer hover:bg-white"
            >
              <img src="/icons/google.svg" alt="google" className="size-7" />
              <span className="text-gray-900 text-xl">
                Continue with Google
              </span>
            </Button>
            <p className="text-xl font-semibold">or</p>
          </div>
          <form
            className="flex flex-col text-[1.2em] lg:text-[1.1em] items-center  "
            action={loginUser}
          >
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <div className="flex gap-2 items-center pl-2 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75">
                  <img
                    src="/icons/user.ico"
                    alt=""
                    className="size-5"
                    aria-hidden="true"
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter your username: "
                    className="pl-1.5 py-1  rounded-r-2xl outline-0 focus:bg-black"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <div className="flex gap-2 items-center pl-2 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75">
                  <img
                    src="/icons/password.svg"
                    alt=""
                    className="size-5"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password: "
                    className="pl-1.5 py-1  rounded-r-2xl outline-0 focus:bg-black"
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mx-auto mt-10 hover:cursor-pointer text-xl bg-transparent ring-1 ring-white hover:text-black hover:bg-white"
            >
              Submit
            </Button>

            <p className="mt-10 text-[0.95em] text-pretty text-center">
              Don't have an account?<span> </span>
              <Link
                href={"/register"}
                className="underline italic hover:text-blue-300 "
              >
                Register now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
