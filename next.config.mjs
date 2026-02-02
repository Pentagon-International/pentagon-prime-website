/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Commented out to enable proper client-side routing
    reactStrictMode: true,
    trailingSlash: true,
    compiler: {
        removeConsole: false,
    },
    // Reduce dev compile: only load Mantine modules actually used (tree-shaking at build)
    experimental: {
        optimizePackageImports: [
            '@mantine/core',
            '@mantine/hooks',
            '@mantine/carousel',
            '@mantine/dates',
            '@mantine/form',
            '@mantine/notifications',
            '@tabler/icons-react',
        ],
    },
};

export default nextConfig;
