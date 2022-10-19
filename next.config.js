/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		outputStandalone: true,
	},
	images: {
		domains: ['file.anazirov.com'],
	},
};

module.exports = nextConfig;
