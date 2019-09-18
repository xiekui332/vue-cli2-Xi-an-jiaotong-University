<template>
    <div id="root-wrapper">
        <p class="ro-title">执行计划维护</p>
        <div class="ro-item">
            <span :class="isChange===true?'ro-title-b':'ro-title-b ro-title-none'">项目编号：</span>
            <div class="ro-item-content">
                <span class="ro-num" >{{projectNo}}</span>
                <el-checkbox class="ro-hasHistory" v-model="checked" @change="checkHistory" :disabled="hasLk">是否历史项目</el-checkbox>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目名称：</span>
            <div class="ro-item-content">
                <el-input v-model="name" placeholder="请输入内容" :disabled="hasLk" ></el-input>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">立项时间：</span>
            <div class="ro-item-content">
                <el-date-picker
                    v-model="establishmenTime"
                    type="date"
                    placeholder="选择日期"
                    :clearable='hasClear'
                    :disabled="hasLk" 
                    value-format="yyyy-MM-dd"
                    >
                </el-date-picker>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">计划周期：</span>
            <div class="ro-item-content">
                <el-date-picker
                    v-model="planningTime"
                    type="daterange"
                    placeholder="选择日期"
                    range-separator="~"
                    :clearable='hasClear'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :disabled="hasLk" 
                    >
                </el-date-picker>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目预算：</span>
            <div class="ro-item-content">
                <el-input type="number" placeholder="请输入内容" class="ro-budget" @change="handleSetNum" v-model="budgetNum" :disabled="hasLk" >
                    <template slot="append">万元</template>
                </el-input>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目类别：</span>
            <div class="ro-item-content">
                <el-select v-model="kind" placeholder="请选择"  @change='handleSel()' :disabled="hasLk" >
                    <el-option
                    v-for="(item,index) in opt1"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    @click.native="changeType(index)">
                    
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目类型：</span>
            <div class="ro-item-content">
                <el-select v-model="types" placeholder="请选择"  :disabled="hasLk" >
                    <el-option
                    v-for="item in opt2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">经费来源：</span>
            <div class="ro-item-content">
                <el-select v-model="moneySource" placeholder="请选择" :disabled="hasDis">
                    <el-option
                    v-for="item in opt3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目负责人：</span>
            <div class="ro-item-content">
                <el-select v-model="leading" multiple placeholder="请选择 " :disabled="hasLk" >
                    <el-option
                    v-for="item in opt6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目状态：</span>
            <div class="ro-item-content">
                <el-select v-model="proState" placeholder="请选择" :disabled="isxj" @change="handleChangeType">
                    <el-option
                    v-for="(item,index) in opt4"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    @click.native="changeStatus(index)">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item" :disabled="hasDis">
            <span class="ro-title-b">项目节点：</span>
            <div class="ro-item-content">
                <el-select v-model="proNode" placeholder="请选择" :disabled="isxj">
                    <el-option
                    v-for="item in opt5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">项目说明：</span>
            <div class="ro-item-content">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea"
                    maxlength="200"
                    :disabled="hasLk" 
                    >
                </el-input>
            </div>
        </div>
        <div class="ro-item">
            <span class="ro-title-b">上传附件</span>
            <div class="ro-item-content">
                <el-upload
                    class="upload-demo"
                    :action= nodeUploadUrl
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :before-upload="handleBefore"
                    :http-request="customRequest"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :disabled="hasLk"
                    accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                    >
                    <el-button size="small" type="primary"  :disabled="hasLk" >支持扩展名：.rar .zip .doc .docx .pdf .jpg...</el-button>
                </el-upload>
            </div>
        </div>
        <div class="ro-item" v-if="hasDis">
            <span class="ro-title-b">已传附件：</span>
            <div >
                <div v-for="(item,index) in oldAppdendixList" :key="index">{{item.attachName}}</div>
            </div>
        </div>

        <div class="ro-btn-wrapper">
            <el-row v-if="!hasLk">
                <el-button type="primary" round class="ro-btn ro-cancel" @click="handleCancle" >取消</el-button>
            </el-row>
            <el-row v-if="!hasLk">
                <el-button type="primary" round class="ro-btn ro-save" @click="handleSave">保存</el-button>
            </el-row>
            <el-row v-if="hasLk">
                <el-button type="primary" round class="ro-btn ro-cancel" @click="handleCancle">返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import { nodeUploadUrl } from '../utils/util.js'
