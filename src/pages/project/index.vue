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
                    item:'项目管理',
                    children:[
                        {
                            title:'执行计划维护',
                            path:'/proj/first'
                        },
                        {
                            title:'执行中项目',
                            path:'/proj/excuting'
                        },
                        {
                            title:'尾款跟踪',
                            path:'/proj/tracking'
                        },
                        {
                            title:'全部项目',
                            path:'/proj/all'
                        }
                    ],
                    isChildren:false
                },
                {
                    item:'项目统计',
                    children:[
                        {
                            title:'项目情况总览',
                            path:'/proj/situatio'
                        }
                    ]
                }

            ]
            
        }
    },
    methods:{
        
    },
    mounted() {
        
    },
    watch:{
        
    }
}
</script>

<style lang="less" scoped>

</style>


