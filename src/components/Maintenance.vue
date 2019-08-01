<template>
    <div id="root-wrapper">
        <p class="ro-title">执行计划维护</p>
        <div class="ro-item">
            <span class="ro-title-b">项目编号：</span>
            <div class="ro-item-content">
                <span class="ro-num">GS2019001</span>
                <el-checkbox class="ro-hasHistory" v-model="checked" @change="checkHistory" :disabled="hasDis">是否历史项目</el-checkbox>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目名称：</span>
            <div class="ro-item-content">
                <el-input v-model="name" placeholder="请输入内容" :disabled="hasDis"></el-input>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">立项时间：</span>
            <div class="ro-item-content">
                <el-date-picker
                    v-model="establishmenTime"
                    type="date"
                    placeholder="选择日期"
                    :clearable='hasClear'
                    :disabled="hasDis"
                    >
                </el-date-picker>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">计划周期：</span>
            <div class="ro-item-content">
                <el-date-picker
                    v-model="planningTime"
                    type="daterange"
                    placeholder="选择日期"
                    range-separator="~"
                    :clearable='hasClear'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :disabled="hasDis"
                    >
                </el-date-picker>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目预算：</span>
            <div class="ro-item-content">
                <el-input placeholder="请输入内容" class="ro-budget" v-model="budgetNum" :disabled="hasDis">
                    <template slot="append">万元</template>
                </el-input>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目类别：</span>
            <div class="ro-item-content">
                <el-select v-model="kind" placeholder="请选择" :disabled="hasDis" @change='handleSel()'>
                    <el-option
                    v-for="item in opt1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目类型：</span>
            <div class="ro-item-content">
                <el-select v-model="types" placeholder="请选择" :disabled="hasDis">
                    <el-option
                    v-for="item in opt2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">经费来源：</span>
            <div class="ro-item-content">
                <el-select v-model="moneySource" placeholder="请选择" :disabled="hasDis">
                    <el-option
                    v-for="item in opt3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目负责人：</span>
            <div class="ro-item-content">
                <el-select v-model="leading" placeholder="请选择" multiple :disabled="hasDis">
                    <el-option
                    v-for="item in opt1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目状态：</span>
            <div class="ro-item-content">
                <el-select v-model="proState" placeholder="请选择" :disabled="hasDis">
                    <el-option
                    v-for="item in opt1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目节点：</span>
            <div class="ro-item-content">
                <el-select v-model="proNode" placeholder="请选择" :disabled="hasDis">
                    <el-option
                    v-for="item in opt1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目说明：</span>
            <div class="ro-item-content">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="proNote"
                    :disabled="hasDis"
                    maxlength="200"
                    >
                </el-input>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">上传附件</span>
            <div class="ro-item-content">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                    :disabled="hasDis"
                    >
                    <el-button size="small" type="primary">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</el-button>
                </el-upload>
            </div>
        </div>

        <div class="ro-btn-wrapper">
            <el-row>
                <el-button type="primary" round class="ro-btn ro-cancel" @click="handleCancle" v-if="!hasDis">取消</el-button>
            </el-row>
            <el-row>
                <el-button type="primary" round class="ro-btn ro-save" v-if="!hasDis">保存</el-button>
            </el-row>
            <el-row>
                <el-button type="primary" round class="ro-btn ro-cancel" @click="handleCancle" v-if="hasDis">返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'hasDisabled'
    ],
    data() {
        return {
            checked:false,      // 当选择为历史项目时，必须填写项目负责人，反之项目负责人不是必填项
            name:'',
            establishmenTime:'',
            planningTime:'',
            hasClear:false,
            budgetNum:'19.2',    // 项目预算
            kind:'',            // 项目类别
            types:'',           // 项目类型
            moneySource:'',     // 经费来源
            leading:'',         // 项目负责人
            proState:'',        // 项目状态
            proNode:'',         // 项目节点
            proNote:'',         // 项目说明
            opt1: [
                {
                    value: '1',
                    label: '服务类'
                }, 
                {
                    value: '2',
                    label: '货物类'
                }, 
                {
                    value: '3',
                    label: '工程类'
                }
            ],
            opt2: [],
            opt3:[
                {
                    value:'1',
                    label:'改善办学条件'
                },
                {
                    value:'2',
                    label:'一流大学'
                },
                {
                    value:'3',
                    label:'校级专项'
                },
                {
                    value:'4',
                    label:'课题经费'
                },
                {
                    value:'5',
                    label:'银行投资经费'
                },
                {
                    value:'6',
                    label:'其他'
                }

            ],
            fileList:[],
            hasDis:this.hasDisabled
        }
    },
    methods:{
        checkHistory() {

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
        handleCancle() {
            this.$emit('hasMainPage', false)
        },
        handleSel() {
            
        }
    },
    watch: {
        hasDisabled(params) {
            this.hasDis = params
        },
        kind(params) {
            if(params == 1) {
                this.opt2 = [
                    {
                        value:1,
                        label:'服务项目'
                    }
                ]
                
            }else if(params == 2) {
                this.opt2 = [
                    {
                        value:1,
                        label:'软件项目'
                    },
                    {
                        value:2,
                        label:'硬件项目'
                    },
                    {
                        value:3,
                        label:'集成项目'
                    }
                ]
            }else if(params == 3) {
                this.opt2 = [
                    {
                        value:1,
                        label:'工程项目'
                    }
                ]
            }else{
                this.opt2 = []
            }
            
        }
        
    }
}
</script>

