import {auth} from '@clerk/nextjs'

import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = ()=> {
    const { userId } = auth();
    if(!userId) throw new Error("Uauthorized");
    return {userId: userId};
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    // serverImage File Route is to handle the dp of the server i.e. image
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(()=> handleAuth())
        .onUploadComplete(()=>{}),
    
    // messageFIle File Route is to handle the attachements sent through messages
    messageFile: f([ "image", "pdf", "video/mp4", "video", "audio", "audio/mp4" ])
        .middleware(()=> handleAuth())
        .onUploadComplete(()=> {})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;