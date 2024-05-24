/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cs.venaaa.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'www.countryflags.com',
                port: '',
            }
        ],
    },
    env: {
        BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
        BACKEND_API_BASE_URL_DEV: process.env.BACKEND_API_BASE_URL_DEV,
        ENVIROMENT: process.env.ENVIROMENT,
    },
};

module.exports = nextConfig;
