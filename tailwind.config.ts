import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#030712',
                    navy: '#0f172a',
                    cyan: '#06b6d4',
                    'cyan-light': '#22d3ee',
                    purple: '#7c3aed',
                    'purple-light': '#a78bfa',
                    pink: '#f43f5e',
                    'pink-light': '#fb7185',
                    glass: 'rgba(255, 255, 255, 0.05)',
                }
            },
            fontFamily: {
                display: ['var(--font-space-grotesk)', 'sans-serif'],
                body: ['var(--font-inter)', 'sans-serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
