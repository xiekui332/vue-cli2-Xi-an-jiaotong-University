<template>
    <div id="fl-wrapper">
        <el-dialog
            :class="hasNewClass?'st-dialog-fill st-dialog-new':'st-dialog-fill'"
            :visible.sync='exchangeFill'
            :show-close='hasClose'
            :close-on-click-modal=false 
            :close-on-press-escape=false
            :width='dialogWid'
            :top='marTop'
            >
            <div v-if="fill">
                <div id="printFill">
                    <p class="pub-family fl-title">院处采购申请单<span @click="hadlePrint" style="display:none;"> 打印机</span></p>
                    <div class="fl-item fl-item-basic">
                        <p class="pub-family fl-item-basic-title">基本信息</p>
                        <div class="fl-item-basic-block">
                            <div class="fl-L">
                                <span class="fl-L-title">采购申请编号：</span>
                                <el-input class="fl-L-input" v-model="baseNum" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="fl-L">
                                <span class="fl-L-title">填报日期：</span>
                                <el-date-picker
                                    class="fl-L-input"
                                    v-model="baseDate"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    >
                                </el-date-picker>
                            </div>
                            <div class="fl-L">
                                <span class="fl-L-title">采购名称：</span>
                                <el-input class="fl-L-input" v-model="baseName" placeholder="默认项目编码+项目名称"></el-input>
                            </div>
                            <div class="fl-L">
                                <p class="fl-L-title">
                                    <span>货物安装是否涉及开挖室内地面或改变房屋结构<br/>（修改或增加门窗，增加或拆除墙体等）：</span>
                                    <span>若有，请提供规划与基建管理中心审批意见书</span>
                                </p>
                                <div class=" fl-L-radio">
                                    <el-radio v-model="radio" label="1">是</el-radio>
                                    <el-radio v-model="radio" label="0">否</el-radio>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <el-divider></el-divider>
                    
                    <div class="fl-item fl-item-make">   
                        <div class="fl-item-head">
                            <span class="pub-family">采购清单</span>
                            <el-row>
                                <el-button type="primary" round @click="handleAddList('make')">添加</el-button>
                            </el-row>
                        </div>

                        <div class="fl-item-con">
                            <div class="fl-list fl-list-head">
                                <span>采购内容</span>
                                <span>数量</span>
                                <span>单位</span>
                                <span>计划金额(万元)</span>
                                <span>操作</span>
                            </div>
                            <div class="fl-list" v-for="(i, ind) in listArr" :key="ind">
                                <div class="fl-order">
                                    <span>{{ind + 1}}</span>
                                    &nbsp;&nbsp;
                                    <el-input class="fl-L-input" v-model="i.name" placeholder="请输入内容"  maxlength="50"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" type="number" v-model="i.cgNumber" placeholder="请输入内容" ></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.company" placeholder="请输入内容" ></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.planMoney" placeholder="请输入内容" ></el-input>
                                </div>
                                <div>
                                    <i class="pub-css fl-icon-edit" @click="handleListEdit('make', ind)"></i>
                                    <i class="pub-css fl-icon-del" @click="handleListDel('make', i)"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <el-divider></el-divider>

                    <div class="fl-item fl-item-supllier">
                        <div class="fl-item-head">
                            <span class="pub-family">供应商信息</span>
                            <el-row>
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
                                    <el-input class="fl-L-input" v-model="i.name" placeholder="请输入内容"  maxlength="50"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.address" placeholder="请输入内容" ></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.legalPerson" placeholder="请输入内容"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.phone" placeholder="请输入内容"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.email" placeholder="请输入内容"></el-input>
                                </div>
                                <div>
                                    <i class="pub-css fl-icon-edit" @click="handleListEdit('supllier', ind)"></i>
                                    <i class="pub-css fl-icon-del" @click="handleListDel('supllier', i)"></i>
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
                                :rows="4"
                                maxlength="1000字"
                                :show-word-limit='hasLimit'
                                placeholder="请输入内容"
                                v-model="txt1">
                            </el-input>
                        </div>

                        <div class="fl-basis-block">
                            <div class="fl-basis-title">技术指标：</div>
                            <el-input
                                type="textarea"
                                :rows="4"
                                maxlength="10000字"
                                :show-word-limit='hasLimit'
                                placeholder="请输入内容"
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
                        <el-checkbox class="fl-check" v-model="checked">同意购置</el-checkbox>
                    </div>
                </div>

                <div class="fl-item fl-item-agreement">
                    <div class="fl-btn-wrapper">
                        <el-row class="fl-btn-cancel">
                            <el-button type="primary" round @click="handleDialog('cancel')">取消</el-button>
                        </el-row>
                        <el-row class="fl-btn-save">
                            <el-button type="primary" round @click="handleDialog('save')">保存</el-button>
                        </el-row>
                    </div>
                </div>
            </div>

            <!-- <div v-else>
                <Success @handleDialog='handleDialog' :hasSuccessStatus='hasSuccessStatus' />
            </div> -->
            
        </el-dialog>

        
    </div>
