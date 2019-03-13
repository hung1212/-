import Vue from "vue"
import VueRouter from "vue-router"
import login from './components/login'
import index from './components/index.vue'
import users from './components/users.vue'
import roles from './components/roles.vue'
import categories from './components/categories.vue'
import goods from './components/goods.vue'
import orders from './components/orders.vue'
import params from './components/params.vue'
import reports from './components/reports.vue'
import rights from './components/rights.vue'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index'
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
                if (window.sessionStorage.getItem('token')) {
                    next()
                } else {
                    next({
                        name: 'login'
                    })
                }
            },
            children: [
                {
                    path:'/',
                    redirect:{name:'users'}
                },
                {
                    path: 'users',
                    name:'users',
                    component: users,
                },
                {
                    path: 'reports',
                    name: 'reports',
                    component: reports
                },
                {
                    path: 'rights',
                    name: 'rights',
                    component: rights
                },
                {
                    path: 'roles',
                    name: 'roles',
                    component: roles
                },
                {
                    path: 'categories',
                    name: 'categories',
                    component: categories
                },
                {
                    path: 'goods',
                    name: 'goods',
                    component: goods
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: orders
                },
                {
                    path: 'params',
                    name: 'params',
                    component: params
                }
            ],
        },
    ]
})