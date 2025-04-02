/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    trailingSlash: true,
    compiler: {
        removeConsole: false,
    },
};

export default nextConfig;
