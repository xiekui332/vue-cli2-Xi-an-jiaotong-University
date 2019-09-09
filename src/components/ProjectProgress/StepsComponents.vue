<template>
    <div id="st-wrapper">
        <div class="st-btn pub-family">
            <p> <img src="../../assets/img/icon-trans.png" alt="">阶段进行中</p>
            <el-row>
                <el-button type="primary" round @click="handleLookSteps">审批进度</el-button>
            </el-row>
        </div>


        <div>
            

            <!-- 立项申请 S -->
            <StepsApplication v-if="currentstep === 'excutingstep1' || currentstep === 'allstep1'" />

            <!-- 立项论证 S -->
            <Demonstration v-if="currentstep === 'excutingstep2' || currentstep === 'allstep2'" />

            <!-- 项目采购--需求论证 -->
            <Demand v-if="currentstep === 'excutingstep3' || currentstep === 'allstep3'" />

            <!-- 项目采购--采购申请 -->
            <Requisition v-if="currentstep === 'excutingstep4' || currentstep === 'allstep4'" />
            
            <!-- 项目采购--采购会 -->
            <Sourcing v-if="currentstep === 'excutingstep5' || currentstep === 'allstep5'" />

            <!-- 项目采购--合同签订 -->
            <Sign v-if="currentstep === 'excutingstep6' || currentstep === 'allstep6'" />

            <!-- 项目执行--执行资料 -->
            <Implementation v-if="currentstep === 'excutingstep7' || currentstep === 'allstep7'" />

            <!-- 验收-验收申请 -->
            <Acceptance v-if="currentstep === 'excutingstep8' || currentstep === 'allstep8'" />

            <!-- 验收-预验收 -->
            <Preacceptance v-if="currentstep === 'excutingstep9' || currentstep === 'allstep9'" />

            <!-- 验收-验收复核 -->
            <Acceptancereview v-if="currentstep === 'excutingstep10' || currentstep === 'allstep10'" />

            <!-- 维保-结束申请 -->
            <Closeapplication v-if="currentstep === 'excutingstep11' || currentstep === 'allstep11'" />

            <!-- 维保-技术指标验收 -->
            <Technical v-if="currentstep === 'excutingstep12' || currentstep === 'allstep12'" />



            <!-- <el-row class="st-checkHandle" v-if="currentstep === 'excutingstep4'">
                <el-button type="primary" :loading="loading" @click="handleFinishNode()">提交审核</el-button>
            </el-row> -->

            <!-- <el-row class="st-checkHandle" v-else-if="currentstep === 'excutingstep12'">
                <el-button type="primary" :loading="loading" @click="handleFinishNode()">项目结题</el-button>
                <div class="st-checkHandle-tips">
                    <i class="el-icon-info"></i>
                    结题后项目完结，不能编辑、上传资料。
                </div>
            </el-row> -->

            <!-- <el-row class="st-checkHandle" v-else>
                <el-button type="primary" :loading="loading" @click="handleFinishNode()">完成本节点</el-button>
                <div class="st-checkHandle-tips">
                    <i class="el-icon-info"></i>
                    完成后项目进入下一节点，本节点将不能编辑信息、上传资料。
                </div>
            </el-row> -->
            

            
        </div>

        <el-dialog
            class="st-dialog"
            :visible.sync="dialogVisible"
            :show-close=false
            width="60%"
            >
            <p class="st-steps-title pub-family">阶段进行中</p>
            <div class="st-steps-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.spName?i.spName:''}}</p>
            </div>
            <el-steps :active="steps" 
                align-center
                process-status='wait'
            
            >
                <el-step  v-for="(i, ind) in hasNodeInfo" :key="ind" :title="i.userName?i.userName:'' + ' ' + i.time?i.time:''" :description="i.state?i.state:''"></el-step>
            </el-steps>  
            <div class="st-steps-name st-steps-bot-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.remark?i.remark:''}}</p>
            </div> 
        </el-dialog>
    </div>

</template>

