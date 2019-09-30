<template>
    <!-- 执行计划维护 -->
    <Maintenance v-if="hasEdit" @hasMainPage='hasMainPage' :hasDisabled='hasDisabled' :changeMsg='changeMsg' :hasLook='hasLook'  />

    <div id="detail" v-else>
        <HeaderSearch 
            :options1='options1' 
            :options2='options2' 
            :options3='options3' 
            :select1 = 'select1' 
            :select2 = 'select2' 
            :select3 = 'select3' 
            :select4 = 'select4' 
            :searchTex = 'searchTex'
            @handleSearchRes = 'handleSearchRes'
            :type='type'
        />

        <el-divider></el-divider>

        <div class="ma-btn-wrapper">
            <div class="ma-btn-block">
                <el-row class="de-btn de-search-btn">
                    <el-button type="primary" round @click="handleBuilt">新建</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleAssign">指定负责人</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn de-import">
                    <el-button type="primary" round @click="handleExcel">
                        Excel批量导入
                    </el-button>
                    <el-upload
                        class="upload-demo"
                        action= ""
                        :before-upload="handleBefore"
                        :http-request="customRequest"
                        :limit="1"
                        :file-list="fileList"
                        accept='.doc,.docx,.xls,.xlsx'
                        >
                        <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                    </el-upload>
                </el-row>
            </div>
            <el-checkbox class="de-show-none" v-model="checked" @change="checkSpecified">显示未指定负责人的项目</el-checkbox>
        </div>

        <TableCommon :type="type" @handleChangeEdit = 'handleChangeEdit'  @handleSelectOprate='handleSelectOprate' @handleReload='handleReload' @handleLook='handleLook' :tableData='tableData' :tablekind='tablekind' />

        <CommPage :hasPage='hasPage' :total="total"  @handlePageUp='handlePageUp' @handlePageRows='handlePageRows'/>

        <el-dialog
            :class="'ma-dialog'"
            :visible.sync='exchangeMan'
            :show-close='hasClose'
            :close-on-click-modal=true 
            :close-on-press-escape=true
            title='指定负责人'
            >
        <el-divider></el-divider>
        <div class="ma-dia-content">
            <div>
                <span>项目编号:</span>
                <span>{{projectNo}}</span>
            </div>
            <div>
                <span>项目名称:</span>
                <span>{{projectName}}</span>
            </div>
            <div>
                <span><i>*</i> 项目负责人:</span>
                <el-select v-model="manVal" filterable placeholder="请选择" multiple class="ma-dia-sel" >
                    <el-option
                    v-for="item in leadMan"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            
            <div>
                <el-row class="ma-btn-block">
                    <el-button type="" round @click="handleMaBtn('cancel')">取消</el-button>
                    <el-button type="primary" round @click="handleMaBtn('sure')">确定</el-button>
                </el-row>
            </div>
        </div>
        </el-dialog>
    </div>

