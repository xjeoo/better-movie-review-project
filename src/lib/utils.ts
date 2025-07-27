import { months } from "@/constants/movies";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleProfilePicture(imageUrl:string){
  const path = imageUrl === "none" ? "/defaultavatar.png" : imageUrl;
  return path;
}


export function formatDate(date: string) {
  const newDate = date.split("-");
  const year = newDate[0];
  const monthKey = newDate[1] as keyof typeof months;
  const month = months[monthKey];
  const day = parseInt(newDate[2]);

  return `${day} ${month} ${year}`;
}