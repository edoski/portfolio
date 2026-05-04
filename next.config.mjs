const longLivedPublicAssets = [
  '/favicon.ico',
  '/icon.svg',
  '/apple-icon.png',
  '/icon-192.png',
  '/icon-512.png',
]

const resumeAsset = '/CV_Edoardo_Galli.pdf'

const immutablePublicAssetCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=31536000, immutable',
}

const resumeAssetCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=86400, stale-while-revalidate=604800',
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    '192.168.1.5',
    '192.168.1.7',
  ],
  async headers() {
    return [
      ...longLivedPublicAssets.map((source) => ({
        source,
        headers: [immutablePublicAssetCacheHeader],
      })),
      {
        source: resumeAsset,
        headers: [resumeAssetCacheHeader],
      },
    ]
  },
}

export default nextConfig