<style lang="less" scoped>

#root-wrapper{
    & /deep/ input::placeholder,& /deep/ textarea::placeholder{
        font-size: 12px!important;
    }
    & /deep/ input{
        font-size: 12px;
        color: #8998AC;
        letter-spacing: 0;
    }
    display: flex;
    flex-direction:column ;
    background: #ffffff;
    min-height: 100%;
    .ro-title{
        font-size: 18px;
        color: #3B4859;
        letter-spacing: 0;
        line-height: 24px;
        margin: 40px 0 30px 15%;
    }
    .ro-item{
        display: flex;
        justify-content: flex-start;
        margin-left: 20%;
        .ro-title-b{
            min-width: 100px;
            font-size: 16px;
            color: #39475B;
            letter-spacing: 0;
            line-height: 46px;
            margin-right: 20px;
        }
        .ro-item-content{
            line-height: 46px;
            width: 360px;
            display: flex;
            align-items: center;
            .ro-num{
                font-size: 12px;
                color: #3B4859;
                letter-spacing: 0;
                margin-left: 10px;
            }
            .ro-hasHistory{
                flex: 2;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                & /deep/ .el-checkbox__label{
                    font-size: 12px;
                    color: #3B4859;
                }
            }
            & /deep/ .el-input__prefix{
                // text-align: right;
                width: 25px;
                // right: 5px;
                left: 330px;
            }
            & /deep/ .el-input--prefix .el-input__inner{
                padding-left: 15px;
            }
            & /deep/ .el-date-editor .el-range__icon{
                position: absolute;
                right: 5px;
            }
            & /deep/ .el-input-group__append, .el-input-group__prepend{
                    background-color: #ffffff;
            }
            .ro-budget{
                & /deep/ .el-input__inner{
                    border-right: none;
                }
            }
            .el-select,& /deep/ .upload-demo,& /deep/ .el-upload,& /deep/ .el-button--primary{
                width: 100%;
            }
            .el-button--primary{
                background: #ffffff;
                border: 1px solid #F0F3F7;
                box-shadow: 0 2px 4px 0 #EFF2F7;
                border-radius: 4px;
                font-size: 12px;
                color: #8998AC;
                letter-spacing: 0;
                text-align: left;
            }
        }
        & /deep/ .el-input__inner::placeholder{
            font-size: 12px;
        }
        & /deep/ .el-input__inner{
            height: 36px;
            box-shadow: 0 2px 4px 0 #EFF2F7;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 100%;
        }
    }
    .ro-btn-wrapper{
        text-align: center;
        display: flex;
        justify-content: center;
        .ro-btn {
            padding: 7px 30px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
            margin-top: 40px;
            margin-bottom: 40px;
        }
        .ro-cancel{
            background: #F9FAFC;
            border: 1px solid #AEB9CA;
            color: #8392A7;
        }
        .ro-save{
            background: #3B7CFF;
            color: #FFFFFF;
            margin-left: 20px;
        }
    }
}
</style>