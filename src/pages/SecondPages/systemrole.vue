<template>
    <div id="to-wrapper">
        <HeaderSearch 
        :options8='options8'
        @handleSearch = 'handleSearchRes'
        :type='type'
        :placeholder='placeholder'
        />
        
        <el-divider></el-divider>

        <div class="ma-btn-wrapper">
            <div class="ma-btn-block">
                <el-row class="de-btn de-search-btn">
                    <el-button type="primary" round @click="handleBuilt">+ 菜单权限</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleAssign">新建角色</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleEdit">编辑角色</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleDel">删除角色</el-button>
                </el-row>
            </div>
        </div>

        <TableCommon @handleChangeEdit = 'handleChangeEdit' :tableData='tableData' :tablekind='tablekind' :type='type' />

        <CommPage :hasPage='hasPage' @handlePageUp='handlePageUp' />

        <el-dialog
        :class="'ma-dialog'"
        :visible.sync='newtemplate'
        :show-close='hasClose'
        :close-on-click-modal=true 
        :close-on-press-escape=true
        @close='handleClose'
        title='新建模板'
        >
        <p class="ma-tips">用于规范项目各阶段的补充资料</p>
        <el-divider></el-divider>
        <div class="ma-dia-content">
            <div class="ma-item-wrapper">
                <div class="ma-item">
                    <span class="ma-title">项目状态：</span>
                    <el-select v-model="statusVal" placeholder="请选择" class="ma-dia-sel">
                        <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="ma-item">
                    <span class="ma-title">项目节点：</span>
                    <el-select v-model="nodeVal" placeholder="请选择" class="ma-dia-sel">
                        <el-option
                        v-for="item in nodeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="ma-item">
                    <span class="ma-title">模板名称：</span>
                    <el-input v-model="val1" placeholder="例如西安交通大学立项资料（模板），默认等于上传文件名称" class="ma-dia-sel"></el-input>
                </div>
                <div class="ma-item ma-item-baseline">
                    <span class="ma-title">模板文件：</span>
                    <CommUpload @handleUpload="handleUpload" />
                </div>
            </div>
            
            <div>
                <el-row class="ma-btn-block">
                    <el-button type="" round @click="handleMaBtn('save')">保存</el-button>
                    <el-button type="primary" round @click="handleMaBtn('sign')">保存并发布</el-button>
                </el-row>
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import TableCommon from '@/components/Common/TableCommon'
import CommPage from '@/components/CommPage'
import CommUpload from '@/components/Common/commUpload'
export default {
    components:{
        HeaderSearch,
        TableCommon,
        CommPage,
        CommUpload
    },
    data() {
        return {
            type:'role',
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
            options8:[
                {
                    value:'0',
                    label:'是'
                },
                {
                    value:'1',
                    label:'否'
                }
            ],
            placeholder:'关键字搜索：角色名称',
            tablekind:[
                {
                    prop:'roleName',
                    label:'角色名称',
                    width:'300'
                },
                {
                    prop:'men',
                    label:'创建人',
                    width:''
                },
                {
                    prop:'time',
                    label:'创建时间',
                    width:''
                },
                {
                    prop:'changeTime',
                    label:'修改时间',
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
                    time: '2019-02-18',
                    node:'采购申请',
                    operateMan:'谢奎',
                    hasSign:'是',
                    status:'项目采购',
                    roleName:'项目负责人',
                    changeTime:'2019-02-18'
                }
            ],
            hasPage:true,
            newtemplate:false,
            val1:'',
            statusVal:'',
            nodeVal:'',
            nodeOptions:[],
            hasClose:true
        }
    },
    methods:{
        handleSearchRes(params) {
            // console.log(params)
        },

        handleBuilt() {
            this.newtemplate = true
        },
        
        handleAssign() {

        },
        
        handleEdit() {

        },
        
        handleDel() {

        },

        handleChangeEdit(id) {

        },

        handlePageUp(params) {

        },

        handleClose() {
            this.newtemplate = false
        },

        handleUpload(params) {

        }
    }
}
</script>

<style lang="less" scoped>
#to-wrapper{
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    border-radius: 4px;
    padding: 20px;
    min-height: 100%;
    .el-divider--horizontal{
        margin: 5px 0;
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
    @import url('../../components/Common/less/comDialog.less');
}
</style>