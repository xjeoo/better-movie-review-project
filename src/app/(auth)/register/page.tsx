"use client";
import { Button } from "@/components/ui/button";
import { validateRegisterForm } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleGoogleLogin = async () => {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formStatus = validateRegisterForm(formData);
    if (!formStatus.ok) {
      setError(formStatus.message);
      return null;
    }
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("password")?.toString();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });
    const res = await response.json();

    if (res.ok) router.push("/login");
    else setError(res.message);
  };

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
            <Button
              onClick={handleGoogleLogin}
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
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <div className="flex gap-2 items-center pl-2 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Enter your username "
                    className=" pl-1.5 py-1  rounded-2xl outline-0 focus:bg-black w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <div className="flex gap-2 items-center pl-2 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="yourEmail@email.com "
                    className="pl-1.5 py-1  rounded-2xl outline-0 focus:bg-black w-full "
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    required
                    className="pl-3 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75  py-1 focus:bg-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="********"
                    required
                    className="pl-3 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75  py-1 focus:bg-black"
                  />
                </div>
              </div>
              {error && (
                <h3 className="w-full text-center py-1 rounded-md bg-red-800 text-white">
                  {error}
                </h3>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mx-auto mt-10 hover:cursor-pointer text-xl bg-transparent ring-1 ring-white hover:text-black hover:bg-white"
            >
              Submit
            </Button>

            <p className="mt-10 text-[0.95em] text-pretty text-center">
              Already have an account?<span> </span>
              <Link
                href={"/login"}
                className="underline hover:text-blue-300 text-pretty "
              >
                Sign in!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
