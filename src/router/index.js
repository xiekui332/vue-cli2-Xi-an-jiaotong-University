import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'

// 按模块管理引用路由
import children from "./children";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/manage',
      name:'manage',
      component: () => import('@/pages/index.vue'),
      // 子路由分离
      children: [...children]
    }
  ]
})
