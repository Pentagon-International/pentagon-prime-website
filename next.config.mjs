/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Commented out to enable proper client-side routing
    reactStrictMode: true,
    trailingSlash: true,
    compiler: {
        removeConsole: false,
    },
};

export default nextConfig;
