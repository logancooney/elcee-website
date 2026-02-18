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
      setIsAuthenticated(true);
      setError("");
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

  // Authenticated - show EPK
  return (
    <div className="min-h-screen bg-black">
      {/* Header with logout */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-white.png" 
              alt="Elcee the Alchemist" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem(PASSWORD_KEY);
              setIsAuthenticated(false);
            }}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* EPK Embed */}
      <div className="w-full h-[calc(100vh-73px)]">
        <iframe
          src="https://readymag.website/u816280127/elcee/"
          className="w-full h-full border-0"
          title="Elcee the Alchemist - Electronic Press Kit"
          allowFullScreen
        />
      </div>
    </div>
  );
}