export default {
    props:[
        'hasDisabled',
        'changeMsg',
        'hasLook'
    ],
    data() {
        return {
            checked:false,      // 当选择为历史项目时，必须填写项目负责人，反之项目负责人不是必填项
            name:'',
            establishmenTime:'',
            planningTime:'',
            hasClear:false,
            budgetNum:'',    // 项目预算
            kind:'',            // 项目类别
            types:'',           // 项目类型
            moneySource:'',     // 经费来源
            leading:[],         // 项目负责人
            proState:'',        // 项目状态
            proNode:'',         // 项目节点
            textarea:'',         // 项目说明
            msgDetails:{},
            projectNo:'',
            opt1: [],//项目类别
            opt2: [],//项目类型
            opt3: [],//经费来源
            opt4:[],//项目状态
            opt5:[],//项目节点
            opt6:[],//负责人
            fileList:[],
            fileMsgList:[],
            hasDis:this.hasDisabled,
            hasLk:this.hasLook,
            isChange:false,
            projectId:"",
            nodeUploadUrl:nodeUploadUrl,
            statusList1:[],
            typeList:[],
            oldAppdendixList:[],
            projectType:'',
            projectCategory:'',
            isxj:false,
            ismrfz:false

        }
    },
    methods:{
        checkHistory() {//历史项目选中
            var isxz=this.checked;
            var isnew=this.ismrfz;
            if(isxz==true){//选中历史项目
               if(isnew==true){//新建项目选中
                   this.rechangeState();
                   this.opt5=[];
                   this.isxj=false;
                   this.proNode='';
                   this.proState='';
               }
            }else{//未选中
               if(isnew==true){//新建项目未选中
                   this.proNode='立项申请';
                   this.proState='项目立项';
                   this.isxj=true;
               }
            }
        },
        handleRemove(file, fileList) {
            for(let i = 0; i < this.fileMsgList.length; i ++) {
                if(this.fileMsgList[i].fileName == file.name) {
                    this.fileMsgList.splice(i, 1)
                }
            }
             
        },
        handlePreview(file) {
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleCancle() {
            this.name='';
            this.establishmenTime='';
            this.planningTime='';
            this.budgetNum='';
            this.proNode='';
            this.proState='';
            this.kind='';
            this.types='';
            this.textarea='';
            this.checked=false;
            this.moneySource='';
            this.fileList=[];
            this.leading='';
            this.$emit('hasMainPage', false)
        },
        handleSel() {
            this.types="";
        },
        handleChangeType(){
            this.proNode='';
        },
        handleSave(){
          if(this.projectId){//编辑项目
              var isOldProject=0;
               if(this.checked==true){
                   isOldProject=1;
               }
               var ptype="";
               if(this.kind!=this.projectType){
                  ptype=this.kind;
               }
               var pcate="";
              if(this.types!=this.projectCategory){
                  pcate=this.types;
               }
                var params={
                    id:this.projectId, name:this.name,createTime:this.establishmenTime,
                    startTime:startTime,endTime:endTime,ysje:this.budgetNum,
                    category:this.ptype,type:this.pcate,
                    isOldProject:isOldProject,
                    remark: this.textarea,
                    fileList:JSON.stringify(this.fileMsgList),
                    leaderNo:JSON.stringify(this.leading)
                  };

                  if(!this.leading || !this.leading.length) {
                      this.$message.warning("编辑项目时项目负责人不能为空")
                      return
                  }
                this.$http.post("/api/project/updateProjectMsg",params).then(res =>{
                    if(res.code=="00000"){
                        this.$message("编辑成功！");
                        this.handleCancle();
                    }else{
                          this.$message(res.message);
                    }
                })
          }else{//新建项目
               if(!this.name){
                   return this.$message("项目名称不能为空");
               }
               if(!this.establishmenTime){
                   return this.$message("立项时间不能为空");
               }
               var startTime=(this.planningTime)[0];
               var endTime=(this.planningTime)[1];
               if(startTime==null||endTime==null){
                    return this.$message("计划周期不能为空");
               }
               if(!this.budgetNum){
                   return this.$message("项目预算不能为空");
               }
                if(!this.kind){
                   return this.$message("项目类别不能为空");
               }
               if(!this.types){
                   return this.$message("项目类型不能为空");
               }
               if(!this.moneySource){
                   return this.$message("经费来源不能为空");
               }                          
               var isOldProject=0;
               if(this.checked==true){
                   isOldProject=1;
               }
               if(isOldProject==1){
                   if(this.proState==null||this.proState==''){
                      return this.$message("历史项目的项目状态不能为空");
                   }
                   if(this.proNode==null||this.proNode==''){
                      return this.$message("历史项目的项目节点不能为空");
                   }
                   if(this.leading.length<1){
                      return this.$message("历史项目的项目负责人不能为空");
                   }
               }
               if(this.proState){
                   if(this.proNode==null||this.proNode==''){
                        return this.$message("项目状态下节点不能为空");
                   }
               }
               if(this.proState=='项目立项'){
                   this.proState="43623bacc9244afd9abd3365cb6c36c9";
               }
               if(this.proNode=='立项申请'){
                   this.proNode="716aa0fd239a4aa1b9469592122782c9";
               }
               var params={
                   name:this.name,createTime:this.establishmenTime,
                   startTime:startTime,endTime:endTime,ysje:this.budgetNum,
                   category:this.kind,type:this.types,
                   sourceFundingType:this.moneySource,
                  isOldProject:isOldProject,nodeId:this.proNode,
                  statusId: this.proState,
                  remark: this.textarea,
                  fileList:JSON.stringify(this.fileMsgList),
                  leaderNo:JSON.stringify(this.leading)};
                    this.$http.post("/api/project/addProjectMsg",params).then(res =>{
                        if(res.code=="00000"){
                            this.name='';
                            this.establishmenTime='';
                            this.planningTime='';
                            this.budgetNum='';
                            this.proNode='';
                            this.proState='';
                            this.kind='';
                            this.types='';
                            this.textarea='';
                            this.checked=false;
                            this.moneySource='';
                            this.fileList=[];
                            this.leading='';
                            this.$message("新建成功！");
                            this.handleCancle();
                        }else{
                            this.$message(res.message);
                        }
                    })
          }

        },
        getAppendix(params){//项目附件
            var params={projectId:params}
            this.$http.post("/api/project/getProjectAppendixById",params).then(res =>{
              if(res.code=="00000"){
                  var msglsit=res.data;
                  this.oldAppdendixList=[];
                  for(var i=0;i<msglsit.length;i++){
                      var msg={};
                      msg.attachName=msglsit[i].attachName;
                       this.oldAppdendixList.push(msg);
                  }
              }
            })
        },
        rechangeState(){//获取状态
            this.$http.post("/api/template/getStatusAndNodes",{}).then(res =>{
                if(res.code=="00000"){
                    this.statusList1=res.data;
                    this.opt4=[];
                    var data=res.data;
                    for(var a=0;a<data.length;a++){
                        var msg={};
                        msg['value']=data[a].id;
                        msg['label']=data[a].name;
                        this.opt4.push(msg);
                    }   
                }
            })
        },
        changeStatus(index){//获取节点
            var list=this.statusList1[index].list;
             this.opt5=[];
            for(var i=0;i<list.length;i++){
                var msg={};
                msg['value']=list[i].id;
                msg['label']=list[i].name;
                this.opt5.push(msg);
            }
        },
        getFundsSource(){//获取经费来源
            this.$http.post('/api/project/getFundsSource')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.opt3=[];
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.opt3.push(obj)
                        }
                    }
                }
            })
        },
        getprojectType(){//获取项目类别
            this.$http.post('/api/project/getProjectTypeAll').then((res) => {
                if(res.code === '00000'){
                    this.typeList=res.data;
                    if(res.data.length){
                        this.opt1=[];
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].pType.name
                            obj.value = res.data[i].pType.id
                            this.opt1.push(obj)
                        }
                    }
                }
            })
        },
        changeType(param){//获取项目类型      
            var list=this.typeList;
            var msglist=list[param].cType
            this.opt2=[];
            for(var i=0;i<msglist.length;i++){
                var msg={};
                msg['value']=msglist[i].id;
                msg['label']=msglist[i].name;
                this.opt2.push(msg);
            }   
        },
        getUser(){//项目负责人
            var params={};
            this.$http.post("/api/user/getAllUser",params).then(res =>{
                if(res.success){
                    var msgList=res.rows;
                    this.opt6=[];
                    for(var i=0;i<msgList.length;i++){
                        var obj={};
                        obj.value=msgList[i].id;
                        obj.label=msgList[i].userName;
                        this.opt6.push(obj);
                    }
                }
            })
        },

        handleSetNum() {
            // console.log(this.budgetNum)
            // 先转成number类型
            this.budgetNum = (Number(this.budgetNum)).toFixed(2)
        },

        handleBefore(file) {
            this.files = file
        },


        customRequest() {
            const formData = new FormData();
            
            formData.append('file',this.files);
            
            this.$http.post("/api/system/project/uploadAppdenix", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })
                    var msg={};
                    msg.fileName=res.data.fileName;
                    msg.fileAddress=res.data.fileUrl;
                    msg.fileType=res.data.fileType;
                    this.fileMsgList.push(msg);
                }else{
                    this.fileList = []
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                }
            })
            .catch((err) => {
                this.fileList = []
                this.$message({
                    type:'error',
                    message:err.message
                })
            })
        },
    },
    mounted(){
       this.msgDetails= this.changeMsg;
       this.rechangeState();
       this.getFundsSource();
       this.getprojectType();
       this.getUser();
       
    },
    watch: {
        hasDisabled(params) {
            this.hasDis = params
        },
        msgDetails(params){
            if(params){//编辑
                this.isxj=true;
                this.isChange=true;
                this.budgetNum=params.money;
                this.kind=params.projectTypeNames;
                this.projectType=params.projectTypeNames;
                this.projectCategory=params.projectCategoryNames;
                this.types=params.projectCategoryNames;
                this.moneySource=params.resource;
                this.textarea=params.remark;
                this.name=params.name;
                this.projectNo=params.num;
                if(params.isOldProject==1){
                    this.checked=true;
                }
                this.establishmenTime=params.time;
                this.planningTime=[params.startTime ,params.endTime];
                var mens=params.menId;
                if(mens){
                    var menIds=mens.split(",");
                    this.leading=menIds;
                }
                this.proState=params.projectStateName;
                this.proNode=params.projectNodeName;
                this.hasDis=true;
                this.projectId=params.id;
                this.getAppendix(this.projectId);
                this.ismrfz=false;
            }else{//新建
               this.isChange=false;
               this.ismrfz=true;
               this.proState="项目立项";
               this.proNode="立项申请";
               this.isxj=true;
            }

        },
        kind(params) {
            if(params == 1) {
                this.opt2 = [
                    {
                        value:1,
                        label:'服务项目'
                    }
                ]
                
            }else if(params == 2) {
                this.opt2 = [
                    {
                        value:1,
                        label:'软件项目'
                    },
                    {
                        value:2,
                        label:'硬件项目'
                    },
                    {
                        value:3,
                        label:'集成项目'
                    }
                ]
            }else if(params == 3) {
                this.opt2 = [
                    {
                        value:1,
                        label:'工程项目'
                    }
                ]
            }else{
                this.opt2 = []
            }
            
        }
        
    }
}
</script>

