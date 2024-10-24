export const dynamic = "force-dynamic"; // no caching

export async function GET() {
  const response = await fetch(`https://www.ssense.com/en-ca/men`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      Referer: "https://www.ssense.com/",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
    },
  });
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
