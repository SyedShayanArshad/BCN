"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";
import { FaCircleUser } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  }
  const pathname = usePathname()
  if (pathname === "/login") return null;
  return (
    <nav className="w-full px-4 py-3 border-b shadow-sm dark:shadow-gray-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-lg md:text-xl font-bold">BUKHARI CABLE NETWORK</h1>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* <button
            aria-label="Refresh"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <FaSyncAlt className="h-5 w-5 md:h-6 md:w-6" />
          </button> */}

          <div className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1 rounded-full transition-colors">
            <FaCircleUser className="h-6 w-6 md:h-7 md:w-7" />
            <span className="block text-sm font-medium">
              {status === "loading"
                ? "Loading..."
                : session?.user?.name || "Guest"}
            </span>
          </div>

          <button
            aria-label="Logout"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1 rounded-md transition-colors border dark:border-gray-700"
          >
            <FiLogOut className="h-5 w-5" />
            <span className="hidden sm:block text-sm font-medium">Logout</span>
          </button>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
