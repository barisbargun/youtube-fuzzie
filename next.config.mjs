/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"img.clerk.com"
      }
    ]
  },
  experimental:{
    optimizePackageImports:[
      "@/components/global",
      "@/components/icons",
      "@/components/pages",
      "@/components/pages/main",
      "@/components/shared",
      "@/components/ui",
      "@/lib/db"
    ]
  }
};

export default nextConfig;
