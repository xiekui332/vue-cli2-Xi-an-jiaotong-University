<template>
    <div id="ta-wrapper">
        <el-table
            ref="multipleTable"
            :data="extableData"
            tooltip-effect="dark"
            style="width: 100%"
            :stripe='true'
            :cell-class-name="cell"
            @selection-change="handleSelectionChange"
            @cell-click='handleLookDetail'
            
            >
            <el-table-column
                v-if="extype == 'todo'"
                type="index"
                label="序号"
                min-width="20">
            </el-table-column>

            <!-- <div v-else-if="extype == 'first'">
                <el-table-column
                    type="index"
                    label="序号"
                    width="55">
                </el-table-column>
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
            </div> -->
            

            <el-table-column
                v-else
                type="selection"
                min-width="25">
            </el-table-column>
            
            <el-table-column 
                v-for="(i, ind) in extablekind"
                :key="ind"
                :prop="i.prop"
                :label="i.label"
                :min-width="i.width"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop=""
                :label="colName"
                :min-width="100"
                show-overflow-tooltip
                v-if="extype !== 'situatio'&&extype !=='role'"
                >
                <template slot-scope="scope">
                    
                    <div class="ma-icon" v-if="extype === 'tracking'" @click="trackingDetail('tracking')">
                        详情
                    </div>
                    <div class="ma-icon ma-todo" v-else-if="extype === 'todo'" @click="trackingDetail('todo')">
                        审批
                    </div>
                    <div class="ma-icon ma-todo" v-else-if="extype === 'upload'">
                        <div v-if="scope.row.hasSign == '是'" @click="trackingDetail('upload', scope.row)">撤销</div>
                        <div v-if="scope.row.hasSign == '否'" @click="trackingDetail('upload', scope.row)">发布</div>
                    </div>
                    <div class="ma-icon ma-todo" v-else-if="extype === 'role'">
                        <div v-if="scope.row.isAssign == '0'" >数据权限</div>
                        <div v-if="scope.row.isAssign == '1'"></div>
                      
                    </div>
                    <div class="ma-btn-wrapper" v-else>
                        <div class="pub-css ma-edit ma-icon" @click="handleOpa('edit',scope.row)"><a href="javascript:;" title='编辑'></a></div>
                        <div class="pub-css ma-del ma-icon" @click="handleOpa('del',scope.row)"><a href="javascript:;" title='删除'></a></div>
                        <div class="ma-icon" @click="handleOpa('stop',scope.row)">
                            <a href="javascript:;" title='终止\中止'>
                                <img src="../../assets/img/stop.png" class="ma-stop" alt="img" />
                            </a>
                        </div>
                    </div>
                </template>   
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
                <p>&nbsp;&nbsp;&nbsp;&nbsp;确认删除 "{{projectName}}" ?</p>
            </div>

            <div v-else class="ta-stop-wrapper">
                <p>
                    <span>项目编码：</span>
                    <span>{{projectNo}}</span>
                </p>
                <p>
                    <span>项目名称：</span>
                    <span>{{projectName}}</span>
                </p>
                <p>
                    <span>项目负责人：</span>
                    <span>{{leaderName}}</span>
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
                <el-button type="primary" round @click="handleBtn('sure','isTrue')">确定</el-button>
                <el-button type="primary" round @click="handleBtn('cancel')">取消</el-button>
            </el-row>
        </el-dialog>
        
    </div>
</template>

<script>

