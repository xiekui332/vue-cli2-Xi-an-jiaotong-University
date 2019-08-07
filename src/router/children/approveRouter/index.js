export default [
    {
        path: '/approve/todo',
        name: 'todo',    // 待办审批
        component: () => import('@/pages/SecondPages/examinetodo'),
        children:[
            {
                path: '/approve/todo/sign',
                name: 'todoSign',    // 待办审批
                component: () => import('@/components/ProjectProgress/StepsComponents')
            }
        ]
    },
    {
        path:'/approve/done',
        name:'done',     // 已办审批
        component:() => import('@/pages/SecondPages/alreadydone')
    }
    
]