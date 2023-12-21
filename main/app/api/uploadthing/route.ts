import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});  
//Webhooks are typically configured to make HTTP requests to specific URLs (endpoints) when certain events occur. In this case, the webhook is configured to make a request to the "/api/uploadthing" endpoint when an upload is complete... thus triggering the "onUploadComplete method".