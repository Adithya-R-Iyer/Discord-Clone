import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import qs from "query-string";


export const PATCH = async (
    req: Request,
    {params} : {params : {memberId: string}}
) => {

    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json(); 
        const serverId = searchParams.get("serverId");
        const memberId = params.memberId;
    
        if(!profile) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if(!serverId) {
            return new NextResponse("Server ID Missing", { status: 400 });
        }

        if(!memberId) {
            return new NextResponse("Member ID Missing", { status: 400 });
        }
    
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role: role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                },
            }
        })
        
        return NextResponse.json(server);

    } catch(err) {
        console.log("[MEMBERS_PATCH_ID]" + err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}