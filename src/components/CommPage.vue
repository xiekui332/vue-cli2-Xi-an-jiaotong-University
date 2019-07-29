<template>
    <div class="block" v-if="hasPage">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
    <div v-else></div>
</template>

<script>
export default {
    props:[
        'hasPage'
    ],
    data() {
        return {
            currentPage4: 4,
        }
    },

    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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