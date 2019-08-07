<template>
    <div id="situa-wrapper">
        <div class="st-btn pub-family">
            <p> <img src="../../../assets/img/icon-trans.png" alt="">阶段进行中</p>
            <el-row>
                <el-button type="primary" round @click="handleLookSteps">审批进度</el-button>
            </el-row>
        </div>

        <div>
            <div class="st-item st-caigou">
                <div class="st-item-header">
                    <span class="pub-family">信息填写</span>
                </div>

                <div class="st-edit-content"> 
                    <div class="st-edit-item st-ed-head">
                        <div><span>需求单位:</span></div>
                        <div><span>申请理由:</span></div>
                        <div><span>采购类别:</span></div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
            class="st-dialog"
            :visible.sync="dialogVisible"
            :show-close=false
            width="60%"
            >
            <p class="st-steps-title pub-family">阶段进行中</p>
            <div class="st-steps-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in roleArr" :key="ind">{{i.name}}</p>
            </div>
            <el-steps :active="steps" 
                align-center
                process-status='wait'
            
            >
                <el-step title="曲丽丽" description="待提交"></el-step>
                <el-step title="周茂" description="审批"></el-step>
                <el-step title="李清" description="审批"></el-step>
                <el-step title="林丽莎" description="审批"></el-step>
            </el-steps>   
        </el-dialog>
    </div>
</template>

<script>
import { getUrlParams } from '../../../utils/util.js'
export default {
    data() {
        return {
            dialogVisible:false,
            steps:1,
            roleArr:[
                {
                    name:'创立项目'
                },
                {
                    name:'部门主管'
                },
                {
                    name:'中心副主任'
                },
                {
                    name:'采购工作小组组长'
                }
            ]
        }
    },
    methods:{
        handleLookSteps() {
            this.dialogVisible = true;
        }
    },

    mounted() {
        
    }
}
</script>

<style lang="less" scoped>
#situa-wrapper{
    .st-btn{
        height: 30px;
        display: flex;
        justify-content: space-between;
        button{
            height: 32px;
            line-height: 32px;
            padding: 0 15px;
            background: #3B7CFF;
            margin-right: 40px;
        }
        img{
            width: 20px;
        }
    }

    .st-item{
        flex: 2;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        margin-top: 20px;
        padding:0 20px 20px;
        .st-item-header{
            display: flex;
            justify-content: space-between;
            span{
                font-size: 16px;
                color: #3B4859;
                letter-spacing: 0;
                display: inline-block;
                margin: 15px 0 0 20px;
            }
            .st-add{
                display: block;
                width: 78px;
                height: 32px;
                border-radius:16px; 
                margin: 8px 22px 0 0;
                background: #3B7CFF;
                font-size: 14px;
                color: #FFFFFF;
                text-align: center;
                line-height: 32px;
            }
        }
        .st-edit-content{
            .st-ed-head{
                display: flex;
                background: #F8F9FB;
                margin-top: 20px;
                height: 50px;
                overflow: hidden;
                >div{
                    flex: 1;
                    line-height: 50px;
                    // text-align: center;
                    text-indent: 1.5em;
                    span{
                        font-size: 14px;
                        color: #39475B;
                    }
                    i{
                        color: #FE5959;
                        font-size: 18px;
                        display: inline-block;
                        height: 20px;
                    }
                }
            }
            .st-edit-item:nth-child(odd){
                background: #F8F9FB;
                & /deep/ .el-input__inner{
                    background: #F8F9FB;
                }
            }
            .st-edit-item:nth-child(even){
                background: #FCFDFF;
                & /deep/ .el-input__inner{
                    background: #FCFDFF;
                }
            }
            .st-oparate{
                height: 50px;
                display: flex;
                align-items: center;
                .st-oparate-col{
                    flex: 1;
                    & /deep/ input{
                        text-align: center;
                        border: none;
                    }
                    & /deep/ input[type=number]::-webkit-inner-spin-button,
                    & /deep/ input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    .st-icon-edit{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -377px -91px;
                    }
                    .st-icon-del{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -377px -168px;
                        margin-left: 44px;
                    }
                    & /deep/ .el-input__prefix{
                        display: none;
                    }
                    
                }
                .st-oparate-btn{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
    @import url('../../Common/less/commNode.less');
}
</style>