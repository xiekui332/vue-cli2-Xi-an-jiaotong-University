<template>
    <LeftMenu :navArray='navArray' />
</template>

<script>
import LeftMenu from '@/components/Common/LeftMenu'
export default {
    components:{
        LeftMenu
    },
    data() {
        return {
            navArray:[
                {
                    item:'模板管理',
                    children:[
                        {
                            title:'资料模板上传',
                            path:'/system/upload'
                        }
                    ],
                    isChildren:false
                },
                {
                    item:'用户管理',
                    children:[],
                    isChildren:false,
                    path:'/system/user'
                },
                {
                    item:'角色管理',
                    children:[],
                    isChildren:false,
                    path:'/system/role'
                },
                {
                    item:'日志与消息',
                    children:[],
                    isChildren:false,
                    path:'/system/log'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>

</style>