</template>

<script>
import Success from '@/components/Common/Success'
import { store } from "@/store"
export default {
    props:[
        'fillStatus',
        'hasLoad'
    ],
    components:{
        Success
    },
    data() {
        return {
            baseNum:'',
            baseDate:'',
            baseName:'',
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
            exchangeFill:this.fillStatus,
            exchangeLoad:this.hasLoad,
            success:false,
            fill:true,
            dialogWid:"60%",
            hasClose:false,
            marTop:'15vh',
            hasNewClass:false,
            hasSuccessStatus:true,
            sessionGet:{},
            id:""
        }
    },
    methods:{
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
        handleListDel(type, i) {
            let params = {
                id:i.id
            }
            
            if(type === 'make') {
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
                this.exchangeFill = false
                this.fill = true
                this.$emit('handleFillApplication', 'close')
            }else if(type === 'save') {
                // this.exchangeFill = false
                // this.fill = false
                // this.success = true
                // this.dialogWid = '40%'
                // this.marTop = '20vh'
                // this.hasNewClass = true

                // console.log(this.baseDate)
                let cgList = this.listArr
                let gysList = this.listArr2

                
                if(!this.baseNum) {
                    this.$message.warning("请填写采购申请编号")
                    return false
                }
                
                if(!this.baseDate) {
                    this.$message.warning("请填写填报日期")
                    return false
                }
                
                if(!this.baseName) {
                    this.$message.warning("请填写采购名称")
                    return false
                }

                if(!cgList.length) {
                    this.$message.warning("请先填写采购清单")
                    return false
                }
                if(!gysList.length) {
                    this.$message.warning("请先添加推荐供应商")
                    return false
                }
                
                if(!this.txt1) {
                    this.$message.warning("请填写调研情况")
                    return false
                }
                
                if(!this.txt2) {
                    this.$message.warning("请填写技术指标")
                    return false
                }

                if(!this.checked) {
                    this.$message.warning("请先勾选项目负责人意见")
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
                            this.success = true
                            this.dialogWid = '40%'
                            this.marTop = '20vh'
                            this.hasNewClass = true
                            this.$emit('hasSubmit', true)
                            this.$message({
                                type:'success',
                                message:res.message
                            })
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
                            this.fill = false
                            this.success = true
                            this.dialogWid = '40%'
                            this.marTop = '20vh'
                            this.hasNewClass = true
                            this.$emit('hasSubmit', true)
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
            window.print()
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
        }
    },
    mounted() {
        this.sessionGet = store.state.proInfo
        this.init()
        this.baseName = this.sessionGet.no + this.sessionGet.name
    },
    computed: {
        timeDefault() {
            let date = new Date();
            let s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
            return s1;
        }
    },
    watch:{
        fillStatus(params) {
            this.exchangeFill = params
        },
        hasLoad(params) {
            this.exchangeLoad = params
            this.handleLoadStatus(params)
        }
    },
    created() {
        this.baseDate = this.timeDefault
        // console.log(this.timeDefault)
    }
}
</script>



<style lang="less" scoped>
    @import url('./less/fillAppalication.less'); // 分号要写，不然会报错

    #fl-wrapper{
        & /deep/ .el-input__prefix, .el-input__suffix{
            top: -3px;
        }
    }
    
</style>