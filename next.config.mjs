/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    '192.168.1.5',
    '192.168.1.7',
  ],
}

export default nextConfig
