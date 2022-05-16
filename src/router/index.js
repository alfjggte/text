import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import News from '../views/News'
import Detail from '../views/News/detail.vue'
import Main from '../views/Main'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '*',
    // name: n ? Main : Login,
    // component: n ? Main : Login
    // name: Main,
    component: Main,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
