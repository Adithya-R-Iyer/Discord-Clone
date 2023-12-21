import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export const DELETE = async (
    res: Request,
    {params}: {params: {serverId: string}}
) => {

    try{
        const profile = await currentProfile();
        const serverId = params.serverId;

        if(!profile){
            return new NextResponse("Unauthorised",{ status: 401 });
        }

        if(!serverId) {
            return new NextResponse("Missing Server Id", { status: 400 });
        }

        await db.server.delete({
            where: {
                id: serverId,
                profileId: profile.id
            },
            
        })

        const server = await db.server.findFirst({
            where: {
              members: {
                some: {
                  profileId: profile.id 
                }
              }
            }
          });

        return NextResponse.json(server)

    } catch(err) {
        console.log("[LEAVE_SERVER_ERR]",err);
        return new NextResponse("Internal Server Error",{ status: 500 });
    }

}