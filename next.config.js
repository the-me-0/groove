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
    },
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        // We apply a fix for fluent-ffmpeg, see https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/573
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.FLUENTFFMPEG_COV': false
            })
        );

        // Important: return the modified config
        return config
    },
}

module.exports = nextConfig