export default {
    props:[
        'handleChangeEdit',
        'tableData',
        'tablekind',
        'type',
        'handleSearchType',
        'handleChangeoprate', //模板撤销，发布
        'handleSelectOprate', //选中
        'handleReload',
        'handleLook' //查看
    ],
    data() {
        return {
            extableData:[],
            hasNewClass:false,
            hasClose:false,
            hasdialog:false,
            dialogWid:'50%',
            marTop:'15vh',
            hasStop:false,
            textarea:'',
            dialogTitle:'',
            handleType:'',
            extablekind:this.tablekind,
            extype:this.type,
            exhandleSearchType:this.handleSearchType,
            colName:'操作',
            projectName:'',
            isTrue:'',
            projectId:'',
            leaderName:'',
            projectNo:''

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
               if(id.projectNode){
                  this.isTrue=false;
               }else{
                  this.isTrue=true;
               }
                this.projectId=id.id;
                this.handlehasdialog(true, true, true, false, '25%', '确认删除',id.name, 'del')
            }else if(type === 'stop') {
                this.projectId=id.id;
                this.leaderName=id.men;
                this.projectNo=id.num
                this.handlehasdialog(true, true, true, true, '45%', '终止确认',id.name, 'stop')
            }
            
        },

        handlehasdialog(hasdialog, hasClose, hasNewClass, hasStop, dialogWid, dialogTitle,projectName,handleType) {
            this.hasdialog = hasdialog
            this.hasClose = hasClose
            this.hasNewClass = hasNewClass
            this.hasStop = hasStop
            this.dialogWid = dialogWid
            this.dialogTitle = dialogTitle
            this.handleType = handleType
            this.projectName=projectName

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
             this.$emit('handleSelectOprate', val);
        },

        cell({row, column, rowIndex, columnIndex}) {
            if(this.type === 'tracking') {
                if( columnIndex == 2){
                    return 'project-style'
                }else if(columnIndex == 7) {
                    return 'tex-color'
                }else if(columnIndex == 8) {
                    return 'oparate-space'
                }
            }else if(this.type === 'todo') {
                if( columnIndex == 2){
                    return 'project-style'
                }
                else if(columnIndex == 8) {
                    return 'todo-style'
                }
            }else if(this.type === 'upload') {
                if( columnIndex == 2){
                    return 'project-style upload-style'
                }
                else if(columnIndex == 7) {
                    return 'todo-style'
                }
            }
            else {
                if( columnIndex == 6){
                    return 'tex-color'
                }else if(columnIndex == 8) {
                    return 'oparate-space'
                }else if(columnIndex == 2) {
                    return 'project-style'
                }
            }
            
        },

        handleBtn(type,istrue) {
             if(!this.hasStop){//删除
                if(type === 'sure') {
                    this.hasdialog = false
                    if(istrue==true){ //执行中项目也就是有节点的项目不能删除
                       this.handleErroe()
                    }else{
                        var params={projectId:this.projectId}
                        this.$http.post("/api/project/deleteProjectById",params).then(res =>{
                            console.log(res)
                            if(res.code=="00000"){
                                this.$message.success("删除成功");
                                this.$emit('handleReload',true);
                            }
                        })
                    }
                }else if(type === 'cancel') {
                    this.isTrue='';
                    this.projectName='';
                    this.projectId='';
                    this.hasdialog = false
                }
             
             }else{ //终止
                if(type === 'sure') {
                    this.hasdialog = false;
                    var params={projectId:this.projectId,stopRemark:this.textarea};
                    this.$http.post("/api/project/updateProjectStop",params).then(res =>{
                       if(res.code=="00000"){
                            this.$message.success("操作完成")
                            this.$emit('handleReload',true);
                       }
                    })
                }else if(type === 'cancel') {
                    this.projectNo='';
                    this.leaderName='';
                    this.projectName='';
                    this.projectId='';
                    this.hasdialog = false
                }
             
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
            if(this.type === 'upload' && column.label === '模板名称') {
                this.$emit('handleChangeEdit', row, true)
            }
            if(this.type === 'first' && column.label === '项目编号'){
                 this.$emit('handleLook', row, true)
            }
            
        },
        trackingDetail(type, params) {
            if(type === 'tracking') {
                this.$emit('handleTrackLook')
            }else if(type === 'todo') {
                this.$emit('handleChangeEdit', 1)
            }else if(type === 'upload') {
                this.$emit('handleChangeoprate', params)
            }else if(type ==='role'){
                this.$emit('handleChangeoprate', params)
            }
            
        }
    },
    mounted() {
        
    },
    created() {
        if(this.type === 'done') {
            this.extype = 'situatio'
        }
    },
    watch:{
        tableData(params){
            this.extableData = params
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
    & /deep/ .el-table .el-table__header-wrapper .cell{
        font-size: 14px;
        color: #39475B;
        letter-spacing: 0;
        text-align: left;
    }
    & /deep/ .el-table .el-table__body-wrapper .cell{
        font-size: 14px;
        color: #8998AC;
        letter-spacing: 0;
        text-align: left;
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
    & /deep/ .upload-style .cell{
        color: #3B7CFF!important;
    }
    & /deep/ .todo-style .cell{
        display: flex;
        justify-content: center;
    }
    .ma-icon{
        cursor: pointer;
        // float: left;
        font-size: 14px;
        a{
            display: inline-block;
            width: 100%;
            height: 100%;
            float: left;
        }
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
        width: 17px;
        height: 17px;
        float: left;
        margin-top: 2px;
        
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
    
    .ma-btn-wrapper{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        >div{
            
        }
    }
    .ma-todo{
        color: #3B7CFF;
    }
}
</style>


