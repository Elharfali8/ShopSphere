"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navLinks } from "@/utils/navLinks";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <div className="bg-[#143447] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <nav className="flex items-center justify-center gap-2 py-2">
          {navLinks.map((link) => {
            const hasChildren = link.children && link.children.length > 0;

            if (hasChildren) {
              const isOpen = activeDropdown === link.label;

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label!)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isOpen
                        ? "text-[#FF0763] bg-white/5"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-2 z-50"
                      >
                        <div className="min-w-[200px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
                          <div className="p-1">
                            {link.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href!}
                                className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#FF0763]/10 hover:text-[#FF0763]"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href!}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}