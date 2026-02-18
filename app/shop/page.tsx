"use client";

import { useEffect } from "react";

export default function ShopPage() {
  useEffect(() => {
    // Redirect to Shopify store
    window.location.href = "https://elceethealchemist.com";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting to Shop...</h1>
        <p className="text-gray-400">
          If you're not redirected, <a href="https://elceethealchemist.com" className="underline">click here</a>.
        </p>
      </div>
    </div>
  );
}
