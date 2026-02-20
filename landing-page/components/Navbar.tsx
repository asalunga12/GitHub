"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            YP
          </span>
          <span className="font-semibold text-gray-900 text-lg">YourProduct</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Log in
          </a>
          <a
            href="#"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get started free
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600">
          <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Pricing</a>
          <hr className="border-gray-100" />
          <a href="#" className="hover:text-gray-900">Log in</a>
          <a href="#" className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Get started free
          </a>
        </div>
      )}
    </nav>
  );
}
