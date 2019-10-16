<!--技术指标验收  -->
<template>
    <div class="node-wrapper">
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
                <span class="pub-family st-print">
                <span class="pub-family st-print" @click="handleAddMsg()"  v-if="!noDrop">保存</span>
                </span>
            </div>

            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>退保情况：</span>
                    <el-radio v-model="radio" :disabled="noDrop" label="1">全额退保</el-radio>
                    <el-radio v-model="radio" :disabled="noDrop" label="2">不予退还</el-radio>
                </div>
            </div>
            
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>实际退还%：</span>
                    <el-input class="pl-input-box" type="number" :disabled="isTrue" @change="handleChangeMoney()" v-model="val1" placeholder="请输入内容"></el-input>
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
                    v-model="val3"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box"
                    :disabled="isTrue">
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name" v-if="radio === '2'"><i>*</i>不予退还原因：</span>
                    <el-input class="pl-input-box" v-if="radio === '2'" v-model="val4" placeholder="请输入内容"></el-input>
                </div>
            </div>
            
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>备注说明：</span>
                    <el-input class="pl-input-box" v-model="val5" type="textarea" rows="2" :disabled="noDrop" placeholder="请输入内容"></el-input>
                </div>
            </div>
        </div>

        <!-- 模板资料 -->
        <div class="st-item st-templates">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content" v-show="!isSituatiostep">
                <div class="st-edit-item st-ed-head">
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
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
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

        <!-- 其他资料 -->
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
                        <!-- <i class="st-icon-file"></i> -->
                        <span class="st-file-title st-file-title-indent">其他资料 </span>
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
            isTrue:false,
            radio: '1',
            val1:'',
            val2:'',
            val3:'',
            val4:'',
            val5:'',
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
            proNode:15,
            proNodeId:'6ddb7d3f3e184a6abe855324c91422e8',
            isMust:true,
            zbaoje:0,

            isSituatiostep:false
        };
    },

  computed: {},

  methods: {

        handleDownLoadSitua(url) {
            window.open(url)
        },

        handleAddMsg(){
            var params={id:this.sessionGet.id,isTbao:this.radio,tbaoRatio:this.val1,nTbaoRemark:this.val4,tbaoremark:this.val5,tbaoTime:this.val3};
            this.$http.post("/api/project/addJszbMsg",params).then(res =>{
                if(res.code=="00000"){
                    this.getProjectMsgById(this.sessionGet.id);
                    this.$message.success(res.message);
                }else{
                     this.$message.error(res.message);
                }
            })
       },
        handleChangeMoney(){
          this.val2 = (this.zbaoje * this.val1 *0.01).toFixed(2);
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
            this.$http.post("/api/project/deletedNodeAppendixJszbsp", params)
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
            this.$http.post("/api/project/uploadNodeAppendixJszbsp", formData)
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
            this.$http.post('/api/project/closeNodeJszbsp', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.$message({type:'success',message:res.message })
                    setTimeout(() => {
                       this.$router.push({
                        path:"/proj/excuting?pid=b83ce29ef56849b8b43a51293e2faf00&id=f2ed28e9b1f9426eb65ebd5a81e841a4"
                    })
                   }, 200);                  
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
                    if(res.data.isTbao){    
                        if(res.data.isTbao!=0){ 
                            if(res.data.isTbao==1){
                                this.radio='1';
                                if( res.data.sjTaoMoney){
                                    this.val2=res.data.sjTaoMoney;
                                }
                                if( res.data.sjTbaoTime){
                                    this.val3=res.data.sjTbaoTime;
                                }
                                if( res.data.sjTbaoRatio){
                                    this.val1=res.data.sjTbaoRatio;
                                }

                            }else{
                                this.radio='2'; 
                                if( res.data.nTbaoRemark){
                                    this.val4=res.data.nTbaoRemark;
                                }
                                this.val1='';
                                this.val2='';
                                this.val3='';
                            }
                        }                           
                    }
                    if( res.data.tbaoRemark){
                        this.val5=res.data.tbaoRemark;
                    }
                    if(res.data.zbaoje){
                        this.zbaoje=res.data.zbaoje;
                    }
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                }
            })
        },
        getNodeAppendix() {
            
            let params = {
                pid:this.sessionGet.id, 
                nodeId:this.sessionGet.projectNode
            }
            if(this.sessionGet.status > this.proNode || this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
                params.nodeId = this.proNodeId;
                this.noDrop = true;
                this.isTrue=true;
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
                }
            })
            .catch((err) => {
                this.$message({ type:"error", message:err.message})
            })
        }
},

mounted() {
    this.sessionGet = store.state.proInfo
    this.getProjectMsgById(this.sessionGet.id)

    // resource == situatiostep
    if(this.$route.name.indexOf("situatiostep") < 0) {
        this.isSituatiostep = false
    }else{
        this.isSituatiostep = true
        this.noDrop = true;
        this.isTrue=true;
    }

    // if(this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
    //     this.isSituatiostep = true
    // }
},

watch:{
    radio(params){
        if(params==2){
            this.isTrue=true;
        }else{
                this.isTrue=false;
        }
    }
}
}

</script>

<style lang='less' scoped>
.node-wrapper{
    @import url('../../Common/less/comItem.less');
    .st-item .st-item-header{
        .st-print{
            font-size: 14px;
            color: #3B7CFF;
            cursor: pointer;
        }
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
                        display: flex;
                        justify-content:flex-start;
                        cursor: pointer;
                        color: #3B7CFF;
                        text-indent:1em;
                    }
                    .st-file-title-indent{
                        text-indent: 1em;
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
}
</style>