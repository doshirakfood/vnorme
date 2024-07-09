import fs from 'fs'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import favicons from '@peterek/vite-plugin-favicons'
import stylelint from 'vite-plugin-stylelint'

const PACKAGE_JSON = JSON.parse(fs.readFileSync('./package.json'))

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const isDev = mode === 'development'
	const favicon = {
		source: './public/favicon.svg',
		configuration: {
			appName: env.VITE_SITE_NAME,
			appShortName: env.VITE_SITE_NAME,
			appDescription: env.VITE_SITE_DESCRIPTION,
			developerName: PACKAGE_JSON.author.name,
			developerURL: PACKAGE_JSON.author.url,
			theme_color: env.VITE_SITE_COLOR_BRAND,
			background: '#fff',
		},
	}

	return {
		plugins: [
			vue(),
			// eslint({
			// 	fix: true,
			// 	failOnError: false,
			// 	exclude: ['**/virtual:/**', '**/node_modules/**']
			// }),
			stylelint(),
			createSvgIconsPlugin({
				symbolId: '[name]',
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
			}),
			favicons(favicon.source, favicon.configuration),
		],

		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
				'@css': fileURLToPath(new URL('./src/assets/css', import.meta.url)),
				'@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
				'@svg': fileURLToPath(new URL('./src/assets/icons/svg', import.meta.url)),
				'@base64': fileURLToPath(new URL('./src/assets/icons/base64', import.meta.url),),
				'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
				'@ui': fileURLToPath(new URL('./src/components/$ui', import.meta.url)),
				'@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
				'@api': fileURLToPath(new URL('./src/api', import.meta.url)),
				'@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
				'@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
				'@models': fileURLToPath(new URL('./src/models', import.meta.url)),
				'@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
			},
		},

		css: {
			devSourcemap: true,
			preprocessorOptions: {
				scss: {
					additionalData: `
					@import "@css/import/mixins.scss";
					@import "@css/import/variables.scss";
				`,
				},
			},
		},

		build: {
			sourcemap: isDev ? 'inline' : false,
		},
	}
})
