<template>
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' :parentRoute='parentRoute' :paramsUrl="paramsUrl" />
    <div id="situatio" v-else>
        <div class="si-wrapper">
            <div class="si-block">
                <span class="si-icon pub-css si-icon-one"></span>
                <div class="si-box">
                    <p class="pub-family si-title">项目总数</p>
                    <p class="si-normal"><span>{{proj_total}}</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-two"></span>
                <div class="si-box">
                    <p class="pub-family si-title">采购阶段</p>
                    <p class="si-normal"><span>{{caigou_total}}</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-three"></span>
                <div class="si-box">
                    <p class="pub-family si-title">验收阶段</p>
                    <p class="si-normal"><span>{{yanshou_total}}</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-four"></span>
                <div class="si-box">
                    <p class="pub-family si-title">维保阶段</p>
                    <p class="si-normal"><span>{{weibao_total}}</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-five"></span>
                <div class="si-box">
                    <p class="pub-family si-title">待退保</p>
                    <p class="si-normal"><span>{{daituibao_total}}</span>个</p>
                </div>
            </div>
        </div>

        <div class="si-list-wrapper">
            <HeaderSearch 
                @handleSearchRes='handleSearchRes' 
                @handleExcel='handleExcel'
                :type='type'
                :options1='options1'
                :options2='options2'
                :options3='options3'
                :options4='options4'
            />

            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :stripe='true'
                :cell-class-name="cell"
                @cell-click='handleLookDetail'>

                
                <el-table-column 
                    v-for="(i, ind) in tablekind"
                    :key="ind"
                    :prop="i.prop"
                    :label="i.label"
                    :min-width="i.width"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>

            <CommPage :hasPage='hasPage' :total="total" @handlePageUp='handlePageUp' @handlePageRows="handlePageRows" />

        </div>
        
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import CommPage from '@/components/CommPage'
import ExcutingDetail from '@/components/ExcutingDetail'
import { splitUrl } from '../../utils/util.js'
import { store } from '@/store'

