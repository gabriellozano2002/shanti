/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Formatos modernos servidos automáticamente por next/image.
    formats: ["image/avif", "image/webp"],
    // Cuando migremos imágenes a un CMS/CDN, agregar los dominios aquí.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