</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import CommPage from '@/components/CommPage'
import Maintenance from '@/components/Maintenance'
import TableCommon from '@/components/Common/TableCommon'
import { handleLogin } from '@/utils/api'
export default {
    // 注册组件
    components:{
        HeaderSearch,
        CommPage,
        Maintenance,
        TableCommon
    },
    data() {
        return {
            options1: [],
            options2: [{}],// 项目类型
            options3: [{}],// 经费来源
            select1: '',
            select2: '',
            select3: '',
            select4: '',
            searchTex:'',
            hasPage:true,
            checked: false,
            hasEdit:false,
            hasDisabled:false,
            exchangeMan:false,
            hasClose:true,
            leadMan:[ {}],
            manVal:[],
            tablekind:[
                 {
                    prop:'RNUM',
                    label:'序号',
                    width:'50'
                },
                {
                    prop:'num',
                    label:'项目编号',
                    width:'100'
                },
                {
                    prop:'name',
                    label:'项目名称',
                    width:'160'
                },
                {
                    prop:'money',
                    label:'预算金额(万)',
                    width:'100'
                },
                {
                    prop:'resource',
                    label:'经费来源',
                    width:'120'
                },
                {
                    prop:'men',
                    label:'负责人',
                    width:'150'
                },
                {
                    prop:'kind',
                    label:'类型',
                    width:'130'
                },
                {
                    prop:'time',
                    label:'立项时间',
                    width:''
                }
            ],
            tableData:[{ }],
            page:1,
            rows:10,
            total:0,
            year:'',
            tex:'',
            projectType:'',
            projectSource:'',
            isLeader:'',
            selectRows:[],
            projectId:'',
            projectNo:'',
            projectName:'',
            type:"first",
            changeMsg:{},
            hasLook:false,
            fileList:[],
            files:{}

        }
    },
    methods:{
        handleSearchRes(params) {
             this.year=params.sel1;
             this.projectType=params.sel2;
             this.projectSource=params.sel3;
             this.tex=params.tex;
             this.init();
        },
        handleReload(params){
            if(params){
                this.init();
            }
             
        },
        init(){
            var projectType=this.projectType;
            if(projectType=="全部"){
                projectType=""
            }
            var projectSource=this.projectSource;
            if(projectSource=="全部"){
                projectSource=""
            }
            var params={page:this.page,rows:this.rows,projectType:projectType,year:this.year,fundsSources:projectSource,searchText:this.tex,isLeader:this.isLeader};
            this.$http.post("/api/project/getProjectList",params).then(res =>{
                if(res.success){
                    this.total=res.total;
                    this.tableData=[];
                    var datalsit=res.rows;
                    for(var i=0;i<datalsit.length;i++){
                        var obj={};
                        obj.RNUM=datalsit[i].RNUM;
                        obj.num=datalsit[i].no;
                        obj.name=datalsit[i].name;
                        obj.money=(datalsit[i].ysje).toFixed(2);
                        obj.resource=datalsit[i].sourcesFundName;
                        obj.men=datalsit[i].leaderNames;
                        obj.menId=datalsit[i].leaderId;
                        obj.kind=datalsit[i].projectTypeName;
                        obj.time=datalsit[i].createTime;
                        obj.id=datalsit[i].id;
                        obj.projectNode=datalsit[i].projectNode;
                        obj.sourcesFundingType=datalsit[i].sourcesFundingType;
                        obj.projectCategory=datalsit[i].projectCategory;
                        obj.projectState=datalsit[i].projectState;
                        obj.startTime=datalsit[i].startTime;
                        obj.endTime=datalsit[i].endTime;
                        obj.remark=datalsit[i].remark;
                        obj.projectType=datalsit[i].projectType;
                        obj.isOldProject=datalsit[i].isOldProject;
                        obj.projectTypeNames=datalsit[i].projectTypeNames;
                        obj.projectCategoryNames=datalsit[i].projectCategoryNames;
                         obj.projectStateName=datalsit[i].projectStateName;
                         obj.projectNodeName=datalsit[i].projectNodeName;
                        this.tableData.push(obj); 
                    }
                    
                }
            })
        },
        checkSpecified() {
         if(this.checked==true){
             this.isLeader="1";
             this.init();
         }else{
             this.isLeader="";
             this.init();
         }
        },

        handleChangeEdit(id, disabled) {
            this.changeMsg=id;
            this.hasEdit = true
            this.hasDisabled = disabled
            this.hasLook=false;
        },
        handleLook(params){
            this.changeMsg=params;
            this.hasEdit = true;
            this.hasDisabled = true;
            this.hasLook=true;
        },
        hasMainPage(params) {
            this.hasEdit = params;
        },

        handleBuilt() {
            this.handleChangeEdit('', false)
        },

        handleAssign() {
            if(this.selectRows.length!=1){
              this.$message.error("请选择一行进行指定");
            }else{               
                var rowmsg=this.selectRows;
                var menids=rowmsg[0].menId;
                if(menids){
                    var menId=menids.split(",");
                    this.manVal=menId;          
                }
               
                this.projectNo=rowmsg[0].num;
                this.projectName=rowmsg[0].name;
                this.projectId=rowmsg[0].id; 
                this.exchangeMan = true
            }
        },

        handleMaBtn(type) {
            if(type == 'cancel') {
                this.manVal=[];
                this.exchangeMan = false
            }else if(type == 'sure') {
                if(this.manVal.length>0){
                    var params={projectId:this.projectId,leaderId:JSON.stringify(this.manVal)}
                    this.$http.post("/api/project/updateProjectLeader",params).then(res =>{
                        if(res.code=="00000"){
                            this.manVal=[];
                            this.init();
                            this.exchangeMan = false
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                   
                }else{
                    this.$message.error("请选中指定的负责人");
                }
            }
        },

        getPastYear(n) {
            this.$http.get("/api/system/get/systemTime").then(res =>{
                for(let last = res.message, i = last - n; i <= last; i ++ ) {
                    // unshift 插入到数组开头
                    this.options1.unshift({
                        value:i,
                        label:i + ' 年'
                    })
                }
            });
        },

        handlePageUp(params) {
         this.page=params;
         this.init();
        },
        handlePageRows(params){
         this.rows=params;
         this.init();
        },
        getFundsSource(){
            this.$http.post('/api/project/getFundsSource')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.options3 = [{"value":"全部","lable":"0"}]
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.options3.push(obj)
                        }
                    }
                }
            })
        },
        getProjectType(){
            this.$http.post('/api/project/getProjectType')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.options2 = [{"value":"全部","lable":"0"}];
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.options2.push(obj)
                        }
                    }
                }
            })
        },
        getUser(){
            var params={};
            this.$http.post("/api/user/getAllUser",params).then(res =>{
                if(res.success){
                    var msgList=res.rows;
                    this.leadMan=[];
                    for(var i=0;i<msgList.length;i++){
                        var obj={};
                        obj.value=msgList[i].id;
                        obj.label=msgList[i].userName;
                        this.leadMan.push(obj);
                    }
                }
            })
        },
        handleSelectOprate(params){
          this.selectRows=params;
        },

        handleExcel() {
            
        },

        // berfore upload
        handleBefore(file) {
            console.log("???")
            this.files = file

            let limitCount = 1024*1024*5
            if(file.size > limitCount) {
                this.$message.error(`请选择小于5M的文件`);
                return false
            }
        },

        // upload
        customRequest() {
            console.log("****")
            const formData = new FormData();
            formData.append('files',this.files);

            this.$http.post("/api/project/exceltosql", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })

                    this.init()
                    this.files = {}
                    this.fileList=[];
                    
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

    mounted() {
        this.getPastYear(20)
        this.getFundsSource();
        this.getProjectType();
        this.getUser();

    }
    
}
</script>

