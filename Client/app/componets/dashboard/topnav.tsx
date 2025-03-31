'use client';

import { useContext } from "react";
import Link from "next/link";

export default function TopNav({ name, email, profilePic }: { name: string, email: string, profilePic: string }) {
    return (
        <nav className="bg-white border-gray-200 dark:white fixed w-full z-20 top-0 left-0 border-w border-gray-200 dark:border-gray-600">
            <div className="flex flex-wrap items-center mx-auto p-4 w-full">
         
                <div className="mr-auto">
                </div>
                <div className="flex items-center gap-2 mr-10">
                    <Link href={'dashboard/profile'} className="flex gap-2 items-center">
                        <span className="text-black text-md">Welcome, {name}!</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
