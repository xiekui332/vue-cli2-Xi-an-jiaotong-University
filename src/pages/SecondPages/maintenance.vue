<template>
    <!-- 执行计划维护 -->
    <Maintenance v-if="hasEdit" @hasMainPage='hasMainPage' :hasDisabled='hasDisabled' />

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

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round>Excel批量导入</el-button>
                </el-row>
            </div>
            <el-checkbox class="de-show-none" v-model="checked" @change="checkSpecified">显示未指定负责人的项目</el-checkbox>
        </div>

        <TableCommon @handleChangeEdit = 'handleChangeEdit' :tableData='tableData' :tablekind='tablekind' />

        <CommPage :hasPage='hasPage' @handlePageUp='handlePageUp' />

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
                <span>ssss</span>
            </div>
            <div>
                <span>项目名称:</span>
                <span>ssss</span>
            </div>
            <div>
                <span><i>*</i> 项目负责人:</span>
                <el-select v-model="manVal" placeholder="请选择" multiple class="ma-dia-sel">
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
            leadMan:[
                {
                    value:'1',
                    label:'谢奎'
                }
            ],
            manVal:'',
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
                    label:'预算金额',
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
            tableData:[
                {
                    num: 'GS2019001',
                    name: '西安交通大学项目名称项目名称项目名称项目名称项',
                    money: '28.1万',
                    resource: '改善办学条件',
                    men: '文华',
                    kind: '货物|软件',
                    time: '2019-02-18'
                },
                {
                    num: 'GS2019001',
                    name: '西安交通大学项目名称项目名称项目名称项目名称项',
                    money: '28.1万',
                    resource: '改善办学条件',
                    men: '文华',
                    kind: '货物|软件',
                    time: '2019-02-18'
                }
            ]
        }
    },
    methods:{
        handleSearchRes(params) {
            // console.log(params)
        },

        checkSpecified() {
            // console.log('in')
        },

        handleChangeEdit(id, disabled) {
            this.hasEdit = true
            this.hasDisabled = disabled
        },

        hasMainPage(params) {
            this.hasEdit = params;
        },

        handleBuilt() {
            this.handleChangeEdit('', false)
        },

        handleAssign() {
            this.exchangeMan = true
        },

        handleMaBtn(type) {
            if(type == 'cancel') {
                this.exchangeMan = false
            }else if(type == 'sure') {
                this.exchangeMan = false
            }
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

        }

        
    },

    mounted() {
        this.getPastYear(20)
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
    padding: 20px;
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
    
}

</style>