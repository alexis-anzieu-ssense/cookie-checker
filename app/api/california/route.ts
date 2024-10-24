import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic"; // no caching

export async function GET() {
  const uuid = uuidv4();
  const response = await fetch(`https://www.ssense.com/en-ca/men?${uuid}`);
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
