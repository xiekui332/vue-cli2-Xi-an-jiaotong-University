<!-- 付款资料上传 -->
<template>
    <div id="wrapper">
        <div class="st-item st-templates st-others">
            <div class="st-item-header">
                <span class="pub-family">付款资料上传</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" @click="handleAddmenu('other')">增行</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div><span>下载模板</span>&nbsp;&nbsp;&nbsp;&nbsp; <span>资料名称</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in otherArr" :key="ind" @click="handleUploadChange('0', ind)">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="st-file-title"> 付款资料</span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            :action= getuploadUrl1
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            accept='.xls,.xlsx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span @click="handleDownHisFile(i)">{{i.attachName?i.attachName:''}}</span> <i :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.id, ind)"></i> </p>

                    </div>
                </div>
            </div>

        </div>

        <el-row class="st-checkHandle" v-if="!noDrop">
            <el-button type="primary" :disabled="noDrop" :loading="loading" @click="handleFinishNode()">完成</el-button>
        </el-row>
    </div>
</template>

<script>

export default {
    components: {},
    data () {
        return {
            noDrop:false,
            otherArr:[],
            fileList:[],
            getuploadUrl1:"",
            loading:false
        };
    },

    computed: {},

    mounted() {

    },

    methods: {
        handleAddmenu() {
            if(this.otherArr.length < 20) {
                this.otherArr.push({})
            }
            
        },
        
        handleUploadChange(type, ind, id) {
            if(type == "1") {
                this.uploadType = type
                this.uploadNo = ind + 1
                this.spareI = id
            }else if(type == "0") {
                this.uploadType = type
                this.uploadNo = ind + 1
            }
            
        },

        handleBefore() {

        },

        customRequest() {

        },

        handleDownHisFile(i) {

        },

        handleFileDel(id, ind) {
            if(!id) {
                this.otherArr.splice(ind, 1)
            }else{

            }
        },

        handleFinishNode() {
            this.$router.push({
                path:"/proj/all?pid=b83ce29ef56849b8b43a51293e2faf00&id=5778c6ea4c79411b8ec92f6f57d8db8f"
            })
        }
    }
}

</script>

<style lang='less' scoped>
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
                text-indent: 1em;
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
                    width: 40px;
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

                .upload-demo{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    & /deep/ .el-upload-list{
                        opacity: 0;
                        width: 0;
                        height: 0;
                        display: none;
                    }
                }
                .file-name{
                    float: left;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                    i{
                        margin: 0 10px 0 0;
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -377px -168px;
                        margin:0 10px;
                        cursor: pointer;
                        opacity: .2;
                        transition: all .3s ease;
                    }
                }
                .file-name:hover{
                    i{
                        opacity: 1;
                    }
                    color: #3B7CFF;
                }
            }
        }
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
    }
</style>