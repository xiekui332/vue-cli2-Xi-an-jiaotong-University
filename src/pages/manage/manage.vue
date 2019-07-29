<template>
    <div class="ag-wrapper">
        <div id="stage">
            <div class="ag-item" v-for="(i, ind) in 6" :key="ind">

            </div>
        </div>
        <el-row>
            <el-badge :value="msgNum" class="item"></el-badge>
            <el-button type="primary" round>
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
    }
}
</script>

<style lang="less" scoped>
.ag-wrapper{
    position: relative;
}
#stage{
    display: inline-flex;
    flex-wrap: wrap;
    padding: 100px 60px;
    margin-left: 50px;
}
.ag-item{
    width: 340px;
    height: 200px;
    background: rgb(175, 171, 171);
    box-shadow: 0 9px 35px 4px rgba(0,0,0,0.03);
    border-radius: 4px;
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


