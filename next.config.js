/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['https://groove.tars.digital'],
        }
    },
    reactStrictMode: false,
    output: "standalone",
}

module.exports = nextConfig
