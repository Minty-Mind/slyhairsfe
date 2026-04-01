import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-gold-500">404</h1>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Page Not Found</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-gold-500 text-black font-bold rounded-xl px-6 py-3 text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors text-center"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-block border border-white/10 text-white font-bold rounded-xl px-6 py-3 text-xs uppercase tracking-wider hover:bg-white/5 transition-colors text-center"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
