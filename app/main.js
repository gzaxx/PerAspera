// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import App from './App.vue'

// Vue.use(VueRouter)

// const routers = [
//     { path: '/', component: null }    
// ]

// const router = new VueRouter({
//     routes
// })

// new Vue({
//     router
// }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true

new Vue({
    el: '#entry',
    components: { App }
})