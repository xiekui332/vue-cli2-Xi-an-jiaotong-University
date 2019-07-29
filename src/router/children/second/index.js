import children from '../steps/steps'
export default [
    {
        path: '/proj/first',
        name: 'maintenance',    // 执行计划维护
        component: () => import('@/pages/SecondPages/maintenance')
    },
    {
        path: '/proj/excuting',
        name: 'excuting',   // 执行中项目
        component: () => import('@/pages/SecondPages/excuting'),
        children:[...children]
    },
    {
        path: '/proj/tracking',
        name: 'tracking',   // 尾款跟踪
        component: () => import('@/pages/SecondPages/tracking')
    },
    {
        path: '/proj/history',
        name: 'history',    // 历史项目
        component: () => import('@/pages/SecondPages/history')
    },
    {
        path: '/proj/all',
        name: 'all',    // 全部项目
        component: () => import('@/pages/SecondPages/all')
    },
    {
        path: '/proj/situatio',
        name: 'situatio',    // 项目情况总览
        component: () => import('@/pages/SecondPages/situatio')
    },
    {
        path: '/proj/payment',
        name: 'payment',    // 付款进度查询
        component: () => import('@/pages/SecondPages/all')
    }
]