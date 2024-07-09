<template>
	<label
		class="form__label"
		:for="elId"
	>
		<input
			v-bind="$attrs"
			:id="elId"
			:class="['form__field', `form__field--${type}`]"
			:type="type"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</label>
</template>

<script>
	export default {
		name: 'VField',
		inheritAttrs: false,
		props: {
			type: {
				type: String,
				default: 'text',
			},

			modelValue: {
				type: [String, Number],
				default: '',
			},
		},

		emits: ['update:modelValue'],

		data() {
			return {
				elId: this.$attrs.id
					? this.$attrs.id
					: `label-${this.$.uid}-field`,
			}
		},
	}
</script>

<style src="./field.scss" lang="scss" />
