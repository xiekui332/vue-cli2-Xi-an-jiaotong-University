import children from "./second";
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
      name: 'approve',
      component: () => import('@/pages/approve/index')
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('@/pages/system/index')
    }
  ]