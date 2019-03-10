import Vue from "vue"
import VueRouter from "vue-router"
import login from './components/login'
import index from './components/index'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            beforeEnter: (to, from, next) => {
                console.log(to,from)
                if (window.sessionStorage.getItem('token')) {
                    next()
                } else {
                    next({
                        name: 'login'
                    })
                }
            }
        }
    ]
})