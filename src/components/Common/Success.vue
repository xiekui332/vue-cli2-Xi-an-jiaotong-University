<template>
    <div id="success">
        <div :class="status?'su-icon':'su-icon su-icon-error'">
            <img v-if="status" src="../../assets/svg/chenggong.svg" class="su-succ" alt="">
            <img v-else src="../../assets/svg/shibai.svg" class="su-succ" alt="">
            <img src="../../assets/svg/guanbi.svg" class="su-close" alt="" @click="handleClose">
            <div v-if="status">
                <p class="su-title">提交成功</p>
                <p class="su-tips">你所提交的信息已提交审批，请及时跟进审核状态。</p>
                <p class="su-tips">如有问题，请联系审核人员或联系8266-XXXX。</p>
            </div>
            <div v-else>
                <p class="su-title">提交失败</p>
                <p class="su-tips">失败原因：大于等于100万的项目必须上传三份询价单。</p>
            </div>
            <el-row class="su-btn-sure" v-if="status">
                <el-button type="primary" round @click="handleClose">确定</el-button>
            </el-row>
            <el-row class="su-btn-sure" v-else>
                <el-button type="primary" round @click="handleChange">返回修改</el-button>
            </el-row>

        </div> 
    </div>
</template>

<script>
export default {
    props:[
        'hasSuccessStatus'
    ],
    data() {
        return {
            status:this.hasSuccessStatus
        }
    },
    methods:{
        handleClose() {
            this.$emit('handleDialog', 'cancel')
        },

        handleChange() {

        }
    },
    mounted() {

    },
    watch:{
        hasSuccessStatus(params) {
            this.status = params
        }
    },
    computed:{
        
    }
}
</script>

<style lang="less" scoped>
#success{
    .su-icon{
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #D0D0D0;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction:column;
        .su-succ{
            width: 100px;
            height: 100px;
            margin: 52px auto 20px;
        }
        .su-close{
            width: 12px;
            height: 12px;
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .su-title{
            font-size: 18px;
            color: #90CA52;
            letter-spacing: 0;
            text-align: center;
            margin-bottom: 13px;
        }
        .su-tips{
            width: 450px;
            margin: 0 auto;
            text-align: center;
            font-size: 14px;
            color: #8998AC;
            letter-spacing: 0;
        }
        .su-btn-sure{
            text-align: center;
        }
        .su-btn-sure button{
            background: #90CA52;
            border-radius: 21px;
            font-size: 12px;
            color: #FFFFFF;
            border: none;
            width: 124px;
            height: 36px;
            margin: 17px auto 20px;
        }
    }
    .su-icon-error{
        .su-title{
            font-size: 18px;
            color: #FE5959;
            letter-spacing: 0;
            text-align: center;
        }
        .su-btn-sure button{
            background: #FE5959;
        }
    }
}
</style>