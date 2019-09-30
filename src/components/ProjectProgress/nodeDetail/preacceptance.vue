<template>
    <div class="node-wrapper">
        <!-- 验收-预验收 -->
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
                        <span class="st-file-title"><i class="st-tips-required" v-if="i.mb.isMust==0" >*</i> {{i.mb.name}}</span>
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

                        <p class="file-name"><span   @click="handleDownHisFile(i)">{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>

                    </div>
                </div>                
            </div>           
        </div>

        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">其他资料</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" @click="handleAddmenu('other')">增行</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料名称</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in otherArr" :key="ind" @click="handleUploadChange('0', ind)">
                    <div class="st-icon-file-title">
                        <i class="st-icon-file"></i>
                        <span class="st-file-title">其他资料 </span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            action= ""
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name">
                            <span @click="handleDownHisFile(i, 'qi')">{{i.attachName?i.attachName:''}}</span> 
                            <i :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.id, ind)"></i> 
                        </p>

                    </div>
                </div>
            </div>
        </div>
        <el-row class="st-checkHandle" v-if="!noDrop">
            <el-button type="primary" :disabled="noDrop" :loading="loading" @click="handleFinishNode()">完成本节点</el-button>
            <div class="st-checkHandle-tips">
                <i class="el-icon-info"></i>
                完成后项目进入下一节点，本节点将不能编辑信息、上传资料。
            </div>
        </el-row>
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
            otherArr:[{}],
            getuploadUrl1:'',
            zlList:[],
            qtList:[],
            uploadType:'',
            uploadNo:'',
            otherArr:[{}],
            noDrop:false,
            fileList:[],
            loading:false,
            proNode:12,
            proNodeId:'bf63eaa047b34cc7820b0ed05d94cd86'
        }
    },

    methods:{
        handleBefore(file) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            this.files = file

            let limitCount = 1024*1024*5
            if(file.size > limitCount) {
                this.$message.error(`请选择小于5M的文件`);
                return false
            }
            
            if(this.uploadType == "1") {
                if(this.zlList[this.uploadNo - 1].zl.length) {
                    this.$message.error(`如需更换文件请先删除后操作`);
                    return false
                }
            }else if(this.uploadType == "0") {

                if(this.qtList.length && this.qtList[this.uploadNo - 1].attachName) {
                    this.$message.error(`如需更换文件请先删除后操作`);
                    return false
                }
            }
            
        },
        handleAddmenu(type) {
            if(type === 'other') {
                this.otherArr.push({})
            }
        },
        handleDownLoad(i) {
            if(i.mb.url){
               window.open(i.mb.url)
            }else{
                this.$message.error(`系统管理员还没有上传此模板`); 
            }
        },
        handleDownHisFile(i, type) {
            if(type) {
                let url = i.attachUrl
                window.open(url)
            }else{
                let url = i.zl[0].attachUrl
                let name = i.zl[0].attachName
                window.open(url)
            }
           
        },
        handleFileDel(id, ind) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }

            if(!id) {
                this.otherArr.splice(ind, 1)
                return false
            }

            let params = {
                appendixId:id
            }
            this.fileList = []
            this.$http.post("/api/project/deletedNodeAppendixYys", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:"success",
                        message:res.message
                    }) 
                    
                    this.getNodeAppendix()

                }else{
                   this.$message({
                        type:"error",
                        message:res.message
                    }) 
                }
            })
            .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
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
            this.fileList = []
            this.$http.post("/api/project/uploadNodeAppendixYys", formData)
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
                        message:res.message
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
        handleFinishNode(){
            let params = {
                id:this.sessionGet.id
            }
            this.$http.post('/api/project/closeNodeYys', params)
            .then((res) => {
                if(res.code === '00000') {
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step10' + store.state.exactPath
                    })
                    this.$message({
                        type:'success',
                        message:res.message
                    })
                }else{
                     this.$message.error(res.message); 
                }
            })
        },
        getProjectMsgById(id){
            let params = {
                id:id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.sessionGet = res.data
                    if( res.data.arrivalTime){
                        this.val2=res.data.arrivalTime;
                    }
                    if( res.data.installationAddress){
                        this.val1=res.data.installationAddress;
                    }
                    if( res.data.installationTime){
                        this.val3=res.data.installationTime;
                    }
                    if(res.data.ysTjuserId){
                        if(res.data.ysJsgf==2||res.data.ysSjsj==2||res.data.ysWlaq==2||res.data.ysXqgn==2){
                            this.haslk=false;
                        }else{
                            this.haslk=true;
                        }
                    }
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                }else{
                    
                }
            })
        },
        getNodeAppendix() {
            let params = {
                pid:this.sessionGet.id,
                nodeId:this.sessionGet.projectNode
            }
            if(this.sessionGet.status > this.proNode) {
                params.nodeId = this.proNodeId
                this.noDrop = true
                store.dispatch('commitChangeIsHistory',true)
                this.isSign = true
            }else{
                store.dispatch('commitChangeIsHistory',false)
            }

            this.$http.post("/api/project/getNodeAppendix", params)
            .then((res) => {
                console.log(res)
                if(res.code == "00000") {
                    if(res.data && res.data.zlList) {
                        for(let i = 0; i < res.data.zlList.length; i ++) {
                            res.data.zlList[i]['isRequest'] = true
                        }
                        this.zlList = res.data.zlList
                        
                    }
                    if(res.data && res.data.qtList) {
                        this.qtList = res.data.qtList
                        this.otherArr = res.data.qtList
                    }
                    if(res.data && res.data.spList) {
                        this.shpiFiles = res.data.spList
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
        }
    },
    mounted() {
        this.sessionGet = store.state.proInfo
        this.getProjectMsgById(this.sessionGet.id)
    }
}
</script>

<style lang="less" scoped>
.node-wrapper{
    @import url('../../Common/less/comItem.less');

    .st-icon-none{
        .st-icon-file{
            background-position: 0 0!important;
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
        .st-checkHandle-tips{
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            i{
                font-size: 16px;
                border-radius: 50%;
                color: #3B7CFF;
            }
       }
    }
    .pub-dis{
        cursor: no-drop!important;
    }
    .pub-dis:hover{
        color: #39475B!important;
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
            cursor: pointer;
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
            color: #3B7CFF;
        }
    }
}
</style>


