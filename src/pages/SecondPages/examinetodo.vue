<template>
    <div class="to-nodata" v-if="hasData">
        <img src="../../assets/img/wushuju.png" alt="">
        <div>
            <p class="to-noapprove">暂无待办审批</p>
            <el-row class="to-btn">
                <el-button type="primary" round @click="handleback()">返回总览</el-button>
            </el-row>
        </div>
    </div>
    <div v-else class="to-wrapper">
        <ApproveDetail v-if="hasExcutingDetail" :type='type' :parentRoute='parentRoute' :proInfo='proInfo' :rowInfo='rowInfo' @handleChangeDetail = "handleChangeDetail" />
        <div id="to-wrapper" v-else>
            <HeaderSearch 
            :options1='options1'
            :options3='options3'
            :options6='options6'
            :searchTex='searchTex'
            :type='type'
            @handleSearchRes = 'handleSearchRes'
            />

            <el-divider></el-divider>
            
            <el-table
                v-if="tableType == '待审批'"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :stripe='true'
                :cell-class-name="cell"
                @selection-change="handleSelectionChange"
                @cell-click='handleLookDetail'>

                <el-table-column 
                    v-for="(i, ind) in tablekind"
                    :key="ind"
                    :prop="i.prop"
                    :label="i.label"
                    :width="i.width"
                    show-overflow-tooltip>
                </el-table-column>
                
                <el-table-column
                    prop=""
                    label="操作"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">
                        <div class="ma-icon ma-todo" @click="trackingDetail(scope.row)">
                            审批
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <el-table
                v-if="tableType == '已审批'"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :stripe='true'
                :cell-class-name="cell"
                @selection-change="handleSelectionChange"
                @cell-click='handleLookDetail'>
                
                <el-table-column 
                    v-for="(i, ind) in tablekindDone"
                    :key="ind"
                    :prop="i.prop"
                    :label="i.label"
                    :width="i.width"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>

            <CommPage :hasPage='hasPage' @handlePageUp='handlePageUp' @handlePageRows='handlePageRows' :total='total' />
            
        </div>
    </div>
</template>

