<template>
	<layout-default class="page-home">
		<section class="doctor section container">
			<div class="section-header">
				<div class="section-header__row">
					<div class="section-header__col">
						<h1 class="title">Выберите подходящего психолога</h1>
					</div>

					<div
						v-if="doctorGetList.length > 0"
						class="section-header__col"
					>
						<p class="subtitle subtitle--medium">
							{{ doctorGetList.length }}
							{{
								uDecl(doctorGetList.length, [
									'психолог',
									'психолога',
									'психологов',
								])
							}}
						</p>
					</div>
				</div>
			</div>

			<form-search
				@submit="onSearchSubmit"
				@clear="onSearchClear"
			/>

			<filter-doctor
				:quantity="doctorSearchNumber"
				@submit="onFilterSubmit"
				@change="onFilterChange"
				@reset="onFilterReset"
			/>

			<div
				v-if="doctorList.length > 0"
				class="doctor__list"
			>
				<div
					v-for="(doctor, index) in doctorList"
					:key="`doctor-${index}`"
					class="doctor__item"
				>
					<doctor-card :params="doctor" />
				</div>

				<div class="doctor__item">
					<banner-card class="doctor-card" />
				</div>
			</div>

			<div v-else-if="isLoad">Увы, ничего не найдено...</div>
		</section>
	</layout-default>
</template>

<script>
	import ApiDoctors from '@api/rest/doctors.js'
	import Doctor from '@models/doctor.js'
	import LayoutDefault from '@layouts/default.vue'
	import FormSearch from '@components/form-search/form-search.vue'
	import FilterDoctor from '@components/filter-doctor/filter-doctor.vue'
	import DoctorCard from '@components/doctor-card/doctor-card.vue'
	import BannerCard from '@components/banners/banner-card.vue'

	export default {
		name: 'PageMain',

		components: {
			LayoutDefault,
			FormSearch,
			FilterDoctor,
			DoctorCard,
			BannerCard,
		},

		inject: ['uDecl'],

		data() {
			return {
				isLoad: false,
				doctorGetList: [],
				doctorSearchNumber: 0,
				searchValue: null,
				doctorFilter: {},
			}
		},

		computed: {
			doctorList() {
				return this.doctorGetList
			},
		},

		async created() {
			try {
				this.doctorGetList = await ApiDoctors.getAll()
				this.isLoad = true
			} catch (error) {
				console.error(error)
			}
		},

		methods: {
			async onSearchSubmit(value) {
				if (value !== '') {
					this.searchValue = value

					this.doctorGetList = await ApiDoctors.getAll(value)
					this.doctorGetList = Doctor.sort(
						this.doctorGetList,
						this.doctorFilter,
					)

					this.doctorSearchNumber = this.doctorGetList.length
				} else {
					this.searchValue = null
				}
			},

			async onSearchClear() {
				this.searchValue = null

				this.doctorGetList = await ApiDoctors.getAll()
				this.doctorGetList = Doctor.sort(
					this.doctorGetList,
					this.doctorFilter,
				)

				this.doctorSearchNumber = this.doctorGetList.length
			},

			async onFilterSubmit(filter) {
				this.doctorFilter = filter

				this.doctorGetList = await ApiDoctors.getAll(
					this.searchValue || '',
				)
				this.doctorGetList = Doctor.sort(
					this.doctorGetList,
					this.doctorFilter,
				)

				this.doctorSearchNumber = this.doctorGetList.length
			},

			async onFilterChange(filterProblems) {
				this.doctorFilter.problems = filterProblems

				try {
					this.doctorGetList = await ApiDoctors.getAll(
						this.searchValue || '',
					)

					if (this.doctorFilter.problems.length > 0) {
						this.doctorGetList = Doctor.sort(
							this.doctorGetList,
							this.doctorFilter,
						)
					}

					this.doctorSearchNumber = this.doctorGetList.length
				} catch (error) {
					console.error(error)
				}
			},

			async onFilterReset() {
				try {
					this.doctorFilter = {}
					this.doctorSearchNumber = 0
					this.doctorGetList = await ApiDoctors.getAll()
				} catch (error) {
					console.error(error)
				}
			},
		},
	}
</script>

<style lang="scss">
	.doctor {
		$bn: &;

		display: flex;
		flex-direction: column;
		flex-grow: 1;

		&__list {
			flex-grow: 1;
		}

		&__item {
			& ~ #{$bn}__item {
				margin-top: 20px;
			}
		}
	}
</style>
