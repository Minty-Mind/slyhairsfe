const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function getProductImageUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

export const HAIR_IMAGES = {
  // Hero & banners — each unique
  hero: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
  heroBundles: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
  heroWigs: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?q=80&w=800&auto=format&fit=crop",

  // Category cards — each unique image
  bundles: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=600&auto=format&fit=crop",
  wigs: "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?q=80&w=600&auto=format&fit=crop",
  frontals: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop",
  closures: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
  extensions: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=600&auto=format&fit=crop",

  // Auth pages — unique per page
  authSignIn: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=1600&auto=format&fit=crop",
  authSignUp: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=1600&auto=format&fit=crop",

  // About page
  about: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1200&auto=format&fit=crop",
} as const;

