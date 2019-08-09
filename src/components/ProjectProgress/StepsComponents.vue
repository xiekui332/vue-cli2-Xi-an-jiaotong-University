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
            <StepsApplication v-if="currentstep === 'excutingstep1'" />

            <!-- 立项论证 S -->
            <Demonstration v-if="currentstep === 'excutingstep2'" />

            <!-- 项目采购--需求论证 -->
            <Demand v-if="currentstep === 'excutingstep3'" />

            <!-- 项目采购--采购申请 -->
            <Requisition v-if="currentstep === 'excutingstep4'" />
            
            <!-- 项目采购--采购会 -->
            <Sourcing v-if="currentstep === 'excutingstep5'" />

            <!-- 项目采购--合同签订 -->
            <Sign v-if="currentstep === 'excutingstep6'" />

            <!-- 项目执行--执行资料 -->
            <Implementation v-if="currentstep === 'excutingstep7'" />

            <!-- 验收-验收申请 -->
            <Acceptance v-if="currentstep === 'excutingstep8'" />

            <!-- 验收-预验收 -->
            <Preacceptance v-if="currentstep === 'excutingstep9'" />





            <el-row class="st-checkHandle" v-if="currentstep === 'excutingstep4'">
                <el-button type="primary" :loading="loading" @click="handleFinishNode()">提交审核</el-button>
            </el-row>

            
            <el-row class="st-checkHandle" v-else>
                <el-button type="primary" :loading="loading" @click="handleFinishNode()">完成本节点</el-button>
                <div class="st-checkHandle-tips">
                    <i class="el-icon-info"></i>
                    完成后项目进入下一节点，本节点将不能编辑信息、上传资料。
                </div>
            </el-row>
            

            
        </div>

        <el-dialog
            class="st-dialog"
            :visible.sync="dialogVisible"
            :show-close=false
            width="60%"
            >
            <div v-if="hasnonode">
                <p class="st-steps-title pub-family st-none-title"><i></i>本节点无审批流程</p>
            </div>
            <div v-else>
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
        Preacceptance
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
            steps:1

        }
    },
    mounted() {
        
    },
    created() {
        
    },
    methods:{
        

        handleLookSteps() {
            this.dialogVisible = true;
        },

        handleFinishNode() {
            this.loading = true
            this.$router.push({
                path:'step2'
            })
        }
    },
    beforeRouteEnter(to,from,next) {
        
        next((vm) => {
            // 此处的vm就是当前组件的实例
            vm.pageType = store.state.pageType
        })
    },
    
    watch:{
        "$route.name"(newname, oldname){
            this.currentstep = newname
            console.log(this.currentstep)
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
    

    .st-checkHandle{
        text-align: center;
        margin: 30px 20px 20px;
        button{
            width: 300px;
            height: 40px;
            background: #3B7CFF;
            border-radius: 6px;
        }
        .st-checkHandle-tips{
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            i{
                font-size: 16px;
                border-radius: 50%;
                color: #3B7CFF;
            }
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


}


</style>