"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import {
  faCartFlatbed,
  faRightToBracket,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const links = ["/", "/cart", "/login"];
  const icons = [faHouse, faCartFlatbed, faRightToBracket];
  const pathname = usePathname();

  return (
    <div className="fixed bottom-10 min-w-svw flex justify-center items-center">
      <div className="relative">
        <nav className="glass2 flex items-center justify-around bg-gradient-to-r gap-20 from-sky-500/65 to-rose-500/65 h-20 max-w-[700px] min-w-auto rounded-full px-4">
          {links.map((link, index) => (
            <Link href={link} key={link} className="relative">
              <div className="flex items-center justify-center w-12 h-10 z-10 relative">
                <FontAwesomeIcon icon={icons[index]} className="w-4 h-4" />
              </div>
              {pathname === link && (
                <motion.div
                  layoutId="active-pill"
                  className="glass"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
