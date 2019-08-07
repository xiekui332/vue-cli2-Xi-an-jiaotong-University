
export default [
    {
        path: '/proj/excuting/step1',
        name: 'excutingstep1',    // 项目立项 立项申请
        component: () => import('@/components/ProjectProgress/nodeDetail/index')
    },
    {
        path: '/proj/excuting/step2',
        name: 'excutingstep2',    // 项目进度 执行计划
        component: () => import('@/components/ProjectProgress/nodeDetail/index')
    },
    {
        path: '/proj/excuting/step3',
        name: 'excutingstep3',    // 项目进度 执行计划
        component: () => import('@/components/ProjectProgress/nodeDetail/index')
    },
    {
        path: '/proj/excuting/step4',
        name: 'excutingstep4',    // 项目进度 执行计划
        component: () => import('@/components/ProjectProgress/nodeDetail/index')
    }
]