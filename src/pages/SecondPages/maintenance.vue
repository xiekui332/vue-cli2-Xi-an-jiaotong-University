<template>
    <Maintenance v-if="hasEdit" @hasMainPage='hasMainPage' />

    <div id="detail" v-else>
        <HeaderSearch 
            :options1='options1' 
            :options2='options2' 
            :options3='options3' 
            :options4='options4'
            :select1 = 'select1' 
            :select2 = 'select2' 
            :select3 = 'select3' 
            :select4 = 'select4' 
            :searchTex = 'searchTex'
            @handleSearch = 'handleSearchRes'
        />

        <el-divider></el-divider>

        <div class="ma-btn-wrapper">
            <el-row class="de-btn de-search-btn">
                <el-button type="primary" round>新建</el-button>
            </el-row>

            <el-row class="de-btn de-reset-btn">
                <el-button type="primary" round>指定负责人</el-button>
            </el-row>

            <el-row class="de-btn de-reset-btn">
                <el-button type="primary" round>Excel批量导入</el-button>
            </el-row>

            <el-checkbox class="de-show-none" v-model="checked" @change="checkSpecified">显示未指定负责人的项目</el-checkbox>
        </div>

        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :stripe='true'
            :cell-class-name="cell"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="项目编号"
                width="120">
            <template slot-scope="scope">{{ scope.row.num }}</template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="项目"
                width="300"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="money"
                label="预算金额"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="resource"
                label="经费来源"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="men"
                label="负责人"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="kind"
                label="类型"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="time"
                label="立项时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop=""
                label="操作"
                show-overflow-tooltip>
                <div class="pub-css ma-edit ma-icon" @click="handleEdit"></div>
                <div class="pub-css ma-del ma-icon" @click="handleDel"></div>
            </el-table-column>
        </el-table>

        <CommPage :hasPage='hasPage' />
    </div>

</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import CommPage from '@/components/CommPage'
import Maintenance from '@/components/Maintenance'
export default {
    // 注册组件
    components:{
        HeaderSearch,
        CommPage,
        Maintenance
    },
    data() {
        return {
            options1: [
                {
                    value: '0',
                    label: '年度'
                }, {
                    value: '1',
                    label: '月度'
                }
            ],
            options2: [
                {
                    value: '0',
                    label: '项目状态'
                }, {
                    value: '1',
                    label: '项目状态'
                }
            ],
            options3: [
                {
                    value: '0',
                    label: '项目类型'
                }, {
                    value: '1',
                    label: '项目类型'
                }
            ],
            options4: [
                {
                    value: '0',
                    label: '经费来源'
                }, {
                    value: '1',
                    label: '经费来源'
                }
            ],
            select1: '',
            select2: '',
            select3: '',
            select4: '',
            searchTex:'',
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
            ],
            hasPage:false,
            checked: false,
            hasEdit:false
        }
    },
    methods:{
        format(percentage) {
            return percentage === 100 ? '' : ``;
        },

        handleSearchRes(params) {
            // console.log(params)
        },

        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        cell({row, column, rowIndex, columnIndex}) {
            if( columnIndex == 6){
                return 'tex-color'
            }
        },

        checkSpecified() {
            // console.log('in')
        },

        hasMainPage(params) {
            this.hasEdit = params;
        },

        handleEdit() {
            this.hasEdit = true
        },

        handleDel() {

        }
    }
}
</script>

<style lang="less" scoped>
#detail{
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
        .de-show-none{
            flex: 2;
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
    & /deep/ .el-table .cell{
        font-size: 14px;
        color: #8998AC;
        letter-spacing: 0;
    }
    & /deep/ .tex-color .cell{
        color: #B5C5DB;
    }
    .ma-icon{
        cursor: pointer;
        float: left;
    }
    .ma-edit{
        width: 20px;
        height: 20px;
        margin-right: 30px;
        background-position: -377px -90px;
    }
    .ma-del{
        width: 20px;
        height: 20px;
        background-position: -377px -167px;
    }
    
}

</style>