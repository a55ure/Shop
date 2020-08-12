import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'

Vue.use(VueRouter)

// const routes = []

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to 要访问哪里
  // from 从哪里来
//  next 是一个函数 表示放行
  if (to.path === '/login') return next()
  // 获取token
  const tokerStr = window.sessionStorage.getItem('token')
  if (!tokerStr) return next('/login')
  next()
})
export default router
