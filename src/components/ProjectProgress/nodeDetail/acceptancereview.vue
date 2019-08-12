<template>
    <diV class="node-wrapper">
        <!-- 验收-验收复核 -->
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写（验收信息）</span>
            </div>

            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>验收日期：</span>
                    <el-date-picker
                    v-model="val1"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box">
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>验收备注：</span>
                    <el-input class="pl-input-box" v-model="val2" placeholder="请输入内容"></el-input>
                </div>
            </div>
        </div>

        <!-- 付款信息 -->
        <div class="st-item">
            <div class="st-item-header">
                <span class="pub-family">信息填写(付款信息)</span>
                <a href="javascript:;" class="st-add" @click="handleAddmenu('fill')">添加</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div><i>*</i> <span>付款时间</span></div>
                    <div><i>*</i> <span>付款比%</span></div>
                    <div><i>*</i> <span>付款金额(万)</span></div>
                    <div><i>*</i> <span>剩余付款金额(万)</span></div>
                    <div> <span>备注</span></div>
                    <div> <span>操作</span></div>
                </div>

                <div class="st-edit-item st-oparate" v-for="(i, ind) in infoArr" :key="ind">
                    <div class="st-oparate-col">
                        <el-date-picker
                        v-model="i.timeVal"
                        type="date"
                        placeholder="选择日期"
                        :disabled='i.isEdit'
                        >
                        </el-date-picker>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.percentVal" placeholder="请输入内容" type='number' :disabled='i.isEdit'></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.moneyVal" placeholder="请输入内容" type='number' :disabled='true'></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.residueVal" placeholder="请输入内容" type='number' :disabled='true'></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.remarksVal" placeholder="请输入备注(选填)" :disabled='i.isEdit' maxlength='20'></el-input>
                    </div>
                    <div class="st-oparate-col st-oparate-btn">
                        <i class="pub-css st-icon-edit" @click="handleEdit(ind)"></i>
                    </div>
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
                        <span class="st-file-title"><i class="st-tips-required">*</i> 验收报告</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 固定资产入账单</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required"> </i> 供应商履约评价表</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required"> </i> 发票扫描件</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 供应商回单</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>
        </div>

        <!-- 其他资料 -->
        <p class="st-other-tips"><span>*软件项目</span> 请在下方上传验收文档，包含：需求说明书、详细设计说明书、数据库设计说明书、测试报告、用户操作手册</p>
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
                        <span class="st-file-title"> 2019采购合同</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>
            </div>
        </div>

    </diV>
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
            infoArr:[
                {
                    timeVal:'',
                    percentVal:'',
                    moneyVal:'',
                    residueVal:'',
                    remarksVal:'',
                    isEdit:true
                }
            ],
            hasTips:false,
            otherArr:[{}]
        }
    },

    methods:{
        handleEdit(ind){
            this.infoArr[ind].isEdit = false
        },

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
    .st-other-tips{
        font-size: 14px;
        margin: 20px 0 -5px 0;
        color: #8998AC;
        span{
            color: red;
        }
    }
}
</style>


