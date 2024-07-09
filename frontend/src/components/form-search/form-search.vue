<template>
	<form
		class="form-search"
		@submit.prevent="$emit('submit', searchValue)"
	>
		<div class="form-search__row">
			<div class="form-search__col form-search__col--left">
				<v-field
					v-model="searchValue"
					type="search"
					placeholder="Найти специалиста"
					@search="onSearch"
				/>
			</div>

			<div class="form-search__col form-search__col--right">
				<v-button
					attr-type="submit"
					label="Найти"
				/>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		name: 'FormSearch',
		emits: ['submit', 'clear'],
		data() {
			return {
				searchValue: '',
			}
		},

		methods: {
			onSearch() {
				if (this.searchValue !== '') {
					this.$emit('submit', this.searchValue)
				} else {
					this.$emit('clear', this.searchValue)
				}
			},
		},
	}
</script>

<style src="./form-search.scss" lang="scss" />
