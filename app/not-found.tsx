import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Image 
        src="/logos/ankh.png" 
        alt="Ankh" 
        width={80} 
        height={80}
        className="mb-8 opacity-50"
      />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6 text-gray-400">Page Not Found</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/"
          className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition"
        >
          Go Home
        </Link>
        <Link 
          href="/studio"
          className="border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition"
        >
          Book Studio
        </Link>
      </div>
    </div>
  );
}
