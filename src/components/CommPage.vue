<template>
    <div class="block" v-if="hasPage">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="extotal"
            :hide-on-single-page=false
            >
            </el-pagination>
        </div>
    <div v-else></div>
</template>

<script>
export default {
    props:[
        'hasPage',
        'handlePageUp',
        'total'
    ],
    data() {
        return {
            currentPage4: 1,
            extotal:this.total
        }
    },

    methods:{
        handleSizeChange(val) {
            this.$emit('handlePageRows', val)
        },
        handleCurrentChange(val) {
            this.$emit('handlePageUp', val)
        }
    },
    mounted(){
        
    },
    watch:{
        total(params){
            this.extotal = params
        }
    }
}
</script>

<style lang="less" scoped>
.block{
    text-align: center;
    margin-top: 30px;
    & /deep/ .el-pager li{
        height: 30px;
        line-height: 30px;
        min-width: 30px;
    }
    & /deep/ .el-pager li.active{
        background: #3B7CFF;
        border-radius: 50%; 
        color: #ffffff;
    }
}
</style>