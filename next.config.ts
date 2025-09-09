import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Bỏ qua lỗi TypeScript trong build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bỏ qua lỗi ESLint trong build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
