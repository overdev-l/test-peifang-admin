/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['www.asynctodo.com']
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2pwlbghwqo3td.cloudfront.net',
                port: '',
                pathname: '/**',
            }
        ]

    },
}

module.exports = nextConfig
