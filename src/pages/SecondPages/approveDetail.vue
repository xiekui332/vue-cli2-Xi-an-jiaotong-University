<template>
    <div id="sh-wrapper">
        <proInfoHead />

        <div class="sh-node-content">
            <div class="sh-node-left">
                <el-collapse v-model="activeName" accordion @change='handleActiveName()'>
                    <el-collapse-item name="1">
                        <template slot="title">
                           <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box">
                                        <i class="sh-node-icon pub-css sh-node-finish"></i>
                                        <span class="pub-family">立项准备</span>
                                    </div>
                                    <div class="sh-node-box">
                                        <a href="javascript:;" @click="handleLook('node')">节点流程</a>
                                        <div @click="handleLook('rotate')">
                                            <img src="../../assets/img/more-L.png" :class="activeName == 1?'pj-transform':''" ref="transform" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box">
                                        <i class="sh-node-icon">2</i>
                                        <span class="pub-family">立项准备</span>
                                    </div>
                                    <div class="sh-node-box">
                                        <div @click="handleLook('rotate')">
                                            <img src="../../assets/img/more-L.png" :class="activeName == 2?'pj-transform':''" ref="transform" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="sh-file-box">
                            <div class="sh-file-item">
                                <div class="sh-file-head">
                                    <span>采购申请表</span>
                                    <span>操作</span>
                                </div>
                                <div class="sh-file-list">
                                    <span>交通大学采购申请单</span>
                                    <span>
                                        <i>查看</i>
                                        <i>打印</i>
                                    </span>
                                </div>
                            </div>

                            <div class="sh-file-item">
                                <div class="sh-file-head">
                                    <span>资料附件</span>
                                    <span>操作时间</span>
                                    <span>操作人</span>
                                </div>
                                <div class="sh-file-list">
                                    <span>交通大学采购申请单</span>
                                    <span>2019-02-14 11:47</span>
                                    <span>谢奎</span>
                                </div>
                            </div>

                            <div class="sh-file-item">
                                <div class="sh-file-head">
                                    <span>其他资料</span>
                                    <span>操作时间</span>
                                    <span>操作人</span>
                                </div>
                                <div class="sh-file-list">
                                    <span>交通大学采购申请单</span>
                                    <span>2019-02-14 11:47</span>
                                    <span>谢奎</span>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

            <div class="sh-node-right">
                <div v-if="this.type === 'todo'">
                    <div class="sh-node-operate">
                        <el-radio v-model="radio" label="1">同意</el-radio>
                        <el-radio v-model="radio" label="2">驳回</el-radio>
                    </div>
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    show-word-limit
                    class="sh-node-textarea"
                    :autosize="{ minRows: 10}"
                    >
                    </el-input>
                    <div class="sh-node-tips">
                        <div><CommUpload :title="title" /></div>
                        <span>如需上传资料请点击</span> 
                    </div>
                    <el-row class="sh-node-btn">
                        <el-button type="primary" @click="handleCancel()">取消</el-button>
                        <el-button type="primary" @click="handleComfire()">确认审批</el-button>
                    </el-row>
                </div>

                <div v-else>
                    <p class="pub-family sh-node-agree">审批意见: 同意</p>
                    <p class="sh-node-agree-reason">符合学校立项标准，同意！</p>
                    <p class="sh-node-agree-file">本地文件1.pdf</p>
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
import proInfoHead from '@/components/Common/ProInfoHead'
import CommUpload from '@/components/Common/commUpload'
export default {
    props:[
        'type'
    ],
    components:{
        proInfoHead,
        CommUpload
    },
    data() {
        return {
            activeName: '',
            radio:'1',
            textarea:'',
            title:'上传文件',
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
        }
    },
    methods:{
        handleLook(type) {
            if(type === 'rotate') {
                console.log(this.$refs)
            }else if(type === 'node'){
                this.dialogVisible = true
            }
        },

        handleActiveName() {
            
        },

        handleComfire() {
            // this.$message({
            //     type:'error',
            //     dangerouslyUseHTMLString: true,
            //     message:'<p style="font-size:14px;color:#666666;margin:0 0 10px 0;">出错了！</p> <p style="font-size:13px;color:#999999;">失败原因：不同意时必须填写原因。</p><p></p>',
            //     showClose:true
            // })

            this.$message({
                type:'success',
                dangerouslyUseHTMLString: true,
                message:'<p style="font-size:14px;color:#666666;margin:0 0 10px 0;">已成功！</p> <p style="font-size:13px;color:#999999;">下一审批节点：XXXXXX，请及时跟进审核状态。如有问题，请联系审核人员或联系8266-XXXX。</p><p></p>',
                showClose:true
            })
        },

        handleCancel() {
            
        }
    },
    watch:{
        '$route'(to, from){
            console.log(to)
        }
    }
}
</script>

