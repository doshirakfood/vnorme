<template>
	<button
		:class="['tooltip-trigger', 'btn', `btn--${color}`]"
		:data-tooltip-text="text"
	>
		<span class="btn__wrapper">
			<svg class="btn__icon">
				<use xlink:href="#icon-info"></use>
			</svg>
		</span>
	</button>
</template>

<script>
	export default {
		name: 'VTooltipTrigger',
		props: {
			text: {
				type: String,
				default: 'Tooltip trigger',
			},

			color: {
				type: String,
				default: 'grey-darker',
			},
		},
	}
</script>

<style src="./tooltip-trigger.scss" lang="scss" />
