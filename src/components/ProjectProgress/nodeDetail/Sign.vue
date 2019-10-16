<template>
    <div id="pl-wrapper">
        <!-- 合同签订 -->
        <div class="pl-info">
            <div class="pl-info-title pub-family">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;信息填写(合同信息)</span>
                <div class="pl-newBtn">
                    <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" v-show="!isSituatiostep" @click="handleAddmenu('newEdit')">编辑</a>
                    <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" v-show="!isSituatiostep" @click="handleAddmenu('save')">保存</a>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>供应商：</span>
                    <el-input class="pl-input-box" v-model="supplier" placeholder="请输入内容" :disabled="isSign"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>中标金额：</span>
                    <el-input class="pl-input-box" @change="handleChangezb(isServiceFee)" v-model="zbiaoJe" placeholder="请输入内容" :disabled="isSign"><template slot="append">万元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content" class="pub-width">{{textContent}}</div>
                        <span class="pl-input-name">
                            <i>*</i>
                            <img src="../../../assets/img/mark.png" alt="">
                            中标服务费：
                        </span>
                    </el-tooltip>
                    <el-radio v-model="isServiceFee" label="1" @change="handleChangeRadio(isServiceFee)" :disabled="isSign">需要</el-radio>
                    <el-radio v-model="isServiceFee" label="0" @change="handleChangeRadio(isServiceFee)" :disabled="isSign">不需要</el-radio>
                    
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i></i>服务费金额：</span>
                    <el-input class="pl-input-box" v-model="serviceFee" placeholder="请输入内容" :disabled="true"><template slot="append">元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>合同签订日期：</span>
                    <el-date-picker
                    v-model="contractTime"
                    type="date"
                    placeholder="选择日期"
                    class="pl-input-box" 
                    value-format="yyyy-MM-dd"
                    :disabled="isSign"
                    >
                    </el-date-picker>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>维保期：</span>
                    <el-input class="pl-input-box" v-model="repairPeriod" placeholder="请输入内容" :disabled="isSign"><template slot="append">年</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>质保金%：</span>
                    <el-input class="pl-input-box" @change="handleChangeMoney" v-model="retentionMoney" placeholder="请输入内容" :disabled="isSign"><template slot="append">%</template></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>质保金额：</span>
                    <el-input class="pl-input-box" :disabled="true" v-model="zbaoje" placeholder="请输入内容"><template slot="append">万元</template></el-input>
                </div>
            </div>
            <div class="pl-item-wrapper">
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>招标编号：</span>
                    <el-input class="pl-input-box" v-model="biddinfNo" placeholder="请输入内容" :disabled="isSign"></el-input>
                </div>
                <div class="pl-input">
                    <span class="pl-input-name"><i>*</i>合同编号：</span>
                    <el-input class="pl-input-box" v-model="contractNo" placeholder="请输入内容" :disabled="isSign"></el-input>
                </div>
            </div>

        </div>



        <div class="st-item">
            <div class="st-item-header">
                <span class="pub-family">信息填写(付款信息)</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" v-show="!isSituatiostep" @click="handleAddmenu('fill')">添加</a>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div><i>*</i> <span>付款时间</span></div>
                    <div><i>*</i> <span>付款比%</span></div>
                    <div><i>*</i> <span>付款金额(万)</span></div>
                    <div><i>*</i> <span>剩余付款金额(万)</span></div>
                    <div> <span>备注</span></div>
                    <div> <span>操作</span></div>
                </div>

                <div class="st-edit-item st-oparate" v-for="(i, ind) in infoArr" :key="ind">
                    <div class="st-oparate-col">
                        <el-date-picker
                        v-model="i.expectTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :disabled="true" 
                        >
                        </el-date-picker>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.payRatio" type='number' title=" " :disabled="true" ></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.payMoney" type='number' title=" " :disabled="true"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.surplusMoney" type='number' title=" " :disabled="true"></el-input>
                    </div>
                    <div class="st-oparate-col">
                        <el-input v-model="i.remark" maxlength='20' :disabled="true" ></el-input>
                    </div>
                    <div class="st-oparate-col st-oparate-btn">
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i, 'edit', ind)"> 编辑</i>
                        <!-- <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i, 'sub')"> 提交</i> -->
                        <i :class="noDrop?'st-icon-edit pub-dis':'st-icon-edit'" @click="handleEdit(i, 'del')"> 删除</i>
                    </div>
                </div>
            </div>
        </div>

        <!-- 模板资料 -->
        <div class="st-item st-templates">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content" v-show="!isSituatiostep">
                <div class="st-edit-item st-ed-head st-ed-indent">
                    <div><span>下载模板</span>&nbsp;&nbsp;&nbsp;&nbsp; <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                </div>

                <div class="st-edit-item" v-for="(i, ind) in zlList" :key="ind" @click="handleUploadChange('1', ind, i.mb.id)">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file" @click="handleDownLoad(i)"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="st-file-title"><i class="st-tips-required" v-if="i.mb.isMust==0" >*</i>  {{i.mb.name}}</span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            :action= getuploadUrl1
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name"><span @click="handleDownHisFile(i)">{{i.zl.length && i.zl[i.zl.length - 1].attachName?i.zl[i.zl.length - 1].attachName:''}}</span> <i v-if="i.zl.length && i.zl[i.zl.length - 1].attachName" :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.zl[i.zl.length - 1].id)"></i> </p>

                    </div>
                </div>

            </div>

            <!-- resource == situationstep -->
            <div v-show="isSituatiostep" class="st-edit-content st-edit-content-situation">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                    <div> <span>操作人</span></div>
                    <div> <span>操作时间</span></div>
                </div>

                <div class="st-edit-item st-ed-List" v-for="(i, ind) in zlList" :key="ind">
                    <div>{{i.mb.name}}</div>
                    <div class="allow-down" @click="handleDownLoadSitua(i.zl[0].attachUrl)">{{i.zl.length && i.zl[0].attachName?i.zl[0].attachName:""}}</div>
                    <div>{{i.zl.length && i.zl[0].createUserName?i.zl[0].createUserName:""}}</div>
                    <div>{{i.zl.length && i.zl[0].createTime?i.zl[0].createTime:""}}</div>
                </div>
            </div>
        </div>


        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">其他资料</span>
                <a href="javascript:;" :class="noDrop?'st-add pub-dis':'st-add'" v-if="!noDrop" v-show="!isSituatiostep" @click="handleAddmenu('other')">增行</a>
            </div>

            <div class="st-edit-content" v-show="!isSituatiostep">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料名称</span></div>
                    <div> <span>上传资料</span></div>
                </div>
                <div class="st-edit-item" v-for="(i, ind) in otherArr" :key="ind" @click="handleUploadChange('0', ind)">
                    <div class="st-icon-file-title">
                        <i class="st-icon-file"></i>
                        <span class="st-file-title">其他资料 </span>
                    </div>
                    <div class="st-icon-file-name">
                        <el-upload
                            class="upload-demo"
                            action= ""
                            :before-upload="handleBefore"
                            :http-request="customRequest"
                            :limit="1"
                            :file-list="fileList"
                            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                            :disabled="noDrop"
                            >
                            <el-button size="small" type="primary"><i class="pub-css st-upload-icon"></i></el-button>
                        </el-upload>

                        <p class="file-name">
                            <span @click="handleDownHisFile(i, 'qi')">{{i.attachName?i.attachName:''}}</span> 
                            <i :class="noDrop?'pub-css pub-dis':'pub-css'" @click="handleFileDel(i.id, ind)"></i> 
                        </p>

                    </div>
                </div>
            </div>

            <!-- resource == situationstep -->
            <div v-show="isSituatiostep" class="st-edit-content st-edit-content-situation">
                <div class="st-edit-item st-ed-head">
                    <div class="st-qt-name"> <span>资料名称</span></div>
                    <div> <span>操作人</span></div>
                    <div> <span>操作时间</span></div>
                </div>

                <div class="st-edit-item st-ed-List" v-for="(i, ind) in otherArr" :key="ind">
                    <div class="st-qt-name allow-down" @click="handleDownLoadSitua(i.attachUrl)">{{i.attachName}}</div>
                    <div>{{i.createUserName}}</div>
                    <div>{{i.createTime}}</div>
                </div>
            </div>
        </div>

        <el-row class="st-checkHandle" v-if="!noDrop" v-show="!isSituatiostep">
            <el-button type="primary" :disabled="noDrop" :loading="loading" @click="handleFinishNode()">完成本节点</el-button>
            <div class="st-checkHandle-tips">
                <i class="el-icon-info"></i>
                完成后项目进入下一节点，本节点将不能编辑信息、上传资料。
            </div>
        </el-row>

        <el-dialog
            class="new-dialog"
            :visible.sync='isDialogInfo'
            :close-on-click-modal=false 
            :close-on-press-escape=false  
            width="60%"  
            >
            <div class="new-info-wrapper">
                <div class="st-edit-item st-ed-head">
                    <div><i>*</i> <span>付款时间</span></div>
                    <div><i>*</i> <span>付款比%</span></div>
                    <div><i>*</i> <span>付款金额(万)</span></div>
                    <div><i>*</i> <span>剩余付款金额(万)</span></div>
                    <div> <span>备注</span></div>
                </div>

                <div class="st-edit-item st-oparate">
                    <div class="st-oparate-col">
                        <el-date-picker
                            v-model="diaTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="disPercentVal" placeholder="请输入内容" type='number' title=" " @change="handleChangepayMoney(disPercentVal)"></el-input>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="diaMoneyVal" placeholder="系统计算" type='number' title=" " :disabled='true'></el-input>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="diaSurplusMoney" placeholder="系统计算" type='number' title=" " :disabled="true"></el-input>
                        </div>
                        <div class="st-oparate-col">
                            <el-input v-model="diaRemarksVal" placeholder="请输入备注(选填)" maxlength='20'></el-input>
                        </div>
                    </div>

                    <div class="fl-btn-wrapper">
                        <el-row class="fl-btn-cancel">
                            <el-button type="primary" round @click="handleDialog('cancel')">取消</el-button>
                        </el-row>
                        <el-row class="fl-btn-save">
                            <el-button type="primary" round @click="handleDialog('save')">保存</el-button>
                        </el-row>
                    </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { store } from "@/store"
