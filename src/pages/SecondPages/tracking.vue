<template>
<!-- 执行中项目查看 -->
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' />
    <div id="tracking" v-else>
        <div class="tr-wrapper">
            <div class="tr-head">
                <HeaderSearch :optionsDate='optionsDate' @handleSearchRes='handleSearchRes' :type='type' />
            </div>

            <TableCommon :tableData='tableData' :tablekind='tablekind' :type='type' @handleTrackLook='handleTrackLook' />

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
                    width:'120'
                },
                {
                    prop:'name',
                    label:'项目',
                    width:'300'
                },
                {
                    prop:'money',
                    label:'中标金额',
                    width:''
                },
                {
                    prop:'endtime',
                    label:'维保结束日期',
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
    padding: 20px;
    height: 100%;
    .tr-wrapper{
        
    }
}
</style>