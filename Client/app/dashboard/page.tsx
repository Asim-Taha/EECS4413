"use client";

import { poppins } from "../componets/fonts";
// import JotformChatbot from "@/app/componets/JotformChatbot";

export default function Page() {
  return (
    <main className="overflow-x-hidden min-h-screen p-6">
      {/* Image container with centered text */}
      <div className="relative w-full max-w-5xl mx-auto h-[400px]">
        <img
          src="/DashboardBackground.jpg"
          alt="Electric Car"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`${poppins.className} text-4xl md:text-6xl font-bold text-white drop-shadow-lg`}
          >
            Electric Car Shop
          </h1>
        </div>
      </div>

      <div className="mt-10 p-6 bg-white/80 rounded-md shadow-lg flex flex-wrap gap-4 justify-start">
      {/* <JotformChatbot /> */}
      </div>
    </main>
  );
}
