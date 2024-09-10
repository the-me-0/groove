/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['https://groove.tars.digital'],
        }
    },
    reactStrictMode: false,
    output: "standalone",
    images: {
        loader: 'custom',
        loaderFile: 'lib/image-loader.ts',
    }
}

module.exports = nextConfig
