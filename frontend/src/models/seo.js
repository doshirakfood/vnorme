import { useSeoMeta } from '@unhead/vue'

export default class Seo {
	static $meta = null
	static $siteUrl = import.meta.env.VITE_BASE_URL
	static $siteName = import.meta.env.VITE_SITE_NAME

	static metaTags(meta) {
		this.$meta = Object.assign(
			{
				title: 'Title page',
				description: 'Description page',
				ogDescription: 'Description page',
			},
			meta,
		)

		return useSeoMeta({
			title: `${this.$meta.title} | ${this.$siteName}`,
			description: this.$meta.description,
			ogDescription: this.$meta.ogDescription,
			ogLocale: 'en_RU',
			ogType: 'website',
			ogUrl: this.$siteUrl,
			ogSiteName: this.$siteName,
			ogTitle: `${this.$meta.title} | ${this.$siteName}`,
			ogImage: this.$meta.ogImage || 'https://example.com/image.png',
			twitterCard: 'summary_large_image',
		})
	}
}
