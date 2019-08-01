import children from "./second";
import approveChild from './approveRouter'
export default [
    {
      path: '/stage',
      name: 'stage',
      component: () => import('@/pages/manage/manage')
    },
    {
      path: '/proj',
      redirect:'/proj/first',
      name: 'proj',
      component: () => import('@/pages/project/index'),
      children: [...children]
    },
    {
      path: '/approve',
      redirect:'/approve/todo',
      name: 'approve',
      component: () => import('@/pages/approve/index'),
      children:[...approveChild]
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('@/pages/system/index')
    }
  ]