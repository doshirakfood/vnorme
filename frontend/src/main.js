import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { RouterLink } from 'vue-router'
import { createHead } from '@unhead/vue'
import { createRouter } from './router'
import App from './App.vue'
import Store from './store'
import './assets/css/style.scss'

// utils
import Decl from '@utils/declination.js'

// components
import SvgIcon from '@components/SvgIcon.vue'
import VCurrency from '@components/currency/currency.vue'
import VButton from '@ui/button/button.vue'
import VPopup from '@ui/popup/popup.vue'
import VField from '@ui/field/field.vue'
import VTooltipTrigger from '@ui/tooltip-trigger/tooltip-trigger.vue'

const router = createRouter()
const head = createHead()
const store = Store
const app = createApp(App)

// provide(utils)
app.provide('uDecl', Decl)

// components
app.component('SvgIcon', SvgIcon)
app.component('VCurrency', VCurrency)
app.component('VButton', VButton)
app.component('VPopup', VPopup)
app.component('VField', VField)
app.component('VTooltipTrigger', VTooltipTrigger)

app.use(router)
app.use(head)
app.use(store)
app.mount('#app')
