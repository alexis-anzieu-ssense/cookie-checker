export const runtime = "edge";
export const preferredRegion = "eu-west-3";
export const dynamic = "force-dynamic"; // no caching

export async function GET() {
  const response = await fetch("https://www.ssense.com");
  const cookies = response.headers.get("set-cookie");

  const datePattern = /\d{1,2} \w{3} \d{4}/;

  const parsedCookies = cookies
    ?.split(",")
    .map((cookie) => cookie.trim())
    .filter((cookie) => !datePattern.test(cookie));

  const jsonResponse = {
    cookies: parsedCookies,
  };

  return new Response(JSON.stringify(jsonResponse), {
    headers: { "Content-Type": "application/json" },
  });
}
