'use client';

import Link from "next/link";
import Image from 'next/image';
import WalletBar from "./WalletBar";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import PouchWizeLogo from "/public/PouchWize Logo.png"


type HeaderMenuLink = {
    label: string;
    href: string;
};
  
export const menuLinks: HeaderMenuLink[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Order",
      href: "/order",
    },
    {
        label: "Marketplace",
        href: "/market-place",
    },
];

export const HeaderMenuLinks = () => {
    const pathname = usePathname();
    return (
      <>
        {menuLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                passHref
                className={`${
                  isActive
                    ? "!bg-purple-900 !text-white active:bg-purple-900 shadow-md"
                    : ""
                } py-1.5 px-3 text-md rounded-full gap-2 grid grid-flow-col text-gray-100 hover:bg-purple-700 hover:text-white`}
              >
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </>
    );
};


const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const burgerMenuRef = useRef<HTMLDivElement>(null);

    return (
        <nav>
            <div className="max-w-screen px-2 h-16 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mt-2 pt-2">
                        <Link href={'/'} className="flex items-center gap-2">
                          {/* <Image src={PouchWizeLogo} alt="PouchWize Logo" width={50} height={50} /> */}
                          <h1 className="text-2xl font-bold text-purple-700">PouchWize</h1>
                        </Link>
                        <ul
                            tabIndex={0}
                            className="flex items-center flex-shrink-0 rounded-md"
                            onClick={() => {
                                setIsDrawerOpen(false);
                            }}
                        >
                            <HeaderMenuLinks />
                        </ul>
                        <WalletBar />
                    </div>
                </div>
        </nav>
    )
};

export default Header;