import type { Config } from 'tailwindcss';
const config: Config = {
 darkMode: 'class',
 content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
 theme: {
 extend: {
 colors: {
 background: 'var(--background)',
 surface: 'var(--surface)',
 'surface-alt': 'var(--surface-alt)',
 border: 'var(--border)',
 'text-primary': 'var(--text-primary)',
 'text-secondary': 'var(--text-secondary)',
 'text-muted': 'var(--text-muted)',
 primary: 'var(--primary)',
 'primary-hover': 'var(--primary-hover)',
 'primary-light': 'var(--primary-light)',
 accent: 'var(--accent)',
 'accent-hover': 'var(--accent-hover)',
 success: 'var(--success)',
 error: 'var(--error)',
 },
 boxShadow: { sm: 'var(--shadow)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)' },
 borderRadius: { sm: 'var(--radius-sm)', DEFAULT: 'var(--radius-md)', md: 'var(--radius-md)', lg: 'var(--radius-lg)' },
 },
 },
 plugins: [],
};
export default config;
