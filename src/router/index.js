import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchFollow.vue'),
      meta: {
        requiresAuth: false,
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('usertoken') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      let token = localStorage.getItem('usertoken')
      if (token == '') {
        next({
          path: '/login',
          params: {
            nextUrl: to.fullPath
          }
        })
      } else {
        next();
      }
    }
  } else {
    next()
  }
})


export default router
