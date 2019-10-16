<template>
    <div id="fl-wrapper" :class="exPrint?'':'fl-wrapper2'">
        <el-dialog
            :class="hasNewClass?'st-dialog-fill st-dialog-new':'st-dialog-fill'"
            :visible.sync='exchangeFill'
            :show-close='hasClose'
            :close-on-click-modal=false 
            :close-on-press-escape=false
            :width='dialogWid'
            :modal="exPrint?false:true"
            @close="handleClose"
            @opened="handleOpen"
            :top='marTop'
            >
            <div v-show="!exPrint">
                <div id="printFill">
                    <p class="pub-family fl-title">院处采购申请单</p>
                    <div class="fl-item fl-item-basic">
                        <p class="pub-family fl-item-basic-title">基本信息</p>
                        <div class="fl-item-basic-block">
                            <div class="fl-L">
                                <span class="fl-L-title">采购申请编号：</span>
                                <el-input class="fl-L-input" v-model="baseNum" placeholder="请输入内容" :disabled="hasLook"></el-input>
                            </div>
                            <div class="fl-L">
                                <span class="fl-L-title">填报日期：</span>
                                <el-date-picker
                                    class="fl-L-input"
                                    v-model="baseDate"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    :disabled="hasLook"
                                    >
                                </el-date-picker>
                            </div>
                            <div class="fl-L">
                                <span class="fl-L-title">采购名称：</span>
                                <el-input class="fl-L-input" v-model="baseName" placeholder="默认项目编码+项目名称" :disabled="hasLook"></el-input>
                            </div>
                            <div class="fl-L">
                                <p class="fl-L-title">
                                    <span>货物安装是否涉及开挖室内地面或改变房屋结构<br/>（修改或增加门窗，增加或拆除墙体等）：</span>
                                    <span>若有，请提供规划与基建管理中心审批意见书</span>
                                </p>
                                <div class=" fl-L-radio" >
                                    <el-radio v-model="radio" label="1" :disabled="hasLook">是</el-radio>
                                    <el-radio v-model="radio" label="0" :disabled="hasLook">否</el-radio>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <el-divider></el-divider>
                    
                    <div class="fl-item fl-item-make">   
                        <div class="fl-item-head">
                            <span class="pub-family"><i class="cgqdhx">*</i>采购清单</span>
                            <el-row v-show="!hasLook">
                                <el-button type="primary" round @click="handleAddList('make')">添加</el-button>
                            </el-row>
                        </div>

                        <div class="fl-item-con">
                            <div class="fl-list fl-list-head">
                                <span><i class="cgqdhx">*</i> 采购内容</span>
                                <span><i class="cgqdhx">*</i> 数量</span>
                                <span><i class="cgqdhx">*</i> 单位</span>
                                <span><i class="cgqdhx">*</i> 计划金额(万元)</span>
                                <span>操作</span>
                            </div>
                            <div class="fl-list" v-for="(i, ind) in listArr" :key="ind">
                                  
                                <div class="fl-order">                         
                                    <span>{{ind + 1}}</span>
                                    &nbsp;&nbsp; 
                                    <el-tooltip class="item" effect="dark" placement="top-start">  
                                      <div slot="content" class="pub-width">{{i.name}}</div>                               
                                      <el-input class="fl-L-input" v-model="i.name" placeholder="请输入内容"  maxlength="50" :disabled="hasLook"></el-input>                                
                                    </el-tooltip>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" type="number" v-model="i.cgNumber" placeholder="请输入内容" :disabled="hasLook"></el-input>
                                </div>
                                <div>
                                     <el-tooltip class="item" effect="dark" placement="top">  
                                        <div slot="content" class="pub-width">{{i.company}}</div>   
                                        <el-input class="fl-L-input" v-model="i.company" placeholder="请输入内容" :disabled="hasLook"></el-input>
                                     </el-tooltip>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.planMoney" placeholder="请输入内容" :disabled="hasLook"></el-input>
                                </div>
                                <div>
                                    <!-- <i class="pub-css fl-icon-edit" @click="handleListEdit('make', ind)"></i> -->
                                    <i class="fl-icon-del" @click="handleListDel('make', i, ind)">删除</i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <el-divider></el-divider>

                    <div class="fl-item fl-item-supllier">
                        <div class="fl-item-head">
                            <span class="pub-family">供应商信息</span>
                            <el-row v-show="!hasLook">
                                <el-button type="primary" round @click="handleAddList('supllier')">添加</el-button>
                            </el-row>
                        </div>

                        <div class="fl-item-con">
                            <div class="fl-list fl-list-head">
                                <span>推荐供应商/代理商</span>
                                <span>品牌/国别</span>
                                <span>联系人</span>
                                <span>手机号码</span>
                                <span>E-mail</span>
                                <span>操作</span>
                            </div>
                            <div class="fl-list" v-for="(i, ind) in listArr2" :key="ind">
                                <div class="fl-order">
                                    <span>{{ind + 1}}</span>
                                    &nbsp;&nbsp;
                                    <el-tooltip class="item" effect="dark" placement="top">  
                                       <div slot="content" class="pub-width">{{i.name}}</div>  
                                       <el-input class="fl-L-input" v-model="i.name" placeholder="请输入内容"  maxlength="50" :disabled="hasLook"></el-input>
                                    </el-tooltip>
                                </div>
                                <div>
                                       <el-input class="fl-L-input" v-model="i.address" placeholder="请输入内容" :disabled="hasLook"></el-input>     
                                </div>
                                <div>                   
                                       <el-input class="fl-L-input" v-model="i.legalPerson" placeholder="请输入内容" :disabled="hasLook"></el-input>
                                </div>
                                <div>              
                                       <el-input class="fl-L-input" v-model="i.phone" placeholder="请输入内容" :disabled="hasLook"></el-input>
                                </div>
                                <div>
                                    <el-tooltip class="item" effect="dark" placement="top">  
                                       <div slot="content" class="pub-width">{{i.email}}</div>             
                                       <el-input class="fl-L-input" v-model="i.email" placeholder="请输入内容" :disabled="hasLook"></el-input>
                                    </el-tooltip>
                                </div>
                                <div>
                                    <!-- <i class="pub-css fl-icon-edit" @click="handleListEdit('supllier', ind)"></i> -->
                                    <i class="fl-icon-del" @click="handleListDel('supllier', i, ind)">删除</i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <el-divider></el-divider>

                    <div class="fl-item fl-item-basis">
                        <div class="fl-item-head">
                            <span class="pub-family">采购依据</span>
                        </div>

                        <div class="fl-basis-block">
                            <div class="fl-basis-title">调研情况（免招标项目请填写免招标理由）：</div>
                            <el-input
                                type="textarea"
                                :rows="8"
                                maxlength="1000字"
                                :show-word-limit='hasLimit'
                                placeholder="请输入内容"
                                :disabled="hasLook"
                                v-model="txt1">
                            </el-input>
                        </div>

                        <div class="fl-basis-block">
                            <div class="fl-basis-title">技术指标：</div>
                            <el-input
                                type="textarea"
                                :rows="8"
                                maxlength="10000字"
                                :show-word-limit='hasLimit'
                                placeholder="请输入内容"
                                :disabled="hasLook"
                                v-model="txt2">
                            </el-input>
                        </div>
                    </div>

                    <el-divider></el-divider>

                    <div class="fl-item">
                        <p class="fl-matters-head">如您申请采购的是进口科教用品，请阅读并确认以下事项：</p>
                        <p class="fl-matters-list" v-for="(i, ind) in mattersArr" :key="ind">{{ind + 1 }}<span class="fl-matters">{{i.txt}}</span> </p>
                    </div>

                    <el-divider></el-divider>

                    <div class="fl-item fl-item-agreement">
                        <div class="fl-item-head">
                            <span class="pub-family">项目负责人意见</span>
                        </div>
                        <p class="fl-check-title">我单位承诺，该采购项目安置地点（货物类）和购置经费均已落实，</p>
                        <el-checkbox class="fl-check" v-model="checked"    :disabled="hasLook">同意购置</el-checkbox>
                    </div>
                </div>

                <div class="fl-item fl-item-agreement">
                    <div class="fl-btn-wrapper">
                        <el-row class="fl-btn-cancel">
                            <el-button type="primary" round @click="handleDialog('cancel')">取消</el-button>
                        </el-row>
                        <el-row class="fl-btn-save">
                            <el-button type="primary" round @click="handleDialog('save')" :disabled="hasLook">保存</el-button>
                        </el-row>
                    </div>
                </div>
            </div>

            <div id="table-wrapper" ref="print" v-show="exPrint">
                <div>
                    
                    <table width="800" align="center" id="fl-table" border="1">
                        <p class="table-title">院处采购申请表</p>
                        <div class="table-info">
                            <span>采购申请编号（院处自行编写）：{{baseNum}}</span>
                            <span>填报日期：{{baseDate}}</span>
                        </div>
                        <tbody>
                            <tr>
                                <td align="center" width="20%">采购名称</td>
                                <td colspan="7" width="80%" class="table-padding">{{baseName}}</td>
                            </tr>
                            <tr>
                                <td align="center" width="21%">项目单位</td>
                                <td colspan="3" width="30%" class="table-padding">{{company}}</td>
                                <td align="center" width="20%"> 预算总额（万元）</td>
                                <td colspan="3" width="30%" class="table-padding">{{company}}</td>
                            </tr>
                            <tr>
                                <td colspan="2" width="25%" align="center">采购内容</td>
                                <td colspan="2" width="25%" align="center">数量</td>
                                <td colspan="2" width="25%" align="center">单位</td>
                                <td colspan="2" width="25%" align="center">计划金额（万元）</td>
                            </tr>
                            <tr v-for="(i, ind) in listArr" :key="ind">
                                <td colspan="2" width="25%" align="center">{{i.name}}</td>
                                <td colspan="2" width="25%" align="center">{{i.cgNumber}}</td>
                                <td colspan="2" width="25%" align="center">{{i.company}}</td>
                                <td colspan="2" width="25%" align="center">{{i.planMoney}}</td>
                            </tr>
                            <tr>
                                <td colspan="7" width="75%" class="table-padding">
                                    货物安装是否涉及开挖室内地面或改变房屋结构
                                    （修改或增加门窗，增加或拆除墙体等）
                                </td>
                                <td width="25%" class="table-padding">
                                    <div class="table-checkbox-box">
                                        <span class="table-checkbox">
                                            <span :class="radio == '1'?'isChecked':''"><i>√</i></span>
                                            <span>是</span>
                                        </span>
                                        <span class="table-checkbox">
                                            <span :class="radio == '0'?'isChecked':''"><i>√</i></span>
                                            <span>否</span>
                                        </span>
                                    </div>
                                    若有，请提供规划与基建管理中    心审批意见书
                                </td>
                            </tr>
                            <tr>
                                <td width="20%" align="center">推荐供应商/代理商</td>
                                <td width="20%" align="center">品牌/国别</td>
                                <td width="20%" align="center">联系人</td>
                                <td width="20%" align="center">手机号码</td>
                                <td width="20%" align="center">E-mail</td>
                            </tr>
                            <tr v-for="(i, ind) in listArr2" :key="ind">
                                <td width="20%" align="center">{{i.name}}</td>
                                <td width="20%" align="center">{{i.address}}</td>
                                <td width="20%" align="center">{{i.legalPerson}}</td>
                                <td width="20%" align="center">{{i.phone}}</td>
                                <td width="20%" align="center">{{i.email}}</td>
                            </tr>
                            <tr>
                                <td width="100%" align="center">
                                    调研情况（免招标项目请填写免招标理由）：
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" class="min-height">
                                    &nbsp;&nbsp;{{txt1}}
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" align="center">
                                    技术指标（可续页）：
                                </td>
                            </tr>
                            <tr>
                                <td width="100%" align="left" class="min-height">
                                    &nbsp;&nbsp;{{txt2}}
                                </td>
                            </tr>
                            <tr>
                                <td width="100%">
                                    <p><b>&nbsp;&nbsp;如您申请采购的是进口科教用品，请阅读并确认以下事项：</b></p>
                                    <p>&nbsp;&nbsp;1. 项目单位应保证进口科教用品来源合法。</p>
                                    <p>&nbsp;&nbsp;2. 进口科教用品免税有严格的规定，并不是所有科教用品都可以免税，项目单位应预留资金以备不能免税时缴纳进口关税及增值税。进口过程的汇率风险及产生的一切费用由项目单位承担。</p>
                                    <p>&nbsp;&nbsp;3. 外贸合同一经签订即具有法律效力，项目单位不得以免税未批准或经费不充足为由撤销外贸合同，否则责任自负，但项目单位与供货商事先有约定的除外。</p>
                                    <p>&nbsp;&nbsp;4. 进口科教用品采购周期较长，请项目单位事先做好充分准备并积极配合采购与招标管理办公室工作，以免耽误您的使用时间。项目单位可凭合同号查询进口业务的进展情况。</p>
                                    <p>&nbsp;&nbsp;5. 在海关监管的五年期间内，使用单位不得将进口免税科教用品擅自转让、移作他用或者进行其他处置（如出租、调换、改装等）。进口免税科教用品须放置于免税申报时的使用地点，只能用于申报时所列的特定用途。如擅自改变特定用途、放置地点的，将视情节依法追究责任人的责任乃至法律责任。</p>
                                </td>
                            </tr>
                            <tr class="table-sign">
                                <td width="20%" align="center"><b>执行负责人（签字）及联系电话</b></td>
                                <td width="30%" align="center"><p></p></td>
                                <td width="20%" align="center"><b>经办人（签字）及联系电话</b></td>
                                <td width="30%" align="center"><p></p></td>
                            </tr>
                            <tr>
                                <td width="100%">
                                    <b>&nbsp;&nbsp;项目负责人意见：</b>
                                    <br>
                                    <p>&nbsp;&nbsp;我单位承诺，该采购项目安置地点（货物类）和购置经费均已落实，同意购置。<span style="float:right;padding-right:50px;color:red;"></span></p>
                                    <br>
                                    <p style="text-align:right;">（项目负责人签字、院处公章、日期）</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="100%">
                                    <b>&nbsp;&nbsp;院处采购工作小组组长/副组长意见:</b>
                                    <br><br>
                                    <p><span style="float:right;padding-right:50px;color:red;"></span></p>
                                    <br>
                                    <p style="text-align:right;">（签字、院处公章、日期）</p>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <img src="../../assets/img/wushuju.png" alt="">
            </div>
            
            
        </el-dialog>

        
    </div>
