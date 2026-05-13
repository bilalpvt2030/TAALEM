/** @type {import('next').NextConfig} */
const nextConfig = {
 typescript: {
 ignoreBuildErrors: true,
 },
 eslint: {
 ignoreDuringBuilds: true,
 },
 images: {
 domains: ['vvgmlbbgzkbjnlgixhiv.supabase.co'],
 },
};

export default nextConfig;
