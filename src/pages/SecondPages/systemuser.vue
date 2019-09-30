<template>
    <div id="us-wrapper">
        <div class="lo-header">
            <el-input class="de-search-input" v-model="params.userNo" placeholder="工号/NetID"></el-input>
            <el-input class="de-search-input" v-model="params.company" placeholder="所在单位"></el-input>
            <el-input class="de-search-input" v-model="params.userName" placeholder="姓名"></el-input>
            <el-input class="de-search-input" v-model="params.rolesName" placeholder="已分配角色"></el-input>

            <div class="de-btn-wrapper">
                <el-row class="de-btn de-search-btn">
                    <el-button type="primary" round @click="handleSearch('search')">查询</el-button>
                </el-row>

                <el-row class="de-btn de-reset-btn">
                    <el-button type="primary" round @click="handleSearch('clear')">清空</el-button>
                </el-row>
            </div>
            
        </div>

        <el-row class="de-btn de-search-btn de-assign-btn">
            <el-button type="primary" round @click="handleAssign">分配角色</el-button>
        </el-row>
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
                type="selection"
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

        <el-dialog
            :class="'ma-dialog'"
            :visible.sync='menutemplate'
            :show-close='hasClose'
            :close-on-click-modal=true 
            :close-on-press-escape=true
            @close='handleClose'
            title='分配角色'
            >
            <el-divider></el-divider>
            <div class="ma-dia-content">
                <div class="ma-item-wrapper ma-item-menu-auth">

                    <!-- <el-checkbox-group v-model="checkList" class="ma-roles-item">
                        <el-checkbox 
                        class="ma-roles-item"
                        :label="item.roles.id" 
                        v-for="item in rolesList" 
                        :key="item.roles.id"
                        :checked="item.istrue?true:false"
                        @change="handleCheckItem(item)"
                        ></el-checkbox>
                    </el-checkbox-group> -->
                    <div class="ma-roles-item" v-for="item in rolesList" :key="item.roles.id" @click="handleCheckItem(item)" >
                        <i :class="item.istrue == 1?'ma-checked':''"></i>
                        <span>{{item.roles.rolesName}}</span>
                    </div>
                    
                </div>
            </div>
        </el-dialog>

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
            params:{
                page:1,
                rows:10,
                userName:"",
                userNo:"",
                company:"",
                rolesName:""
            },
            tableData:[],
            tablekind:[
                {
                    prop:'rnum',
                    label:'序号',
                    width:'50' 
                },
                {
                    prop:'netId',
                    label:'NetId',
                    width:''
                },
                {
                    prop:'userNo',
                    label:'工号',
                    width:''
                },
                {
                    prop:'userName',
                    label:'姓名',
                    width:''
                },
                {
                    prop:'edName',
                    label:'学院',
                    width:''
                },
                {
                    prop:'fcName',
                    label:'系所',
                    width:''
                },
                {
                    prop:'rolesName',
                    label:'已分配角色',
                    width:''
                },
                {
                    prop:'state',
                    label:'是否在编',
                    width:''
                }
            ],
            hasPage:true,
            total:0,
            menutemplate:false,
            changeParams:[],
            hasClose:true,
            rolesList:[],
            checkStatus:true,
            checkList:[]
        }
    },

    methods:{
        // get user List
        init() {
            this.$http.post("/api/user/getlist", this.params)
            .then((res) => {
                console.log(res)
                if(res.success == true) {
                    var msg= res.rows;
                    this.tableData=[];
                    for(var i = 0; i <msg.length; i ++) {  
                        var msgState=msg[i].state;
                           if(msgState == 0){ 
                               msg[i].state = "在职"
                           }else{
                            
                               msg[i].state = "其他"
                           }
                       this.tableData.push(msg[i])
                    }
                    
                    this.total = res.total
                }else {
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                }
            })
        },

        // search
        handleSearch(type) {
            if(type === 'search') {
                this.init()
            }else if(type === "clear") {
                this.params.page = 1;
                this.params.rows = 10;
                this.params.userName = "";
                this.params.userNo = "";
                this.params.company = "";
                this.params.rolesName = "";
                this.init()
            }
            
        },

        handleSelectionChange(val) {
            this.changeParams = val
        },

        cell({row, column, rowIndex, columnIndex}) {
            if( columnIndex == 2){
                return 'project-style'
            }
            else if(columnIndex == 8 && this.tableType == '待审批') {
                return 'todo-style'
            }
            
        },

        handleLookDetail(row, column, cell ,event) {    
        //    console.log(row, column, cell ,event)
            
        },

        handlePageUp(val) {
            this.params.page = val
            this.init()
        },

        handlePageRows(val) {
            this.params.rows = val
            this.init()
        },

        handleAssign() {
            if(this.changeParams.length==1){  

                let params = {
                    userId:this.changeParams[0].id
                }
                this.handleGetRoles(params)
                
            }else{
                this.$message.error("请选择一个角色进行菜单授权");
            } 

        },

        // tree methods
        handleCheckChange(data, checked, indeterminate) {
            // console.log(data, checked, indeterminate);
            let params = {
                rolesId:this.changeParams[0].id,
                powerId:data.id
            }
            if(checked){
                this.$http.post("/api/roles/addRolesPower", params)
                .then((res) => {
                    if(res.code === '00000') {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                    
                })
            }else {
                this.$http.post("/api/roles/removeRolesPower", params)
                .then((res) => {
                    if(res.code === '00000') {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                    
                })
            }
        },

        // close dialog
        handleClose() {
            this.menutemplate = false
            this.init();
        },

        handleCheckItem(item) {
            let params = {
                userId:this.changeParams[0].id,
                rolesId:item.roles.id
            }
            if(item.istrue == 1) {
                this.$http.post("/api/roles/removeUserRoles", params)
                .then((res) => {
                    if(res.code == '00000') {
                        let params = {
                            userId:this.changeParams[0].id
                        }
                        this.$message({
                            type:"success",
                            message:res.message
                        })
                        this.handleGetRoles(params)
                    }else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
            }else if(item.istrue == 0) {
                this.$http.post("/api/roles/addUserRoles", params)
                .then((res) => {
                    if(res.code == '00000') {
                        let params = {
                            userId:this.changeParams[0].id
                        }
                        this.$message({
                            type:"success",
                            message:res.message
                        })
                        this.handleGetRoles(params)
                    }else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
            }
        },

        // get roles List
        handleGetRoles(params) { 
            this.$http.post("/api/user/getRoles", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.rolesList = [];
                    let checkArray = []
                    this.rolesList = res.data;
                    for(let i = 0; i < this.rolesList.length; i ++) { 
                        if(this.rolesList[i].istrue == 1) {
                            checkArray.push(this.rolesList[i])
                        }
                    }
                    this.checkList = checkArray
                    this.menutemplate = true;
                }else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
                
                // console.log(this.checkList)
                
            })
        }

    },

    mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>
#us-wrapper{
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    padding: 10px 20px 10px;
    .el-divider--horizontal{
        margin: 5px 0;
        background: #F0F3F7;
    }
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
            max-width: 200px;
            flex: 1;
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

    .de-assign-btn  button{
        margin: 0 15px 0 10px;
        background: #3B7CFF;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
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

    .ma-roles-item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0;
        cursor: default;
        .el-checkbox{
            display: block;
            margin: 0 0 10px 0;
        }
        i{
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 1px;
            border: 1px solid #dddddd;
            margin-right: 10px;
            overflow: hidden;
        }
        .ma-checked{
            background: url('../../assets/img/checked.png');
            background-size: cover;
            background-repeat: no-repeat;
        }
    }

    .el-checkbox{
        display: block;
        margin: 10px 0;
    }
}
</style>