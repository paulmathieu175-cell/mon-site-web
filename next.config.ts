import type { NextConfig } from "next";

// Export statique : le site se publie sur n'importe quel hébergement gratuit
// (GitHub Pages, Netlify, Vercel…). NEXT_PUBLIC_BASE_PATH vaut "/mon-site-web"
// sur GitHub Pages, et reste vide ailleurs.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