</template>



<script>
import Success from '@/components/Common/Success'
import { store } from "@/store"
export default {
    props:[
        "fillStatus",
        'hasLoad'
    ],
    components:{
        Success
    },
    data() {
        return {
            baseNum:'',
            baseDate:'',
            // 新增变量
            baseName:'',
            ysje:"",
            company:"",

            radio:'1',
            listArr:[],
            listArr2:[],
            txt1:'',
            txt2:'',
            mattersArr:[
                {
                    txt:'项目单位应保证进口科教用品来源合法。'
                },
                {
                    txt:'进口科教用品免税有严格的规定，并不是所有科教用品都可以免税，项目单位应预留资金以备不能免税时缴纳进口关税及增值税。进口过程的汇率风险及产生的一切费用由项目单位承担。'
                },
                {
                    txt:"外贸合同一经签订即具有法律效力，项目单位不得以免税未批准或经费不充足为由撤销外贸合同，否则责任自负，但项目单位与供货商事先有约定的除外。"
                },
                {
                    txt:"进口科教用品采购周期较长，请项目单位事先做好充分准备并积极配合采购与招标管理办公室工作，以免耽误您的使用时间。项目单位可凭合同号查询进口业务的进展情况。"
                },
                {
                    txt:"在海关监管的五年期间内，使用单位不得将进口免税科教用品擅自转让、移作他用或者进行其他处置（如出租、调换、改装等）。进口免税科教用品须放置于免税申报时的使用地点，只能用于申报时所列的特定用途。如擅自改变特定用途、放置地点的，将视情节依法追究责任人的责任乃至法律责任。"
                }
            ],
            checked:true,
            hasLimit:true,
            exchangeFill:false,
            exchangeLoad:this.hasLoad,
            fill:true,
            dialogWid:"60%",
            hasClose:true,
            marTop:'15vh',
            hasNewClass:false,
            hasSuccessStatus:true,
            sessionGet:{},
            id:"",
            hasLook:false
        }
    },
    methods:{
        handleClose(done) {
            this.$emit('handleFillApplication', 'close')
        },
        handleAddList(type) {
            if(type === 'make') {
                let obj = {
                    name:'',
                    cgNumber:'',
                    company:'',
                    planMoney:''
                }
                if(this.listArr.length < 10) {
                    this.listArr.push(obj)
                }
            }else if(type === 'supllier'){
                let obj = {
                    name:'',
                    address:'',
                    legalPerson:'',
                    phone:'',
                    email:''
                }
                if(this.listArr2.length < 10) {
                    this.listArr2.push(obj)
                }
            }
            
        },
        handleListEdit(type, ind) {
            if(type === 'make') {
                this.listArr[ind].disabled = false
            }else if(type === 'supllier') {
                this.listArr2[ind].disabled = false
            }
            
        },
        handleListDel(type, i, ind) { 
            // 只读时不能删除
            if(this.hasLook) {
                return false
            } 
            let params = {id:i.id,pid:this.sessionGet.id}             
            if(type === 'make') {
                if(!i.id) {
                    this.listArr.splice(ind, 1)
                    return false
                }
                this.$http.post("/api/project/deletedCgqd", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.init()
                    }else{
                        this.$message({
                            type:'error',
                            message:res.message
                        })
                    }
                })
                .catch((err) => {
                    this.$message({
                        type:'error',
                        message:err.message
                    })
                })
            }else if(type === 'supllier') {
                if(!i.id) {
                    this.listArr2.splice(ind, 1)
                    return false
                }
                this.$http.post("/api/project/deletedSupplier", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.init()
                    }else{
                        this.$message({
                            type:'error',
                            message:res.message
                        })
                    }
                })
                .catch((err) => {
                    this.$message({
                        type:'error',
                        message:err.message
                    })
                })
            }
            
        },
        handleDialog(type) {
            if(type === 'cancel') {
                this.fill = true
                this.$emit('handleFillApplication', 'close')
            }else if(type === 'save') {
                let cgList = this.listArr
                let gysList = this.listArr2

                
                if(!this.baseNum) {
                    this.$message.error("请填写采购申请编号")
                    return false
                }
                
                if(!this.baseDate) {
                    this.$message.error("请填写填报日期")
                    return false
                }
                
                if(!this.baseName) {
                    this.$message.error("请填写采购名称")
                    return false
                }

                if(!cgList.length) {
                    this.$message.error("请先填写采购清单")
                    return false
                }
                // if(!gysList.length) {
                //     this.$message.warning("请先添加推荐供应商")
                //     return false
                // }
                
                if(!this.txt1) {
                    this.$message.error("请填写调研情况")
                    return false
                }
                
                if(!this.txt2) {
                    this.$message.error("请填写技术指标")
                    return false
                }

                if(!this.checked) {
                    this.$message.error("请先勾选项目负责人意见")
                    return false
                }
                

                let params = {
                    pid:this.sessionGet.id,
                    no:this.baseNum,
                    cgName:this.baseName,
                    time:this.baseDate,
                    isChangeStructure:this.radio,
                    investigation:this.txt1,
                    technicalIndicators:this.txt2,
                    cgList:JSON.stringify(cgList),
                    isAgree:"0",
                    gysList:JSON.stringify(gysList)
                }

                if(this.id) {
                    params.id = this.id
                    this.$http.post("/api/project/updatecgsq", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.fill = false
                            // this.$emit('hasSubmit', true)
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.$emit('handleFillApplication', 'close')
                        }else{
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    })
                    .catch((err) => {
                        this.$message({
                            type:'error',
                            message:err.message
                        })
                    })
                }else{
                    this.$http.post("/api/project/addcgsq", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            // this.$emit('hasSubmit', true)
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.init();
                            this.exchangeFill = false
                            this.$emit('handleFillApplication', 'close')
                        }else{
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    })
                    .catch((err) => {
                        this.$message({
                            type:'error',
                            message:err.message
                        })
                    })
                }

                


            }
        },
        hadlePrint() {
            // let el = document.getElementById("printFill")
            // window.print(el)
        },

        handleLoadStatus() {
            if(this.exchangeLoad) {
                this.hasNewClass = false
                this.fill = true
                this.dialogWid = '60%'
                this.marTop = '15vh'
            }
        },

        init() {
            let params = {
                pid:this.sessionGet.id
            }
            this.$http.post("/api/project/getcgsq", params)
            .then((res) => {
               // console.log(res)
                if(res.code == "00000") {
                    for(let i = 0; i < res.data.cgList.length; i ++) {
                        res.data.cgList[i].name = res.data.cgList[i].name?res.data.cgList[i].name:""
                        res.data.cgList[i].cgNumber = res.data.cgList[i].cgNumber?res.data.cgList[i].cgNumber:""
                        res.data.cgList[i].company = res.data.cgList[i].company?res.data.cgList[i].company:""
                        res.data.cgList[i].planMoney = res.data.cgList[i].planMoney?res.data.cgList[i].planMoney.toFixed(2):""
                    }

                    for(let i = 0; i < res.data.gysList.length; i ++) {
                        res.data.gysList[i].name = res.data.gysList[i].name?res.data.gysList[i].name:""
                        res.data.gysList[i].phone = res.data.gysList[i].phone?res.data.gysList[i].phone:""
                        res.data.gysList[i].email = res.data.gysList[i].email?res.data.gysList[i].email:""
                        res.data.gysList[i].legalPerson = res.data.gysList[i].legalPerson?res.data.gysList[i].legalPerson:""
                        res.data.gysList[i].address = res.data.gysList[i].address?res.data.gysList[i].address:""
                    }


                    this.listArr = res.data.cgList
                    this.listArr2 = res.data.gysList
                    this.baseNum = res.data.cgMsg.purchaseNo
                    this.baseName = res.data.cgMsg.purchaseName
                    this.ysje = res.data.cgMsg.ysje
                    this.company = res.data.cgMsg.company
                    this.baseDate = res.data.cgMsg.createTime
                    this.radio = res.data.cgMsg.isChangeStructure.toString()
                    this.txt1 = res.data.cgMsg.investigation
                    this.txt2 = res.data.cgMsg.technicalIndicators
                    this.id = res.data.cgMsg.id
                }else{
                    // this.$message({
                    //     type:'error',
                    //     message:res.message
                    // })
                }
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })
            })
        },

        handleOpen() {
            if(this.exPrint) {
                this.$print(this.$refs.print)
            }
            
        }
    },
    mounted() {
        this.sessionGet = store.state.proInfo
        
        this.hasLook=this.sessionGet.spareIi?true:false;
        // console.log(this.hasLook)
        this.init()
        this.baseName = this.sessionGet.no + this.sessionGet.name
        
    },
    computed: {
        exProInfo() {
            return store.state.proInfo
        },
        
        exPrint() {
            return store.state.isprint
        }

    },
    watch:{
        fillStatus(params) {
            this.exchangeFill = params
        },
        hasLoad(params) {
            this.exchangeLoad = params
            this.handleLoadStatus(params)
        },
        exProInfo(params) {
            // console.log(params)
            this.hasLook=params.spareIi?true:false;
        }
    },
    created() {
        this.$http.get("/api/system/get/systemDate").then(res =>{
            if(res.code=="00000"){
                this.baseDate = res.message;
            }
        })
    }
}
</script>



