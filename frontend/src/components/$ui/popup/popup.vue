<template>
	<Teleport to="body">
		<div
			v-if="isShow"
			:class="['popup', `popup--${placement}`]"
		>
			<div
				class="popup__overlay"
				@click="onHide"
			/>

			<div
				class="popup__modal"
				role="dialog"
				aria-label="Dialog window"
				aria-modal="true"
				tabindex="0"
			>
				<div class="popup__header">
					<v-button
						class="popup__back"
						title="Назад"
						aria-label="Back"
						color="white"
						label="Назад"
						:icon="{ name: 'icon-arrow-simple' }"
						@click="onHide"
					/>

					<v-button
						class="popup__close"
						title="Закрыть окно"
						aria-label="Close popup"
						color="white"
						type="icon"
						:icon="{ name: 'icon-close' }"
						@click="onHide"
					/>
				</div>

				<div
					v-if="title || $slots.header"
					class="popup__header"
				>
					<h2
						v-if="title"
						class="popup__title"
					>
						{{ title }}
					</h2>
					<slot
						v-else-if="$slots.header"
						name="header"
					/>
				</div>

				<div
					v-if="$slots.default || $slots.main"
					class="popup__main"
				>
					<slot
						v-if="$slots.main"
						name="main"
					/>
					<slot v-else />
				</div>

				<div
					v-if="$slots.footer"
					class="popup__footer"
				>
					<slot name="footer" />
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script>
	import { defineComponent, computed } from 'vue'

	export default defineComponent({
		name: 'VPopup',

		props: {
			title: {
				type: String,
				default: '',
			},

			placement: {
				type: String,
				default: 'center',
			},

			visible: {
				type: Boolean,
				default: false,
			},
		},

		emits: ['show', 'hide'],

		setup(props, context) {
			const isShow = computed({
				get: () => props.visible,
				set: (value) =>
					value
						? context.emit('show', value)
						: context.emit('hide', value),
			})

			const onShow = () => (isShow.value = true)
			const onHide = () => (isShow.value = false)

			return { isShow, onHide, onShow }
		},
	})
</script>

<style src="./popup.scss" lang="scss" />
