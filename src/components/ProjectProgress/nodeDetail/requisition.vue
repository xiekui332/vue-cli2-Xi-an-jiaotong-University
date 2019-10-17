<template>
    <div class="node-wrapper">
        <!-- 采购申请 -->
        <div class="st-item st-caigou st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
            </div>

            <div class="st-edit-content"> 
                <div class="st-edit-item st-ed-head st-ed-one">
                    <div> <span>采购申请表</span></div>
                    <div> <span>操作</span></div>
                </div>
                <div class="st-edit-item st-oparate" style="line-height:50px;">
                    <div class="st-oparate-col">采购申请表</div>
                    <div class="st-oparate-col">
                        <span :class="noDrop?'pub-dis':''" @click="handleFillApplication('open')">填写申请单</span>
                        <span v-if="isSHZ==true">
                            <span @click="handleSub" v-show="!isSituatiostep" :class="noDrop?'pub-dis':''">提交审核</span><span v-show="!isSituatiostep" style="color:darkgray;font-size:12px;">(历史项目无需审核)</span>
                        </span>
                        <span v-show="isProgress" @click="handlePrint">打印</span>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content" v-show="!isSituatiostep">
                <div class="st-edit-item st-ed-head">
                    <div><span>下载模板</span>&nbsp;&nbsp;&nbsp;&nbsp; <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item"  v-for="(i, ind) in zlList" :key="ind" @click="handleUploadChange('1', ind, i.mb.id)">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file" @click="handleDownLoad(i)"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="st-file-title"><i class="st-tips-required" v-if="i.mb.isMust==0" >*</i> {{i.mb.name}}</span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            :action= getuploadUrl1
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span @click="handleDownHisFile(i)">{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>

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
                            :action= getuploadUrl1
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
                        
                        <span class="st-file-title st-file-span" @click="handleDownHisFile(i, 'qi')">{{i.attachName}} </span>
                        <span class="st-file-title">{{i.createTime}} </span>
                        <span class="st-file-title">{{i.createUserName}} </span>
                    </div>
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

        <FillAppalication 
            v-show="dialogVisibleFill"
            @handleFillApplication='handleFillApplication'
            :fillStatus='dialogVisibleFill'
            :hasLoad='hasLoad'
            />

        <el-dialog
            class="st-dialog-fill"
            :visible.sync='exchangeFill'
            :show-close='true'
            >
            <Success @handleDialog='handleDialog' :hasSuccessStatus='hasSuccessStatus' />
        </el-dialog>
    </div>
</template>

<script>
import FillAppalication from '@/components/Common/fillAppalication'
import Success from '@/components/Common/Success'
import { store } from "@/store"
export default {
    components:{
        FillAppalication,
        Success
    },
    data() {
        return {
            dialogVisibleFill:false,
            hasLoad:false,
            hasTips:false,
            otherArr:[{}],
            qtList:[],
            shpiFiles:[
                {
                    name:'abc',
                    time:'2019-10-01 12:00',
                    man:'谢奎'
                }
            ],
            hasSub:false,
            getuploadUrl1:'',
            sessionGet:{},
            zlList:[],
            uploadType:'',
            uploadNo:'',
            spareI:'',
            fileList:[],
            loading:false,
            proNode:7,
            proNodeId:'6a3c8fb95ebe4a4696cd13e2051473b4',
            noDrop:false,
            exchangeFill:false,
            hasSuccessStatus:true,
            alredayDone:false,

            isSituatiostep:false,
            isProgress:true,
            isSHZ:true
        }
    },

    methods:{
        handleFillApplication(type) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type === 'close') {
                this.dialogVisibleFill = false
            }else if(type === 'open') {
                this.dialogVisibleFill = true
            }
            
        },

        handleAddmenu(type) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type === 'info') {
                
            }else if(type === 'other') {
                this.otherArr.push({})
            }
            
        },

        getProjectMsgById(id){
            let params = {
                id:id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.sessionGet = res.data
                    if(res.data.spareIi){
                        this.isSHZ=false;
                    }else{
                        this.isSHZ=true;
                    }
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                }else{
                    
                }
            })
        },

        handleSub() {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let params = {
                pid:this.proInfo.id
            }

            if(this.alredayDone) {
                return false
            }
            this.$http.post("/api/project/tjspcgsq", params)
            .then((res) => {
                if(res.code == "00000") {
                    // this.$message({
                    //     type:'success',
                    //     message:'提交成功'
                    // })
                    this.alredayDone = true
                    this.exchangeFill = true
                    this.getProjectMsgById(this.sessionGet.id)
                    store.dispatch('commitChangeErrorTips',false)

                }else{
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                    this.noDrop = false
                }
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })
                this.noDrop = false
            })
        },

        handlePrint() {
            store.dispatch('commitChangeIsprint',true)
            this.dialogVisibleFill = true

        },


        handleBefore(file) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let limitCount = 1024*1024*5
            if(file.size > limitCount) {
                this.$message.error(`请选择小于5M的文件`);
                return false
            }
            this.files = file
            
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

        handleDownLoadSitua(url) {
            window.open(url)
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
            this.$http.post("/api/project/uploadNodeAppendixCgsq", formData)
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
            this.$http.post("/api/project/deletedNodeAppendixCgsq", params)
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

        getNodeAppendix() {
            let params = {
                pid:this.sessionGet.id,
                nodeId:this.sessionGet.projectNode
            }
            if(this.sessionGet.status > this.proNode || this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
                params.nodeId = this.proNodeId
                this.noDrop = true
                store.dispatch('commitChangeIsHistory',true)
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
                        // console.log(this.zlList)
                    }
                    if(res.data && res.data.qtList) {
                        this.qtList = res.data.qtList
                        this.otherArr = res.data.qtList
                        // console.log(this.otherArr)
                    }
                    if(res.data && res.data.spList) {
                        this.shpiFiles = res.data.spList
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
        

        handleFinishNode() {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let params = {
                id:this.sessionGet.id
            }
            this.loading = true
            this.$http.post("/api/project/closeNodeCgsq", params)
            .then((res) => {
                if(res.code == "00000") {
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step5' + store.state.exactPath
                    })
                }else{
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                }

                this.loading = false
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })

                this.loading = false
            })
        },

        handleDialog() {
            this.exchangeFill = false
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

        handleisProgress() {
            let params = {
                id:this.proInfo.id,
                nodeId:this.proInfo.projectNode
            }
            this.$http.post('/api/project/getExamineList', params)
            .then((res) => {
                if(res.code == '00000'){
                    let isprogress = res.data[res.data.length - 1].state
                    if(isprogress == 1) {
                        this.isProgress = true
                    }else{
                        this.isProgress = false
                    }

                }
            })
            .catch((err) => {
                
            })
            
        }

    },

    mounted() {
        this.sessionGet = store.state.proInfo
        this.getProjectMsgById(this.sessionGet.id)
        // this.handleisProgress();
        if(this.$route.name.indexOf("situatiostep") < 0) {
            this.isSituatiostep = false
        }else{
            this.isSituatiostep = true
        }

        // if(this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
        //     this.isSituatiostep = true
        // }
        
    },

    computed:{
        proInfo() {
            return store.state.proInfo
        },

        exprint() {
             return store.state.isprint
        }
    },

    watch:{
        exprint(params) {
           // console.log(params)
            if(!params) {
                this.dialogVisibleFill = false
            }
        }
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
                    text-align: left;
                    // text-indent: 5em;
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
            .st-edit-item{
                display: flex;
                // line-height: 50px;
                >div{
                    height: auto;
                    min-height: 50px;
                    flex: 1;
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
            .st-ed-one{
                text-indent: 5em;
            }
            
        }
    }
    
    .st-caigou{
        .st-oparate-col{
            text-indent: 3em;
        }
        .st-oparate-col:nth-child(1){
            font-size: 14px;
            color: #8998AC;
            letter-spacing: 0;
        }
        .st-oparate-col:nth-child(2){
            font-size: 14px;
            color: #3B7CFF;
            letter-spacing: 0;
            span{
                cursor: pointer;
            }
            span:nth-child(2){
                margin:0 10px;
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
                        text-align: left;
                        flex:1;
                    }
                    .st-file-span{
                        // display: flex;
                        // justify-content:flex-start;
                        cursor: pointer;
                        color: #3B7CFF;
                        padding-left: 10px;
                        width: 230px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
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
}
</style>

