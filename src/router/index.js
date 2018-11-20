import Vue from 'vue'
import Router from 'vue-router'
import Desktop from './modules/desktop'
import Mobile from './modules/mobile'

Vue.use(Router)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


NProgress.inc(0.2)
NProgress.configure({easing: 'ease', speed: 1000, showSpinner: false})


const routes = [
  ...Desktop,
  ...Mobile
]
const router = new Router({
  /*mode: 'history',*/
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
