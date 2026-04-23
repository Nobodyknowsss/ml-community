"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home / Feed", href: "/home" },
    { label: "Create", href: "/create" },
    { label: "Profile", href: "/profile" },
    { label: "Chat", href: "/chat" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-green-600/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-green-400 uppercase tracking-widest hover:text-green-300 transition-colors"
          >
            GAME
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold transition-all uppercase tracking-wide ${
                  isActive(item.href)
                    ? "text-black bg-green-500 border-b-2 border-green-400"
                    : "text-gray-300 hover:text-green-400 hover:bg-green-600/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="px-4 py-2 text-green-400 hover:text-green-300 text-sm font-bold uppercase tracking-wide transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black text-sm font-bold rounded-lg uppercase tracking-wide transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-green-400 hover:bg-green-600/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-green-600/30 bg-gray-900">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-semibold transition-all uppercase tracking-wide border-b border-green-600/20 ${
                    isActive(item.href)
                      ? "text-black bg-green-500 border-l-4 border-l-green-400"
                      : "text-gray-300 hover:text-green-400 hover:bg-green-600/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <div className="border-t border-green-600/20 p-4 space-y-2">
                <Link
                  href="/signin"
                  className="block px-4 py-2 text-center bg-gray-800 text-green-400 text-sm font-bold rounded-lg uppercase tracking-wide hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-center bg-green-600 text-black text-sm font-bold rounded-lg uppercase tracking-wide hover:bg-green-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
