'use client';

// import Image from "next/image";
import Link from "next/link";
// import PouchWizeLogo from "/public/PouchWize Logo.png"

const Navbar = () => {
    return (
        <nav>
            <div className="max-w-screen px-2 h-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mt-2 pt-2">
                    <h1 className="text-2xl font-bold text-purple-700">PouchWize</h1>
                    {/* <Image src={PouchWizeLogo} alt="PouchWize Logo" width={70} height={70} /> */}
                    <div className="flex items-center gap-5">
                        <Link href={'/'}>
                            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 bg-purple-700 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                Docs
                            </button>
                        </Link>
                        <Link href={'/dashboard'}>
                            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 bg-purple-700 hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;