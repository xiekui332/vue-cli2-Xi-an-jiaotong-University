<template>
    <div class="node-wrapper">
        <!-- 执行资料 -->
        <div class="st-item st-templates">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content" v-show="!isSituatiostep">
                <div class="st-edit-item st-ed-head st-ed-indent">
                    <div><span>下载模板</span>&nbsp;&nbsp;&nbsp;&nbsp; <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in zlList" :key="ind" @click="handleUploadChange('1', ind, i.mb.id)">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file" @click="handleDownLoad(i)"></i>&nbsp;&nbsp;&nbsp;&nbsp;
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
                            :disabled="noDrop"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span   @click="handleDownHisFile(i)">{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>

                    </div>
                </div>                
            </div>   

            <!-- resource == situationstep -->
            <div v-show="isSituatiostep" class="st-edit-content st-edit-content-situation">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                    <div> <span>操作人</span></div>
                    <div> <span>操作时间</span></div>
                </div>

                <div class="st-edit-item st-ed-List" v-for="(i, ind) in zlList" :key="ind">
                    <div>{{i.mb.name}}</div>
                    <div class="allow-down" @click="handleDownLoadSitua(i.zl[0].attachUrl)">{{i.zl.length && i.zl[0].attachName?i.zl[0].attachName:""}}</div>
                    <div>{{i.zl.length && i.zl[0].createUserName?i.zl[0].createUserName:""}}</div>
                    <div>{{i.zl.length && i.zl[0].createTime?i.zl[0].createTime:""}}</div>
                </div>
            </div>        
        </div>

        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">其他资料</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" v-show="!isSituatiostep" @click="handleAddmenu('other')">增行</a>
            </div>

            <div class="st-edit-content" v-show="!isSituatiostep">
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

            <!-- resource == situationstep -->
            <div v-show="isSituatiostep" class="st-edit-content st-edit-content-situation">
                <div class="st-edit-item st-ed-head">
                    <div class="st-qt-name"> <span>资料名称</span></div>
                    <div> <span>操作人</span></div>
                    <div> <span>操作时间</span></div>
                </div>

                <div class="st-edit-item st-ed-List" v-for="(i, ind) in otherArr" :key="ind">
                    <div class="st-qt-name allow-down" @click="handleDownLoadSitua(i.attachUrl)">{{i.attachName}}</div>
                    <div>{{i.createUserName}}</div>
                    <div>{{i.createTime}}</div>
                </div>
            </div>
        </div>
        <el-row class="st-checkHandle" v-if="!noDrop" v-show="!isSituatiostep">
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
            getuploadUrl1:'',
            zlList:[],
            qtList:[],
            uploadType:'',
            uploadNo:'',
            otherArr:[{}],
            noDrop:false,
            spareI:'',
            fileList:[],
            loading:false,
            proNode:10,
            proNodeId:'f89c06640033474a97f7398679e84ba0',

            isSituatiostep:false
        }
    },
    methods:{

        handleDownLoadSitua(url) {
            window.open(url)
        },

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
            this.$http.post("/api/project/deletedNodeAppendixZxzl", params)
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
            this.$http.post("/api/project/uploadNodeAppendixZxzl", formData)
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


        handleDownLoad(i) {
            if(i.mb.url){
               window.open(i.mb.url)
            }else{
                this.$message.error(`系统管理员还没有上传此模板`); 
            }
        },
        handleFinishNode(){
            let params = {
                id:this.sessionGet.id
            }
            this.$http.post('/api/project/closeNodeZxzl', params)
            .then((res) => {
                if(res.code === '00000') {
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step8' + store.state.exactPath
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
            if(this.sessionGet.status > this.proNode || this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
                params.nodeId = this.proNodeId
                this.noDrop = true
                store.dispatch('commitChangeIsHistory',true)
                this.isSign = true
            }else{
                store.dispatch('commitChangeIsHistory',false)
            }

            this.$http.post("/api/project/getNodeAppendix", params)
            .then((res) => {
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
                        // console.log(this.otherArr)
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
        this.getProjectMsgById(this.sessionGet.id)

        // resource == situatiostep
        if(this.$route.name.indexOf("situatiostep") < 0) {
            this.isSituatiostep = false
        }else{
            this.isSituatiostep = true
        }

        // if(this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
        //     this.isSituatiostep = true
        // }
    }
}
</script>

<style lang="less" scoped>
.node-wrapper{
    @import url('../../Common/less/comItem.less');
    
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

    .st-templates{
        .st-edit-content {
            .st-ed-indent{
                >div:nth-child(1){
                    text-indent: 1em;
                }
            }
        }
        

        // resource == situation
        .st-edit-content-situation{
            .st-edit-item{
                line-height: 50px;
            }
            .st-ed-head > div:nth-child(1){
                text-indent: 0;
            }
            .st-ed-head > div{
                padding-left: 10px;
            }
            .st-ed-head > div:nth-child(1){
                min-width: 200px;
            }
            .st-ed-head > div:nth-child(2){
                min-width: 200px;
            }
            .st-ed-head > div:nth-child(4){
                min-width: 200px;
            }
            .st-ed-List{
                >div{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-left: 10px;
                }
                >div:nth-child(1){
                    min-width: 200px;
                }
                >div:nth-child(2){
                    min-width: 200px;
                }
                >div:nth-child(4){
                    min-width: 200px;
                }
            }
            .st-qt-name{
                min-width: 350px!important;
            }
            .allow-down{
                cursor: pointer;
                color: #3B7CFF;
            }
            
        }
    }
    
    
}
</style>


