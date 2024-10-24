export const runtime = "edge";
export const preferredRegion = "cdg1";
export const dynamic = "force-dynamic"; // no caching

export async function GET() {
  const response = await fetch("https://www.ssense.com/en-ca/men");
  const cookies = response.headers.get("set-cookie");

  const parsedCookies = cookies?.split(",").map((cookie) => cookie.trim());

  const jsonResponse = {
    cookies: parsedCookies,
  };

  return new Response(JSON.stringify(jsonResponse), {
    headers: { "Content-Type": "application/json" },
  });
}
