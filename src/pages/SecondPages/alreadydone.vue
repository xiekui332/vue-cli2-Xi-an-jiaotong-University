<template>
    <ApproveDetail v-if="hasExcutingDetail" :type='type' :parentRoute='parentRoute' />
    <div id="do-wrapper" v-else>
        <HeaderSearch 
        :options1='options1'
        :options3='options3'
        :options6='options6'
        :searchTex='searchTex'
        @handleSearch = 'handleSearchRes'
        />

        <el-divider></el-divider>
        
        <TableCommon  :tableData='tableData' :tablekind='tablekind' :type='type' @handleChangeEdit='handleChangeEdit' />
        
        <CommPage :hasPage='hasPage' @handlePageUp='handlePageUp' />
    </div>
</template>

<script>
import TableCommon from '@/components/Common/TableCommon'
import CommPage from '@/components/CommPage'
import HeaderSearch from '@/components/HeaderSearch'
import ApproveDetail from '@/pages/SecondPages/approveDetail'
export default {
    components:{
        TableCommon,
        CommPage,
        HeaderSearch,
        ApproveDetail
    },
    data() {
        return {
            options1: [],
            options3: [     // 经费来源
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '改善办学条件'
                }, {
                    value: '2',
                    label: '一流大学'
                }, {
                    value: '3',
                    label: '校级专项'
                }, {
                    value: '4',
                    label: '课题经费'
                }, {
                    value: '5',
                    label: '银行投资经费'
                }, {
                    value: '6',
                    label: '其他'
                }
            ],
            options6: [
                {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '采购申请审批'
                },
                {
                    value: '2',
                    label: '验收申请审批'
                },
                {
                    value: '3',
                    label: '维保结束审批'
                }
            ],
            searchTex:'',
            tableData:[
                {
                    num: 'GS2019001',
                    name: '西安交通大学项目名称项目名称项目名称项目名称项',
                    premoney: '28.1万',
                    money: '28.1万',
                    resource: '改善办学条件',
                    men: '文华',
                    kind: '货物|软件',
                    time: '2019-02-18',
                    endtime: '2019-02-18',
                    status:'维保|结束申请'
                }
            ],
            tablekind:[
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
                    prop:'time',
                    label:'审批时间',
                    width:''
                }
            ],
            hasPage:true,
            type:'done',
            parentRoute:'/approve',
            hasExcutingDetail:false
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
        
        handleSearchRes(params) {
            // console.log(params)
        },

        handleChangeEdit(params) {
            this.hasExcutingDetail = true
        },

        handlePageUp(params) {
            // console.log(params)
        }
    },
    mounted() {
        this.getPastYear(20)
    },
    watch:{
        '$route'(to, from){
            if(to.name === 'done') {
                this.hasExcutingDetail = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
#do-wrapper{
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    border-radius: 4px;
    padding: 20px;
    min-height: 100%;
}
</style>