/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    basePath: process.env.NODE_ENV === "production" ? "/groove" : undefined,
    assetPrefix: process.env.NODE_ENV === "production" ? "/groove" : undefined,
    images: {
        loader: 'custom',
        loaderFile: './lib/image-loader.ts',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '443',
                pathname: '/songs/images/**',
            },
            {
                protocol: 'https',
                hostname: 'services.tars.digital',
                port: '6783',
                pathname: '/groove/songs/images/**',
            },
            {
                protocol: 'https',
                hostname: 'aclan.ddns.net',
                port: '6783',
                pathname: '/groove/songs/images/**',
            },
        ],
    },
}

module.exports = nextConfig
