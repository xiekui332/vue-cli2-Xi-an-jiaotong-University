<template>
    <div class="node-wrapper">
        <!-- 执行资料 -->
        <div class="st-item st-templates">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in zlList" :key="ind" @click="handleUploadChange('1', ind, i.mb.id)">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file" @click="handleDownLoad(i)"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> {{i.mb.name}}</span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            :action="getuploadUrl1"
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span>{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" class="pub-css" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>

                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script>
import { store } from "@/store"
export default {
    components:{
        
    },
    data() {
        return {
            hasTips:false,

            getuploadUrl1:'',
            zlList:[],
            uploadType:'',
            uploadNo:'',
            spareI:'',
            fileList:[],
            loading:false,
            proNode:10,
            proNodeId:'f89c06640033474a97f7398679e84ba0'
        }
    },
    methods:{
        handleBefore(file) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            this.files = file
            
            if(this.uploadType == "1") {
                if(this.zlList[this.uploadNo - 1].zl.length) {
                    this.$message.warning(`如需更换文件请先删除后操作`);
                    return false
                }
            }else if(this.uploadType == "0") {

                if(this.qtList.length && this.qtList[this.uploadNo - 1].attachName) {
                    this.$message.warning(`如需更换文件请先删除后操作`);
                    return false
                }
            }
            
        },


        customRequest() {
            const formData = new FormData();
            
            formData.append('pid',this.sessionGet.id);
            formData.append('files',this.files);
            formData.append('nodeId',this.sessionGet.projectNode);
            if(this.uploadType == "1") {
                formData.append('type',this.uploadType);
                formData.append('no',this.uploadNo);
                formData.append('spareI',this.spareI);
            }else if(this.uploadType == "0") {
                formData.append('type',this.uploadType);
                formData.append('no',"");
                formData.append('spareI',"");
            }
            
            // console.log(formData)
            this.fileList = []
            this.$http.post("/api/project/uploadNodeAppendixCgh", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })
                    
                    this.getNodeAppendix()
                }else{
                    this.$message({
                        type:'error',
                        message:err.message
                    })
                }
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })
            })
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


        handleDownLoad(i) {
             window.open(i.mb.url)
        },


        getProjectMsgById(id){
            let params = {
                id:id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.sessionGet = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                }else{
                    
                }
            })
        },


        getNodeAppendix() {
            // console.log(this.sessionGet)
            let params = {
                pid:this.sessionGet.id,
                nodeId:this.sessionGet.projectNode
            }
            if(this.sessionGet.status > this.proNode) {
                params.nodeId = this.proNodeId
            }

            this.$http.post("/api/project/getNodeAppendix", params)
            .then((res) => {
                if(res.code == "00000") {
                    if(res.data && res.data.zlList) {
                        for(let i = 0; i < res.data.zlList.length; i ++) {
                            res.data.zlList[i]['isRequest'] = true
                        }
                        this.zlList = res.data.zlList
                        // console.log(this.zlList)
                    }

                }else{
                    
                }
            })
            .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        },


    },
    mounted() {
        this.sessionGet = store.state.proInfo
        // console.log(this.sessionGet)
        this.getProjectMsgById(this.sessionGet.id)
    }
}
</script>

<style lang="less" scoped>
.node-wrapper{
    @import url('../../Common/less/comItem.less');
    .st-icon-file{
        background-position: 0 0!important;
    }
    
    .st-templates .st-edit-content .st-edit-item .st-icon-file-name{
        .upload-demo{
            width: 40px;
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
            i{
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
        }
    }
    
    
}
</style>


