import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  output: "standalone", // Enables standalone build
  distDir: ".next", // Default build directory
  serverExternalPackages: ["canvas"], // Don't bundle Node native canvas (used by pdfjs-dist)
  webpack: (config, { isServer }) => {
    // Replace Node "canvas" with a stub so pdfjs-dist doesn't pull in canvas.node (browser uses DOM canvas)
    const canvasStub = path.resolve(__dirname, "src/lib/canvas-stub.js")
    config.resolve.alias = { ...config.resolve.alias, canvas: canvasStub }
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, canvas: canvasStub }
    }
    return config
  },
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
