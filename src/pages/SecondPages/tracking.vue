<template>
<!-- 执行中项目查看 -->
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' :parentRoute='parentRoute' />
    <div id="tracking" v-else>
        <div class="tr-wrapper">
            <div class="tr-head">
                <HeaderSearch :optionsDate='optionsDate' @handleSearchRes='handleSearchRes' :type='type' />
            </div>
            
            <el-divider></el-divider>

            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :stripe='true'
                :cell-class-name="cell"
                @selection-change="handleSelectionChange"
                @cell-click='handleLookDetail'>

                <el-table-column
                    type="index"
                    label="序号"
                    min-width="50">
                </el-table-column>

                <el-table-column 
                    v-for="(i, ind) in tablekind"
                    :key="ind"
                    :prop="i.prop"
                    :label="i.label"
                    :min-width="i.width"
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

            <CommPage :hasPage='hasPage' />
        </div>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import CommPage from '@/components/CommPage'
import TableCommon from '@/components/Common/TableCommon'
import ExcutingDetail from '@/components/ExcutingDetail'
export default {
    components:{
        HeaderSearch,
        TableCommon,
        CommPage,
        ExcutingDetail
    },
    data() {
        return {
            optionsDate:[
                {
                    value:'0',
                    label:'已到期'
                },
                {
                    value:'1',
                    label:'剩余7天'
                },
                {
                    value:'2',
                    label:'剩余30天'
                }


            ],
            type:'tracking',
            parentRoute:'/proj',
            tableData:[
                {
                    num: 'GS2019001',
                    name: '西安交通大学项目名称项目名称项目名称项目名称项',
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
                    width:'100'
                },
                {
                    prop:'name',
                    label:'项目',
                    width:'250'
                },
                {
                    prop:'money',
                    label:'中标金额',
                    width:''
                },
                {
                    prop:'endtime',
                    label:'维保结束日期',
                    width:'100'
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
                }
            ],
            hasPage:true,
            hasExcutingDetail: false
        }
    },

    methods:{
        handleSearchRes(params) {
            // console.log(params)
        },
        handleTrackLook() {
            this.hasExcutingDetail = true
        }
    },

    mounted() {
        
    },
    beforeRouteEnter(to,from,next) {
        
        next((vm => {
            vm.hasExcutingDetail = false
        }))
    },
    watch:{
        '$route'(to, from) {
            if(to.name === 'tracking') {
                this.hasExcutingDetail = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
#tracking{
    background: #ffffff;
    padding: 0px 20px 0;
    height: 100%;
    .tr-wrapper{
        .el-divider--horizontal{
            margin: 5px 0;
            background: #F0F3F7;
        }
    }
}
</style>