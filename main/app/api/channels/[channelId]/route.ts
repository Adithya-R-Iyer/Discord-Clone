import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function PATCH(
    req: Request,
    {params} : { params : { channelId: string }}
) {

    try {

        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        const channelId = params.channelId;
        const { name, type } = await req.json();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!serverId) {
            return new NextResponse("Server Id Missing", { status: 400 });
        }

        if(!channelId) {
            return new NextResponse("Channel Id Missing", { status: 400 });
        }

        if(name === "general") {
            return new NextResponse("Name cannot be 'general'", { status: 400 })
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
                },
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: channelId,
                            name: {
                                not: "general"
                            }
                        },
                        data: {
                            name,
                            type
                        }
                    },
                }
            }
        })

        return NextResponse.json(server);

    } catch(err) {
        console.log("[CHANNEL_UPDATE_ERR]",err);
        return new NextResponse("Internal Server Error", { status : 500 });
    }

}