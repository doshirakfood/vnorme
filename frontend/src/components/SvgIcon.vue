<template>
	<svg
		aria-hidden="true"
		:fill="color"
	>
		<use :xlink:href="symbolId" />
	</svg>
</template>

<script>
	import { computed } from 'vue'

	export default {
		name: 'SvgIcon',
		props: {
			name: {
				type: String,
				required: true,
			},

			color: {
				type: String,
				default: 'unset',
			},
		},

		setup(props) {
			const symbolId = computed(() => `#${props.name}`)

			return {
				symbolId,
			}
		},
	}
</script>
