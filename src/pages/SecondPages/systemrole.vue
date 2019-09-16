<template>
    <div id="to-wrapper">
        <HeaderSearch 
        @handleSearchRes = 'handleSearchRes'
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

        <TableCommon @handleSelectOprate='handleSelectOprate' :tableData='tableData' :tablekind='tablekind' :type='type' />

        <CommPage :hasPage='hasPage' :total="total"  @handlePageUp='handlePageUp' @handlePageRows='handlePageRows' />

        <el-dialog
        :class="'ma-dialog'"
        :visible.sync='newtemplate'
        :show-close='hasClose'
        :close-on-click-modal=true 
        :close-on-press-escape=true
        @close='handleClose'
        :title='setTitle'
        >
        <el-divider></el-divider>
        <div class="ma-dia-content">
            <div class="ma-item-wrapper">
                <div class="ma-item" style="display:none">
                    <el-input v-model="roleid"  class="ma-dia-sel"></el-input>
                </div>   
                <div class="ma-item">
                    <span class="ma-title">角色名称：</span>
                    <el-input v-model="name" placeholder="请输入角色名称" class="ma-dia-sel"></el-input>
                </div>               
                <div class="ma-item" style="display:none;">
                    <span class="ma-title">角色类型：</span>
                    <el-checkbox v-model="isAss">是否是数据权限</el-checkbox>
                </div>               
            </div>
            
            <div>
                <el-row class="ma-btn-block">
                    <el-button type="" round @click="handleClose()">取消</el-button>
                    <el-button type="primary" round @click="handleSave()">保存并发布</el-button>
                </el-row>
            </div>
        </div>
        </el-dialog>

                <el-dialog
        :class="'ma-dialog'"
        :visible.sync='menutemplate'
        :show-close='hasClose'
        :close-on-click-modal=true 
        :close-on-press-escape=true
        @close='handleClose'
        title='菜单权限'
        >
        <el-divider></el-divider>
        <div class="ma-dia-content">
            <div class="ma-item-wrapper ma-item-menu-auth">
                <el-tree
                    :props="props"
                    :data="rolesList"
                    show-checkbox
                    node-key="id"
                    ref="DeviceGroupTree"
                    :check-strictly=true
                    :default-expand-all=true
                    :default-checked-keys="resourceCheckedKey"
                    @check="handleCheckChange"
                    >
                </el-tree>
 
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import TableCommon from '@/components/Common/TableCommon'
import CommPage from '@/components/CommPage'
export default {
    components:{
        HeaderSearch,
        TableCommon,
        CommPage
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
                // {
                //     value:'0',
                //     label:'是'
                // },
                // {
                //     value:'1',
                //     label:'否'
                // }
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
            tableData:[{}],
            hasPage:true,
            newtemplate:false,
            menutemplate:false,
            hasClose:true,
            page:'1',
            rows:'10',
            isAssign:'',
            rolesName:'',
            name:'',
            isAss:'',
            total:0,
            hasPageNum:10,
            changeParams:[],
            roleid:'',
            props: {
                label: 'text',
                children: 'children'
            },
            count: 1,
            rolesList:[],
            resourceCheckedKey:[],
            setTitle:"新建角色"
        }
    },
    methods:{
        handleSearchRes(params) {//条件查询
             this.isAssign=params.isAssign;
             this.rolesName=params.tex;
             this.init();
        },

        handleBuilt() {//+菜单  
            if(this.changeParams.length==1){   
                let params = {
                    rolesId:this.changeParams[0].id
                }
                this.handlegetPowersListByRoles(params)
            }else{
                this.$message("请选择一个角色进行菜单授权");
            } 
        },
        
        handleAssign() {//新建角色
                this.setTitle = "新建角色"
                this.newtemplate = true    
        },
        handleSave() {//新建保存和编辑提交
            var reqUrl='';
            var params={};
            var message='';
            var isA=1;
            if(this.isAss==true){
                isA=0;
            }else{
                isA=1;
            }
            if(this.roleid){
                reqUrl="/api/roles/updateRoles";
                params={id:this.roleid,rolesName:this.name,isAssign:""};
                message='修改成功';
            }else{
                reqUrl="/api/roles/addRoles";
                params={rolesName:this.name,isAssign:isA};
                message='添加成功';
            }
            this.$http.post(reqUrl,params).then(res =>{
                if(res.code=="00000"){
                    this.$message(message);
                    this.name='';
                    this.isAss='';
                    this.newtemplate = false;
                    this.init();
                }else{
                   this.$message(res.message);  
                }
            })
        },
        handleEdit() {//编辑
          if(this.changeParams.length==1){            
           //打开编辑框
             var param=this.changeParams[0];
             this.name=param.roleName;
             this.roleid=param.id;
             if(param.isAssign==0){
                this.isAss=true;
             }else{
                 this.isAss=false;
             }
             this.setTitle = "编辑角色"
             this.newtemplate = true;
          }else{
               this.$message('请选择一条信息进行编辑');
          }
        },
        handleSelectOprate(param){
           this.changeParams=param;
        },
        handleDel() {//删除角色
            if(this.changeParams.length>0){
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((res) => {
                var idList=[];
                var changeList=this.changeParams;
                for(var i=0;i<changeList.length;i++){
                    idList.push(changeList[i].id);
                }
                var param={id:JSON.stringify(idList)};
                this.$http.post("/api/roles/deleteRoles",param).then(res =>{
                    if(res.code=="00000"){
                        this.$message("删除成功！");
                        this.init();
                    }else{
                        this.$message(res.message)
                    }
                })
            
                })
            }else{
                this.$message("请选中要删除的数据");
            }
        },
        handlePageUp(params) {//分页
         this.page=params;
         this.init();
        },
        handlePageRows(params){//数量
          this.rows=params;
          this.init();
        },

        handleClose() {//关闭弹框
            this.name='';
            this.isAss='';
            this.roleid='';
            this.newtemplate = false
        },
        init(){
            var param={isAssign:this.isAssign,rolesName:this.rolesName,page:this.page,rows:this.rows}
            this.$http.post("/api/roles/getRolesList",param).then(res =>{
              if(res.success==true){              
                this.tableData = [];
                var list=res.rows;
                this.total = res.total
                for(var a=0;a<list.length;a++){
                    var msg={};
                    msg['roleName']=list[a].rolesName;
                    msg['men']=list[a].createUserName;
                    msg['time']=list[a].createTime.slice(0, 10);
                    if(list[a].updateTime){
                       msg['changeTime']=list[a].updateTime.slice(0, 10);
                    }else{
                        msg['changeTime']=list[a].updateTime;
                    }
                    msg['id']=list[a].id;
                    msg['isAssign']=list[a].isAssign;
                    this.tableData.push(msg);
                }
              }
            })
        },

        // tree methods
        handleCheckChange(data, checked, indeterminate) {
            // console.log(data, checked, indeterminate);
            // return
            let params = {
                rolesId:this.changeParams[0].id,
                powerId:data.id
            }
            if(data.checked){
                this.$http.post("/api/roles/removeRolesPower", params)
                .then((res) => {
                    if(res.code === '00000') {
                        let params = {
                            rolesId:this.changeParams[0].id
                        }
                        this.handlegetPowersListByRoles(params)
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                    
                })
            }else {
                this.$http.post("/api/roles/addRolesPower", params)
                .then((res) => {
                    if(res.code === '00000') {
                        let params = {
                            rolesId:this.changeParams[0].id
                        }
                        this.handlegetPowersListByRoles(params)
                    }else{
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                    
                })
            }
        },
        handlegetPowersListByRoles(params) {
            this.$http.post("/api/roles/getPowersListByRoles", params)
            .then((res) => {
                this.rolesList = []
                this.resourceCheckedKey = []
                this.rolesList = res;
                for(let i = 0; i < this.rolesList.length; i ++) {
                    if(this.rolesList[i].checked) {
                        this.resourceCheckedKey.push(this.rolesList[i].id)
                    }
                    if(this.rolesList[i].children) {
                        for(let j = 0; j < this.rolesList[i].children.length; j ++) {
                            if(this.rolesList[i].children[j].checked) {
                                this.resourceCheckedKey.push(this.rolesList[i].children[j].id)
                            }
                            if(this.rolesList[i].children[j].children) {
                                for(let k = 0; k < this.rolesList[i].children[j].children.length; k ++) {
                                    if(this.rolesList[i].children[j].children[k].checked) {
                                        this.resourceCheckedKey.push(this.rolesList[i].children[j].children[k].id)
                                    }
                                }
                            }
                        }
                    }
                    
                }
                this.menutemplate = true
            })
        }
    },
    mounted(){
        
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

    /*
        new CSS
    */
    .ma-dialog .ma-dia-content .ma-item-menu-auth{
        align-items: flex-start;
        & /deep/ .el-checkbox{
            margin-right: 10px;
        }
    }
}
</style>