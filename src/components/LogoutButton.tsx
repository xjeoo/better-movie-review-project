import { logout } from "@/lib/sessionUtils";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await logout();
        redirect("/");
      }}
    >
      <button
        className="px-3 py-1.5 bg-red-700 text-white rounded-xl cursor-pointer hover:bg-red-800 transition-colors"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
