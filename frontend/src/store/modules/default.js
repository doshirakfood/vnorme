const state = () => ({
	siteName: import.meta.env.VITE_SITE_NAME,

	treatmentMethods: [
		{
			key: 'gestalt',
			value: 'Гештальт-терапия',
		},

		{
			key: 'art',
			value: 'Арт-терапия',
		},

		{
			key: 'аст-cft',
			value: 'Принятие и ответственности (АСТ) / Сфокусирование на сострадании (CFT)',
		},

		{
			key: 'psychodynamic',
			value: 'Психодинамические подходы',
		},

		{
			key: 'cpt-cbt',
			value: 'КПТ/КБТ: Когнитивно-поведенческая терапия',
		},

		{
			key: 'clinical',
			value: 'Клиническая психология',
		},
	],

	problems: [
		{
			key: 'sleep',
			value: '😴 Проблемы со сном',
		},

		{
			key: 'relationship',
			value: '💑 Отношения с партнёром',
		},

		{
			key: 'eating-behavior',
			value: '🌯 Пищевое поведение',
		},

		{
			key: 'self-search',
			value: '🔎 Поиск себя',
		},

		{
			key: 'exhaustion',
			value: '😞 Упадок сил',
		},

		{
			key: 'panic-attacks',
			value: '😨 Панические атаки',
		},

		{
			key: 'loneliness',
			value: '😔 Чувство одиночества',
		},

		{
			key: 'incomprehensible-emotions',
			value: '🤯 Непонятные эмоции',
		},
	],

	ageGroup: [
		{
			key: '8-12',
			value: 'от 8 до 12 лет',
		},

		{
			key: '12-16',
			value: 'от 12 до 16 лет',
		},

		{
			key: '16-20',
			value: 'от 16 до 20 лет',
		},

		{
			key: '25-45',
			value: 'от 25 до 45 лет',
		},
	],
})

export default {
	namespaced: true,
	state,
	getters: {},
	mutations: {},
}
