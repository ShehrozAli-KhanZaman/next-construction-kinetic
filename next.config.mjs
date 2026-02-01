const nextConfig = {
  output: "standalone", // Enables standalone build
  distDir: ".next", // Default build directory
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "springsapartmenthomes.pk",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
