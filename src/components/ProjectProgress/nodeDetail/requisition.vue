<template>
    <div class="node-wrapper">
        <!-- 采购申请 -->
        <div class="st-item st-caigou st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
            </div>

            <div class="st-edit-content"> 
                <div class="st-edit-item st-ed-head">
                    <div> <span>采购申请表</span></div>
                    <div> <span>操作</span></div>
                </div>
                <div class="st-edit-item st-oparate">
                    <div class="st-oparate-col">2019SD001西安交通大学采购申请单</div>
                    <div class="st-oparate-col">
                        <span @click="handleFillApplication('open')">填写申请单</span>
                        <span v-print="'#printFill'">打印</span>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 采购需求说明书</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 签字版采购申请表</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 磋商文件</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>

        </div>

        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">其他资料</span>
                <a href="javascript:;" class="st-add" @click="handleAddmenu('other')">增行</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料名称</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in otherArr" :key="ind">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"> </span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>
        </div>

        <div class="st-item st-templates">
            <div class="st-item-header">
                <span class="pub-family">审批资料</span>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>审批附件名称</span></div>
                    <div> <span>操作时间</span></div>
                    <div> <span>操作人</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in shpiFiles" :key="ind">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title">{{i.name}} </span>
                    </div>
                    <div class="st-icon-file-title">
                        <span class="st-file-title">{{i.time}} </span>
                    </div>
                    <div class="st-icon-file-title">
                        <span class="st-file-title">{{i.man}} </span>
                    </div>
                </div>
            </div>
        </div>


        <FillAppalication 
        v-show="dialogVisibleFill"
        @handleFillApplication='handleFillApplication'
        :fillStatus='dialogVisibleFill'
        :hasLoad='hasLoad'
        />
    </div>
</template>

<script>
import FillAppalication from '@/components/Common/fillAppalication'
import CommUpload from '@/components/Common/commUpload'
export default {
    components:{
        FillAppalication,
        CommUpload
    },
    data() {
        return {
            dialogVisibleFill:false,
            hasLoad:false,
            hasTips:false,
            otherArr:[{}],
            shpiFiles:[
                {
                    name:'abc',
                    time:'2019-10-01 12:00',
                    man:'谢奎'
                }
            ]
        }
    },

    methods:{
        handleFillApplication(type) {
            if(type === 'close') {
                this.dialogVisibleFill = false
                this.hasLoad = false
            }else if(type === 'open') {
                this.dialogVisibleFill = true
                this.hasLoad = true
            }
            
        },

        handleAddmenu(type) {
            if(type === 'info') {
                
            }else if(type === 'other') {
                this.otherArr.push({})
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.node-wrapper{
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
                    text-align: center;
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
            .st-edit-item{
                display: flex;
                line-height: 50px;
                >div{
                    height: auto;
                    min-height: 50px;
                    flex: 1;
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
            
        }
    }
    
    .st-caigou{
        .st-oparate-col{
            text-align: center;
        }
        .st-oparate-col:nth-child(1){
            font-size: 14px;
            color: #8998AC;
            letter-spacing: 0;
        }
        .st-oparate-col:nth-child(2){
            font-size: 14px;
            color: #3B7CFF;
            letter-spacing: 0;
            span{
                cursor: pointer;
            }
            span:nth-child(1){
                margin-right: 40px;
            }
        }
    }

    
    .st-templates{
        .st-edit-content{
            .st-ed-head{
                >div{
                    text-align: left;
                }
                >div:nth-child(1){
                    text-indent: 5em;
                }
            }
            .st-edit-item{
                display: flex;
                >div{
                    height: auto;
                    min-height: 50px;
                    flex: 1;
                }
                .st-icon-file-title{
                    display: flex;
                    align-items: center;
                    .st-icon-file{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -375px -314px;
                        margin-left: 32px;
                        margin-right: 10px;
                    }
                    .st-tips-required{
                        font-size: 14px;
                        color: #FE5959;
                    }
                    .st-file-title{
                        font-size: 14px;
                        color: #8998AC;
                    }
                }
                .st-icon-file-name{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .upload-demo{
                        width: 100%;
                    }
                    & /deep/ .el-upload-list{
                        width: 80%;
                    }
                    & /deep/ .el-upload{
                        float: right;
                    }
                    .el-button--primary{
                        background: rgba(59, 124, 255, 0);
                        border: none;
                        padding: 6px 10px;
                    }
                    .st-upload-icon{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -10px -365px;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>

