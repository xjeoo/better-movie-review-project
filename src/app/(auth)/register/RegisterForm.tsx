"use client";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { AuthActionState } from "@/types/auth";
import Link from "next/link";
import React, { useActionState } from "react";

const RegisterForm = () => {
  const [state, registerAction, isPending] = useActionState<
    AuthActionState,
    FormData
  >(register, {
    ok: false,
    message: "",
  });

  return (
    <form
      className="w-full flex flex-col text-[1.2em] lg:text-[1.1em] items-center"
      action={registerAction}
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
              placeholder="Enter your username"
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
              placeholder="your@email.com "
              className="pl-1.5 py-1  rounded-2xl outline-0 focus:bg-black w-full "
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
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
          <div className="flex flex-col w-full">
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
        {state.message && (
          <h3 className="w-full text-center py-1 rounded-md bg-red-800 text-white text-wrap">
            {state.message}
          </h3>
        )}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full mx-auto mt-10 md:hover:cursor-pointer text-xl bg-transparent ring-1 ring-white md:hover:text-black md:hover:bg-white"
      >
        {isPending ? (
          <img
            src="/icons/loading.svg"
            alt="Loading"
            className="h-5 animate-spin"
          />
        ) : (
          "Submit"
        )}
      </Button>

      <p className="mt-10 text-[0.95em] text-pretty text-center">
        Already have an account?<span> </span>
        <Link
          href={"/login"}
          className="underline md:hover:text-blue-300 text-pretty "
        >
          Sign in!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
