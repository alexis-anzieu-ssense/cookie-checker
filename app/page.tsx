"use client";

import React, { useEffect, useState } from "react";

const fetchCookies = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.cookies;
};

const CookiesTable = ({
  californiaCookies,
  washingtonCookies,
  europeCookies,
}: {
  californiaCookies: any[];
  washingtonCookies: any[];
  europeCookies: any[];
}) => (
  <div className="w-full p-4">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Cookies Table</h2>
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">California</th>
          <th className="border px-4 py-2">Washington</th>
          <th className="border px-4 py-2">Europe</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({
          length: Math.max(
            californiaCookies.length,
            washingtonCookies.length,
            europeCookies.length
          ),
        }).map((_, index) => (
          <tr key={index} className="border-b hover:bg-gray-100">
            <td className="border px-4 py-2 truncate">
              {californiaCookies[index]?.substring(0, 50) || ""}
            </td>
            <td className="border px-4 py-2 truncate">
              {washingtonCookies[index]?.substring(0, 50) || ""}
            </td>
            <td className="border px-4 py-2 truncate">
              {europeCookies[index]?.substring(0, 50) || ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Page = () => {
  const [californiaCookies, setCaliforniaCookies] = useState([]);
  const [washingtonCookies, setWashingtonCookies] = useState([]);
  const [europeCookies, setEuropeCookies] = useState([]);

  useEffect(() => {
    fetchCookies("/api/california").then(setCaliforniaCookies);
    fetchCookies("/api/washington").then(setWashingtonCookies);
    fetchCookies("/api/europe").then(setEuropeCookies);
  }, []);

  return (
    <div className="flex flex-wrap justify-center bg-gray-50 p-6">
      <CookiesTable
        californiaCookies={californiaCookies}
        washingtonCookies={washingtonCookies}
        europeCookies={europeCookies}
      />
    </div>
  );
};

export default Page;
