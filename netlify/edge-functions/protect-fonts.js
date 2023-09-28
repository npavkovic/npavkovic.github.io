export default async (request, context) => {
 const restrictedDirectory = "/assets";
 const allowedHosts = [
  "netlify.app",
  "pavkovic.com",
  "npavkovic.github.io",
  "localhost",
 ];
 // Get the path of the requested resource
 const host = request.headers.host;

 // Check if the host is on the list of allowed hosts
 if (!allowedHosts.includes(host)) {
  // Return a 403 Forbidden response
  return new Response("Forbidden", { status: 403 });
 }

 // Otherwise, process the request as usual
};

export const config = { path: "/assets" };