<style lang="less" scoped>
#sh-wrapper{
    & /deep/ textarea::placeholder{
        font-size: 12px;
    }
    .sh-node-content{
        display: flex;
        justify-content: flex-end;
        .sh-node-left{
            flex: 2;
            margin-right: 20px;
            .sh-node-item{
                width: 100%;
                .sh-node-item-head{
                    border-radius: 4px;
                    height: 54px;
                    display: flex;
                    justify-content: space-between;
                    .sh-node-box{
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        .sh-node-icon{
                            display: inline-block;
                            width: 20px;
                            height:20px;
                            background-color: #3B7CFF;
                            border-radius: 50%;
                            font-size: 12px;
                            color: #FFFFFF;
                            margin: 0 10px 0 20px;
                            text-align: center;
                            line-height: 20px;
                        }
                        .sh-node-finish{
                            background-position: -376px -50px;
                        }
                        img{
                            width: 10px;
                            margin: 0 20px;
                            transform-origin:center center;
                            transition:all .2s ease-in;
                        }
                        a{
                            font-size: 12px;
                            color: #3B7CFF;
                        }
                        .pj-transform{
                            display:inline-block;
                            transform-origin:center center;
                            transition:all .2s ease-in;
                            transform:rotate(-180deg)
                        }
                    }
                    
                }
            }
            & /deep/ .el-collapse-item__header{
                height: 54px;
                background: #EFF2F7;
                box-shadow: 0 2px 4px 0 #EFF2F7;
                
            }
             & /deep/ .el-collapse-item{
                margin-bottom: 20px;
                box-shadow: 0 2px 4px 0 #EFF2F7;
             }
            & /deep/ .el-collapse-item__arrow{
                display: none;
            }
            .sh-file-box{
                padding: 20px;
                .sh-file-item{
                    box-shadow: 0 2px 4px 0 #EFF2F7;
                    margin-bottom:20px; 
                   >div{
                        height: 50px;
                        line-height: 50px;
                        display: flex;
                        >span{
                            flex:1;
                            text-align: center;
                            font-size: 14px;
                            i{
                                cursor: pointer;
                                color:  #3B7CFF;
                                margin: 0 10px;  
                            }
                        }
                        
                   }
                   .sh-file-list{
                        >span{
                            font-size: 14px;
                            color: #8998AC;
                        }
                    }
                   >div:nth-child(odd){
                       background: #F8F9FB;
                   }
                   >div:nth-child(even){
                       background: #FCFDFF;
                   }
                    .sh-file-head{
                        
                    }
                }
            }
        }
        .sh-node-right{
            width: 335px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #EFF2F7;
            border-radius: 4px;
            padding: 0 20px 20px;
            .sh-node-operate{
                padding: 30px 0px 10px;
            }
            & /deep/ .el-radio__input.is-checked .el-radio__inner{
                border-color: #3B7CFF;
                background: #3B7CFF;
            }
            .sh-node-textarea{
                display: block;
                margin: 0 auto;
            }
            .sh-node-tips{
                font-size: 14px;
                color: #8392A7;
                margin-top: 10px;  
                >div{
                    margin-bottom: 10px;  
                    & /deep/ .el-upload{
                        margin-left: -10px;
                    }
                    
                } 
                span{
                    // color: #3B7CFF;
                }
            }
            .sh-node-btn{
                margin: 20px 0 10px;
                display: flex;
                button{
                    height: 36px;
                    font-size: 14px;
                    color: #8392A7;
                }
                button:nth-child(1){
                    width: 80px;
                    background: #F9FAFC;
                    border: 1px solid #AEB9CA;
                    border-radius: 4px;
                    margin-right: 30px;
                }
                button:nth-child(2){
                    flex:2;
                    background: #3B7CFF;
                    border-radius: 4px;
                    color: #FFFFFF;
                }
            }

            .sh-node-agree{
                font-size: 18px;
                color: #3B4859;
                letter-spacing: 0;
                margin: 42px 0 20px 10px;
            }
            .sh-node-agree-reason{
                font-size: 16px;
                color: #3B4859;
                letter-spacing: 0;
                margin-left: 10px;
            }
            .sh-node-agree-file{
                font-size: 14px;
                color: #3B7CFF;
                letter-spacing: 0;
                margin: 20px 0 10px 10px;
            }
        }
    }

    
    @import url('../../components/Common/less/commNode.less');
}
</style>