<style lang="less" scoped>
#detail{
    & /deep/ input::placeholder{
        font-size: 12px;
    }
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    border-radius: 4px;
    padding: 0px 20px 10px;
    min-height: 100%;
    .pub-css{
        background: url('../../assets/img/css_sprites.png');
        background-size:440px 391px; 
    }
    .el-divider--horizontal{
        margin: 0;
    }
    .el-divider{
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
        
        .de-import{
            position: relative;
            & /deep/ .upload-demo{
                position: absolute;
                opacity: 0;
                top: 20px;
                left: 0;
                width: 100%;
                height: 36px;
                overflow: hidden;
                .el-upload{
                    width: 100%;
                }
            }
        }
    }
    
    .ma-dialog{
        & /deep/ .el-dialog{
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #EFF2F7;
            border-radius: 4px;
            .el-dialog__body{
                margin-top: -20px;
            }
        }
        display: flex;
        flex-direction:column; 
        .ma-dia-content{
            >div{
                display: flex;
                margin-top: 10px;
                align-items: center;
                span:nth-child(1){
                    display: inline-block;
                    min-width: 100px;
                    text-align: right;
                    padding-right: 10px;
                    i{
                        color: red;
                        font-size: 14px;
                    }
                }
            }
            .ma-dia-sel{
                & /deep/ .el-input{
                    width: 300px;
                }
                & /deep/ .el-input__inner{
                    height: 36px;
                }
            }
            .ma-btn-block{
                width: 100%;
                text-align: center;
                margin: 50px 0 10px 0;
                button{
                    height: 36px;
                    width: 100px;
                }
                button:nth-child(1) {
                    background: #F9FAFC;
                    border: 1px solid #AEB9CA;
                    font-size: 14px;
                    color: #8392A7;
                }
                button:nth-child(2) {
                    background: #3B7CFF;
                    font-size: 14px;
                    color: #FFFFFF;
                }

                
                

            }
        }
    }

    
    // change font css color
    & /deep/ .project-style .cell{
        color: #3B7CFF!important;
    }
    
}

</style>