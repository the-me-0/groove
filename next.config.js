/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    images: {
        loader: 'custom',
        loaderFile: './lib/image-loader.ts',
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
                pathname: '/songs/images/**',
            },
        ],
    },
}

module.exports = nextConfig
