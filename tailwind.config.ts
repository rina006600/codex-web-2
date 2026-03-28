import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8f8fb',
        card: '#ffffff',
        ink: '#12121b',
        muted: '#6d6d7c',
        accent: '#6a5cff',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
