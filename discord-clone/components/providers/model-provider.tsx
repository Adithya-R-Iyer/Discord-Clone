"use client"

import { CreateServerModal } from "@/components/models/create-server-model"
import { useEffect, useState } from "react";
import { InviteModel } from "@/components/models/invite-model";
import { EditServerModel } from "@/components/models/edit-server-model";
import { MembersModel } from "@/components/models/members-model";
import { CreateChannelModel } from "@/components/models/create-channel-model";
import { LeaveServerModel } from "@/components/models/leave-server-model";
import { DeleteServerModel } from "@/components/models/delete-server-model";
import { DeleteChannelModel } from "@/components/models/delete-channel-model";
import { EditChannelModel } from "@/components/models/edit-channel-model";
import { MessageFileModel } from "@/components/models/message-file-model";

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
           <EditServerModel/>
           <MembersModel/>
           <CreateChannelModel/>
           <LeaveServerModel/>
           <DeleteServerModel/>
           <DeleteChannelModel/>
           <EditChannelModel/>
           <MessageFileModel/>
        </>
     );
}
 
export default ModalProvider;