<style lang="less" scoped>
    @import url('./less/fillAppalication.less'); // 分号要写，不然会报错

    #fl-wrapper{
        & /deep/ .el-input__prefix, .el-input__suffix{
            top: -3px;
        }
        opacity: 0;
    }
    @media print {
        @import url('./less/print.less');
    }
    .fl-wrapper2{
        opacity: 1!important;
    }

    #table-wrapper{
        background: #ffffff;
        width: 900px;
        >div{
            background: rgba(0, 0, 0, 0);
            position: absolute;
            z-index: 1;
        }
        img{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 0;
        }
        .table-title{
            text-align: center;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 30px;
            padding-top: 20px;
        }
        .table-info{
            display: flex;
            justify-content: space-around;
        }
        #fl-table{
            margin-top: 0px;
            tr{
                width: 100%;
                display: flex;
                td{
                    line-height: 40px;
                    .table-checkbox-box{
                        display: flex;
                        justify-content: space-around;
                        .table-checkbox{
                            span:nth-child(1){
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                border: 1px solid #999999;
                            }
                            span i{
                                display: none;
                            }
                            .isChecked{
                                background-size:cover; 
                                i{
                                    display: block;
                                   color: #3B7CFF; 
                                   display: inline-block;
                                   line-height: 15px;
                                   text-align: center;
                                }
                            }
                            .isChecked+span{
                                color: #3B7CFF;
                            }
                        }
                    }
                    
                }
                .table-padding{
                    padding-left: 20px;
                }
                .min-height{
                    min-height: 50px;
                }
                
            }
            .table-sign{
                td{
                    
                    p{
                        font-size: 16px;
                        color: red;
                        line-height: 50px;
                    }
                }
            }
             
        }

        
    }
    
</style>

<style scoped media="print">
    @page {
        /* auto is the initial value */
        size: auto;  
        /* this affects the margin in the printer settings */
        margin: 5mm; 
    }

    body {
        -webkit-print-color-adjust: exact;
    }
    
    .cgqdhx{color:red;}
</style>



