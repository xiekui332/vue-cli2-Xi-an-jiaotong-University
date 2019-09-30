<template>
    <div id="sy-wrapper">
        <HeaderSearch 
        :options4='options4'
        :options5='options5'
        :options7='options7'
        @handleSearchRes = 'handleSearchRes'
        @handleChangeStatus='handleChangeStatus'
        :type='type'
        />
        
        <el-divider></el-divider>

        <div class="ma-btn-wrapper">
            <div class="ma-btn-block">
                <el-row class="de-btn de-search-btn">
                    <el-button type="primary" round @click="handleBuilt">+ 新建模板</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleAssign">批量发布</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleCancel">批量撤销</el-button>
                </el-row>
            </div>
        </div>

        <TableCommon @handleChangeEdit = 'handleChangeEdit'  @handleSelectOprate='handleSelectOprate' @handleChangeoprate='handleChangeoprate' :tableData='tableData' :tablekind='tablekind' :type='type' />

        <CommPage :hasPage='hasPage' :total="total"  @handlePageUp='handlePageUp' @handlePageRows='handlePageRows'/>

        <el-dialog
        :class="'ma-dialog'"
        :visible.sync='newtemplate'
        :show-close='hasClose'
        :before-close="handleCloseLog"
        :close-on-click-modal=true 
        :close-on-press-escape=true
        title='新建模板'
        >
        <p class="ma-tips">用于规范项目各阶段的补充资料</p>
        <el-divider></el-divider>
        <div class="ma-dia-content">
            <div class="ma-item-wrapper">
                <div class="ma-item">
                    <span class="ma-title">项目状态：</span>
                    <el-select v-model="statusVal" placeholder="请选择" class="ma-dia-sel" >
                        <el-option
                        v-for="(item,index) in options8"
                        :key="index"
                        :label="item.label"
                        :value="item.value" 
                        @click.native="changeStatus(index)">
                        </el-option>
                    </el-select>
                </div>
                <div class="ma-item">
                    <span class="ma-title">项目节点：</span>
                    <el-select v-model="nodeVal" placeholder="请选择" class="ma-dia-sel">
                        <el-option
                        v-for="item in options9"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @click.native="changeNode(item.value)">
                        </el-option>
                    </el-select>
                </div>
                <div class="ma-item">
                    <span class="ma-title">模板名称：</span>
                     <el-select v-model="val1" placeholder="请选择" class="ma-dia-sel">
                        <el-option
                        v-for="item in tdicList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="ma-item ma-item-baseline">
                    <span class="ma-title">模板文件：</span>
                    <el-upload
                        class="upload-demo"
                        :action= getuploadUrl1
                        :before-upload="handleBefore"
                        :http-request="customRequest"
                        :on-remove="handleDel"
                        :on-exceed="handleExc"
                        :limit="1"
                        :file-list="fileList"
                        accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                        >
                        <el-button size="small" type="primary">上传
                            <i class="pub-css st-upload-icon"></i>
                        </el-button>
                    </el-upload>
                </div>
            </div>
            
            <div>
                <el-row class="ma-btn-block">
                    <el-button type="" round @click="handleMaBtn('save')">保存</el-button>
                    <el-button type="primary" round @click="handleMaBtn('sign')">保存并发布</el-button>
                </el-row>
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import TableCommon from '@/components/Common/TableCommon'
import CommPage from '@/components/CommPage'
import { getUrlParams, regexFile} from '../../utils/util';
export default {
    components:{
        HeaderSearch,
        TableCommon,
        CommPage
    },
    data() {
        return {
            options4: [{}],//项目状态
            options5: [{}],// 项目节点
            options8: [{}],//新建项目状态
            options9: [{}],// 新建项目节点
            options7:[
                {
                    value:'0',
                    label:'是'
                },
                {
                    value:'1',
                    label:'否'
                }
            ],
            type:'upload',
            tablekind:[
                {
                    prop:'no',
                    label:'序号',
                    width:'50'
                },
                {
                    prop:'name',
                    label:'模板名称',
                    width:'200'
                },
                {
                    prop:'status',
                    label:'项目状态',
                    width:''
                },
                {
                    prop:'node',
                    label:'项目节点',
                    width:''
                },
                {
                    prop:'time',
                    label:'上传时间',
                    width:''
                },
                {
                    prop:'operateMan',
                    label:'操作员',
                    width:''
                },
                {
                    prop:'hasSign',
                    label:'是否发布',
                    width:''
                }
            ],
            tdicList:[{}],
            tableData:[{} ],
            statusList1:[],
            hasPage:true,
            newtemplate:false,
            val1:'',
            statusVal:'',
            nodeVal:'',
            nodeOptions:[],
            hasClose:true,
            page:'1',
            rows:'10',
            statusId:'',
            nodeId:'',
            jfId:'',
            searchName:'',
            isRelease:'',
            total:0,
            hasPageNum:10,
            selectOprate:[],
            fileName:'',
            fileUrl:'',
            fileType:'',
            isClear:false,
            fileList:[],
            getuploadUrl1:''
        }
    },
    methods:{      
        handleSearchRes(params) {//按条件查询
            this.isRelease=params.isRelease;
            this.statusId=params.state;
            this.nodeId=params.node;
            this.jfid=params.jfid;
            this.searchName=params.tex;
            this.tableData = []; 
            this.total =0;
            this.init();
        },
        handleBuilt() {
            this.newtemplate = true
        },
        handleSelectOprate(param){
          this.selectOprate=param;
        },
        handleAssign() {//批量发布
            var list=this.selectOprate;  
            var li=[];
            for(var i=0;i<list.length;i++){
                if(list[i].hasSign=="否"){
                   li.push(list[i])
                }
            }
            if(li.length<1){
                return this.$message.error('请选中要发布的模板');
            }        
            var param={list:JSON.stringify(li)};
            this.$http.post("/api/template/update/plfb",param).then(res =>{
                  if(res.code=="00000"){
                      this.$message.success('批量发布成功！');
                      //刷新列表数据
                      this.init();
                  }else{
                      this.$message.error(res.message);
                  }
            })
        },
        handleCancel() {//批量撤销
            var list=this.selectOprate;  
            var li=[];
            for(var i=0;i<list.length;i++){
                if(list[i].hasSign=="是"){
                   li.push(list[i])
                }
            }
            if(li.length<1){
                return this.$message.error('请选中要撤销的模板');
            }        
            var param={list:JSON.stringify(li)};
            this.$http.post("/api/template/update/plcx",param).then(res =>{
                  if(res.code=="00000"){
                      this.$message.success('批量撤销成功！');
                      //刷新列表数据
                      this.init();
                  }else{
                      this.$message.error(res.message);
                  }
            })
            
        },
        handleChangeEdit(params, disabled){ //点击项目-文件下载，图片直接打开       
            if(params.spareIi){
                let spareIi = params.spareIi.substring(1)
                if(regexFile.test(spareIi)){
                    window.open(params.url)
                }else{
                    let aLink = document.createElement('a');
                    aLink.target = '_blank'
                    aLink.href = params.url;
                    aLink.click();            
                }
            }           
        },
        handleChangeoprate(params) {//撤销，发布
            var isRelease=params.hasSign;
            if(isRelease=="是"){//撤销
               isRelease=1;
            }else{//发布
               isRelease=0;
            }
            var id=params.id;
            this.$http.post("/api/template/update/file",{id:id,isRelease:isRelease}).then(res =>{
                if(res.code=="00000"){
                    this.$message.success('操作成功！');
                     this.init();
                }
            })
        },
        init(){//获取模板列表
            if(this.statusId==0){
            this.statusId='';  
            }
            if(this.nodeId==0){
            this.nodeId='';  
            }
         var param={page:this.page,
                    rows:this.rows,
                    statusId:this.statusId,
                    nodeId:this.nodeId,
                    name:this.searchName,
                    isRelease:this.isRelease};
         this.$http.post("/api/template/getTemplateList",param).then(res =>{
             if(res.success==true){
                this.tableData = [];
                var list=res.rows;
                this.total = res.total
                for(var a=0;a<list.length;a++){
                    var msg={};
                    msg['no']=list[a].RNUM;
                    msg['num']=list[a].id;
                    msg['name']=list[a].name;
                    msg['time']=list[a].createTime;
                    msg['node']=list[a].nodeName;
                    msg['operateMan']=list[a].createUserName;
                    msg['id']=list[a].id;
                    
                    msg['spareIi']=list[a].spareIi;
                    msg['url']=list[a].url;
                    msg['spareI']=list[a].spareI;
                    if(list[a].isRelease==1){
                          msg['hasSign']="否";
                    }else{
                          msg['hasSign']="是";
                    }                  
                    msg['status']=list[a].statusName;
                    this.tableData.push(msg);
                }
             }
         })
        },
        handleUpload(params) {//上传模板
            this.fileName=params.fileName;
            this.fileUrl=params.fileUrl;
            this.fileType=params.fileType;
        },
        handlePageUp(params){//分页
          this.page=params;
          this.init();
        },
        handlePageRows(params) {//修改行数
            this.rows = params
            this.init();
        },
        handleMaBtn(msg){//新建模板
            var stateId=this.statusVal;
            if(!stateId){
                return this.$alert('请选择项目状态！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
                })
            }
            var nodeId=this.nodeVal;
            if(!nodeId){
                return this.$alert('请选择项目节点！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
                })
            }
           var name= this.val1;
           if(!name){      
                this.$alert('模板名称不能为空', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
                })
                return false;
           }
           var isRelease=1;
            if(msg=="save"){//保存
              isRelease=1;
            }else{//保存并发布
              isRelease=0
            }
            var fileName=this.fileName;
            var fileUrl=this.fileUrl;
            var fileType=this.fileType;
            var param={name:name,nodeId:nodeId,statusId:stateId,isRelease:isRelease,fileUrl:fileUrl,fileName:fileName,fileType:fileType}
            this.$http.post("/api/template/upload/file",param).then(res =>{
                if(res.code=="00000"){
                    this.$message.success('添加成功！');
                    this.val1='';
                    this.nodeVal='';
                    this.statusVal='';
                    this.newtemplate = false;
                    this.fileList=[];
                    this.isClear=true;
                    this.init();
                }else{
                      this.$message.error(res.message);
                }
            })

        },
        handleCloseLog(){
            this.fileList=[];
            this.nodeVal='';
            this.statusVal='';
            this.val1='';
            this.newtemplate = false;
        },
        getPid(){
          var pid=getUrlParams("pid");       
        },
        rechangeState(){//获取状态
            this.$http.post("/api/template/getStatusAndNodes",{}).then(res =>{
                if(res.code=="00000"){
                    this.statusList1=res.data;
                    this.options4 = [{'value':"0",'label':"全部"}]
                    this.options8=[];
                    var data=res.data;
                    for(var a=0;a<data.length;a++){
                        var msg={};
                        msg['value']=data[a].id;
                        msg['label']=data[a].name;
                        this.options4.push(msg);
                        this.options8.push(msg);
                    }    
                }
            })
        },
        handleChangeStatus(param){
           if(param==0){
                this.options5=[{'value':"0",'label':"全部"}]
           }else{
                var list=this.statusList1;
                for(var i=0;i<list.length;i++){
                    if(list[i].id==param){
                        var nodeList=list[i].list;
                        this.options5=[{'value':"0",'label':"全部"}]
                            for(var j=0;j<nodeList.length;j++){
                                    var msg={};
                                    msg['value']=nodeList[j].id;
                                    msg['label']=nodeList[j].name;
                                    this.options5.push(msg);
                            }
                            
                    }
                }
           }
        },
        changeStatus(index){//获取节点
            this.nodeVal='';
            this.val1='';
            this.tdicList=[];
            var list=this.statusList1[index].list;
            var l=[];
            for(var i=0;i<list.length;i++){
                var msg={};
                msg['value']=list[i].id;
                msg['label']=list[i].name;
                l.push(msg);
            }
             this.options9=l;
        },
        changeNode(index){//获取模板字段
         this.val1='';
         var params={nodeId:index};
         this.$http.post("/api/system/getTemplateDictionaries",params).then(res =>{
             if(res.code=="00000"){
                 var datamsg=res.data;
                 for(var i=0;i<datamsg.length;i++){
                    var obj={};
                    obj.label=datamsg[i].name;
                    obj.value=datamsg[i].id;
                    this.tdicList.push(obj);
                 }
              

             }
         })
    
        },

        handleDel(file, fileList) {
            this.fileName="";
            this.fileUrl="";
            this.fileType="";
        },  
        
        handleExc(files, fileList) {
            this.$message.error(`如需更换文件请先删除后操作`);
        },

        // change upload
        handleBefore(file) {
            this.files = file
            
            let limitCount = 1024*1024*5
            if(file.size > limitCount) {
                this.$message.error(`请选择小于5M的文件`);
                return false
            }
            
            if(this.fileList.length) {
                this.$message.error(`如需更换文件请先删除后操作`);
                return false
            }
            
            
        },

        customRequest() {
            const formData = new FormData();
            
            formData.append('file',this.files);
            
            
            this.$http.post("/api/system/project/uploadTemplate", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })

                    this.fileName=res.data.fileName;
                    this.fileUrl=res.data.fileUrl;
                    this.fileType=res.data.fileType;
                    if(this.val1==null||this.val1==''){
                        var str=res.data.fileName;
                        var index = str.lastIndexOf(".");  
                        str  = str.substring(0,index);
                        this.val1= str;
                    }
                    
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
        }
    },
    mounted (){
        this.rechangeState();
    },
}
</script>

<style lang="less" scoped>
#sy-wrapper{
    
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    border-radius: 4px;
    padding: 0px 20px 10px;
    min-height: 100%;
    .el-divider--horizontal{
        margin: 5px 0;
        background: #F0F3F7;
    }
    .ma-btn-wrapper{
        display: flex;
        justify-content: space-between;
        .de-btn button{
            height: 36px;
            font-size: 14px;
            letter-spacing: 0;
            padding: 0 30px;
            margin: 20px 20px 20px 0;
        }
        .de-search-btn button{
            background: #3B7CFF;
            color: #FFFFFF;
        }
        .de-reset-btn button{
            background: #F9FAFC;
            border: 1px solid #AEB9CA;
            color: #8392A7;
        }
        .ma-btn-block{
            display: flex;
        }
        .de-show-none{
            flex: 2;
            max-width: 200px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            & /deep/ .el-checkbox__label{
                font-size: 12px;
                color: #3B4859;
                letter-spacing: 0;
            }
        }
        
    }
    
    @import url('../../components/Common/less/comDialog.less');
}
</style>