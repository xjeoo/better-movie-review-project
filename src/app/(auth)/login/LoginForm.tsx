"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/actions/auth";
import { AuthActionState } from "@/types/auth";
const LoginForm = () => {
  const [state, loginAction, isPending] = useActionState<
    AuthActionState,
    FormData
  >(login, {
    ok: false,
    message: "",
  });

  return (
    <form
      className="flex flex-col text-[1.2em] lg:text-[1.1em] items-center  "
      action={loginAction}
    >
      <div className="flex flex-col gap-4 w-full">
        <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <div className="flex gap-2 items-center pl-3 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75">
            <img
              src="/icons/user.ico"
              alt=""
              className="size-5"
              aria-hidden="true"
            />
            <input
              id="email"
              name="email"
              type="text"
              required
              placeholder="your@email.com "
              className=" py-1 rounded-r-2xl outline-0 focus:bg-black w-full pl-4"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="flex gap-2 items-center pl-3 rounded-2xl outline-1 outline-gray-300 bg-transparent backdrop-brightness-75">
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
              placeholder="********"
              className=" py-1  rounded-r-2xl outline-0 focus:bg-black w-full pl-4"
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
        Don&#39;t have an account?<span> </span>
        <Link href={"/register"} className="underline md:hover:text-blue-300 ">
          Register now!
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
