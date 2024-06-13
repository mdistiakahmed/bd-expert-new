/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ], // Add 'picsum.photos' to the allowed domains
  },
};

export default nextConfig;