<script>
import TableCommon from '@/components/Common/TableCommon'
import CommPage from '@/components/CommPage'
import HeaderSearch from '@/components/HeaderSearch'
import ApproveDetail from '@/pages/SecondPages/approveDetail'
import { store } from '@/store'
export default {
    components:{
        HeaderSearch,
        TableCommon,
        CommPage,
        ApproveDetail
    },
    data() {
        return {
            options1: [],
            options3: [     // 经费来源
                // {
                //     value: '',
                //     label: '全部'
                // }, {
                //     value: '1',
                //     label: '改善办学条件'
                // }, {
                //     value: '2',
                //     label: '一流大学'
                // }, {
                //     value: '3',
                //     label: '校级专项'
                // }, {
                //     value: '4',
                //     label: '课题经费'
                // }, {
                //     value: '5',
                //     label: '银行投资经费'
                // }, {
                //     value: '6',
                //     label: '其他'
                // }
            ],
            options6: [
                {
                    value: '1',
                    label: '已审批'
                },
                {
                    value: '0',
                    label: '待审批'
                }
            ],
            searchTex:'',
            tableData:[
                {
                    // num: 'GS2019001',
                    // name: '西安交通大学项目名称项目名称项目名称项目名称项',
                    // premoney: '28.1万',
                    // money: '28.1万',
                    // resource: '改善办学条件',
                    // men: '文华',
                    // kind: '货物|软件',
                    // time: '2019-02-18',
                    // endtime: '2019-02-18',
                    // approveTime: '2019-02-18',
                    // status:'维保|结束申请'
                }
            ],
            tablekind:[
                {
                    prop:'index',
                    label:'序号',
                    width:'50'
                },
                {
                    prop:'num',
                    label:'项目编号',
                    width:'120'
                },
                {
                    prop:'name',
                    label:'项目名称',
                    width:'300'
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
                    label:'状态',
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
                }
            ],
            tablekindDone:[
                {
                    prop:'index',
                    label:'序号',
                    width:'50'
                },
                {
                    prop:'num',
                    label:'项目编号',
                    width:'120'
                },
                {
                    prop:'name',
                    label:'项目',
                    width:'300'
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
                    label:'类型',
                    width:''
                },
                {
                    prop:'approveTime',
                    label:'审批时间',
                    width:''
                }
            ],
            hasPage:true,
            type:'todo',
            parentRoute:'/approve',
            hasExcutingDetail:false,
            hasData:false,
            tableType:'待审批',
            page:1,
            rows:10,
            year:'',
            jfId:'',
            noOrName:'',
            total:0,
            approveType:'',
            state:'',
            hasPageNum:10,
            detailId:'',
            proInfo:{},
            rowInfo:{}
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

        handleReset(){
            this.page = 1
            this.rows = 10
        },
        
        handleSearchRes(params) {
            this.tableType = params.type
            this.handleReset()
            this.state = params.state
            this.noOrName = params.noOrName
            this.jfId = params.jfId
            this.year = params.year

            this.init()
            
        },

        handleChangeEdit(params) {
            this.hasExcutingDetail = true
        },

        handlePageUp(params) {
            this.page = params
            this.init()
        },

        handlePageRows(params) {
            this.rows = params
            this.init()
        },

        handleback() {
            this.$router.push({
                path:'/stage'
            })
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        cell({row, column, rowIndex, columnIndex}) {
            if( columnIndex == 2){
                return 'project-style'
            }
            else if(columnIndex == 8 && this.tableType == '待审批') {
                return 'todo-style'
            }
            
        },

        trackingDetail(row) {
            this.detailId = row.id
            this.getProjectMsgById()
        },

        handleLookDetail(row, column, cell ,event) { 
            this.rowInfo=row
            this.detailId = row.id
            if(column.label == '项目名称'){               
                this.getProjectMsgById()
            }
            
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
                }
            })
        },

        getApproveType(name){
            if(name === 'todo'){
                this.hasExcutingDetail = false
                this.approveType = 'cgsp'
            }else if(name === 'done') {
                this.approveType = 'yssp'
            }else if(name === 'end') {
                this.approveType = 'wbsp'
            }
            this.state = '0';
            this.page = 1;
            this.rows = 10;
            this.total = 0;
            this.init()
        },

        init(){
            let data = {
                page:this.page,
                rows:this.rows,
                year:this.year,
                jfId:this.jfId,
                noOrName:this.noOrName,
                state:this.state,
                type:this.approveType
            }
            this.$http.post('/api/project/getSpProjectList', data)
            .then((res) => {
                if(res.success == true) {
                    this.tableData = []
                    if(res.rows.length){
                        this.total = res.total
                        for(let i = 0; i < res.rows.length; i ++){
                            let obj = {}
                            obj.index = i + 1
                            obj.num = res.rows[i].no
                            obj.name = res.rows[i].name
                            obj.premoney = res.rows[i].ysje 
                            obj.money = res.rows[i].zbje
                            obj.status = res.rows[i].stateAndNodeName
                            obj.men = res.rows[i].leaderNames
                            obj.kind = res.rows[i].projectTypeName
                            obj.approveTime = res.rows[i].time
                            obj.id = res.rows[i].id
                            obj.projectNode = res.rows[i].projectNode
                            obj.projectType = res.rows[i].projectType
                            obj.pl=res.rows[i].pl;
                            obj.approveType=this.approveType;
                            this.tableData.push(obj)
                        }
                    }
                }
            })
        },

        getProjectMsgById(){
            let params = {
                id:this.detailId
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.proInfo = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.hasExcutingDetail = true
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        handleChangeDetail(params) {
            // this.hasExcutingDetail = true
        }

    },
    mounted() {
        this.getPastYear(20)
        this.getFundsSource();
    },
    created(){
        this.getApproveType(this.$route.name)
    },
    watch:{
        '$route'(to, from){
            this.getApproveType(to.name)
        }
    }
}
</script>

<style lang="less" scoped>
.to-wrapper{
    min-height: 100%;background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    & /deep/ .el-table .el-table__header-wrapper .cell{
        font-size: 14px;
        color: #39475B;
        letter-spacing: 0;
        text-align: center;
    }
    & /deep/ .el-table .el-table__body-wrapper .cell{
        font-size: 14px;
        color: #8998AC;
        letter-spacing: 0;
        text-align: center;
    }
    & /deep/ .project-style .cell{
        cursor: pointer;
    }
    & /deep/ .todo-style .cell .ma-todo{
        cursor: default;
        color:#3B7CFF;
    }
    .el-divider--horizontal{
        margin: 5px 0;
        background: #F0F3F7;
    }
}
#to-wrapper{
    
    border-radius: 4px;
    padding: 20px;
    min-height: 100%;
}
.to-nodata{
    display: flex;
    min-height: 100%;
    justify-content: center;
    align-items: center;
    img{
        margin-right: 100px;
    }
    .to-noapprove{
        font-size: 26px;
        color: #39475B;
        letter-spacing: 0;
    }
    .to-btn{
        button{
            width: 128px;
            height: 36px;
            background: #3B7CFF;
            font-size: 14px;
            color: #FFFFFF;
            margin-top: 40px;
        }
    }
}
</style>


