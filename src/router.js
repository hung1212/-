import Vue from "vue"
import VueRouter from "vue-router"
import login from './components/login'
import index from './components/index.vue'
import users from './components/users.vue'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect:'/index'
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
            children:[
                {
                    path:'users',
                    component:users,
                }
            ],  
            beforeEnter: (to, from, next) => {
                if (window.sessionStorage.getItem('token')) {
                    next()
                } else {
                    next({
                        name: 'login'
                    })
                }
            },
            
        }
    ]
})