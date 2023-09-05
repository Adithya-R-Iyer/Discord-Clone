import { useEffect, useState } from "react"


export const useOrigin = () => {
    
    const [ mounted, setMounted ] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    //This check is commonly used in JavaScript and web development to ensure that code that relies on the browser's window object is only executed when running in a web browser environment and not in non-browser environments 

    if(!mounted) {
        return "";
    }

    return origin;
}