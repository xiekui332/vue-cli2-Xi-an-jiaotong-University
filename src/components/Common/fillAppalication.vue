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
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                            <div class="fl-L">
                                <span class="fl-L-title">采购名称：</span>
                                <el-input class="fl-L-input" v-model="baseName" placeholder="默认项目编码+项目名称"></el-input>
                            </div>
                            <div class="fl-L">
                                <p class="fl-L-title">
                                    <span>货物安装是否涉及开挖室内地面或改变房屋结构：</span>
                                    <span>若有，请提供规划与基建管理中心审批意见书</span>
                                </p>
                                <div class=" fl-L-radio">
                                    <el-radio v-model="radio" label="1">是</el-radio>
                                    <el-radio v-model="radio" label="2">否</el-radio>
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
                                    <el-input class="fl-L-input" v-model="i.content" placeholder="请输入内容" :disabled="i.disabled" maxlength="50"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.number" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.part" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.money" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <i class="pub-css fl-icon-edit" @click="handleListEdit('make', ind)"></i>
                                    <i class="pub-css fl-icon-del" @click="handleListDel('make', ind)"></i>
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
                                    <el-input class="fl-L-input" v-model="i.supName" placeholder="请输入内容" :disabled="i.disabled" maxlength="50"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.supContry" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.supMan" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.supTell" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <el-input class="fl-L-input" v-model="i.supEmail" placeholder="请输入内容" :disabled="i.disabled"></el-input>
                                </div>
                                <div>
                                    <i class="pub-css fl-icon-edit" @click="handleListEdit('supllier', ind)"></i>
                                    <i class="pub-css fl-icon-del" @click="handleListDel('supllier', ind)"></i>
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
                            <div class="fl-basis-title">调研情况：</div>
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
                        <p class="fl-matters-head">如您申请采购的是进口科教用品，请阅读并确认以下事宜：</p>
                        <p class="fl-matters-list" v-for="(i, ind) in mattersArr" :key="ind">{{ind + 1 }}<span class="fl-matters">{{i.txt}}</span> </p>
                    </div>

                    <el-divider></el-divider>

                    <div class="fl-item fl-item-agreement">
                        <div class="fl-item-head">
                            <span class="pub-family">项目负责人意见</span>
                        </div>
                        <p class="fl-check-title">我单位承诺，该采购项目安置地点（货物类）和购置经费均已落实</p>
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

            <div v-else>
                <Success @handleDialog='handleDialog' :hasSuccessStatus='hasSuccessStatus' />
            </div>
            
        </el-dialog>

        
    </div>
</template>

<script>
import Success from '@/components/Common/Success'
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
                    txt:'项目单位应保证进口Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget'
                },
                {
                    txt:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX法律责任。'
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
            hasSuccessStatus:true
        }
    },
    methods:{
        handleAddList(type) {
            if(type === 'make') {
                let obj = {
                    content:'',
                    number:'',
                    part:'',
                    money:'',
                    disabled:true
                }
                if(this.listArr.length < 10) {
                    this.listArr.push(obj)
                }
            }else if(type === 'supllier'){
                let obj = {
                    supName:'',
                    supContry:'',
                    supMan:'',
                    supTell:'',
                    supEmail:'',
                    disabled:true
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
        handleListDel(type, ind) {
            if(type === 'make') {
                this.listArr.splice(ind, 1)
            }else if(type === 'supllier') {
                this.listArr2.splice(ind, 1)
            }
            
        },
        handleDialog(type) {
            if(type === 'cancel') {
                this.exchangeFill = false
                this.fill = true
                this.$emit('handleFillApplication', 'close')
            }else if(type === 'save') {
                // this.exchangeFill = false
                this.fill = false
                this.success = true
                this.dialogWid = '40%'
                this.marTop = '20vh'
                this.hasNewClass = true
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
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    watch:{
        fillStatus(params) {
            this.exchangeFill = params
        },
        hasLoad(params) {
            this.exchangeLoad = params
            this.handleLoadStatus(params)
        }
    }
}
</script>



<style lang="less" scoped>
    @import url('./less/fillAppalication.less'); // 分号要写，不然会报错
</style>