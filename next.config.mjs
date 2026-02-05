/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vzgphlkojwnuthzzrwfw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
