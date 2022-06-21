import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import News from '../views/News'
import Detail from '../views/News/detail.vue'
import Main from '../views/Main'
import Home from '../views/Home'
import UserList from '../views/user-manage/UserList.vue'
import RightList from '../views/right-manage/RightList.vue'
import RoleList from '../views/right-manage/RoleList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsCategory from '../views/news-manage/NewsCategory.vue'
import NewsDraft from '../views/news-manage/NewsDraft.vue'
import Audit from '../views/audit-manage/Audit.vue'
import AuditList from '../views/audit-manage/AuditList.vue'
import Published from '../views/publish-manage/Published.vue'
import Sunset from '../views/publish-manage/Sunset.vue'
import Unpublished from '../views/publish-manage/Unpublished.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    // meta: { isAuth: true },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    // meta: { isAuth: true },
  },
  {
    path: '*',
    name: 'Main',
    component: Main,
    meta: { isAuth: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { isAuth: true },
      },
      {
        path: '/user-manage/list',
        name: 'UserList',
        component: UserList,
        meta: { isAuth: true },
      },
      {
        path: '/right-manage/role/list',
        name: 'RoleList',
        component: RoleList,
        meta: { isAuth: true },
      },
      {
        path: '/right-manage/right/list',
        name: 'RightList',
        component: RightList,
        meta: { isAuth: true },
      },
      {
        path: '/news-manage/add',
        name: 'NewsAdd',
        component: NewsAdd,
        meta: { isAuth: true },
      },
      {
        path: '/news-manage/draft',
        name: 'NewsDraft',
        component: NewsDraft,
        meta: { isAuth: true },
      },
      {
        path: '/news-manage/category',
        name: 'NewsCategory',
        component: NewsCategory,
        meta: { isAuth: true },
      },
      {
        path: '/audit-manage/list',
        name: 'AuditList',
        component: AuditList,
        meta: { isAuth: true },
      },
      {
        path: '/audit-manage/audit',
        name: 'Audit',
        component: Audit,
        meta: { isAuth: true },
      },
      {
        path: '/publish-manage/unpublished',
        name: 'Unpublished',
        component: Unpublished,
        meta: { isAuth: true },
      },
      {
        path: '/publish-manage/published',
        name: 'Published',
        component: Published,
        meta: { isAuth: true },
      },
      {
        path: '/publish-manage/sunset',
        name: 'Sunset',
        component: Sunset,
        meta: { isAuth: true },
      }

    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log('前置路由守卫', to, from)
  if (to.path == '/') {
    window.sessionStorage.setItem("activePath", '/home');
    next({
      path: '/home',
    })
  }
  if (to.meta.isAuth) { //判断是否需要鉴权
    if (localStorage.getItem("token")) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
