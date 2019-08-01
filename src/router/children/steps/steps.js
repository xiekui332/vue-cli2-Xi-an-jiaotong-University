
export default [
    {
        path: '/proj/excuting/plan',
        name: 'plan',    // 项目进度 执行计划
        component: () => import('@/components/ProjectProgress/StepsComponents')
    },
    {
        path: '/proj/excuting/preparation',
        name: 'preparation',    // 项目进度 立项准备
        component: () => import('@/components/ProjectProgress/StepsComponents')
    },
    {
        path: '/proj/excuting/sign',
        name: 'sign',    // 项目进度 立项准备
        component: () => import('@/components/ProjectProgress/StepsComponents')
    }
]