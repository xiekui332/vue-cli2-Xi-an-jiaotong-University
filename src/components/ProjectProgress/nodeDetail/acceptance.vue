<template>
    <div class="node-wrapper">
        <!-- 验收-验收申请 -->
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写</span>
                <span class="pub-family st-print">
                    <span class="pub-family st-print" @click="handleAddMsg()" v-if="haslk==false">保存</span>
                    <span class="pub-family st-print" v-if="haslk==false"  @click="handleTjSp()">提交审核</span>
                    <span class="pub-family st-print" @click="handleprint()" v-print="'#print'" v-if="isSHTG==true">打印自验单</span>
                </span>
            </div>

            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>安装地点：</span>
                    <el-input class="pl-input-box" v-model="val1" placeholder="请输入内容" :disabled="haslk"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>到货日期：</span>
                    <el-date-picker
                    v-model="val2"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box"
                    :disabled="haslk">
                    </el-date-picker>
                </div>
            </div>

            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>安装日期：</span>
                    <el-date-picker
                    v-model="val3"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box"
                    :disabled="haslk">
                    </el-date-picker>
                </div>
                <div class="pl-input"></div>
            </div>
        </div>

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

        <div class="st-item st-templates">
            <div class="st-item-header">
                <span class="pub-family">审批资料</span>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head st-ed-head-two">
                    <div> <span>审批附件名称</span></div>
                    <div> <span>操作时间</span></div>
                    <div> <span>操作人</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in shpiFiles" :key="ind">
                    <div class="st-icon-file-title" @click="handleDownHisFile(i, 'qi')">
                        <i class="st-icon-file"></i>
                        <span class="st-file-title st-file-span">{{i.attachName}} </span>
                    </div>
                    <div class="st-icon-file-title">
                        <span class="st-file-title">{{i.createTime}} </span>
                    </div>
                    <div class="st-icon-file-title">
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


        <div class="st-dayin" ref="print" id="print">
            <div class="da-title">网络信息中心货物类采购项目自验单</div>
            <div class="da-head"><span>验收日期：</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span></div>
            <table class="table" border="1">
                <tr class="tr-item-1">
                    <td>项目单位</td>
                    <td>{{printInfo.company}}</td>
                    <td>经费来源</td>
                    <td>{{printInfo.sourcesFundingType}}</td>
                </tr>
                <tr class="tr-item-1"><td>项目名称</td><td>{{printInfo.name}}</td><td>合同金额</td><td>{{printInfo.zbje}}</td></tr>
                <tr class="tr-item-1"><td>招标编号</td><td>{{printInfo.zbno}}</td><td>合同编号</td><td>{{printInfo.htno}}</td></tr>
                <tr class="tr-item-1"><td>供 应 商</td><td>{{printInfo.supplier}}</td><td>安置地点</td><td>{{printInfo.azAddress}}</td></tr>
                <tr class="tr-item-1"><td>到货日期</td><td>{{printInfo.dhTime}}</td><td>安装日期</td><td>{{printInfo.azTime}}</td></tr>
                <tr class="tr-item-1 tr-item-2">
                    <td colspan="4">
                        安装调试情况（包括提供验收的技术文件、安装日期、安装过程、出现问题及处理、
                        自验情况；调试、测试结果等与合同对比等评价、建议；是否具备验收的条件等。）
                        <br><br>
                        <span>经办人（签字）：</span>
                    </td>
                </tr>
                <tr class="tr-item-1 tr-item-3">
                    <td>技术验收结论：
                        <br>{{printInfo.ysjsRemark}}<br> 验收人：{{printInfo.ysjsUserName}}
                    </td>
                    <td>数据验收结论：<br>{{printInfo.yssjRemark}}<br> 验收人：{{printInfo.yssjUserName}}</td>
                    <td>安全验收结论：<br>{{printInfo.yswlRemark}}<br> 验收人：{{printInfo.yswlUserName}}</td>
                    <td>功能验收结论：<br>{{printInfo.ysgnRemark}}<br> 验收人：{{printInfo.ysgnUserName}}</td>
                </tr>
                <tr class="tr-item-1 tr-item-2 tr-item-4"><td colspan="4">验收组（三名在编在岗人员）签字：</td></tr>
                <tr class="tr-item-1 tr-item-4">
                    <td>姓   名</td>
                    <td>职  称</td>
                    <td>单   位</td>
                    <td>姓   名</td>
                    <td>职  称</td>
                    <td>单   位</td>
                </tr>
                <tr class="tr-item-1 tr-item-4"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr class="tr-item-1 tr-item-4"><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr class="tr-item-1 tr-item-2">
                    <td>验收结论及意见：
                        <br><br>
                        <p>自验通过，具备验收条件。</p>
                        <span>（验收组负责人签字）：</span>
                    </td>
                </tr>
                <tr class="tr-item-1 tr-item-2">
                    <td>项目单位意见：
                        <br><br>
                        <p>同意申请复核验收。</p>
                        <span>
                            主  管/副主管（签字）：
                            <br>
                            主管副处（签字）：
                            </span>
                    </td>
                </tr>
                <tr class="tr-item-1 tr-item-2">
                    <td>用户单位意见:
                        <br><br>
                        <p>同意申请复核验收。</p>
                        <span>
                            用户单位负责人（签字）： 
                            <br>
                             （用户单位公章）
                        </span>
                    </td>
                </tr>
                <tr class="tr-item-1 tr-item-5">
                    <td>供货单位意见：
                        <br><br>
                        <p>供方授权 <span> 233 </span> 为代表参加  <span>2019</span> 年 <span>10</span> 月 <span>20</span> 日需方组织的验收并对由供方代表签字的专家意见表示确认。</p>
                        <br>
                        <span>
                            供应商负责人/授权代表（签字）
                        </span>
                        <br>
                    </td>
                </tr>
            </table>
            <p>特别说明：自验完成后请提交院处采购工作小组组织处内验收或者申报学校验收。</p>
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
            proNode:11,
            proNodeId:'2798118bf3ca47439750b4e4acdd7735',
            shpiFiles:[],
            printInfo:{},
            isSHTG:false,
            isSituatiostep:false
        }
    },

    methods:{

        handleDownLoadSitua(url) {
            window.open(url)
        },
        
       handleAddMsg(){
            var params={id:this.sessionGet.id,arrivalTime:this.val2,installationTime:this.val3,installationAddress:this.val1}
            this.$http.post("/api/project/addAZMsg", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:"success",
                        message:res.message
                    }) 
                    this.getProjectMsgById(this.sessionGet.id);
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
       handleprint(){
           
       },
       // 提交审核
       handleTjSp(){
         if(this.sessionGet.installationTime){
            var params={id:this.sessionGet.id}
            this.$http.post("/api/project/tjspMsg", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:"success",
                        message:res.message
                    }) 
                    this.haslk=true;
                    this.getProjectMsgById(this.sessionGet.id);
                    store.dispatch('commitChangeErrorTips',false)
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
              this.$message.error(`信息没有保存，不能提交审核`);
         } 
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
            this.$http.post("/api/project/deletedNodeAppendixYssq", params)
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
            this.$http.post("/api/project/uploadNodeAppendixYssq", formData)
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
            this.$http.post('/api/project/closeNodeYssq', params)
            .then((res) => {
                if(res.code === '00000') {
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step9' + store.state.exactPath
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
        },

        getPrintInfo(id) {
            let params = {
                id:id
            }

            this.$http.post("/api/project/getZydMsg", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.printInfo = res.data;
                    this.isSHTG=true;
                }else{
                   this.isSHTG=false;
                }
            })
            .catch((err) => {

            })
        }
    },
    mounted() {
        this.sessionGet = store.state.proInfo
        this.getProjectMsgById(this.sessionGet.id)

        this.getPrintInfo(this.sessionGet.id)

        // resource == situatiostep
        if(this.$route.name.indexOf("situatiostep") < 0) {
            this.isSituatiostep = false
        }else{
            this.isSituatiostep = true
            this.haslk=true;
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
    .st-item .st-item-header{
        .st-print{
            font-size: 14px;
            color: #3B7CFF;
            cursor: pointer;
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
    


    .st-icon-none{
        .st-icon-file{
            background-position: 0 0!important;
        }
    }
    

    // 只读
    .st-templates{

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

        .st-icon-file-title{
            .st-file-span{
                // display: flex;
                // justify-content:flex-start;
                cursor: pointer;
                color: #3B7CFF!important;
                margin-left: -3em;
                width: 230px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }

        .st-edit-content{
            .st-ed-head-two{
                >div:nth-child(1){
                    text-indent: 1em;
                }
            }
            .st-ed-indent{
                >div:nth-child(1){
                    text-indent: 1em;
                }
            }
        }
        
    }

    
    .st-dayin{
        display: none;
        background: #ffffff;
        padding: 10px;
        .da-title{
            text-align: center;
            font-size: 18px;
            line-height: 40px;
        }
        .da-head{
            text-align: right;
            padding-right: 40px;

        }
        .table{
            width: 100%;
            tr{
                width: 100%;
                overflow: hidden;
                display: flex;
            }
            td{
                flex: 1;
            }
            .tr-item-1{
                line-height: 30px;
                min-height: 30px;
                td{
                    text-align: center;
                }
            }
            .tr-item-2{
                td{
                    text-align: left!important;
                    text-indent: 2em;
                    padding: 10px 0;
                    span{
                        display: block;
                        text-align: right;
                        padding-right: 20%;
                    }
                    p{
                        padding-left: 20%;
                    }
                }
            }
            .tr-item-3{
                td{
                    // width: 25%;
                    text-align: left;
                    padding-left: 10px;
                }
            }
            .tr-item-4{
                td{
                    text-align: center;
                }
                
            }
            .tr-item-5{
                td{
                    text-align: left;
                    padding-left: 20px;
                    p{
                        text-indent: 2em;
                        span{
                            padding: 0 10px;
                        }
                    }
                    >span{
                        display: block;
                        text-align: right;
                        padding-right: 20%;
                    }
                }
            }
        }
    }
    
    
}

// 打印
    @media print {
        .st-dayin{
            background: #ffffff;
            padding: 10px;
            .da-title{
                text-align: center;
                font-size: 18px;
                line-height: 40px;
            }
            .da-head{
                text-align: right;
                padding-right: 40px;

            }
            .table{
                width: 100%;
                tr{
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                }
                td{
                    flex: 1;
                }
                .tr-item-1{
                    line-height: 30px;
                    min-height: 30px;
                    td{
                        text-align: center;
                    }
                }
                .tr-item-2{
                    td{
                        text-align: left!important;
                        text-indent: 2em;
                        padding: 10px 0;
                        span{
                            display: block;
                            text-align: right;
                            padding-right: 20%;
                        }
                        p{
                            padding-left: 20%;
                        }
                    }
                }
                .tr-item-3{
                    td{
                        // width: 25%;
                        text-align: left;
                        padding-left: 10px;
                    }
                }
                .tr-item-4{
                    td{
                        text-align: center;
                    }
                    
                }
                .tr-item-5{
                    td{
                        text-align: left;
                        padding-left: 20px;
                        p{
                            text-indent: 2em;
                            span{
                                padding: 0 10px;
                            }
                        }
                        >span{
                            display: block;
                            text-align: right;
                            padding-right: 20%;
                        }
                    }
                }
            }
        }
    }
</style>


