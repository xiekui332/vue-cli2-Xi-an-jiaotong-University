<template>
    <div id="lo-wrapper">
        <div class="lo-header">
            <el-select v-model="params.systype" placeholder="操作类型"
            >
                <el-option
                v-for="item in optA"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>

            <div class="block">
                <el-date-picker
                v-model="params.startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始时间">
                </el-date-picker>
            </div>

            <div class="block">
                <el-date-picker
                v-model="params.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间">
                </el-date-picker>
            </div>

            <el-input class="de-search-input" v-model="params.name" placeholder="操作人"></el-input>

            <el-select v-model="params.workCompany" placeholder="单位" style="display:none;"
            >
                <el-option
                v-for="item in optB"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
                </el-option>
            </el-select>

            <el-input class="de-search-input" v-model="params.firstTitle" placeholder="一级栏目"></el-input>

            <el-input class="de-search-input" v-model="params.secondTitle" placeholder="二级栏目"></el-input>

            <div class="de-btn-wrapper">
                <el-row class="de-btn de-search-btn">
                    <el-button type="primary" round @click="handleSearch('search')">查询</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleSearch('clear')">清空</el-button>
                </el-row>
            </div>
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
                width="55">
            </el-table-column>

            <el-table-column 
                v-for="(i, ind) in tablekind"
                :key="ind"
                :prop="i.prop"
                :label="i.label"
                :width="i.width"
                show-overflow-tooltip>
            </el-table-column>
            
        </el-table>

        <CommPage :hasPage='hasPage' @handlePageUp='handlePageUp' @handlePageRows='handlePageRows' :total='total' />

    </div>
</template>

<script>
import CommPage from '@/components/CommPage'
export default {
    components:{
        CommPage
    },
    data() {
        return {
            optA:[
                {
                    label:"",
                    value:"全部"
                },
                {
                    label:"新增",
                    value:"新增"
                },
                {
                    label:"删除",
                    value:"删除"
                },
                {
                    label:"修改",
                    value:"修改"
                },
                {
                    label:"登录",
                    value:"登录"
                },
                {
                    label:"其他",
                    value:"其他"
                }
            ],
            optB:[
                {
                    label:"机械工程学院",
                    value:"机械工程学院"
                },
                {
                    label:"管理学院",
                    value:"管理学院"
                }
            ],
            beginTime:"",
            endTime:"",
            tablekind:[
                {
                    prop:'trueName',
                    label:'操作人',
                    width:''
                },
                {
                    prop:'workCompany',
                    label:'所属单位',
                    width:''
                },
                {
                    prop:'firstTitle',
                    label:'一级栏目 ',
                    width:''
                },
                {
                    prop:'secondTitle',
                    label:'二级栏目 ',
                    width:''
                },
                {
                    prop:'createTime',
                    label:'操作时间  ',
                    width:''
                },
                {
                    prop:'operationType',
                    label:'操作详情 ',
                    width:''
                },
                {
                    prop:'ip',
                    label:'IP地址  ',
                    width:''
                }
            ],
            tableData:[],
            params:{
                page:1,
                rows:10,
                name:"",
                firstTitle:"",
                secondTitle:"",
                workCompany:"",
                systype:"",
                startTime:"",
                endTime:""
            },
            hasPage:true,
            total:0
            
        }
    },

    methods:{
        // get log List
        init() {
            if(this.params.systype=="全部"){
                this.params.systype="";
            }
            this.$http.post("/api/syslog/user/viewLog", this.params)
            .then((res) => {
                if(res.success == true) {
                    this.tableData = res.rows
                    this.total = res.total
                }else {
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                }
            })
        },

        handleSelectionChange(val) {
            console.log(val)
        },

        cell({row, column, rowIndex, columnIndex}) {
            if( columnIndex == 2){
                return 'project-style'
            }
            else if(columnIndex == 8 && this.tableType == '待审批') {
                return 'todo-style'
            }
            
        },

        // search
        handleSearch(type) {
            if(type === 'search') {
                this.init()
            }else if(type === "clear") {
                this.params.page = 1;
                this.params.rows = 10;
                this.params.name = "";
                this.params.firstTitle = "";
                this.params.secondTitle = "";
                this.params.workCompany = "";
                this.params.systype = "";
                this.params.startTime = "";
                this.params.endTime = "";
                this.init()
            }
            
        },

        handleLookDetail(row, column, cell ,event) {    
           console.log(row, column, cell ,event)
            
        },

        handlePageUp(val) {
            this.params.page = val
            this.init()
        },

        handlePageRows(val) {
            this.params.rows = val
            this.init()
        }
        
    },

    mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>
#lo-wrapper{
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    padding: 20px;
    .lo-header{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .el-select{
            width: 200px;
            height: 34px;
            background: #FFFFFF;
            margin: 0 15px 0 0; 
            box-shadow: 0 2px 4px 0 #EFF2F7;
            border-radius: 4px;
            border-radius: 4px;
            margin-bottom: 20px;
            & /deep/ .el-input__inner{
                font-size: 12px;
                color: #8998AC;
                letter-spacing: 0;
                line-height: 16px;
                padding: 0 0 0 10px;
                height: 34px;
            }
            .el-select .el-input .el-select__caret{
                font-size: 10px;
            }
            & /deep/ .el-input__icon{
                font-size: 10px;
                line-height: 34px;
            }
        }
        .block{
            height: 36px;
            max-width: 180px;
            margin: 0 15px 0 0; 
            & /deep/ .el-input__inner::placeholder{
                font-size: 12px;
            }
            & /deep/ .el-input__inner{
                height: 36px;
                box-shadow: 0 2px 4px 0 #EFF2F7;
            }
            .el-date-editor.el-input, .el-date-editor.el-input__inner{
                width: 100%;
            }
        }
        .de-search-input{
            width: 200px;
            margin: 0 15px 0 0; 
            & /deep/ .el-input__inner{
                height: 36px;
            }
            
        }
        .de-btn-wrapper{
            display: inline-flex;
            justify-content: flex-start;
            margin-bottom: 10px;
            .de-btn{
                margin: 0 15px 0 10px;
            }
            .de-search-btn button{
                background: #3B7CFF;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
            .de-reset-btn button{
                background: #F9FAFC;
                border: 1px solid #AEB9CA;
                font-size: 14px;
                color: #8392A7;
                letter-spacing: 0;
                text-align: center;
            }
        }
        .el-select-dropdown__item{
            font-size: 12px;
        }
    }

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
    
}
</style>