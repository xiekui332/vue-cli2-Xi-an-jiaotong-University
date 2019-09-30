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
                    prop:'premoney',
                    label:'预算金额',
                    width:''
                },
                {
                    prop:'money',
                    label:'中标金额',
                    width:''
                },
                {
                    prop:'status',
                    label:'项目状态',
                    width:''
                },
                {
                    prop:'men',
                    label:'负责人',
                    width:''
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
            daituibao_total:''
        }
    },
    methods:{

        getPastYear(n) {
            for(let last = new Date().getFullYear(), i = last - n; i <= last; i ++ ) {
                // unshift 插入到数组开头
                this.options1.unshift({
                    value:i,
                    label:i + ' 年'
                })
            }
        },

        handlePageUp(params) {
            // console.log(params)
            this.page = params
            this.init()
        },
        getProjectStateCount(state_name,id) {
            var param={projectState:id}
            this.$http.post("/api/project/getProjectCountByState", param)
            .then((res) => {
                if(res.success == true) {
                    console.log(state_name+"==",res.total)
                    if(state_name === 'proj_total'){
                        this.proj_total = res.total;
                    }else  if(state_name === 'caigou_total'){
                        this.caigou_total = res.total;
                    }else  if(state_name === 'yanshou_total'){
                        this.yanshou_total = res.total;
                    }else  if(state_name === 'weibao_total'){
                        this.weibao_total = res.total;
                    }else  if(state_name === 'daituibao_total'){
                        this.daituibao_total = res.total;
                    }
                    
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },

        init() {
            this.getProjectStateCount('proj_total','')
            this.getProjectStateCount('caigou_total','9d7cba37176a4252b67be2294a45a87b')
            this.getProjectStateCount('yanshou_total','aba2a0b30afa49dc918b4be6f5659143')
            this.getProjectStateCount('weibao_total','7573afa999d346dcba4696a230c91c39')
            this.getProjectStateCount('daituibao_total','9d7cba37176a4252b67be2294a45a87b')
            var params={
                page:this.page,
                rows:this.rows,
                projectType:this.projectType,
                year:this.year,
                fundsSources:this.fundsSources,
                searchText:this.searchText,
                projectState:this.projectState
            };
            this.$http.post("/api/project/getProjectList",params).then(res =>{
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
                        obj.money="0.00";
                        obj.status = datalsit[i].projectStateName
                        obj.resource=datalsit[i].sourcesFundName;
                        obj.men=datalsit[i].leaderNames;
                        // obj.menId=datalsit[i].leaderId;
                        obj.kind=datalsit[i].projectTypeName;
                        obj.time=datalsit[i].createTime;
                        obj.id=datalsit[i].id;
                        // obj.projectNode=datalsit[i].projectNode;
                        // obj.sourcesFundingType=datalsit[i].sourcesFundingType;
                        // obj.projectCategory=datalsit[i].projectCategory;
                        // obj.projectState=datalsit[i].projectState;
                        // obj.startTime=datalsit[i].startTime;
                        // obj.endTime=datalsit[i].endTime;
                        // obj.remark=datalsit[i].remark;
                        // obj.projectType=datalsit[i].projectType;
                        // obj.isOldProject=datalsit[i].isOldProject;
                        // obj.projectTypeNames=datalsit[i].projectTypeNames;
                        // obj.projectCategoryNames=datalsit[i].projectCategoryNames;
                        //  obj.projectStateName=datalsit[i].projectStateName;
                        //  obj.projectNodeName=datalsit[i].projectNodeName;

                        proList.push(obj)
                    }

                    this.tableData = proList
                    
                }
            })
        },

        // cell click
        handleLookDetail(row, column, cell ,event) {
            // console.log(row)
            if(column.label == '项目名称'){   
                this.getProjectMsgById(row.id)
                
            }
        },

        getProjectMsgById(id){
            let params = {
                id:id
            }
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
            // console.log(columnIndex)
            if( columnIndex == 2){
                return 'project-style'
            }
            
        },

        handlePageRows(params) {
            // console.log(params)
            this.rows = params
            this.init()
        },

        // search
        handleSearchRes(params) {
            if(params.projectState == "0") {
                params.projectState = ""
            }
            if(params.projectType == "0") {
                params.projectType = ""
            }
            // console.log(params)
            this.year = params.year
            this.projectType = params.projectType
            this.fundsSources = params.fundsSources
            this.searchText = params.searchText
            this.projectState = params.projectState
            this.init()
        },

        // pro status
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