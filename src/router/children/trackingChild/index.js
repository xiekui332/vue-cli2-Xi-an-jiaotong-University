export default [
    {
        path: '/proj/tracking/plan',
        name:'trackPlan',
        component: () => import('@/components/ProjectProgress/StepsComponents')
    },
    {
        path: '/proj/tracking/sign',
        name:'trackSign',
        component: () => import('@/components/ProjectProgress/StepsComponents')
    }
]