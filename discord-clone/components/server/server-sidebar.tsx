import { redirect } from "next/navigation";

import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";

import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db"
import ServerHeader from "@/components/server/server-header";

interface ServerSidebarProps {
    serverId: string;
}


const ServerSidebar = async ({ serverId } : ServerSidebarProps) => {
    
    // We fetch the details of the userProfile and the server in whicht he user is currently in ...because we r gonna have to use this serverSideBar component inside the MobileSideBar ...which is not gonna have access to the layout.tsx within the [serverId]...Thus we r making this component independed and only receiving the id of the server.

    const profile = await currentProfile();

    if(!profile) {
        return redirectToSignIn();
    }
    
    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                }
            },
            members:{
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });
    
    if(!server) {
        return redirect("/");
    }

    const textChannels = server?.channels.filter((channel)=>(channel.type === ChannelType.TEXT))
    const audioChannels = server?.channels.filter((channel)=>(channel.type === ChannelType.AUDIO))
    const videoChannels = server?.channels.filter((channel)=>(channel.type === ChannelType.VIDEO))
    
    const members = server?.members.filter((member)=>(member.profileId !== profile.id))

    const role = server?.members.find((member) => member.id === profile.id)?.role;
    
    return ( 
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role}/>
        </div>
     );
}
 
export default ServerSidebar;