export default {
    components:{
        
    },
    data() {
        return {
            textContent:"【收费标准：中标金额的1.5%。 合同备案时需出示中标商的中标服务费发票复印件。内贸项目招标服务费收取通知单在合同登记系统中自动生成，外贸项目请联系82668500李老师】",
            val1:'',
            infoArr:[],
            otherArr:[{}],
            qtList:[],
            fileListL:[],
            fileListD:[],
            fileListQ:[],
            hasTips:false,
            getuploadUrl1:'',
            sessionGet:{},
            zlList:[],
            uploadType:'',
            uploadNo:'',
            spareI:'',
            fileList:[],
            loading:false,
            serviceFee:"",
            repairPeriod:"",
            zbiaoJe:"",
            zbaoje:"",
            contractNo:"",
            contractTime:"",
            supplier:"",
            isServiceFee:"",
            retentionMoney:"",
            biddinfNo:"",
            id:"",
            proNode:9,
            proNodeId:'6472cfa718ae49f2a42dfb1afd426cd4',
            noDrop:false,

            isDialogInfo:false,
            diaTime:"",
            disPercentVal:"",
            diaMoneyVal:"",
            diaSurplusMoney:"",
            diaRemarksVal:"",
            isAdd:true,
            diaId:'',

            isSign:false,
            isEditIndex:'',
            isover:false,

            isSituatiostep:false
        }
    },
    methods:{
        handleEdit(i, type, index){
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            // this.infoArr[ind].isEdit = false
            if(type == "sub") {

                if(i.id) {
                    let params = {
                        pid:this.sessionGet.id,
                        actualTime:i.actualTime,
                        remark:i.remark,
                        payRatio:i.payRatio,
                        id:i.id
                    }

                    this.$http.post("/api/project/updateSFPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getSFPayMentRecodeList()
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

                }else {
                    let params = {
                        pid:this.sessionGet.id,
                        actualTime:i.actualTime,
                        remark:i.remark,
                        ratio:i.payRatio
                    }
                    this.$http.post("/api/project/addSFPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getSFPayMentRecodeList()
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
            }else if(type == "del") {
                let params = {
                    pid:i.pid,
                    id:i.id
                }

                this.$http.post("/api/project/deleteSFPayMentRecode", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.$message({
                            type:'success',
                            message:res.message
                        })
                        this.getSFPayMentRecodeList()
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
            }else if(type == "edit") {
                this.isAdd = false
                // console.log(i)
                this.diaId = i.id
                this.diaTime = i.expectTime
                this.disPercentVal = i.payRatio
                this.diaMoneyVal = i.payMoney
                this.diaSurplusMoney = i.surplusMoney
                this.diaRemarksVal = i.remark

                this.isDialogInfo = true
                this.isEditIndex = index
            }
        },
        
        handleAddmenu(type) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            if(type === 'fill') {
                if(this.isSign) {
                    this.isDialogInfo = true
                }else{
                    this.$message({
                        type:"error",
                        message:"请先保存合同信息，再添加付款"
                    })
                    return false
                }
                
                this.isEditItem = ""
                this.isAdd = true
                this.handleClearInfo()
            }else if(type === 'other') {
                this.otherArr.push({})
            }else if(type == 'save') {
                if(this.isSign) {
                    return false
                }
                if(!this.supplier){
                     return this.$message.error("供应商不能为空");
                }
                if(!this.zbiaoJe){
                     return this.$message.error("中标金额不能为空");
                }
                if(!this.isServiceFee){
                     return this.$message.error("是否所要服务费不能为空");
                }
                if(!this.contractTime){
                     return this.$message.error("合同签订日期不能为空");
                }
                if(!this.repairPeriod){
                     return this.$message.error("维保期不能为空");
                }
                if(!this.retentionMoney){
                     return this.$message.error("质保金不能为空");
                }
                if(!this.biddinfNo){
                     return this.$message.error("招标编号不能为空");
                }
                if(!this.contractNo){
                     return this.$message.error("合同编号不能为空");
                }
                var now = new Date(this.contractTime);
                var str=this.repairPeriod.toString().split('.');
                var years= now.getFullYear();//年
                var year=Number(years)+Number(str[0]); 
                var month=now.getMonth()+1;
                if(str[1]){
                    month=Number(month)+Number(str[1]);
                    if(month>12){
                        year++;
                        month -= 12;
                    }
                }
                var date2=new Date(year,month,0);//新的年月
                var day1=now.getDate();
                var day2=date2.getDate();
                if(day1>day2){  //防止+6月后没有31天
                day1=day2;
                }
                str = year + '-'+ month + '-' + day1;
                let params = {
                    id:this.sessionGet.id,
                    supplier:this.supplier,         //  供应商
                    zbJe:this.zbiaoJe,              // 中标金额
                    isServiceFee:this.isServiceFee, // 是否要中标服务费
                    time:this.contractTime,         // 合同签订日期
                    repairPeriod:this.repairPeriod, // 维保期
                    retentionMoney:this.retentionMoney, // 质保金
                    biddinfNo:this.biddinfNo,       // 招标编号
                    contractNo:this.contractNo,     // 合同编号
                    repairEndTime:str
                }
                this.$http.post("/api/project/fileContract", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.$message({
                            type:'success',
                            message:"保存成功"
                        })
                        this.getProjectMsgById(this.sessionGet.id)
                        this.isSign = true
                        
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
            }else if(type == "newEdit") {
                this.isSign = false
            }
        },

        init() {
            let params = {
                id:this.sessionGet.id
            }

            this.$http.post("/api/project/getContract", params)
            .then((res) => {
                if(res.code == "00000") {
                    res.data.isServiceFee = res.data.isServiceFee.toString()
                    this.supplier = res.data.supplier
                    this.zbiaoJe = res.data.zbiaoJe
                    this.isServiceFee = res.data.isServiceFee
                    this.contractTime = res.data.contractTime
                    this.repairPeriod = res.data.repairPeriod
                    this.retentionMoney = res.data.retentionMoney
                    this.biddinfNo = res.data.biddinfNo
                    this.contractNo = res.data.contractNo
                    this.serviceFee = res.data.serviceFee
                    this.zbaoje = res.data.zbaoje

                    // isSign
                    if(res.data.zbiaoJe) {
                        this.isSign = true
                    }

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
        },

        handleUploadChange(type, ind, id) {
            if(type == "1") {
                this.uploadType = type
                this.uploadNo = ind + 1
                this.spareI = id
            }else if(type == "0") {
                this.uploadType = type
                this.uploadNo = ind + 1
            }
            
        },

        handleDownLoad(i) {
            if(i.mb.url){
               window.open(i.mb.url)
            }else{
                this.$message.error(`系统管理员还没有上传此模板`); 
            }
        },


        handleDownLoadSitua(url) {
            window.open(url)
        },

        handleBefore(file) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }

            let limitCount = 1024*1024*5
            if(file.size > limitCount) {
                this.$message.error(`请选择小于5M的文件`);
                return false
            }

            this.files = file
            
            if(this.uploadType == "1") {
                if(this.zlList[this.uploadNo - 1].zl.length) {
                    this.$message.error(`如需更换文件请先删除后操作`);
                    return false
                }
            }else if(this.uploadType == "0") {

                if(this.qtList.length && this.qtList[this.uploadNo - 1].attachName) {
                    this.$message.error(`如需更换文件请先删除后操作`);
                    return false
                }
            }
            
        },


        customRequest() {
            const formData = new FormData();
            
            formData.append('pid',this.sessionGet.id);
            formData.append('files',this.files);
            formData.append('nodeId',this.sessionGet.projectNode);
            if(this.uploadType == "1") {
                formData.append('type',this.uploadType);
                formData.append('no',this.uploadNo);
                formData.append('spareI',this.spareI);
            }else if(this.uploadType == "0") {
                formData.append('type',this.uploadType);
                formData.append('no',"");
                formData.append('spareI',"");
            }
            
            // console.log(formData)
            this.fileList = []
            this.$http.post("/api/project/uploadNodeAppendixQdht", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })
                    
                    this.getNodeAppendix()
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
        },
        

        handleFileDel(id, ind) {
            if(this.sessionGet.status > this.proNode) {
                return false
            }

            if(!id) {
                this.otherArr.splice(ind, 1)
                return false
            }

            let params = {
                appendixId:id
            }
            this.fileList = []
            this.$http.post("/api/project/deletedNodeAppendixQdht", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:"success",
                        message:res.message
                    }) 
                    
                    this.getNodeAppendix()

                }else{
                   this.$message({
                        type:"error",
                        message:res.message
                    }) 
                }
            })
            .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        },


        getProjectMsgById(id){
            let params = {
                id:id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.sessionGet = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.getNodeAppendix();
                }else{
                    
                }
            })
        },

        getNodeAppendix() {
            // console.log(this.sessionGet)
            let params = {
                pid:this.sessionGet.id,
                nodeId:this.sessionGet.projectNode
            }
            if(this.sessionGet.status > this.proNode || this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
                params.nodeId = this.proNodeId
                this.noDrop = true
                store.dispatch('commitChangeIsHistory',true)
                this.isSign = true
            }else{
                store.dispatch('commitChangeIsHistory',false)
            }
            

            this.$http.post("/api/project/getNodeAppendix", params)
            .then((res) => {
                if(res.code == "00000") {
                    if(res.data && res.data.zlList) {
                        for(let i = 0; i < res.data.zlList.length; i ++) {
                            res.data.zlList[i]['isRequest'] = true
                        }
                        this.zlList = res.data.zlList
                        // console.log(this.zlList)
                    }

                    if(res.data && res.data.qtList) {
                        this.qtList = res.data.qtList
                        this.otherArr = res.data.qtList
                        // console.log(this.otherArr)
                    }
                    

                }else{
                    
                }
            })
            .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        },

        handleChangeMoney() {
            if(this.retentionMoney && this.zbiaoJe) {
                this.zbaoje = (this.retentionMoney * this.zbiaoJe * 0.01).toFixed(2)
            }else{
                this.zbaoje = ""
            }
            
        },

        getSFPayMentRecodeList() {
            let params = {
                projectId:this.sessionGet.id
            }

            this.$http.post("/api/project/getSFPayMentRecodeList", params)
            .then((res) => {
                // console.log(res)
                if(res.code == "00000") {
                    if(res.data) {
                        for(let i = 0;i < res.data.length; i ++) {
                            res.data[i].payMoney = res.data[i].payMoney.toFixed(2)
                            res.data[i].surplusMoney = res.data[i].surplusMoney.toFixed(2)
                        }
                    }
                    
                    this.infoArr = res.data
                }else{
                    this.infoArr = []
                }
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })
            })
        },

        handleChangepayMoney(disPercentVal) {
            
            this.diaMoneyVal = (this.disPercentVal * this.sessionGet.zbje * 0.01).toFixed(2)
            let count = 0
            let countArray = 0
            let countArrayPercent = 0
            // 直接赋值等于浅拷贝 浅拷贝只是复制了对象的引用地址，两个对象指向同一个内存地址，所以修改其中任意的值，另一个值都会随之变化，（例：assign()）
            // 此处需要深拷贝
            // let assignInfoArr = JSON.stringify(this.infoArr)
                // assignInfoArr = JSON.parse(assignInfoArr).splice(this.isEditIndex, 1)
            let assignInfoArr = []
            for(let i = 0; i < this.infoArr.length; i ++) {
                if(i != this.isEditIndex) {
                    assignInfoArr.push(this.infoArr[i])
                }
                
            }
                
            if(this.isAdd == false) {
                for(let i = 0; i < assignInfoArr.length; i ++) {
                    
                    if(assignInfoArr[i].payRatio) {
                        countArrayPercent += Number(assignInfoArr[i].payRatio)
                    }

                    if(assignInfoArr[i].payMoney) {
                        countArray += Number(assignInfoArr[i].payMoney)
                    }

                    count = countArray + Number(this.diaMoneyVal)
                }
                
                // console.log(countArrayPercent)
            }else{
                // console.log(2)
                for(let i = 0; i < this.infoArr.length; i ++) {
                    if(this.infoArr[i].payRatio) {
                        countArrayPercent += Number(this.infoArr[i].payRatio)
                    }

                    if(this.infoArr[i].payMoney) {
                        countArray += Number(this.infoArr[i].payMoney)
                    }
                }
                count = countArray + Number(this.diaMoneyVal)
            }

            

            if(countArrayPercent + Number(disPercentVal) > 100) {
                this.$message({
                    type:'error',
                    message:"付款总额须小于等于“中标金额”"
                })
                this.isover = true
            }else{
                this.isover = false
            }

            this.diaSurplusMoney = (this.sessionGet.zbje - count).toFixed(2)
            
        },

        
        handleFinishNode() {
            if(this.sessionGet.status > this.proNode) {
                return false
            }
            let params = {
                id:this.sessionGet.id
            }
            this.loading = true
            this.$http.post("/api/project/closeNodeHtqd", params)
            .then((res) => {
                if(res.code == "00000") {
                    store.dispatch('commitChangeUpdate',true)
                    this.$router.push({
                        path:'step7' + store.state.exactPath
                    })
                }else{
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                }

                this.loading = false
            })
            .catch((err) => {
                this.$message({
                    type:'error',
                    message:err.message
                })

                this.loading = false
            })
        },

        handleChangeRadio(value) {
            // console.log(value)
            this.isServiceFee = value
            if(value == 1) {
                if(this.zbiaoJe) {
                    this.serviceFee = this.zbiaoJe * 0.015 * 10000
                }else{
                    this.serviceFee = ""
                }
                
                
            }else if(value == 0) {
                this.serviceFee = ""
            }

        },

        handleChangezb(value) {
            this.handleChangeRadio(value)
            this.handleChangeMoney();
        },

        handleDialog(type) {
            if(type == "cancel") {
                this.isDialogInfo = false
                this.handleClearInfo()
            }else if(type == "save") {
                

                // disPercentVal
                if(this.isover) {
                    this.$message({
                        type:'error',
                        message:"付款总额须小于等于“中标金额”"
                    })
                    return false
                }else if(this.disPercentVal == 0) {
                    this.$message({
                        type:'error',
                        message:"付款百分比不能为0"
                    })
                    return false
                }

                

                if(this.isAdd) {
                    let params = {
                        pid:this.sessionGet.id,
                        actualTime:this.diaTime,
                        remark:this.diaRemarksVal,
                        ratio:this.disPercentVal
                    }
                    this.$http.post("/api/project/addSFPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getSFPayMentRecodeList()
                            this.isDialogInfo = false
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
                    let params = {
                        pid:this.sessionGet.id,
                        id:this.diaId,
                        actualTime:this.diaTime,
                        remark:this.diaRemarksVal,
                        payRatio:this.disPercentVal
                    }

                    this.$http.post("/api/project/updateSFPayMentRecode", params)
                    .then((res) => {
                        if(res.code == "00000") {
                            this.$message({
                                type:'success',
                                message:res.message
                            })
                            this.getSFPayMentRecodeList()
                            this.isDialogInfo = false
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

        handleClearInfo() {
            this.diaTime = ""
            this.disPercentVal = ""
            this.diaMoneyVal = ""
            this.diaSurplusMoney = ""
            this.diaRemarksVal = ""

        },

        handleDownHisFile(i, type) {
            console.log(i)
            if(type) {
                let url = i.attachUrl
                window.open(url)
            }else{
                let url = i.zl[0].attachUrl
                let name = i.zl[0].attachName
                window.open(url)
            }
           
        }

    },

    mounted() {
        this.sessionGet = store.state.proInfo
        //  console.log(this.sessionGet)
        this.init()
        this.getProjectMsgById(this.sessionGet.id)
        this.getSFPayMentRecodeList()

        // resource == situatiostep
        if(this.$route.name.indexOf("situatiostep") < 0) {
            this.isSituatiostep = false
        }else{
            this.isSituatiostep = true
        }

        // if(this.sessionGet.pStatus == 1 || this.sessionGet.pStatus == 2) {
        //     this.isSituatiostep = true
        // }

    }
}
</script>

<style lang="less" scoped>
#pl-wrapper{
    border-radius: 4px;
    .pl-info{
        margin-top: 10px;
        padding: 15px 20px;
        background: #ffffff;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        .pl-info-title{
            display: flex;justify-content: space-between;
            font-size: 16px;
            color: #3B4859;

            .pl-newBtn{
                display: flex;
                justify-content: flex-end;
            }
            
            .st-add{
                display: block;
                width: 78px;
                height: 32px;
                border-radius:16px; 
                margin: 8px 22px 0 0;
                background: #3B7CFF;
                font-size: 14px;
                color: #FFFFFF;
                text-align: center;
                line-height: 32px;
            }
        }
        .pl-item-wrapper{
            display: flex;
            margin-top:16px;
            .pl-input{
                flex: 1;
                display: flex;
                align-items: center;
                .pl-input-name{
                    font-size: 16px;
                    color: #39475B;
                    display: inline-block;
                    min-width: 140px;
                    i{
                        color: #FE5959;
                        font-size: 18px;
                        padding:0 5px;
                    }
                    img{
                        width: 15px;
                        height: 15px;
                        margin-top: -5px;
                    }
                }
                .pl-input-box{
                    width: 200px;
                    display: flex;
                    // padding-right: 20px;
                    border: 1px solid #F0F3F7;
                    box-shadow: 0 2px 4px 0 #EFF2F7;
                    border-radius: 4px;
                    // width: 100%;
                    flex: 2;
                    & /deep/ .el-input__inner{
                        border: none;
                        height: 36px;
                    }
                    & /deep/ .el-input-group__append{
                        background-color: #ffffff;
                        border: none;
                        line-height: 36px;
                        width:50px;
                        padding: 0;
                        text-align: center;
                    }
                }
            }
            .pl-input:nth-child(even){
                padding-left: 20px;
            }
        }
        
    }
    .pl-finish{ 
        text-align: center;
        margin: 20px 0 10px;
        button{
            width: 420px;
            height: 40px;
            background: #3B7CFF;
            border-radius: 6px; 
            font-size: 16px;
            color: #FFFFFF;
        }
        
    }
    .pl-finish-tip{
        font-size: 14px;
        color: #3B4859;
        text-align: center;
        margin-bottom:30px;
    }

    @import url('../../Common/less/comItem.less');


    .st-item {
        .st-oparate {
            .st-oparate-col {
                .st-icon-edit{
                    width: auto!important;
                    margin: 0 5px;
                    cursor: pointer;
                    opacity: .7;
                    font-size: 13px;
                }
                .st-icon-edit:hover{
                    opacity: 1;
                    color: #3B7CFF;
                }
            }
        }
    }
    .st-templates {
        .st-edit-content {
            .st-edit-item{
                
                .st-icon-file-name{
                    .upload-demo{
                        width: 40px;
                    }

                    .upload-demo{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        & /deep/ .el-upload-list{
                            opacity: 0;
                            width: 0;
                            height: 0;
                            display: none;
                        }
                    }
                    .file-name{
                        float: left;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                        i{
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background-position: -377px -168px;
                            margin:0 10px;
                            cursor: pointer;
                            opacity: .2;
                            transition: all .3s ease;
                        }
                    }
                    .file-name:hover{
                        i{
                            opacity: 1;
                        }
                        color: #3B7CFF;
                    }
                }
            }
            .st-ed-indent{
                >div:nth-child(1){
                    text-indent: 1em;
                }
            }
        }
        
        // resource == situation
        .st-edit-content-situation{
            .st-edit-item{
                line-height: 50px;
            }
            .st-ed-head > div:nth-child(1){
                text-indent: 0;
            }
            .st-ed-head > div{
                padding-left: 10px;
            }
            .st-ed-head > div:nth-child(1){
                min-width: 200px;
            }
            .st-ed-head > div:nth-child(2){
                min-width: 200px;
            }
            .st-ed-head > div:nth-child(4){
                min-width: 200px;
            }
            .st-ed-List{
                >div{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-left: 10px;
                }
                >div:nth-child(1){
                    min-width: 200px;
                }
                >div:nth-child(2){
                    min-width: 200px;
                }
                >div:nth-child(4){
                    min-width: 200px;
                }
            }
            .st-qt-name{
                min-width: 350px!important;
            }
            .allow-down{
                cursor: pointer;
                color: #3B7CFF;
            }
            
        }
    }

    

    .st-checkHandle{
        text-align: center;
        margin: 30px 20px 20px;
        button{
            width: 300px;
            height: 40px;
            background: #3B7CFF;
            border-radius: 6px;
        }
        .st-checkHandle-tips{
            font-size: 14px;
            color: #666;
            margin-top: 20px;
            i{
                font-size: 16px;
                border-radius: 50%;
                color: #3B7CFF;
            }
        }
    }

    
    .pub-dis{
        cursor: no-drop!important;
    }
    .pub-dis:hover{
        color: #39475B!important;
    }


    // new scheduled payment
    .new-info-wrapper{
        .st-ed-head{
            display: flex;
            background: #F8F9FB;
            margin-top: 20px;
            height: 50px;
            overflow: hidden;
            >div{
                flex: 1;
                line-height: 50px;
                text-align: center;
                span{
                    font-size: 14px;
                    color: #39475B;
                }
                i{
                    color: #FE5959;
                    font-size: 18px;
                    display: inline-block;
                    height: 20px;
                }
            }
        }
        .st-edit-item:nth-child(odd){
            background: #F8F9FB;
            & /deep/ .el-input__inner{
                background: #F8F9FB;
            }
        }
        .st-edit-item:nth-child(even){
            background: #FCFDFF;
            & /deep/ .el-input__inner{
                background: #FCFDFF;
            }
        }
        .st-oparate{
            height: 50px;
            display: flex;
            align-items: center;
            .st-oparate-col{
                flex: 1;
                & /deep/ .el-date-editor .el-input__inner,.el-date-editor.el-input{
                    width: 100%;
                }
                & /deep/ input{
                    text-align: center;
                    border: none;
                    padding: 0;
                }
                & /deep/ input[type=number]::-webkit-inner-spin-button,
                & /deep/ input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .st-icon-edit{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background-position: -377px -91px;
                    cursor: pointer;
                }
                .st-icon-del{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background-position: -377px -168px;
                    margin:0 10px;
                    cursor: pointer;
                }
                & /deep/ .el-input__prefix{
                    display: none;
                }
                
            }
            .st-oparate-btn{
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    font-size: 13px;
                    color: #39475B;
                    cursor: pointer;
                }
                i:hover{
                    color:#3B7CFF;
                }
                i:nth-child(2) {
                    margin:0 10px;
                }
            }
        }
        .fl-btn-wrapper{
            display: flex;
            justify-content: center;
            margin-top: 50px;
            margin-bottom: 30px;
            .el-button{
                font-size: 14px;
                padding: 10px 25px;
            }
            .fl-btn-cancel button{
                color: #8392A7;
                background: #F9FAFC;
                border: 1px solid #AEB9CA;
            }
            .fl-btn-save button{
                color: #FFFFFF;
                background: #3B7CFF;
                margin-left: 20px;
            }
        } 
    }

}

</style>