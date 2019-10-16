import children from "./second";
import approveChild from './approveRouter'
import systemChild from './systemChild'
export default [
    {
      path: '/stage',
      name: 'stage',
      component: () => import('@/pages/manage/manage')
    },
    {
      path: '/proj',
      // redirect:'/proj/first',
      name: 'proj',
      component: () => import('@/pages/project/index'),
      children: [...children]
    },
    {
      path: '/approve',
      // redirect:'/approve/todo',
      name: 'approve',
      component: () => import('@/pages/approve/index'),
      children:[...approveChild]
    },
    {
      path: '/system',
      // redirect:'/system/upload',
      name: 'system',
      component: () => import('@/pages/system/index'),
      children:[...systemChild]
    }
  ]