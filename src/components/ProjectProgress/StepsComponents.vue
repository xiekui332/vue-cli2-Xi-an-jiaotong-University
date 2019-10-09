<template>
    <div id="st-wrapper">
        <div class="st-btn pub-family">
            <p v-if="exTwoproInfo"> <img src="../../assets/img/icon-trans.png" alt="">阶段完成</p>
            <p v-else> <img src="../../assets/img/icon-trans.png" alt="">阶段进行中</p>
            <el-row v-show="sessionGet.projectNode">
                <el-button type="primary" round @click="handleLookSteps">审批进度</el-button>
            </el-row>
        </div>


        <div>
            

            <!-- 立项申请 S -->
            <StepsApplication v-if="currentstep === 'excutingstep1' || currentstep === 'trackstep1' || currentstep === 'allstep1' || currentstep === 'situatiostep1'" />

            <!-- 立项论证 S -->
            <Demonstration v-if="currentstep === 'excutingstep2' || currentstep === 'trackstep2' || currentstep === 'allstep2' || currentstep === 'situatiostep2'" />

            <!-- 项目采购--需求论证 -->
            <Demand v-if="currentstep === 'excutingstep3' || currentstep === 'trackstep3' || currentstep === 'allstep3' || currentstep === 'situatiostep3'" />

            <!-- 项目采购--采购申请 -->
            <Requisition v-if="currentstep === 'excutingstep4' || currentstep === 'trackstep4' || currentstep === 'allstep4' || currentstep === 'situatiostep4'" />
            
            <!-- 项目采购--采购会 -->
            <Sourcing v-if="currentstep === 'excutingstep5' || currentstep === 'trackstep5' || currentstep === 'allstep5' || currentstep === 'situatiostep5'" />

            <!-- 项目采购--合同签订 -->
            <Sign v-if="currentstep === 'excutingstep6' || currentstep === 'trackstep6' || currentstep === 'allstep6' || currentstep === 'situatiostep6'" />

            <!-- 项目执行--执行资料 -->
            <Implementation v-if="currentstep === 'excutingstep7' || currentstep === 'trackstep7' || currentstep === 'allstep7' || currentstep === 'situatiostep7'" />

            <!-- 验收-验收申请 -->
            <Acceptance v-if="currentstep === 'excutingstep8' || currentstep === 'trackstep8' || currentstep === 'allstep8' || currentstep === 'situatiostep8'" />

            <!-- 验收-预验收 -->
            <Preacceptance v-if="currentstep === 'excutingstep9' || currentstep === 'trackstep9' || currentstep === 'allstep9' || currentstep === 'situatiostep9'" />

            <!-- 验收-验收复核 -->
            <Acceptancereview v-if="currentstep === 'excutingstep10' || currentstep === 'trackstep10' || currentstep === 'allstep10' || currentstep === 'situatiostep10'" />

            <!-- 维保-结束申请 -->
            <Closeapplication v-if="currentstep === 'excutingstep11' || currentstep === 'trackstep11' || currentstep === 'allstep11' || currentstep === 'situatiostep11'" />

            <!-- 维保-技术指标验收 -->
            <Technical v-if="currentstep === 'excutingstep12' || currentstep === 'trackstep12' || currentstep === 'allstep12' || currentstep === 'situatiostep12'" />

            
        </div>

        <el-dialog
            class="st-dialog"
            :visible.sync="dialogVisible"
            :show-close=true
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
                <el-step  v-for="(i, ind) in hasNodeInfo" :key="ind" :title="i.userName?i.userName:''" :description="i.state?i.state:''"></el-step>
            </el-steps>  
            <div class="st-steps-name st-steps-bot-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.time?i.time:''}}</p>
            </div>
            <div class="st-steps-name st-steps-bot-name st-change-height">
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
        // console.log(this.currentstep)
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
            let params = {
                id:this.sessionGet.id,
                nodeId:this.sessionGet.projectNode
            }
            this.$http.post('/api/project/getExamineList', params)
            .then(res => {
                if(res.code == '00000'){
                    this.hasNode = true
                  
                    if(res.data && res.data.length) {
                        for(let i = 0; i < res.data.length; i ++) {
                            if(res.data[i].state == 0) {
                                res.data[i].state = '待审核'
                            }else if(res.data[i].state == 1) {
                                if(i==0){
                                   res.data[i].state = ''
                                }else{
                                   res.data[i].state = '审核通过'
                                }
                               
                                this.steps = i + 1
                            }else if(res.data[i].state == 2) {
                                res.data[i].state = '审核被驳回'
                            }else if(res.data[i].state == 3) {
                                res.data[i].state = '重新提交待审核'
                            }

                            res.data[i].remark?res.data[i].remark:""
                            res.data[i].spName?res.data[i].spName:""
                            res.data[i].time?res.data[i].time:""
                            res.data[i].userName?res.data[i].userName:""
                        }
                    }
                    
                    this.hasNodeInfo = res.data
                    this.dialogVisible = true

                    

                }else{
                    this.hasNode = false
                    this.dialogVisible = false
                    if(res.message){
                       this.$message.error(res.message)
                    }else{
                       this.$message.error('本节点无审批流程')
                    }
               
                    
                }
            })
            .catch((err) => {
                this.dialogVisible = false
                this.$message.error(err.message)
            })
            
        }
    },
    beforeRouteEnter(to,from,next) {
        // console.log(store.state.proInfo.status)
        next((vm) => {
            // 此处的vm就是当前组件的实例
            vm.pageType = store.state.pageType
        })
    },

    beforeRouteUpdate(to, from, next) {
        
    },

    beforeRouteLeave(to, from, next) {
        // console.log(store.state.hasRouteUpdate)
        // if(store.state.hasRouteUpdate) {
        //     next(true)
        // }else{
        //     next(false)
        // }
        next(true)
    },
    
    watch:{
        "$route.name"(newname, oldname){
            this.currentstep = newname
            // console.log(this.currentstep)
        }
    },

    computed:{
        exTwoproInfo() {
            // console.log(store.state.isHistory)
            return store.state.isHistory
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
            margin-top:0px; 
        }
    }
    

    .st-steps-bot-name p{
        font-size: 12px!important;
    }
    .st-change-height{
        margin-top: -5px;
    }


}


</style>