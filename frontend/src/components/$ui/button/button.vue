<template>
	<component
		:is="link ? 'router-link' : 'button'"
		:to="link"
		:type="!link ? attrType : null"
		:class="classBtnMain"
		@click="$emit('click', $event.target)"
	>
		<span class="btn__wrapper">
			<svg-icon
				v-if="icon['name']"
				:name="icon['name']"
				:color="icon['color']"
				:class="classIconMain"
			/>

			<span
				v-if="label || $slots.default"
				class="btn__label"
			>
				{{ label }}
				<slot />
			</span>
		</span>
	</component>
</template>

<script>
	import { defineComponent, computed } from 'vue'

	export default defineComponent({
		name: 'VButton',

		props: {
			/**
			 * Вид кнопки
			 */
			type: {
				type: String,
				default: 'default',
			},

			/**
			 * Тип кнопки
			 */
			attrType: {
				type: String,
				default: 'button',
			},

			/**
			 * Показать границы кнопки
			 */
			bordered: {
				type: Boolean,
				default: false,
			},

			/**
			 * Размер кнопки
			 */
			size: {
				type: String,
				default: '',
			},

			/**
			 * Цвет кнопки
			 */
			color: {
				type: String,
				default: 'brand',
			},

			/**
			 * Ссылка
			 */
			link: {
				type: String,
				default: null,
			},

			/**
			 * Основной текст кнопки
			 */
			label: {
				type: String,
				default: '',
			},

			/**
			 * svg-иконка для кнопки
			 * @param {string} name - название иконки;
			 * @param {string} position - расположение иконки в отношение текста;
			 * @param {string} color - цвет иконки.
			 */
			icon: {
				type: Object,
				default: () => {
					return {
						name: null,
						position: null,
						color: 'unset',
					}
				},
			},
		},

		emits: ['click'],

		setup(props) {
			const classBtnMain = computed(() => {
				const typeClass = `btn--${props.type}`
				const borderedClass = props.bordered ? 'btn--border' : ''
				const colorClass = props.color ? `btn--${props.color}` : ''
				const sizeClass = props.size ? `btn--size-${props.size}` : ''

				return ['btn', typeClass, borderedClass, colorClass, sizeClass]
			})

			const classIconMain = computed(() => {
				const icon = props.icon
				const positionClass = icon.position
					? `btn__icon--${icon.position}`
					: ''

				return ['btn__icon', 'icon', positionClass]
			})

			return { classBtnMain, classIconMain }
		},
	})
</script>

<style src="./button.scss" lang="scss" />
