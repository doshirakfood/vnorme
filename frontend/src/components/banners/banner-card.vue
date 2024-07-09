<template>
	<div class="banner-card">
		<div class="banner-card__wrapper">
			<h2 class="banner-card__title title">
				Зарегистрируйтесь и получите доступ ко полному списку
				специалистам
			</h2>

			<div class="banner-card__actions">
				<v-button
					class="banner-card__action"
					color="grey-lighter"
					label="Зарегистрироваться"
				/>

				<v-button
					class="banner-card__action banner-card__action--comein"
					color="white"
					label="Войти"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BannerCard',
	}
</script>

<style src="./banners.scss" lang="scss" />
