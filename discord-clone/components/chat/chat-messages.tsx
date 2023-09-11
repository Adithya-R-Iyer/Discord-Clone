"use client"

import { Member } from "@prisma/client";
import Chatwelcome from "@/components/chat/chat-welcome";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string,string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,    
} : ChatMessagesProps ) => {
    return ( 
        <div className="h-full flex flex-col py-4 overflow-y-auto">
            <div className="mt-auto">
                <Chatwelcome type={type} name={name}/>
            </div>
        </div>
     );
}
 
export default ChatMessages;