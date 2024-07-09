<template>
	<article class="doctor-card">
		<div class="doctor-card__row">
			<div class="doctor-card__col doctor-card__col--preview">
				<img
					class="doctor-card__picture"
					alt="Психолог"
					:src="params.pic"
					:title="params.name"
					loading="lazy"
				/>

				<span class="doctor-card__price">
					Онлайн сессия {{ params.price }}
					<v-currency />
				</span>
			</div>

			<div class="doctor-card__col doctor-card__col--actions">
				<v-button
					color="brand"
					class="doctor-card__action"
					label="Записаться"
					:icon="{ name: 'icon-clock' }"
				/>

				<v-button
					color="grey-lighter"
					class="doctor-card__action"
					label="Подробнее о психологе"
				/>
			</div>

			<div class="doctor-card__col doctor-card__col--info">
				<div class="doctor-card__head">
					<p
						class="doctor-card__name subtitle"
						:title="params.name"
					>
						{{ params.name }}
					</p>

					<v-button
						color="white"
						class="doctor-card__favorite"
						:icon="{ name: 'icon-favorite' }"
					/>
				</div>

				<ul
					v-if="params.info"
					class="doctor-card__details"
				>
					<li
						v-if="params.info.experience"
						class="doctor-card__detail"
					>
						Опыт {{ params.info.experience }} лет
					</li>
					<li
						v-if="params.info.age"
						class="doctor-card__detail"
					>
						Возраст {{ params.info.age }} лет
					</li>
				</ul>
			</div>

			<div
				v-if="params.methods"
				class="doctor-card__col doctor-card__col--methods"
			>
				<p class="doctor-card__subtitle">Методики:</p>

				<div class="doctor-card__methods">
					<div
						v-for="(method, index) in params.methods"
						:key="`${method.key}-${index}`"
						class="doctor-card__method"
					>
						{{ method.value }}
						<v-tooltip-trigger text="Текст" />
					</div>
				</div>
			</div>

			<div
				v-if="params.problems"
				class="doctor-card__col doctor-card__col--requests"
			>
				<p class="doctor-card__subtitle">Работает с запросами:</p>
				<ul class="doctor-card__requests">
					<li
						v-for="(problem, index) in params.problems"
						:key="`${problem.key}-${index}`"
						class="doctor-card__request"
					>
						{{ problem.value }}
					</li>
				</ul>
			</div>
		</div>
	</article>
</template>

<script>
	export default {
		name: 'DoctorCard',
		props: {
			params: {
				type: Object,
				default: () => {
					return {}
				},
			},
		},
	}
</script>

<style src="./doctor-card.scss" lang="scss" />
