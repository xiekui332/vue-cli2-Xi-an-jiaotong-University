<template>
    <div id="pl-wrapper">
        <!-- 合同签订 -->
        <div class="pl-info">
            <div class="pl-info-title pub-family">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;信息填写(合同信息)</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" @click="handleAddmenu('save')">保存</a>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>供应商：</span>
                    <el-input class="pl-input-box" v-model="getContract.supplier" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>中标金额：</span>
                    <el-input class="pl-input-box" v-model="getContract.zbiaoJe" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"><template slot="append">万元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>中标服务费：</span>
                    <el-radio v-model="getContract.isServiceFee" label="1" :disabled="this.sessionGet.status > this.proNode?true:false">需要</el-radio>
                    <el-radio v-model="getContract.isServiceFee" label="0" :disabled="this.sessionGet.status > this.proNode?true:false">不需要</el-radio>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>服务费金额：</span>
                    <el-input class="pl-input-box" v-model="getContract.serviceFee" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"><template slot="append">元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>合同签订日期：</span>
                    <el-date-picker
                    v-model="getContract.contractTime"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box" 
                    value-format="yyyy-MM-dd"
                    :disabled="this.sessionGet.status > this.proNode?true:false"
                    >
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>维保期：</span>
                    <el-input class="pl-input-box" v-model="getContract.repairPeriod" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"><template slot="append">年</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>质保金%：</span>
                    <el-input class="pl-input-box" @change="handleChangeMoney" v-model="getContract.retentionMoney" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"><template slot="append">%</template></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>质保金额：</span>
                    <el-input class="pl-input-box" :disabled="true" v-model="getContract.zbaoje" placeholder="请输入内容"><template slot="append">万元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>招标编号：</span>
                    <el-input class="pl-input-box" v-model="getContract.biddinfNo" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>合同编号：</span>
                    <el-input class="pl-input-box" v-model="getContract.contractNo" placeholder="请输入内容" :disabled="this.sessionGet.status > this.proNode?true:false"></el-input>
                </div>
            </div>

        </div>



        <div class="st-item">
            <div class="st-item-header">
                <span class="pub-family">信息填写(付款信息)</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" @click="handleAddmenu('fill')">添加</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div><i>*</i> <span>付款时间</span></div>
                    <div><i>*</i> <span>付款比%</span></div>
                    <div><i>*</i> <span>付款金额(万)</span></div>
                    <div><i>*</i> <span>剩余付款金额(万)</span></div>
                    <div> <span>备注</span></div>
                    <div> <span>操作</span></div>
                </div>

                <div class="st-edit-item st-oparate" v-for="(i, ind) in infoArr" :key="ind">
                    <div class="st-oparate-col">
                        <el-date-picker
                        v-model="i.actualTime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        :disabled="sessionGet.status > proNode?true:false" 
                        >
                        </el-date-picker>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.payRatio" @change="handleChangepayMoney(i, ind)" placeholder="请输入内容" type='number' :disabled="sessionGet.status > proNode?true:false" ></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.payMoney" placeholder="请输入内容" type='number' :disabled="true"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.surplusMoney" placeholder="请输入内容" type='number' :disabled="true"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.remark" placeholder="请输入备注(选填)" maxlength='20' :disabled="sessionGet.status > proNode?true:false" ></el-input>
                    </div>
                    <div class="st-oparate-col st-oparate-btn">
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i)"> 编辑</i>
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i, 'sub')"> 提交</i>
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i, 'del')"> 删除</i>
                    </div>
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
                        <span class="st-file-title"><i class="st-tips-required">*</i>  {{i.mb.name}}</span>
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

                        <p class="file-name"><span>{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>

                    </div>
                </div>

            </div>
        </div>

        <el-row class="st-checkHandle">
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
            val1:'',
            radio: '1',
            infoArr:[
                {
                    actualTime:"",
                    payRatio:"",
                    payMoney:"",
                    surplusMoney:"",
                    remark:"",
                    id:"",
                    pid:""
                }
            ],
            otherArr:[{}],
            fileListL:[],
            fileListD:[],
            fileListQ:[],
            hasTips:false,
            getuploadUrl1:'',
            sessionGet:{},
            zlList:[],
            uploadType:'',
            uploadNo:'',
            spareI:'',
            fileList:[],
            loading:false,
            getContract:{
                serviceFee:"",
                repairPeriod:"",
                zbiaoJe:"",
                zbaoje:"",
                contractNo:"",
                contractTime:"",
                supplier:"",
                isServiceFee:"",
                retentionMoney:"",
                biddinfNo:"",
                id:""
            },
            proNode:9,
            proNodeId:'6472cfa718ae49f2a42dfb1afd426cd4',
            noDrop:false
        }
    },
    methods:{
        handleEdit(i, type){
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            // this.infoArr[ind].isEdit = false
            if(type == "sub") {

                if(i.id) {
                    let params = {
                        pid:this.sessionGet.id,
                        actualTime:i.actualTime,
                        remark:i.remark,
                        payRatio:i.payRatio,
                        id:i.id
                    }

                    this.$http.post("/api/project/updateSFPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getSFPayMentRecodeList()
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

                }else {
                    let params = {
                        pid:this.sessionGet.id,
                        actualTime:i.actualTime,
                        remark:i.remark,
                        ratio:i.payRatio
                    }
                    this.$http.post("/api/project/addSFPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getSFPayMentRecodeList()
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
                }
            }else if(type == "del") {
                let params = {
                    pid:i.pid,
                    id:i.id
                }

                this.$http.post("/api/project/deleteSFPayMentRecode", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.$message({
                            type:'success',
                            message:res.message
                        })
                        this.getSFPayMentRecodeList()
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
            }
        },
        
        handleAddmenu(type) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type === 'fill') {
                let obj = {
                    actualTime:'',
                    payRatio:'',
                    payMoney:'',
                    surplusMoney:'',
                    remark:''
                }
                this.infoArr.push(obj)
            }else if(type === 'other') {
                this.otherArr.push({})
            }else if(type == 'save') {
                let params = {
                    id:this.sessionGet.id,
                    supplier:this.getContract.supplier,
                    zbJe:this.getContract.zbiaoJe,
                    zbJe:this.getContract.zbiaoJe,
                    isServiceFee:this.getContract.isServiceFee,
                    time:this.getContract.contractTime,
                    repairPeriod:this.getContract.repairPeriod,
                    retentionMoney:this.getContract.retentionMoney,
                    biddinfNo:this.getContract.biddinfNo,
                    contractNo:this.getContract.contractNo,
                }

                this.$http.post("/api/project/fileContract", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.$message({
                            type:'success',
                            message:"保存成功"
                        })
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
            }
        },

        init() {
            let params = {
                id:this.sessionGet.id
            }

            this.$http.post("/api/project/getContract", params)
            .then((res) => {
                if(res.code == "00000") {
                    res.data.isServiceFee = res.data.isServiceFee.toString()
                    this.getContract = res.data
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
            window.open(i.mb.url)
        },


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
            this.$http.post("/api/project/uploadNodeAppendixQdht", formData)
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
        

        handleFileDel(id) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let params = {
                appendixId:id
            }
            this.fileList = []
            this.$http.post("/api/project/deletedNodeAppendixQdht", params)
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
                this.noDrop = true
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

        handleChangeMoney() {
            this.getContract.zbaoje = (this.getContract.retentionMoney * this.getContract.zbiaoJe * 0.01).toFixed(2)
        },

        getSFPayMentRecodeList() {
            let params = {
                projectId:this.sessionGet.id
            }

            this.$http.post("/api/project/getSFPayMentRecodeList", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.infoArr = res.data
                }else{
                    
                }
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })
            })
        },

        handleChangepayMoney(i, ind) {
            
            this.infoArr[ind].payMoney = (this.infoArr[ind].payRatio * this.sessionGet.zbje * 0.01).toFixed(2)
            this.infoArr[ind].surplusMoney = (this.sessionGet.zbje - this.infoArr[ind].payMoney).toFixed(2)
            
        },

        
        handleFinishNode() {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let params = {
                id:this.sessionGet.id
            }
            this.loading = true
            this.$http.post("/api/project/closeNodeHtqd", params)
            .then((res) => {
                if(res.code == "00000") {
                    // this.$router.push({
                    //     path:'step7' + store.state.exactPath
                    // })
                    this.$message({
                        type:'success',
                        message:res.message
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
        }


    },

    mounted() {
        this.sessionGet = store.state.proInfo
        // console.log(this.sessionGet)
        this.init()
        this.getProjectMsgById(this.sessionGet.id)
        this.getSFPayMentRecodeList()
    }
}
</script>

<style lang="less" scoped>
#pl-wrapper{
    border-radius: 4px;
    .pl-info{
        margin-top: 10px;
        padding: 15px 20px;
        background: #ffffff;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        .pl-info-title{
            display: flex;justify-content: space-between;
            font-size: 16px;
            color: #3B4859;
            
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
        .pl-item-wrapper{
            display: flex;
            margin-top:16px;
            .pl-input{
                flex: 1;
                display: flex;
                align-items: center;
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
                    display: flex;
                    padding-right: 20px;
                    border: 1px solid #F0F3F7;
                    box-shadow: 0 2px 4px 0 #EFF2F7;
                    border-radius: 4px;
                    // width: 100%;
                    flex: 2;
                    & /deep/ .el-input__inner{
                        border: none;
                        height: 36px;
                    }
                    & /deep/ .el-input-group__append{
                        background-color: #ffffff;
                        border: none;
                        line-height: 36px;
                    }
                }
            }
            .pl-input:nth-child(even){
                padding-left: 20px;
            }
        }
        
    }
    .pl-finish{ 
        text-align: center;
        margin: 20px 0 10px;
        button{
            width: 420px;
            height: 40px;
            background: #3B7CFF;
            border-radius: 6px; 
            font-size: 16px;
            color: #FFFFFF;
        }
        
    }
    .pl-finish-tip{
        font-size: 14px;
        color: #3B4859;
        text-align: center;
        margin-bottom:30px;
    }

    @import url('../../Common/less/comItem.less');


    .st-item {
        .st-oparate {
            .st-oparate-col {
                .st-icon-edit{
                    width: auto!important;
                    margin: 0 5px;
                    cursor: pointer;
                    opacity: .7;
                    font-size: 13px;
                }
                .st-icon-edit:hover{
                    opacity: 1;
                    color: #3B7CFF;
                }
            }
        }
    }
    .st-templates {
        .st-edit-content {
            .st-edit-item{
                
                .st-icon-file-name{
                    .upload-demo{
                        width: 40px;
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