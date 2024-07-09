<template>
	<div class="filter">
		<form
			class="filter__form filter__form--desktop"
			@change="onChange"
			@reset="onReset"
		>
			<div class="filter__row">
				<div
					v-for="(problem, index) in problemsList"
					:key="`problem-${index}`"
					class="filter__col"
				>
					<filter-choose
						v-model="filterResult.problems"
						:name="`problems`"
						:value="problem.key"
						:label="problem.value"
					/>
				</div>

				<v-button
					class="filter__col filter__reset"
					attr-type="reset"
					color="green-lighter"
					label="Сбросить фильтры"
				/>
			</div>
		</form>

		<div class="filter__actions">
			<v-button
				class="filter__action"
				color="white"
				:icon="{
					name: 'icon-settings',
					position: 'left',
					color: 'unset',
				}"
				@click="isShow = true"
			>
				Все фильтры
				<span
					v-if="filterIndicator > 0"
					class="indicator"
				>
					{{ filterIndicator }}
				</span>
			</v-button>

			<v-button
				class="filter__action"
				color="white"
				label="Только избранные"
				:icon="{
					name: 'icon-favorites',
					position: 'right',
					color: 'unset',
				}"
			/>

			<v-button
				class="filter__action filter__action--reset"
				color="green-lighter"
				attr-type="reset"
				label="Сбросить фильтры"
				@click="onReset"
			/>
		</div>

		<v-popup
			:visible="isShow"
			@hide="isShow = false"
		>
			<form
				class="filter__form filter__form--mobile"
				@submit.prevent="onSubmit"
				@reset="onReset"
			>
				<div class="filter__box">
					<p class="filter__title">Что вас беспокоит</p>
					<div class="filter__row">
						<div
							v-for="(problem, index) in problemsList"
							:key="`anxiety-${index}`"
							class="filter__col"
						>
							<filter-choose
								v-model="filterResult.problems"
								:name="`problems`"
								:value="problem.key"
								:label="problem.value"
							/>
						</div>
					</div>
				</div>

				<div class="filter__box">
					<p class="filter__title">Методы психолога</p>
					<div class="filter__row">
						<div
							v-for="(method, index) in methodsList"
							:key="`method-${index}`"
							class="filter__col"
						>
							<filter-choose
								v-model="filterResult.methods"
								:name="`methods`"
								:value="method.key"
								:label="method.value"
							/>
						</div>
					</div>
				</div>

				<div class="filter__box">
					<p class="filter__title">Возрастная группа</p>
					<div class="filter__row">
						<div
							v-for="(age, index) in ageGroupList"
							:key="`age-${index}`"
							class="filter__col"
						>
							<filter-choose
								v-model="filterResult.age_group"
								:name="`age_group`"
								:value="age.key"
								:label="age.value"
							/>
						</div>
					</div>
				</div>

				<div class="filter__box filter__box--actions">
					<div class="filter__triggers">
						<span class="filter__result">
							Нашлось психологов: {{ quantity }}
						</span>

						<v-button
							class="filter__trigger filter__trigger--submit"
							color="brand"
							label="Применить"
							attr-type="submit"
						/>

						<v-button
							class="filter__trigger filter__trigger--reset"
							color="grey-lighter"
							label="Сбросить фильтры"
							attr-type="reset"
						/>
					</div>
				</div>
			</form>
		</v-popup>
	</div>
</template>

<script>
	import FilterChoose from '@components/filter-doctor/filter-choose.vue'

	export default {
		name: 'FilterDoctor',

		components: {
			FilterChoose,
		},

		props: {
			quantity: {
				type: [String, Number],
				default: 0,
			},
		},

		emits: ['submit', 'change', 'reset'],

		data() {
			return {
				isShow: false,
				filterResult: {
					problems: [],
					methods: [],
					age_group: [],
				},
				filterIndicator: 0,
			}
		},

		computed: {
			problemsList() {
				return this.$store.state.main.problems
			},

			methodsList() {
				return this.$store.state.main.treatmentMethods
			},

			ageGroupList() {
				return this.$store.state.main.ageGroup
			},
		},

		methods: {
			onSubmit(event) {
				const form = event.target
				const elemsArray = Array.from(form.elements)
				const elemsCheckedArray = elemsArray.filter(
					(elem) => elem.type === 'checkbox' && elem.checked,
				)

				this.filterIndicator = elemsCheckedArray.length

				if (this.filterIndicator > 0) {
					this.$emit('submit', this.filterResult)
				}
			},

			onChange() {
				this.$emit('change', this.filterResult.problems)
			},

			onReset(event) {
				this.filterIndicator = 0
				this.filterResult = { problems: [], methods: [], age_group: [] }

				event.target.reset()

				this.$emit('reset', event)
			},
		},
	}
</script>

<style src="./filter-doctor.scss" lang="scss" />