<script>
import StepsApplication from '@/components/ProjectProgress/nodeDetail/stepsApplication'
import Demonstration  from '@/components/ProjectProgress/nodeDetail/demonstration'
import Demand  from '@/components/ProjectProgress/nodeDetail/demand'
import Requisition  from '@/components/ProjectProgress/nodeDetail/requisition'
import Sourcing  from '@/components/ProjectProgress/nodeDetail/sourcing'
import Sign from '@/components/ProjectProgress/nodeDetail/Sign'
import Implementation from '@/components/ProjectProgress/nodeDetail/implementation'
import Acceptance from '@/components/ProjectProgress/nodeDetail/acceptance'
import Preacceptance from '@/components/ProjectProgress/nodeDetail/preacceptance'
import Acceptancereview from '@/components/ProjectProgress/nodeDetail/acceptancereview'
import Closeapplication from '@/components/ProjectProgress/nodeDetail/closeapplication'
import Technical from '@/components/ProjectProgress/nodeDetail/technical'
import { store } from '@/store'
export default {
    components:{
        StepsApplication,
        Demonstration,
        Demand,
        Requisition,
        Sourcing,
        Sign,
        Implementation,
        Acceptance,
        Preacceptance,
        Acceptancereview,
        Closeapplication,
        Technical
    },
    data() {
        return {
            hasnonode:false,
            loading:false,
            currentstep:this.$route.name,
            pageType:'',
            dialogVisible:false,
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
            ],
            steps:1,
            sessionGet:{},
            hasNode:false,
            hasNodeInfo:[],
            steps:0

        }
    },
    mounted() {
        this.sessionGet = store.state.proInfo
        
        
    },
    created() {
        
    },
    methods:{
        

        handleLookSteps() {
            this.sessionGet = store.state.proInfo
            // console.log(this.sessionGet)
            this.handleHasNode();
        },

        handleFinishNode() {
            this.loading = true
            if(this.currentstep === 'excutingstep12') {

            }else {
                this.$router.push({
                    path:'step2'
                })
            }
            
        },

        handleHasNode(){
            // console.log(this.sessionGet)
            let params = {
                id:this.sessionGet.id,
                nodeId:this.sessionGet.projectNode
            }
            this.$http.post('/api/project/getExamineList', params)
            .then((res) => {
                // res = {
                //     "code": "00000",
                //     "data": [
                //         {
                //             "spName":"主管部门",//审批名称
                //             "time":"2019-01-12",//时间
                //             "remark": '小菜审批',
                //             "state": 1,//状态0：待审核，1：审核通过；2：审核被驳回，3：重新提交待审核
                //             "userName": "谢奎" //审核人姓名
                //         },
                //         {   
                //             "spName":"主管部门",
                //             "time":"2019-01-12",
                //             "remark": '小菜审批',
                //             "state": 1,
                //             "userName": "谢奎" 
                //         },
                //         {
                //             "spName":"主管部门",
                //             "time":"2019-01-12",
                //             "remark": '小菜审批',
                //             "state": 2,
                //             "userName": "谢奎" 
                //         },
                //         {
                //             "spName":"主管部门"
                //         },
                //         {
                //             "spName":"主管部门"
                //         }
                //     ],
                //     "message": "操作成功"
                // }
                if(res.code == '00000'){
                    this.hasNode = true
                    if(res.data && res.data.length) {
                        for(let i = 0; i < res.data.length; i ++) {
                            if(res.data[i].state == 0) {
                                res.data[i].state = '待审核'
                            }else if(res.data[i].state == 1) {
                                res.data[i].state = '审核通过'
                                this.steps = i + 1
                            }else if(res.data[i].state == 2) {
                                res.data[i].state = '审核被驳回'
                            }else if(res.data[i].state == 3) {
                                res.data[i].state = '重新提交待审核'
                            }
                        }
                    }
                    
                    this.hasNodeInfo = res.data
                    this.dialogVisible = true

                }else{
                    this.hasNode = false
                    this.dialogVisible = false
                    this.$message.info('本节点无审批流程')
                    
                }
            })
            .catch((err) => {
                this.dialogVisible = false
                this.$message.error(err.message)
            })
            
        }
    },
    beforeRouteEnter(to,from,next) {
        next((vm) => {
            // 此处的vm就是当前组件的实例
            vm.pageType = store.state.pageType
        })
    },

    beforeRouteUpdate(to, from, next) {
        
    },

    beforeRouteLeave(to, from, next) {
        if(store.state.hasRouteUpdate) {
            next(true)
        }else{
            next(false)
        }
        
    },
    
    watch:{
        "$route.name"(newname, oldname){
            this.currentstep = newname
            // console.log(this.currentstep)
        }
    }
}
</script>

<style lang="less" scoped>
#st-wrapper{
    & /deep/ input::placeholder{
        font-size: 12px;
    }& /deep/ textarea::placeholder{
        font-size: 12px;
    }
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
    

    

    @import url('../Common/less/commNode.less');
    .st-dialog .st-none-title{
        margin-top: -25px;
        i{
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #AEB9CF;
            margin: 0 20px;
        }
    }

    // change marginTop
    .st-dialog{
        & /deep/ .el-step__description{
            margin-top:0; 
        }
    }
    

    .st-steps-bot-name p{
        font-size: 12px!important;
    }


}


</style>