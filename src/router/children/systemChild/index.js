export default [
    {
        path: '/system/upload',
        name: 'upload',    // 资料模板上传
        component: () => import('@/pages/SecondPages/systemupload'),
        children:[]
    },
    {
        path: '/system/role',
        name: 'role',    // 角色管理
        component: () => import('@/pages/SecondPages/systemrole'),
        children:[]
    },
    {
        path: '/system/user',
        name: 'user',    // 角色管理
        component: () => import('@/pages/SecondPages/systemuser'),
        children:[]
    },
    {
        path: '/system/log',
        name: 'log',    // 角色管理
        component: () => import('@/pages/SecondPages/systemlog'),
        children:[]
    }
    
]