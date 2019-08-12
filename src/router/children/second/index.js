import children from '../steps/steps'
import trackChild from '../trackingChild'
import situatioChild from '../situatioChild'
import all from '../all'
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
        component: () => import('@/pages/SecondPages/tracking'),
        children:[...trackChild]
    },
    {
        path: '/proj/all',
        name: 'all',    // 全部项目
        component: () => import('@/pages/SecondPages/all'),
        children:[...all]
    },
    {
        path: '/proj/situatio',
        name: 'situatio',    // 项目情况总览
        component: () => import('@/pages/SecondPages/situatio'),
        children:[...situatioChild]
    }
]