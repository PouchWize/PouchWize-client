'use client';

import Link from "next/link";
import Image from 'next/image';
import WalletBar from "./WalletBar";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import PouchWizeLogo from "/public/Pouchwize Logo.png"


type HeaderMenuLink = {
    label: string;
    href: string;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  // {
  //   label: "Order",
  //   href: "/order",
  // },
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
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={PouchWizeLogo}
              alt="PouchWize Logo"
              width={50}
              height={50}
            />
            <h1 className="hidden sm:block text-2xl font-bold text-purple-700">PouchWize</h1>
          </Link>

          {/* Hamburger menu icon for small screens */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle Menu"
              className="text-gray-700 hover:text-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Links for larger screens */}
          <ul
            tabIndex={0}
            className="hidden sm:flex items-center flex-shrink-0 rounded-md"
            onClick={() => setIsDrawerOpen(false)}
          >
            <HeaderMenuLinks />
          </ul>

          {/* Wallet bar */}
          <WalletBar />
        </div>
      </div>

      {/* Drawer menu for mobile screens */}
      {isDrawerOpen && (
        <div className="sm:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-10">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-white text-3xl"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center">
            <HeaderMenuLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
