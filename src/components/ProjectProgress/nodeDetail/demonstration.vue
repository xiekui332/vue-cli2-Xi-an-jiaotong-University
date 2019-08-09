<template>
    <div class="node-wrapper">
        <!-- 立项论证 -->
        <div class="st-item st-templates">
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
                        <span class="st-file-title"><i class="st-tips-required">*</i> 项目立项专家评审意见表</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required"></i> 详细询价单</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>
            
        </div>

        <div class="st-item st-templates st-others">
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
                        <span class="st-file-title"> 2019采购合同</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommUpload from '@/components/Common/commUpload'
export default {
    components:{
        CommUpload
    },
    data() {
        return {
            hasTips:false,
            otherArr:[{}],
        }
    },

    methods:{
        handleAddmenu() {
            this.otherArr.push({})
        }
    },

    mounted() {

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


