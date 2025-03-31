import Image from "next/image";
import { poppins } from "./componets/fonts";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52">
      </div>

      <p className={`${poppins.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
        <strong>Log in to your account</strong>
      </p>

      <div>
        <Link
          href="/login"
          className="flex items-center justify-center mt-5 gap-5 rounded-lg bg-primary px-10 py-3 text-sm font-medium text-white"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>

    </main>
  );
}   
