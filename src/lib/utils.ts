import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleProfilePicture(imageUrl:string){
  const path = imageUrl === "none" ? "/defaultavatar.png" : imageUrl;
  return path;
}