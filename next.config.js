/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
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
        ],
    },
}

module.exports = nextConfig
