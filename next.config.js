/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // dev server only: let phones on the same Wi-Fi load the site's scripts
  allowedDevOrigins: ['192.168.1.149', '192.168.1.168', '192.168.1.46'],
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
