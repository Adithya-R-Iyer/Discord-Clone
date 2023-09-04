"use client"

import { CreateServerModal } from "@/components/models/create-server-model"
import { useEffect, useState } from "react";
import { InviteModel } from "@/components/models/invite-model";

const ModalProvider = () => {

    //to prevent Hydration errors... 
    //NOTE :- since initial-model was fixed and state wouldnt be changed on clicks or user action... there was no need to use `zustand`.. but since the state of all the other model is gonna change based on user interaction it is advisable to use State Management ...in our case `zustand`
    
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=> {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null;
    }

    return ( 
        <>
           <CreateServerModal/>
           <InviteModel/>
        </>
     );
}
 
export default ModalProvider;