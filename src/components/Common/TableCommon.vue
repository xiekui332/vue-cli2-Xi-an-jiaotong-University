<template>
    <div id="ta-wrapper">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :stripe='true'
            :cell-class-name="cell"
            @selection-change="handleSelectionChange"
            @cell-click='handleLookDetail'>
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
                show-overflow-tooltip
                >
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
                show-overflow-tooltip
                >
                <div class="pub-css ma-edit ma-icon" @click="handleOpa('edit')"></div>
                <div class="pub-css ma-del ma-icon" @click="handleOpa('del')"></div>
                <div class="ma-icon" @click="handleOpa('stop')">
                    <img src="../../assets/img/stop.png" class="ma-stop" alt="img" />
                </div>
            </el-table-column>
        </el-table>

        <el-dialog
        :class="hasNewClass?'ta-dialog-new':''"
        :visible.sync='hasdialog'
        :show-close='hasClose'
        :close-on-click-modal=false 
        :close-on-press-escape=false
        :width='dialogWid'
        :top='marTop'
        :title='dialogTitle'
        >
            <el-divider></el-divider>
            <div class="ta-reason" v-if="!hasStop">
                <p>确认删除</p>
                <p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
            </div>

            <div v-else class="ta-stop-wrapper">
                <p>
                    <span>项目编码：</span>
                    <span>you know</span>
                </p>
                <p>
                    <span>项目名称：</span>
                    <span>you know</span>
                </p>
                <p>
                    <span>项目负责人：</span>
                    <span>you know</span>
                </p>
                <div>
                    <span><i>*</i> 原因说明：</span>
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    show-word-limit
                    class="ta-textarea"
                    rows='6'
                    maxlength="200"
                    >
                    </el-input>
                </div>
            </div>

            <el-row class="ta-btn-wrapper">
                <el-button type="primary" round @click="handleBtn('sure')">确定</el-button>
                <el-button type="primary" round @click="handleBtn('cancel')">取消</el-button>
            </el-row>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    props:[
        'handleChangeEdit'
    ],
    data() {
        return {
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
            hasNewClass:false,
            hasClose:false,
            hasdialog:false,
            dialogWid:'50%',
            marTop:'15vh',
            hasStop:false,
            textarea:'',
            dialogTitle:'确认删除',
            handleType:''
        }
    },
    methods:{
        format(percentage) {
            return percentage === 100 ? '' : ``;
        },

        handleOpa(type, id) {
            if(type === 'edit') {
                this.$emit('handleChangeEdit', id, false)
            }else if(type === 'del') {
                this.handlehasdialog(true, true, true, false, '25%', '确认删除', 'del')
            }else if(type === 'stop') {
                this.handlehasdialog(true, true, true, true, '30%', '终止确认', 'stop')
            }
            
        },

        handlehasdialog(hasdialog, hasClose, hasNewClass, hasStop, dialogWid, dialogTitle, handleType) {
            this.hasdialog = hasdialog
            this.hasClose = hasClose
            this.hasNewClass = hasNewClass
            this.hasStop = hasStop
            this.dialogWid = dialogWid
            this.dialogTitle = dialogTitle
            this.handleType = handleType
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
            }else if(columnIndex == 8) {
                return 'oparate-space'
            }else if(columnIndex == 2) {
                return 'project-style'
            }
        },

        handleBtn(type) {
            if(type === 'sure') {
                this.hasdialog = false
                this.handleErroe()
            }else if(type === 'cancel') {
                this.hasdialog = false
            }
        },

        handleErroe() {
            this.$message({
                type:'error',
                dangerouslyUseHTMLString: true,
                message:'<p style="font-size:14px;color:#666666;margin:0 0 10px 0;">出错了！</p> <p style="font-size:13px;color:#999999;">失败原因：执行中项目无法删除。</p>',
                showClose:true,
                // duration:0
            })
        },

        handleLookDetail(row, column, cell ,event) {    
            if(column.label === '项目') {
                this.$emit('handleChangeEdit', column.id, true)
            }
        }
    }
}
</script>

<style lang="less" scoped>
#ta-wrapper{
    & /deep/ textarea::placeholder{
        font-size: 12px;
    }
    .pub-css{
        background: url('../../assets/img/css_sprites.png');
        background-size:440px 391px; 
    }
    & /deep/ .el-table .cell{
        font-size: 14px;
        color: #8998AC;
        letter-spacing: 0;
    }
    & /deep/ .tex-color .cell{
        color: #B5C5DB;
    }
    & /deep/ .oparate-space .cell{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    & /deep/ .project-style .cell{
        cursor: pointer;
    }
    .ma-icon{
        cursor: pointer;
        float: left;
        // margin-right: 30px;
    }
    .ma-edit{
        width: 20px;
        height: 20px;
        background-position: -377px -90px;
    }
    .ma-del{
        width: 20px;
        height: 20px;
        background-position: -377px -167px;
    }
    .ma-stop{
        width: 16px;
        height: 16px;
    }

    .ta-dialog-new{
        & /deep/ .el-dialog{
            // background: rgba(0, 0, 0, 0);
            // border: none;
            // box-shadow: none;
            box-shadow: 0 2px 4px 0 #D0D0D0;
                border-radius: 4px;
            .el-dialog__body{
                margin-top: -40px;
            }
            .ta-reason{
                font-size: 14px;
                color: #8998AC;
                letter-spacing: 0;
            }
        } 
        .ta-btn-wrapper{
            text-align: center;
            margin-top: 30px;
            button{
                height: 36px;
                font-size: 12px;
            }
            button:nth-child(1) {
                width: 92px;
                background: #F9FAFC;
                border: 1px solid #AEB9CA;
                color: #8392A7;
            }
            button:nth-child(2){
                width: 137px;
                background: #3B7CFF;
                box-shadow: 0 5px 20px 0 rgba(59,124,255,0.20);
                color: #FFFFFF;
            }
        }
        .ta-textarea{
            max-width: 300px;
        }
        .ta-stop-wrapper{
            display: flex;
            flex-direction: column;
            >p, > div{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                font-size: 14px;
                color: #8998AC;
                margin-bottom: 5px;
                >span:nth-child(1) {
                    display: inline-block;
                    min-width: 100px;
                    text-align: right;
                    padding-right: 10px;
                    i{
                        font-size: 16px;
                        color: red;
                    }
                }
            }
        }
    }
}
</style>


