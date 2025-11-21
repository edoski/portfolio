/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    'http://192.168.1.5:3000',
  ],
}

export default nextConfig
