<template>
	<label
		class="filter-choose"
		:for="elId"
	>
		<input
			:id="elId"
			v-model="localValue"
			type="checkbox"
			class="filter-choose__field"
			:name="name"
			:value="value"
		/>

		<span class="filter-choose__wrapper">
			<span class="filter-choose__replace"></span>
			<span class="filter-choose__name">{{ label }}</span>
		</span>
	</label>
</template>

<script>
	export default {
		name: 'FilterChoose',
		props: {
			modelValue: null,

			value: {
				type: [String, Number],
				default: '',
			},

			name: {
				type: String,
				default: '',
			},

			label: {
				type: String,
				default: '',
			},
		},

		emits: ['update:modelValue'],

		data() {
			return {
				elId: `filter-choose-${this.$.uid}`,
			}
		},

		computed: {
			localValue: {
				get() {
					return this.modelValue
				},
				set(value) {
					this.$emit('update:modelValue', value)
				},
			},
		},
	}
</script>
