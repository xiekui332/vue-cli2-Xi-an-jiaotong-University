<template>
    <diV class="node-wrapper">
        <!-- 验收-验收复核 -->
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">信息填写（验收信息）</span>
                <a href="javascript:;" class="st-add" v-if="!noDrop" @click="handleAddMsg('fill')">保存</a>
            </div>

            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>验收日期：</span>
                    <el-date-picker
                    v-model="val1"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box"
                    :disabled="noDrop">
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>验收备注：</span>
                    <el-input class="pl-input-box" v-model="val2" :disabled="noDrop" placeholder="请输入内容"></el-input>
                </div>
            </div>
        </div>

        <!-- 付款信息 -->
        <div class="st-item">
            <div class="st-item-header">
                <span class="pub-family">信息填写(付款信息)</span>
                <a href="javascript:;" class="st-add" v-if="!noDrop" @click="handleAddmenu('fill')">添加</a>
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
                        v-model="i.expectTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :disabled="true" 
                        >
                        </el-date-picker>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.payRatio" type='number' title=" " :disabled="true" ></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.payMoney" type='number' title=" " :disabled="true"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.surplusMoney" type='number' title=" " :disabled="true"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.remark" maxlength='20' :disabled="true" ></el-input>
                    </div>
                    <div class="st-oparate-col st-oparate-btn" v-if="i.pType=='2'">
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'"  @click="handleEdit(i, 'edit', ind)"> 编辑</i>
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i, 'del')"> 删除</i>
                        
                    </div>
                    <div class="st-oparate-col"  v-if="i.pType=='1'">
                       <i :disabled="true">签订合同阶段付款信息</i>
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
        <p class="st-other-tips"><span>*软件项目</span> 请在下方上传验收文档，包含：需求说明书、详细设计说明书、数据库设计说明书、测试报告、用户操作手册</p>
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
            <el-button type="primary" :disabled="noDrop" @click="handleFinishNode()">完成本节点</el-button>
            <div class="st-checkHandle-tips">
                <i class="el-icon-info"></i>
                完成后项目进入下一节点，本节点将不能编辑信息、上传资料。
            </div>
        </el-row>

        <el-dialog
            class="new-dialog"
            :visible.sync='isDialogInfo'
            :close-on-click-modal=false 
            :close-on-press-escape=false  
            width="60%"  
            >
            <div class="new-info-wrapper">
                <div class="st-edit-item st-ed-head">
                    <div><i>*</i> <span>付款时间</span></div>
                    <div><i>*</i> <span>付款比%</span></div>
                    <div><i>*</i> <span>付款金额(万)</span></div>
                    <div><i>*</i> <span>剩余付款金额(万)</span></div>
                    <div> <span>备注</span></div>
                </div>

                <div class="st-edit-item st-oparate">
                    <div class="st-oparate-col">
                        <el-date-picker
                            v-model="diaTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="disPercentVal" placeholder="请输入内容" type='number' title=" " @change="handleChangepayMoney(disPercentVal)"></el-input>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="diaMoneyVal" placeholder="系统计算" type='number' title=" " :disabled='true'></el-input>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="diaSurplusMoney" placeholder="系统计算" type='number' title=" " :disabled="true"></el-input>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="diaRemarksVal" placeholder="请输入备注(选填)" maxlength='20'></el-input>
                        </div>
                    </div>

                    <div class="fl-btn-wrapper">
                        <el-row class="fl-btn-cancel">
                            <el-button type="primary" round @click="handleDialog('cancel')">取消</el-button>
                        </el-row>
                        <el-row class="fl-btn-save">
                            <el-button type="primary" round @click="handleDialog('save')">保存</el-button>
                        </el-row>
                    </div>
            </div>
        </el-dialog>
    </diV>
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
            infoArr:[],
            infoArr1:[],
            hasTips:false,
            isDialogInfo:false,
            diaTime:"",
            disPercentVal:"",
            diaMoneyVal:"",
            diaSurplusMoney:"",
            diaRemarksVal:"",
            isAdd:true,
            diaId:'',
            getuploadUrl1:'',
            zlList:[],
            qtList:[],
            uploadType:'',
            uploadNo:'',
            otherArr:[{}],
            noDrop:false,
            fileList:[],
            spareI:'',
            loading:false,
            proNode:13,
            proNodeId:'4643a77c44be4544b230725091498f20',
        }
    },

    methods:{
        handleEdit(i,type,index){
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type == "del") {
                let params = {pid:i.pid, id:i.id };
                this.$http.post("/api/project/deleteYsfhPayMent", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.$message({
                            type:'success',
                            message:res.message
                        })
                        this.getPayMentList()
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
            }else{
                this.isAdd = false
                this.diaId = i.id
                this.diaTime = i.expectTime
                this.disPercentVal = i.payRatio
                this.diaMoneyVal = i.payMoney
                this.diaSurplusMoney = i.surplusMoney
                this.diaRemarksVal = i.remark
                this.isDialogInfo = true
                this.isEditIndex = index
            }
        },
        handleAddMsg(){//新增验收信息
          if(!this.val1){
              return  this.$message.error(`验收时间不能为空`); 
          }
          var params={
              id:this.sessionGet.id,
              inspectionTime:this.val1,
              inspectionRemark:this.val2
          }
          this.$http.post("/api/project/addYsfhMsg",params).then(res =>{
            if(res.code=="00000"){
                this.$message.success(res.message);
            }else{
                this.$message.error(res.message);
            }
          })
          .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        },
        handleAddmenu(type) {
            if(type === 'fill') {
               let len = this.infoArr.length
                if(len > 5){
                    return
                }
                this.handleClearInfo()
                this.isDialogInfo = true
                this.isAdd = true
               
            }else if(type === 'other') {
                this.otherArr.push({})
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

        handleClearInfo() {
            this.diaTime = ""
            this.disPercentVal = ""
            this.diaMoneyVal = ""
            this.diaRemarksVal = ""
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
        handleDialog(type) { //付款信息
            if(type == "cancel") {
                this.isDialogInfo = false
                this.handleClearInfo()
            }else if(type == "save") {
                this.isDialogInfo = false;
                if(!this.diaTime){
                    return this.$message.error(`付款时间不能为空`); 
                }
                if(!this.disPercentVal){
                    return this.$message.error(`付款比例不能为空`); 
                }
                if(this.isAdd) {//新增
                    var params={pid:this.sessionGet.id,actualTime:this.diaTime,ratio:this.disPercentVal,remark:this.diaRemarksVal};
                        this.$http.post("/api/project/addYsfhPayMent",params).then(res =>{
                            if(res.code=="00000"){
                                this.$message({
                                    type:'success',
                                    message:res.message
                                })
                                this.getPayMentList()
                                this.isDialogInfo = false
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
                }else{
                   let params = {pid:this.sessionGet.id,id:this.diaId,actualTime:this.diaTime,remark:this.diaRemarksVal, payRatio:this.disPercentVal };
                    this.$http.post("/api/project/updateYsfhPayMent", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getPayMentList()
                            this.isDialogInfo = false
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
  
            }
        },
        

        handleChangepayMoney(disPercentVal) {
            
            this.diaMoneyVal = (this.disPercentVal * this.sessionGet.zbje * 0.01).toFixed(2)
            let count = 0
            let countArray = 0
            let countArrayPercent = 0
            // 直接赋值等于浅拷贝 浅拷贝只是复制了对象的引用地址，两个对象指向同一个内存地址，所以修改其中任意的值，另一个值都会随之变化，（例：assign()）
            // 此处需要深拷贝
            // let assignInfoArr = JSON.stringify(this.infoArr)
                // assignInfoArr = JSON.parse(assignInfoArr).splice(this.isEditIndex, 1)
            let assignInfoArr = []
            for(let i = 0; i < this.infoArr.length; i ++) {
                if(i != this.isEditIndex) {
                    assignInfoArr.push(this.infoArr[i])
                }
                
            }
                
            if(this.isAdd == false) {
                for(let i = 0; i < assignInfoArr.length; i ++) {
                    
                    if(assignInfoArr[i].payRatio) {
                        countArrayPercent += Number(assignInfoArr[i].payRatio)
                    }

                    if(assignInfoArr[i].payMoney) {
                        countArray += Number(assignInfoArr[i].payMoney)
                    }

                    count = countArray + Number(this.diaMoneyVal)
                }
                
                // console.log(countArrayPercent)
            }else{
                // console.log(2)
                for(let i = 0; i < this.infoArr.length; i ++) {
                    if(this.infoArr[i].payRatio) {
                        countArrayPercent += Number(this.infoArr[i].payRatio)
                    }

                    if(this.infoArr[i].payMoney) {
                        countArray += Number(this.infoArr[i].payMoney)
                    }
                }
                count = countArray + Number(this.diaMoneyVal)
            }

            

            if(countArrayPercent + Number(disPercentVal) > 100) {
                this.$message({
                    type:'error',
                    message:"付款总额须小于等于“中标金额”"
                })
                this.isover = true
            }else{
                this.isover = false
            }

            this.diaSurplusMoney = (this.sessionGet.zbje - count).toFixed(2)
            
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
            this.$http.post("/api/project/uploadNodeAppendixYsfh", formData)
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
            this.$http.post("/api/project/deletedNodeAppendixYsfh", params)
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

        getPayMentList(){
            let params = {pid:this.sessionGet.id};
            this.$http.post('/api/project/getYsfhPayMent', params)
            .then((res) => {
              if(res.code=="00000"){               
                  this.infoArr=res.data; 
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
                    if(res.data.inspectionRemark){
                        this.val2=res.data.inspectionRemark;
                    }
                    if(res.data.inspectionTime){
                        this.val1=res.data.inspectionTime;
                    }
                    this.sessionGet = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                    this.getPayMentList();
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
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        },
        handleFinishNode(){
            var params={id:this.sessionGet.id};
            this.$http.post("/api/project/closeNodeYsfh",params).then(res =>{
                console.log(res)
               if(res.code=="00000"){
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step11' + store.state.exactPath
                    })
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
    },
    mounted() {
        this.sessionGet = store.state.proInfo
        this.getProjectMsgById(this.sessionGet.id)
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
                    .el-date-editor.el-input, .el-date-editor.el-input__inner{
                        width: 100%;
                    }
                    flex: 1;
                    & /deep/ input{
                        text-align: center;
                        border: none;
                    }
                    & /deep/ input[type=number]::-webkit-inner-spin-button,
                    & /deep/ input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    .st-icon-edit{
                        display: inline-block;
                        background-position: -377px -91px;
                    }
                    .st-icon-del{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-position: -377px -168px;
                        margin-left: 44px;
                    }
                    & /deep/ .el-input__prefix{
                        display: none;
                    }
                    
                }
                .st-oparate-btn{
                    display: flex;
                    align-items: center;
                    justify-content: center;
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
                // .upload-demo{
                //     display: flex;
                //     align-items: center;
                //     justify-content: space-between;
                // }
            }
        }
    }
    .pub-dis{
        cursor: no-drop!important;
    }
    .pub-dis:hover{
        color: #39475B!important;
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
    .st-icon-none{
        .st-icon-file{
            background-position: 0 0!important;
        }
    }
    .st-other-tips{
        font-size: 14px;
        margin: 20px 0 -5px 0;
        color: #8998AC;
        span{
            color: red;
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

    // new scheduled payment
    .new-info-wrapper{
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
        .fl-btn-wrapper{
            display: flex;
            justify-content: center;
            margin-top: 50px;
            margin-bottom: 30px;
            .el-button{
                font-size: 14px;
                padding: 10px 25px;
            }
            .fl-btn-cancel button{
                color: #8392A7;
                background: #F9FAFC;
                border: 1px solid #AEB9CA;
            }
            .fl-btn-save button{
                color: #FFFFFF;
                background: #3B7CFF;
                margin-left: 20px;
            }
        } 
    }
}
</style>


