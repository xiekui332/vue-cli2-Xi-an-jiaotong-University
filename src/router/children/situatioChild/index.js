export default [
    {
        path: '/proj/situatio/plan',
        name:'situPlan',
        component: () => import('@/components/ProjectProgress/StepsComponents')
    },
    {
        path: '/proj/situatio/sign',
        name:'situSign',
        component: () => import('@/components/ProjectProgress/StepsComponents')
    }
]