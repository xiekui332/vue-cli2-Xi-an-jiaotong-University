<template>
    <div class="node-wrapper">
        <!-- 立项申请 -->
        <div class="st-item">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
                <a href="javascript:;" class="st-add" @click="handleAddmenu('info')">添加</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div><i>*</i> <span>计划付款时间</span></div>
                    <div><i>*</i> <span>计划付款%</span></div>
                    <div><i>*</i> <span>计划付款金额(万元)</span></div>
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
                        <el-input v-model="i.percentVal1" placeholder="请输入内容" type='number' :disabled='i.isEdit'></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.moneyVal1" placeholder="请输入内容" type='number' :disabled='i.isEdit'></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.remarksVal1" placeholder="请输入备注(选填)" :disabled='i.isEdit' maxlength='20'></el-input>
                    </div>
                    <div class="st-oparate-col st-oparate-btn">
                        <i class="pub-css st-icon-edit" @click="handleEdit(ind)"></i>
                        <i class="pub-css st-icon-del" @click="handleDel(ind)"></i>
                    </div>
                </div>
            </div>
        </div>

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
                        <span class="st-file-title"><i class="st-tips-required">*</i> 立项申请书(模板)</span>
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
                            :file-list="fileListL">
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 调研报告</span>
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
                            :file-list="fileListD">
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 询价单(3份)</span>
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
                            :file-list="fileListX">
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"> 调研函</span>
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
                            :file-list="fileListY">
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>
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
        </div>
    </div>
</template>

<script>
export default {
    components:{
        
    },
    data() {
        return {
            infoArr:[
                {
                    id:1,
                    timeVal1:'',
                    moneyVal1:'',
                    remarksVal1:'',
                    isEdit:true
                }
            ],
            otherArr:[{}],
            fileListL:[],
            fileListD:[],
            fileListX:[],
            fileListY:[],
            fileListQ:[],
            type:''
        }
    },

    mounted() {
        
    },

    methods:{
        handleAddmenu(type) {
            if(type === 'info') {
                let obj = {}
                let len = this.infoArr.length
                if(!len) {
                    obj = {
                            id:1,
                            timeVal1:'',
                            moneyVal1:'',
                            remarksVal1:'',
                            isEdit:true
                    }
                    this.infoArr.push(obj)
                    
                }else{
                    let number = this.infoArr[this.infoArr.length - 1].id
                
                    if(number > 10){
                        return
                    }
                    obj.id = number + 1
                    obj['timeVal' + (Number(number) + 1)] = ''
                    obj['moneyVal' + (Number(number) + 1)] = ''
                    obj['remarksVal' + (Number(number) + 1)] = ''
                    obj.isEdit = true
                    this.infoArr.push(obj)
                }
            }else if(type === 'other') {
                this.otherArr.push({})
            }
            
        },

        handleEdit(ind) {
            this.infoArr[ind].isEdit = false
        },
        
        handleDel(ind){
            this.infoArr.splice(ind, 1)
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
        },
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
            .st-oparate{
                height: 50px;
                display: flex;
                align-items: center;
                .st-oparate-col{
                    flex: 1;
                    & /deep/ .el-date-editor .el-input__inner,.el-date-editor.el-input{
                        width: 100%;
                    }
                    & /deep/ input{
                        text-align: center;
                        border: none;
                        padding: 0;
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
                        cursor: pointer;
                    }
                    .st-icon-del{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -377px -168px;
                        margin-left: 44px;
                        cursor: pointer;
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
                .upload-demo{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
    .st-others{
        .st-edit-content{
            
        }
    }
}
</style>