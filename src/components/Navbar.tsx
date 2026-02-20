"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">Y</span>
          </div>
          <span className="text-slate-900 font-semibold text-lg">YourProduct</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <li><a href="#features" className="hover:text-indigo-600 transition-colors">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a></li>
          <li><a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
          <li><a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a></li>
        </ul>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Log in
          </a>
          <a
            href="#"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Get started free
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-slate-600">
          <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">How it Works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Pricing</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Testimonials</a>
          <a href="#" className="text-indigo-600 font-semibold">Get started free →</a>
        </div>
      )}
    </header>
  );
}
