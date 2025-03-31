'use client';

import { ChartPieIcon, Cog8ToothIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid"
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

const links = [
    {name:"Home", href:"/dashboard",icon:ChartPieIcon},
    {name:"Catalogue", href:"/dashboard/Catalogue",icon:CurrencyDollarIcon},
    {name:"Cart", href:"/dashboard/cart",icon:Cog8ToothIcon},
];

export default function NavLinks(){
    const pathname = usePathname();

    return(
        <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return(
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx("flex py-2.5 px-4 hover:bg-primary rounded-xl space-x-3",
                        {
                            "bg-primary text-white": pathname === link.href,
                        },                        
                    )}
                >
                    <LinkIcon className="w-8"/>
                    <p className="text-[18px]">{link.name}</p>
                </Link>
            )
        })}
        </>
    )
}