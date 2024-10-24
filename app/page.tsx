"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cookiesData, setCookiesData] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCookies() {
      const response = await fetch("/api/california");
      const data = await response.json();
      setCookiesData(data.cookies);
    }

    fetchCookies();
  }, []);
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          Cookies Data From California
        </h1>
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Cookie</th>
            </tr>
          </thead>
          <tbody>
            {cookiesData.map((cookie, index) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="py-2 px-4">{cookie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
