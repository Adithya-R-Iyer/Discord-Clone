import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface RequestProps {
    name: string;
    type: ChannelType;
}

export async function POST(
    req: Request,
    res: Response
) {

    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        const {name, type} : RequestProps  =await req.json();
    
        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!serverId) {
            return new NextResponse("Server Id Missing", { status: 400 });
        }

        if(name === "general") {
            return new NextResponse("Name cannot be 'general'", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type
                    }
                }
            }
        })

        return NextResponse.json(server);

    } catch(err) {
        console.log("[CHANNEL_CREATION_ERR]",err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }


}