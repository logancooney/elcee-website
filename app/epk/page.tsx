"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CORRECT_PASSWORD = "industryaccess";
const PASSWORD_KEY = "epk_access";

export default function EPKPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Check if already authenticated on mount
  useEffect(() => {
    const stored = localStorage.getItem(PASSWORD_KEY);
    if (stored === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      localStorage.setItem(PASSWORD_KEY, CORRECT_PASSWORD);
      // Redirect to Readymag EPK
      window.location.href = "https://readymag.website/u816280127/elcee/";
    } else {
      setError("Incorrect password. Please contact for access.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <Image 
              src="/logos/eta-logo-white.png" 
              alt="Elcee the Alchemist" 
              width={200} 
              height={67}
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold mb-2">Electronic Press Kit</h1>
            <p className="text-gray-400">Industry professionals only</p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Access Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-white text-white"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black py-3 font-semibold hover:bg-gray-200 transition"
            >
              Access EPK
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Don't have access?
            </p>
            <a 
              href="mailto:elcee.mgmt@gmail.com?subject=EPK Access Request"
              className="text-sm underline hover:text-gray-300"
            >
              Request access
            </a>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-400">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - redirect happened in handleSubmit
  // This code shouldn't normally render, but just in case:
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xl mb-4">Redirecting to EPK...</p>
        <p className="text-sm text-gray-400">
          If not redirected, <a href="https://readymag.website/u816280127/elcee/" className="underline">click here</a>
        </p>
      </div>
    </div>
  );
}
