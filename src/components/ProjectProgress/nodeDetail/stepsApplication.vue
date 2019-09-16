<template>
    <div class="node-wrapper">
        <!-- 立项申请 -->
        <div class="st-item">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" @click="handleAddmenu('info')">添加</a>
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
                        v-model="i.timeVal"
                        type="date"
                        placeholder="选择日期"
                        :disabled='i.isEdit'
                        value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.percentVal" placeholder="请输入内容" type='number' :disabled='i.isEdit' @change="handlePer(ind)"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.moneyVal" placeholder="请输入内容" type='number' :disabled='true'></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.remarksVal" placeholder="请输入备注(选填)" :disabled='i.isEdit' maxlength='20'></el-input>
                    </div>
                    <div class="st-oparate-col st-oparate-btn">
                        <i :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleItem('edit', ind)">编辑</i>
                        <i :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleItem('del', ind)">删除</i>
                        <i :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleItem('mit', ind)">提交</i>
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
                <div class="st-edit-item" v-for="(i, ind) in zlList" :key="ind" @click="handleUploadChange('1', ind, i.mb.id)">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file" @click="handleDownLoad(i)"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> {{i.mb.name}}</span>
                    </div>
                    <div class="st-icon-file-name">

                        <el-upload
                            class="upload-demo"
                            :action= getuploadUrl1
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="handleSuccess"
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            :on-exceed="handleExceed"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span>{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="st-item st-templates st-others">
            <div class="st-item-header">
                <span class="pub-family">其他资料</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" @click="handleAddmenu('other')">增行</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料名称</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in otherArr" :key="ind" @click="handleUploadChange('0', ind)">
                    <div class="st-icon-file-title">
                        <i class=" st-icon-file"></i>
                        <span class="st-file-title"> 其他资料</span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            :action= getuploadUrl1
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :on-success="handleSuccess"
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            :on-exceed="handleExceed"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span>{{i.attachName?i.attachName:''}}</span> <i v-if="i.attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.id)"></i> </p>
                    </div>
                </div>
            </div>
        </div>

        <el-row class="st-checkHandle">
            <el-button type="primary" :loading="loading" :disabled="noDrop" @click="handleFinishNode()">完成本节点</el-button>
            <div class="st-checkHandle-tips">
                <i class="el-icon-info"></i>
                完成后项目进入下一节点，本节点将不能编辑信息、上传资料。
            </div>
        </el-row>
    </div>
</template>

<script>
import { uploadUrl1 } from '../../../utils/util.js'
import { store } from '@/store'
export default {
    components:{
        
    },
    data() {
        return {
            infoArr:[
                {
                    timeVal:'',
                    moneyVal:'',
                    remarksVal:'',
                    percentVal:'',
                    isEdit:true
                }
            ],
            otherArr:[],
            fileList:[],
            fileListD:[],
            fileListX:[],
            fileListY:[],
            fileListQ:[],
            type:'',
            sessionGet:{},
            zlList:[],
            qtList:[],
            isClear:false,
            fileName:'',
            fileType:'',
            fileUrl:'',
            getuploadUrl1:'',
            uploadType:'',
            uploadNo:'',
            spareI:'',
            uploadParams:{},
            files:[],
            loading:false,
            proNode:4,
            proNodeId:'716aa0fd239a4aa1b9469592122782c9',
            noDrop:false
        }
    },

    methods:{
        handleAddmenu(type) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type === 'info') {
                let obj = {}
                let len = this.infoArr.length
                if(len > 5){
                    return
                }
                obj = {
                    timeVal:'',
                    moneyVal:'',
                    remarksVal:'',
                    percentVal:'',
                    isEdit:true
                }
                this.infoArr.push(obj)
            }else if(type === 'other') {
                this.otherArr.push({})
            }
            
        },

        handleItem(type, ind) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type == "edit") {
                this.infoArr[ind].isEdit = false
            }else if(type == 'del') {
                // console.log(this.infoArr[ind])
                let params = {
                    pid:this.sessionGet.id,
                    id:this.infoArr[ind].id
                }
                if(this.infoArr[ind].id){
                    this.$http.post("/api/project/deletePayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:"success",
                                message:res.message
                            })
                            this.getPayMentRecodeList()
                        }else{
                            this.$message({
                                type:"error",
                                message:res.message
                            })
                        }
                    })
                }else{
                    // console.log(this.infoArr)
                    this.infoArr.splice(ind,1)
                }

                

            }else if(type == 'mit') {
                
                if(this.infoArr[ind].id) {
                    let params = {
                        pid:this.sessionGet.id,
                        id:this.infoArr[ind].id,
                        expectTime:this.infoArr[ind].timeVal,
                        remark:this.infoArr[ind].remarksVal,
                        payRatio:this.infoArr[ind].percentVal
                    }
                    this.$http.post("/api/project/updatePayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:"success",
                                message:res.message
                            })
                            this.getPayMentRecodeList()
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

                }else{
                    let params = {
                        pid:this.sessionGet.id,
                        expectTime:this.infoArr[ind].timeVal,
                        remark:this.infoArr[ind].remarksVal,
                        ratio:this.infoArr[ind].percentVal
                    }
                    this.$http.post("/api/project/addPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:"success",
                                message:res.message
                            })
                            this.getPayMentRecodeList()
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
                }

                
            }
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，如需更换文件请先删除后操作`);
        },
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${ file.name }？`);
        },
        
        handleSuccess(res,file,fileList) {
            console.log(res);
        },

        getPayMentRecodeList() {
            let params = {
                projectId:this.sessionGet.id
            }
            this.$http.post("/api/project/getPayMentRecodeList", params)
            .then((res) => {
                if(res.code == "00000") {
                    if(res.data) {
                        let arr = []
                        for(let i = 0;i < res.data.length; i ++) {
                            let obj = {}
                            obj.timeVal = res.data[i].expectTime
                            obj.moneyVal = res.data[i].payMoney
                            obj.remarksVal = res.data[i].remark
                            obj.percentVal = res.data[i].payRatio
                            obj.id = res.data[i].id
                            obj.pid = res.data[i].pid
                            obj.isEdit = true
                            arr.push(obj)
                        }
                        this.infoArr = arr
                    }
                    
                }else{
                    let arr = [{
                        timeVal:'',
                        moneyVal:'',
                        remarksVal:'',
                        percentVal:'',
                        isEdit:true
                    }]
                    this.infoArr = arr
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
            // console.log(this.sessionGet)
            let params = {
                pid:this.sessionGet.id,
                nodeId:store.state.proInfo.projectNode
            }
            if(this.sessionGet.status > this.proNode) {
                params.nodeId = this.proNodeId
                this.noDrop = true
            }

            this.$http.post("/api/project/getNodeAppendix", params)
            .then((res) => {
                if(res.code == "00000") {
                    if(res.data && res.data.zlList) {
                        for(let i = 0; i < res.data.zlList.length; i ++) {
                            let pop = res.data.zlList[i].mb.spareI.indexOf('.')
                        }
                        this.zlList = res.data.zlList
                        // console.log(this.zlList)
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

        handlePer(ind) {
            let count = Number(this.infoArr[ind].percentVal)
            let newCount = (count * 0.01)
            if(count > 0 && count%1 === 0) {
                this.infoArr[ind].moneyVal = (this.sessionGet.ysje * count * 0.01).toFixed(2)
            }else{
                this.infoArr[ind].percentVal = ''
                this.infoArr[ind].moneyVal = ''
            }
            
            
        },

        handleUpload(params){
            this.fileName=params.fileName;
            this.fileUrl=params.fileUrl;
            this.fileType=params.fileType;
        },

        handleDownLoad(i) {
            // console.log(i.mb.url)
            // let testUrl = "http://timesheet.pactera.com/Log/Unlockapplicationform.xlsx"
            window.open(i.mb.url)
        },

        handleBefore(file) {
            this.files = file
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(this.uploadType == "1") {
                if(this.zlList[this.uploadNo - 1].zl.length) {
                    this.$message.warning(`当前限制选择 1 个文件，如需更换文件请先删除后操作`);
                    return false
                }
            }else if(this.uploadType == "0") {

                if(this.qtList.length && this.qtList[this.uploadNo - 1].attachName) {
                    this.$message.warning(`当前限制选择 1 个文件，如需更换文件请先删除后操作`);
                    return false
                }
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
            this.$http.post("/api/project/uploadNodeAppendixLxsq", formData)
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

        handleFileDel(id) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let params = {
                appendixId:id
            }

            this.fileList = []
            this.$http.post("/api/project/deletedNodeAppendixLxsq", params)
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

        handleFinishNode() {
            // console.log(this.infoArr)
            if(this.sessionGet.status > this.proNode) {
                return false
            }

            let status = true
            
            for(let i = 0; i < this.infoArr.length; i ++) {
                if(!this.infoArr[i].timeVal || !this.infoArr[i].percentVal || !this.infoArr[i].moneyVal) {
                    status = false
                }
            }
            
            if(!status) {
                this.$message.warning("请完成付款计划")
                return 
            }

            let params = {
                id:this.sessionGet.id
            }
            this.loading = true
            this.$http.post("/api/project/closeNodeLxsq", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.$router.push({
                        path:'step2' + store.state.exactPath
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
        }
    },

    mounted() {
        this.sessionGet = store.state.proInfo
        // console.log(this.sessionGet)
        this.getPayMentRecodeList();
        this.getProjectMsgById(this.sessionGet.id)
        
    },

    created() {
        this.getuploadUrl1 = uploadUrl1
        // console.log(this.getuploadUrl1)
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
                        margin:0 10px;
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
                    i{
                        font-size: 13px;
                        color: #39475B;
                        cursor: pointer;
                    }
                    i:hover{
                        color:#3B7CFF;
                    }
                    i:nth-child(2) {
                        margin:0 10px;
                    }
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
                    justify-content: flex-start;
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
                }
            }
        }
    }
    .st-others{
        .st-edit-content{
            
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