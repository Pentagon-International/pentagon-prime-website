module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
        preflight: false, // Disable Tailwind preflight to prevent Mantine conflicts
    },
    theme: {
        extend: {
            backgroundImage: {
                'hero': "url('/images/hero.png')",
            },
        },
    },
    plugins: [],
};
