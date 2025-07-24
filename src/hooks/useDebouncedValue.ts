import { useEffect, useState } from "react";

function useDebouncedValue(value: string){

  const [debouncedValue, setDebouncedValue] = useState("");
  
  useEffect(()=>{
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 500);

    return ()=>{clearTimeout(timeout)}

  },[value])

  return debouncedValue;
}



export default useDebouncedValue;