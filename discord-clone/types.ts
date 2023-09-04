import { Server, Member, Profile } from "@prisma/client"

export type ServerWithMembersProfilesAndChannels = 
    Server & { members: ( Member & { profile : Profile })[]; }