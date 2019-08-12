<template>
    <div class="node-wrapper">
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
            </div>
            
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>退还质保金%：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>退还质保金额：</span>
                    <el-input class="pl-input-box" v-model="val2" placeholder="请输入内容" disabled="true"></el-input>
                </div>
            </div>
            
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>备注说明：</span>
                    <el-input class="pl-input-box" v-model="val2" placeholder="请输入内容"></el-input>
                </div>
            </div>
        </div>

        <!-- 模板资料 -->
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
                        <span class="st-file-title"><i class="st-tips-required">*</i> 维保情况说明</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 质保金凭证</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 质保金退还申请</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>
        </div>

        <!-- 其他资料 -->
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
            val1:'',
            val2:'',
            infoArr:[{}],
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
        handleAddmenu(type) {
            if(type === 'fill') {
                let obj = {
                    timeVal:'',
                    percentVal:'',
                    moneyVal:'',
                    residueVal:'',
                    remarksVal:'',
                    isEdit:true
                }
                this.infoArr.push(obj)
            }else if(type === 'other') {
                this.otherArr.push({})
            }
        }
    }
}
</script>

<style lang="less" scoped>
.node-wrapper{
    @import url('../../Common/less/comItem.less');

    .pl-item-wrapper{
        display: flex;
        margin-top:16px;
        .pl-input{
            display: flex;
            align-items: center;
            flex: 1;
            .pl-input-name{
                font-size: 16px;
                color: #39475B;
                display: inline-block;
                min-width: 140px;
                i{
                    color: #FE5959;
                    font-size: 18px;
                    padding:0 5px;
                }
            }
            .pl-input-box{
                margin-right: 20px;
                border: 1px solid #F0F3F7;
                box-shadow: 0 2px 4px 0 #EFF2F7;
                border-radius: 4px;
                width: 100%;
                & /deep/ .el-input__inner{
                    border: none;
                    height: 36px;
                }
                & /deep/ .el-input-group__append{
                    background-color: #ffffff;
                    border: none;
                }
            }
        }
    }

    .st-icon-none{
        .st-icon-file{
            background-position: 0 0!important;
        }
    }
}
</style>


