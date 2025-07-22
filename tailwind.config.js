/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pokemon: {
                    blue: '#3B82F6',
                    purple: '#8B5CF6',
                    green: '#10B981',
                    yellow: '#F59E0B',
                    red: '#EF4444',
                }
            },
            fontFamily: {
                sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
} 