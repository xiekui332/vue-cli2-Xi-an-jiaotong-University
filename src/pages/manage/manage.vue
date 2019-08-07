<template>
    <div class="ag-wrapper">
        <div id="stage" ref="stage">
            <div class="ag-item" v-for="(i, ind) in 6" :key="ind">

            </div>
        </div>
        <el-row class="ag-badge">
            <el-badge :value="msgNum" class="item"></el-badge>
            <el-button type="primary" round @click="handleToapprove">
                待审批信息
            </el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msgNum:12
        }
    },
    methods:{
        handleToapprove() {
            this.$router.push({
                path:'/approve/todo'
            })
        }
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
.ag-wrapper{
    .ag-badge{
        position: fixed;
        right: 0px;
        bottom: 0px;
    }
}
#stage{
    display: flex;
    justify-content: flex-start;
    align-content:space-between;
    flex-wrap: wrap;
    padding: 100px 60px;
}
.ag-item{
    width: 340px;
    background: pink;
    height: 200px;
    box-shadow: 0 9px 35px 4px rgba(0,0,0,0.03);
    border-radius: 4px;
    margin: 0 50px 60px;
}
.el-row button{
    width: 128px;
    height: 38px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 1.23px;
    background: #3B7CFF;
    position: absolute;
    right: 50px;
    bottom: 60px;
    z-index: 1;
}
.el-row .item{
    position: absolute;
    right: 150px;
    bottom: 80px;
    z-index: 2;
    & /deep/ .el-badge__content{
        background: #FE5959;
    }
}
</style>