export default {
    components:{
        HeaderSearch,
        CommPage,
        ExcutingDetail
    },
    data() {
        return {
            tableData:[],
            tablekind:[
                {
                    prop:"RNUM",
                    label:"序号",
                    width:"40"
                },
                {
                    prop:'num',
                    label:'项目编号',
                    width:'100'
                },
                {
                    prop:'name',
                    label:'项目名称',
                    width:'150'
                },
                {
                    prop:'sourcesFundName',
                    label:'经费来源',
                    width:''
                },
                {
                    prop:'premoney',
                    label:'预算金额',
                    width:'80'
                },
                {
                    prop:'money',
                    label:'合同金额',
                    width:'80'
                },
                // 需要修改
                {
                    prop:'yzxJe',
                    label:'已执行金额',
                    width:'100'
                },
                {
                    prop:'men',
                    label:'负责人',
                    width:'100'
                },
                {
                    prop:'kind',
                    label:'项目类型',
                    width:''
                },
                {
                    prop:'time',
                    label:'立项时间',
                    width:''
                },
                {
                    prop:'stateNodeNames',
                    label:'项目状态',
                    width:'100'
                },
                {
                    prop:'nodeTime',
                    label:'当前状态时间',
                    width:'110'
                }
            ],
            type:'situatio',
            parentRoute:'/proj',
            options1: [],
            options2: [],       // 项目类型
            options4: [],       // 项目状态
            options3: [],       // 经费来源
            hasPage:true,
            hasExcutingDetail:false,
            paramsUrl:"",
            page:1,
            rows:10,
            total:0,
            year:"",
            projectState:"",
            fundsSources:"",
            searchText:"",
            proj_total:'',
            caigou_total:'',
            yanshou_total:'',
            weibao_total:'',
            daituibao_total:'',
            status:''
        }
    },
    methods:{
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
        handleExcel(params){
          console.log(params)
        },
        handlePageUp(params) {
            this.page = params
            this.init()
        },
        getProjectStateCount(state_name,id) {
            var param={
                page:this.page,
                rows:this.rows,
                projectType:this.projectType,
                year:this.year,
                fundsSources:this.fundsSources,
                searchText:this.searchText,
                projectState:this.projectState,
                status:this.status
            };
            this.$http.post("/api/project/getZlAllCount", param)
            .then((res) => {
              //  console.log(res)
                if(res.code == "00000") {
                    var list=res.data;                 
                    this.proj_total = list[0];             
                    this.caigou_total = list[1];              
                    this.yanshou_total = list[2];             
                    this.weibao_total =  list[3];                
                    this.daituibao_total =  list[4];                   
                }else{
                    this.$message({message: res.message, type: 'error' })
                }
            })
        },

        init() {
            this.getProjectStateCount();
            var params={
                page:this.page,
                rows:this.rows,
                projectType:this.projectType,
                year:this.year,
                fundsSources:this.fundsSources,
                searchText:this.searchText,
                projectState:this.projectState,
                status:this.status
            };
            this.$http.post("/api/project/zlProjectList",params).then(res =>{
                if(res.success){
                    this.total=res.total;
                    var datalsit=res.rows;
                    let proList = []
                    for(var i=0;i<datalsit.length;i++){
                        var obj={};
                        obj.RNUM=datalsit[i].RNUM;
                        obj.num=datalsit[i].no;
                        obj.name=datalsit[i].name;
                        obj.premoney=(datalsit[i].ysje).toFixed(2);
                        if(datalsit[i].zbJe){
                           obj.money=(datalsit[i].zbJe).toFixed(2);
                        }
                        if(datalsit[i].pStatus==2){
                           obj.stateNodeNames = "已终止"; 
                        }
                        if(datalsit[i].status==16){
                           obj.stateNodeNames = "已结题" ;
                        }
                        if(datalsit[i].pStatus!=2&&datalsit[i].status!=16){
                           obj.stateNodeNames = datalsit[i].stateNodeNames 
                        }        
                        obj.resource=datalsit[i].sourcesFundName;
                        obj.men=datalsit[i].leaderNames;
                        obj.kind=datalsit[i].projectTypeName;
                        obj.time=datalsit[i].cTime;
                        obj.id=datalsit[i].id;
                        obj.sourcesFundName = datalsit[i].sourcesFundName;
                        obj.nodeTime=datalsit[i].nodeTime;
                        obj.yzxJe=(datalsit[i].yzxJe).toFixed(2);
                        proList.push(obj)
                    }
                    this.tableData = proList                   
                }
            })
        },
        handleLookDetail(row, column, cell ,event) {
            if(column.label == '项目名称'){   
                this.getProjectMsgById(row.id)       
            }
        },
        getProjectMsgById(id){
            let params = {id:id}
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.proInfo = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.hasExcutingDetail = true;
                }else{
                    this.$message.error(res.message);
                }
            })
        },
        cell({row, column, rowIndex, columnIndex}) {
            if( columnIndex == 2){
                return 'project-style'
            }
            
        },
        handlePageRows(params) {
            this.rows = params
            this.init()
        },
        handleSearchRes(params) {
            if(params.projectState == "0") {
                params.projectState = ""
            }
            if(params.projectState=="1"){
                params.status=2;
                params.projectState="";
            }
            if(params.projectState=="2"){
                params.projectState="";
                params.status=16;
            }
            if(params.projectType == "0") {
                params.projectType = ""
            }
            this.year = params.year;
            this.projectType = params.projectType;
            this.fundsSources = params.fundsSources;
            this.searchText = params.searchText;
            this.projectState = params.projectState;
            this.status=params.status;
            this.page=1;
            this.total=0;
            this.init()
        },
        getStatusAndNodes() {
            this.$http.post("/api/template/getStatusAndNodes", {})
            .then((res) => {
                if(res.code == '00000') {
                    this.statusList1 = res.data
                    this.options4 = [{'value':"0",'label':"全部"}]
                    if(this.statusList1.length) {
                        for(var a=0;a<this.statusList1.length;a++){
                            var msg={};
                            msg['value']=this.statusList1[a].id;
                            msg['label']=this.statusList1[a].name;
                            this.options4.push(msg);
                        } 
                        var msg={};
                        msg['value']=1;
                        msg['label']="已终止";
                        this.options4.push(msg);
                        var msg1={};
                        msg1['value']=2;
                        msg1['label']="已结题";
                        this.options4.push(msg1);
                    }
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },

        getProjectType(){
            this.$http.post('/api/project/getProjectType')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.options2 = [{"value":"0","label":"全部"}];
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.options2.push(obj)
                        }
                    }
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },

        getFundsSource(){
            let params = {}
            this.$http.post('/api/project/getFundsSource')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.options3 = []
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.options3.push(obj)
                        }
                    }
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        }

        
    },
    mounted() {
        this.getPastYear(20)
        
        this.getStatusAndNodes()
        this.getProjectType()
        this.getFundsSource()

        this.paramsUrl = splitUrl('?')
    },
    watch: {
        '$route'(to, from) {
            if(to.name === 'situatio') {
                this.hasExcutingDetail = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
#situatio{
    min-height: 100%;
    .si-wrapper{
        width: 100%;
        height: 148px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .si-block{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .si-icon{
                display: inline-block;
                width: 32px;
                height: 32px;
                
                margin-right: 30px;
            }
            .si-icon-one{
                background-position: -315px -68px;
            }
            .si-icon-two{
                background-position: -315px -168px;
            }
            .si-icon-three{
                background-position: -10px -312px;
            }
            .si-icon-four{
                background-position: -315px -120px;
            }
            .si-icon-five{
                background-position: -210px -264px;
            }
            .si-title{
                font-size: 14px;
                color: #39475B;
            }
            .si-normal{
                font-size: 14px;
                color: #39475B;
                span{
                    font-size: 42px;
                    color: #3B7CFF;
                    padding: 0 5px;
                }
            }
            .si-box{
                display: flex;
                flex-direction:column;
                align-items: center;
            }
        }
    }
    .si-list-wrapper{
        min-height: 100%;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        padding: 0px 20px 10px;


        
        & /deep/ .project-style .cell{
            cursor: pointer;
            color: #3B7CFF;
        }
    }
}
</style>