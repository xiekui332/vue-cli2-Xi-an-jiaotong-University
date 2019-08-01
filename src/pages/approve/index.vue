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
                    item:'审批',
                    children:[
                        {
                            title:'待办审批',
                            path:'/approve/todo'
                        },
                        {
                            title:'已办审批',
                            path:'/approve/done'
                        }
                    ],
                    isChildren:false
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>

</style>