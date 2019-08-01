<template>
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' />
    <div id="situatio" v-else>
        <div class="si-wrapper">
            <div class="si-block">
                <span class="si-icon pub-css si-icon-one"></span>
                <div class="si-box">
                    <p class="pub-family si-title">项目总数</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-two"></span>
                <div class="si-box">
                    <p class="pub-family si-title">采购阶段</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-three"></span>
                <div class="si-box">
                    <p class="pub-family si-title">验收阶段</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-four"></span>
                <div class="si-box">
                    <p class="pub-family si-title">维保阶段</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-five"></span>
                <div class="si-box">
                    <p class="pub-family si-title">待退保</p>
                    <p class="si-normal"><span>28</span>个</p>
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

            <TableCommon  :tableData='tableData' :tablekind='tablekind' :type='type' @handleChangeEdit='handleChangeEdit' />

            <CommPage :hasPage='hasPage' @handlePageUp='handlePageUp' />

        </div>
        
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import TableCommon from '@/components/Common/TableCommon'
import CommPage from '@/components/CommPage'
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
                    prop:'resource',
                    label:'经费来源',
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
                    label:'立项时间',
                    width:''
                }
            ],
            type:'situatio',
            options1: [],
            options2: [     // 项目类型
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '软件项目'
                }, {
                    value: '2',
                    label: '硬件项目'
                }, {
                    value: '3',
                    label: '集成项目'
                }, {
                    value: '4',
                    label: '服务项目'
                }, {
                    value: '5',
                    label: '工程项目'
                }
            ],
            options4: [     // 项目状态
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '项目立项'
                }, {
                    value: '2',
                    label: '项目采购'
                }, {
                    value: '3',
                    label: '项目执行'
                }, {
                    value: '4',
                    label: '项目验收'
                }, {
                    value: '5',
                    label: '项目维保'
                }
            ],
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
            hasPage:true,
            hasExcutingDetail:false
        }
    },
    methods:{
        handleSearchRes(params) {
            // console.log(params)
        },

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
        },
        
        handleChangeEdit(params) {
            this.hasExcutingDetail = true
            console.log(params)
        }
    },
    mounted() {
        this.getPastYear(20)
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
    .si-wrapper{
        width: 100%;
        height: 148px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
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
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        padding: 20px;
    }
}
</style>