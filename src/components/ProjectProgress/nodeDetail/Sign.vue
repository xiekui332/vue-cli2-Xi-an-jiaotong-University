<template>
    <div id="pl-wrapper">
        <!-- 合同签订 -->
        <div class="pl-info">
            <p class="pl-info-title pub-family">&nbsp;&nbsp;&nbsp;&nbsp;信息填写(合同信息)</p>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>供应商：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>中标金额：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"><template slot="append">万元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>中标服务费：</span>
                    <el-radio v-model="radio" label="1">需要</el-radio>
                    <el-radio v-model="radio" label="2">不需要</el-radio>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>服务费金额：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"><template slot="append">元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>合同签订日期：</span>
                    <el-date-picker
                    v-model="val1"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box">
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>维保期：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"><template slot="append">年</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>质保金：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"><template slot="append">%</template></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>质保金额：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"><template slot="append">万元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>招标编号：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>合同编号：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"></el-input>
                </div>
            </div>

        </div>

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
                        v-model="i.timeVal1"
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
                        <span class="st-file-title"><i class="st-tips-required">*</i> 合同扫描件</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 首付款回单扫描件</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

            </div>
        </div>


        <!-- 文档是此步骤没要求其他资料 -->

        <!-- <div class="st-item st-templates st-others">
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
                        <i class=" st-icon-file"></i>
                        <span class="st-file-title"> 其他资料1</span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileListQ">
                            <el-button size="small" type="primary">
                                <i class="pub-css st-upload-icon"></i>
                            </el-button>
                        </el-upload>
                    </div>
                </div>
            </div>
        </div> -->
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
            radio: '1',
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
            otherArr:[{}],
            fileListL:[],
            fileListD:[],
            fileListQ:[],
            hasTips:false
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
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>

<style lang="less" scoped>
#pl-wrapper{
    border-radius: 4px;
    .pl-info{
        margin-top: 10px;
        padding: 15px 20px;
        background: #ffffff;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        .pl-info-title{
            font-size: 16px;
            color: #3B4859;
        }
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
        
    }
    .pl-finish{ 
        text-align: center;
        margin: 20px 0 10px;
        button{
            width: 420px;
            height: 40px;
            background: #3B7CFF;
            border-radius: 6px; 
            font-size: 16px;
            color: #FFFFFF;
        }
        
    }
    .pl-finish-tip{
        font-size: 14px;
        color: #3B4859;
        text-align: center;
        margin-bottom:30px;
    }

    @import url('../../Common/less/comItem.less');
}
</style>