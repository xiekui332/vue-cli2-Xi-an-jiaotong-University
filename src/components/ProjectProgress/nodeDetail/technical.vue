<!--技术指标验收  -->
<template>
    <div class="node-wrapper">
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
            </div>

            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>退保情况：</span>
                    <el-radio v-model="radio" label="1">全额退保</el-radio>
                    <el-radio v-model="radio" label="2">不予退还</el-radio>
                </div>
            </div>
            
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>实际退还%：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>退还质保金额：</span>
                    <el-input class="pl-input-box" v-model="val2" placeholder="请输入内容" :disabled="isMust"></el-input>
                </div>
            </div>
            
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>实际退还日期：</span>
                    <el-date-picker
                    v-model="val1"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box">
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name" v-if="radio === '2'"><i></i>不予退还原因：</span>
                    <el-input class="pl-input-box" v-if="radio === '2'" v-model="val2" placeholder="请输入内容"></el-input>
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

        <!-- 其他资料 -->
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
            <el-button type="primary" :disabled="noDrop" :loading="loading" @click="handleFinishNode()">项目结题</el-button>
            <div class="st-checkHandle-tips">
                <i class="el-icon-info"></i>
                结题后项目完结，不能编辑、上传资料。
            </div>
        </el-row>
    </div>
</template>

<script>
import { store } from "@/store"
export default {
    components:{
        
    },
    data () {
        return {
            radio: '1',
            hasTips:false,
            val1:'',
            val2:'',
            val3:'',
            haslk:false,
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
            proNode:14,
            proNodeId:'a2414bacf75144098799a178f0ff2a41',
            shpiFiles:[],
            isMust:true,
            zbaoje:0
        };
    },

  computed: {},

  mounted() {},

  methods: {
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
            this.$http.post("/api/project/deletedNodeAppendixWbjssq", params)
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
            this.$http.post("/api/project/uploadNodeAppendixWbjssq", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })  
                    this.getNodeAppendix()
                }else{
                    this.$message({type:'error',message:res.message })
                }
            })
            .catch((err) => {
                this.$message({ type:'error', message:err.message })
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
            let params = {id:this.sessionGet.id}
            this.$http.post('/api/project/closeNodeWbjssq', params)
            .then((res) => {
                if(res.code === '00000') {
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step9' + store.state.exactPath
                    })
                    this.$message({type:'success',message:res.message })
                }else{
                     this.$message.error(res.message); 
                }
            })
        },
        getProjectMsgById(id){
            let params = {id:id}
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.sessionGet = res.data
                    if( res.data.tZbj){
                        this.val2=res.data.tZbj;
                    }
                    if( res.data.tZbjRatio){
                        this.val1=res.data.tZbjRatio;
                    }
                    if( res.data.tZbjRemark){
                        this.val3=res.data.tZbjRemark;
                    }
                    if(res.data.zbaoje){
                        this.zbaoje=res.data.zbaoje;
                    }
                    if(res.data.ysfhTjuserId){
                        if(res.data.wbJsys==2||res.data.wbSjys==2||res.data.wbAqys==2||res.data.wbGnys==2){
                            this.haslk=false;
                        }else{
                            this.haslk=true;
                        }
                    }
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                }
            })
        },
        getNodeAppendix() {
            let params = {pid:this.sessionGet.id, nodeId:this.sessionGet.projectNode}
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
                }
            })
            .catch((err) => {
                this.$message({ type:"error", message:err.message})
            })
        }
    }
}

</script>

<style lang='less' scoped>
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
    .st-icon-none{
        .st-icon-file{
            background-position: 0 0!important;
        }
    }
}
</style>