<style lang="less" scoped>

#root-wrapper{
    & /deep/ input::placeholder,& /deep/ textarea::placeholder{
        font-size: 12px!important;
    }
    & /deep/ input{
        font-size: 12px;
        color: #8998AC;
        letter-spacing: 0;
    }
    display: flex;
    flex-direction:column ;
    background: #ffffff;
    min-height: 100%;
    .ro-title{
        font-size: 18px;
        color: #3B4859;
        letter-spacing: 0;
        line-height: 24px;
        margin: 40px 0 30px 15%;
    }
    .ro-item{
        display: flex;
        justify-content: flex-start;
        margin-left: 20%;
        .ro-title-b{
            min-width: 100px;
            font-size: 16px;
            color: #39475B;
            letter-spacing: 0;
            line-height: 46px;
            margin-right: 20px;
        }
        .ro-title-none{
            opacity: 0;
        }
        .ro-item-content{
            line-height: 46px;
            width: 360px;
            display: flex;
            align-items: center;
            .ro-num{
                font-size: 12px;
                color: #3B4859;
                letter-spacing: 0;
                margin-left: 10px;
            }
            .ro-hasHistory{
                flex: 2;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                & /deep/ .el-checkbox__label{
                    font-size: 12px;
                    color: #3B4859;
                }
            }
            & /deep/ .el-input__prefix{
                // text-align: right;
                width: 25px;
                // right: 5px;
                left: 330px;
            }
            & /deep/ .el-input--prefix .el-input__inner{
                padding-left: 15px;
            }
            & /deep/ .el-date-editor .el-range__icon{
                position: absolute;
                right: 5px;
            }
            & /deep/ .el-input-group__append, .el-input-group__prepend{
                    background-color: #ffffff;
            }
            .ro-budget{
                & /deep/ .el-input__inner{
                    border-right: none;
                }
            }
            .el-select,& /deep/ .upload-demo,& /deep/ .el-upload,& /deep/ .el-button--primary{
                width: 100%;
            }
            .el-button--primary{
                background: #ffffff;
                border: 1px solid #F0F3F7;
                box-shadow: 0 2px 4px 0 #EFF2F7;
                border-radius: 4px;
                font-size: 12px;
                color: #8998AC;
                letter-spacing: 0;
                text-align: left;
            }
        }
        & /deep/ .el-input__inner::placeholder{
            font-size: 12px;
        }
        & /deep/ .el-input__inner{
            height: 36px;
            box-shadow: 0 2px 4px 0 #EFF2F7;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 100%;
        }
    }
    .ro-btn-wrapper{
        text-align: center;
        display: flex;
        justify-content: center;
        .ro-btn {
            padding: 7px 30px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: 22px;
            margin-top: 40px;
            margin-bottom: 40px;
        }
        .ro-cancel{
            background: #F9FAFC;
            border: 1px solid #AEB9CA;
            color: #8392A7;
        }
        .ro-save{
            background: #3B7CFF;
            color: #FFFFFF;
            margin-left: 20px;
        }
    }
}
</style>