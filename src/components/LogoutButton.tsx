"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout");
    const data = await res.json();
    if (data.message) return router.refresh();
    else return console.log(data.error);
  };
  return (
    <button
      className={cn("bg-red-700 w-fit cursor-pointer", className)}
      onClick={handleLogout}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
