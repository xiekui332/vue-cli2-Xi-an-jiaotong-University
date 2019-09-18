<template>
    <div id="sh-wrapper">
        <proInfoHead />

        <div class="sh-node-content">
            <div class="sh-node-left">
                <el-collapse v-model="activeName" accordion @change='handleActiveName()'>
                    <el-collapse-item name="1">
                        <template slot="title">
                           <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <i class="sh-node-icon pub-css sh-node-finish"></i>
                                        <el-dropdown trigger="click">
                                            <span class="pub-family el-dropdown-link">
                                                立项准备<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="" @click.native="handleLookNode('1', 0, 4, 'lxbox')">立项申请</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('1', 1, 5, 'lxbox')">立项论证</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <a class="sh-change-padding" href="javascript:;" @click.stop.prevent="handleLook('node')">节点流程</a>
                                        <div @click="handleLook('rotate')">
                                            <!-- <img src="../../assets/img/more-L.png" :class="activeName == 1?'pj-transform':''" ref="transform" alt=""> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="sh-node-wrapper" ref="lxbox">
                            <div class="sh-file-box">
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="yfkList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="expectTime"  
                                                label="计划付款时间"
                                                width="180">
                                            </el-table-column>
                                            <el-table-column
                                                prop="payRatio"
                                                label="计划付款%"
                                                width="180">
                                            </el-table-column>
                                            <el-table-column
                                                prop="payMoney"
                                                label="计划付款金额">
                                            </el-table-column>
                                            <el-table-column
                                                prop="remark"
                                                label="备注">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>                
                                </div>
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="lxzbList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>   
                                </div>
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="lxzbList2"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="其他资料"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>   
                                </div>
                            </div>

                            <div class="sh-file-box">
                                <div class="sh-file-list">
                                        <el-table
                                        :data="lxlzList"
                                        style="width: 100%">
                                        <el-table-column
                                            prop="attachName"  
                                            label="资料附件"
                                            width="280">
                                        </el-table-column>
                                        <el-table-column
                                            prop="createTime"
                                            label="操作时间"
                                            width="200">
                                        </el-table-column>
                                        <el-table-column
                                            prop="createUserName"
                                            label="操作人">
                                        </el-table-column>
                                        </el-table>                                  
                                </div>   
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template slot="title">
                            <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <i class="sh-node-icon">2</i>
                                        <el-dropdown trigger="click">
                                            <span class="pub-family el-dropdown-link">
                                                项目采购<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="" @click.native="handleLookNode('2', 0, 6, 'cgbox')">需求论证</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('2', 1, 7, 'cgbox')">采购申请</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('2', 2, 8, 'cgbox')">采购会</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('2', 3, 9, 'cgbox')">签订合同</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>

                                    </div>
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <div @click="handleLook('rotate')">
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="sh-node-wrapper" ref="cgbox">
                            <!-- 需求论证-->
                            <div class="sh-file-box">
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="xqlzList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>   
                                </div>
                            </div>
                            <!--采购申请 -->
                            <div class="sh-file-box">
                                <div class="sh-file-item">                          
                                    <div class="sh-file-list" @click="handleCgLook()">   
                                        <span class="sh-title-blue">采购申请表：</span>
                                        <span class="sh-title-blue">{{cgname}}</span>     
                                    </div>
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="cgsqList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div> 
                                    <div class="sh-file-list">
                                                <el-table
                                                :data="cgsqList1"
                                                style="width: 100%">
                                                <el-table-column
                                                    prop="attachName"  
                                                    label="其他资料"
                                                    width="280">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="createTime"
                                                    label="操作时间"
                                                    width="200">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="createUserName"
                                                    label="操作人">
                                                </el-table-column>
                                                </el-table>                                  
                                    </div>   
                                    <div class="sh-file-list">
                                                <el-table
                                                :data="cgsqList2"
                                                style="width: 100%">
                                                <el-table-column
                                                    prop="attachName"  
                                                    label="审批资料"
                                                    width="280">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="createTime"
                                                    label="操作时间"
                                                    width="200">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="createUserName"
                                                    label="操作人">
                                                </el-table-column>
                                                </el-table>                                  
                                    </div>   
                                </div>
                            </div>
                            <!--采购会 -->
                            <div class="sh-file-box">
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="cghList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>  
                                </div>
                            </div>
                             <!--签定合同 -->
                            <div class="sh-file-box">
                                <div class="sh-file-item">                                     
                                    <div class="sh-file-list">
                                                <el-table
                                                :data="cgfkList"
                                                style="width: 100%">
                                                <el-table-column
                                                    prop="createTime"  
                                                    label="付款时间"
                                                    width="160">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="payMoney"
                                                    label="付款金额（万元）"
                                                    width="150">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="payRatio"
                                                    label="付款比例%"
                                                    width="120">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="surplusMoney"
                                                    label="剩余付款金额(万)"
                                                    width="150">
                                                </el-table-column>
                                                <el-table-column
                                                    prop="remark"
                                                    label="备注"
                                                    >
                                                </el-table-column>
                                                </el-table>                                  
                                    </div>                               
                                    <div class="pl-info pl-sign">
                                        <p class="pl-info-title pub-family">&nbsp;&nbsp;&nbsp;&nbsp;信息填写(合同信息)</p>
                                        <div class="pl-item-wrapper">
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>供应商：</span>
                                                <el-input class="pl-input-box" v-model="gys" disabled></el-input>
                                            </div>
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>中标金额：</span>
                                                <el-input class="pl-input-box" v-model="zbje" disabled><template slot="append">万元</template></el-input>
                                            </div>
                                        </div>
                                        <div class="pl-item-wrapper">
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>中标服务费：</span>
                                                <el-radio v-model="zjfwf" label="需要">需要</el-radio>
                                                <el-radio v-model="zjfwf" label="不需要">不需要</el-radio>
                                            </div>
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i></i>服务费金额：</span>
                                                <el-input class="pl-input-box" v-model="fwfje" disabled><template slot="append">元</template></el-input>
                                            </div>
                                        </div>
                                        <div class="pl-item-wrapper">
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>合同签订日期：</span>
                                                <el-input class="pl-input-box" v-model="htqdrq" disabled></el-input>
                                            </div>
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>维保期：</span>
                                                <el-input class="pl-input-box" v-model="zbq" disabled><template slot="append">年</template></el-input>
                                            </div>
                                        </div>        
                                        <div class="pl-item-wrapper">
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>质保金：</span>
                                                <el-input class="pl-input-box" v-model="zbj" disabled><template slot="append">%</template></el-input>
                                            </div>
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i>*</i>质保金额：</span>
                                                <el-input class="pl-input-box" v-model="zbaoje" disabled><template slot="append">万元</template></el-input>
                                            </div>
                                        </div>
                                        <div class="pl-item-wrapper">
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i></i>招标编号：</span>
                                                <el-input class="pl-input-box" v-model="zbbh" disabled></el-input>
                                            </div>
                                            <div class="pl-input">
                                                <span class="pl-input-name"><i></i>合同编号：</span>
                                                <el-input class="pl-input-box" v-model="htbh" disabled></el-input>
                                            </div>
                                        </div>
                                    </div>                    
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="qdhtList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>   

                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title">
                            <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <i class="sh-node-icon">3</i>
                                        <!-- <span class="pub-family">项目执行</span> -->

                                        <el-dropdown trigger="click">
                                            <span class="pub-family el-dropdown-link">
                                                项目执行<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="" @click.native="handleLookNode('3', 0, 10, 'zxbox')">执行资料</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>

                                    </div>
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <div @click="handleLook('rotate')">
                                            <!-- <img src="../../assets/img/more-L.png" :class="activeName == 3?'pj-transform':''" ref="transform" alt=""> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="sh-node-wrapper" ref="zxbox">
                            <div class="sh-file-box">
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                            :data="xmzxList"
                                            style="width: 100%">
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

            <div class="sh-node-right">
                <div v-if="!extableType">
                    <div class="sh-node-operate">
                        <el-radio v-model="radio" label="1">同意</el-radio>
                        <el-radio v-model="radio" label="2">驳回</el-radio>
                    </div>
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    show-word-limit
                    class="sh-node-textarea"
                    :autosize="{ minRows: 10}"
                    >
                    </el-input>
                    <div class="sh-node-tips">
                        <div>
                            <el-upload
                                class="upload-demo"
                                :action= getuploadUrl1
                                :before-upload="handleBefore"
                                :http-request="customRequest"
                                :on-remove="handleDel"
                                :on-exceed="handleExc"
                                :limit="1"
                                :file-list="fileList"
                                accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
                                >
                                <el-button size="small" type="primary">
                                    <i class="pub-css st-upload-icon"></i>
                                </el-button>
                            </el-upload>
                        </div>
                        <span>如需上传资料请点击</span> 
                    </div>
                    <el-row class="sh-node-btn">
                        <el-button type="primary" @click="handleCancel()">取消</el-button>
                        <el-button type="primary" :disabled="extableType" @click="handleComfire()">确认审批</el-button>
                    </el-row>
                </div>

                <div v-else>
                    <p class="pub-family sh-node-agree">审批意见: 同意</p>
                    <p class="sh-node-agree-reason">符合学校立项标准，同意！</p>
                    <p class="sh-node-agree-file">本地文件1.pdf</p>
                </div>
            </div>
        </div>

        <el-dialog
            class="st-dialog"
            :visible.sync="dialogVisible"
            :show-close=false
            width="60%"
            >
            <p class="st-steps-title pub-family">阶段进行中</p>
            <div class="st-steps-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.spName?i.spName:''}}</p>
            </div>
            <el-steps :active="steps" 
                align-center
                process-status='wait'
            
            >
                <el-step  v-for="(i, ind) in hasNodeInfo" :key="ind" :title="i.userName?i.userName:'' + ' ' + i.time?i.time:''" :description="i.state?i.state:''"></el-step>
            </el-steps>  
            <div class="st-steps-name st-steps-bot-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.remark?i.remark:''}}</p>
            </div> 
        </el-dialog>

        <div id="fl-wrapper">
            <el-dialog
                :class="'ma-dialog'"
                :visible.sync='newtemplate'
                :show-close='true'
                :close-on-click-modal=true 
                :close-on-press-escape=true
                @close='handleClose'
                width='60%'
                title="院处采购申请单"
                >
                <el-divider></el-divider>
                    <div class="ma-dia-content">
                        <div class="ma-item-wrapper">
                        <div>
                            <div id="printFill">
                                <div class="fl-item fl-item-basic">
                                    <p class="pub-family fl-item-basic-title">基本信息</p>
                                    <div class="fl-item-basic-block">
                                        <div class="fl-L">
                                            <span class="fl-L-title">采购申请编号：</span>
                                            <span>{{purchaseNo}}</span>
                                        </div>
                                        <div class="fl-L">
                                            <span>填报日期：</span>
                                            <span>{{createTime}}</span>
                                        </div>
                                        <div class="fl-L">
                                            <span class="fl-L-title">采购名称：</span>
                                            <span  >{{cgname}}</span>
                                        </div>
                                        <div class="fl-L" style="display:flex;">
                                            <div class="fl-L-title" style="display:grid;" >
                                                <span>货物安装是否涉及开挖室内地面或改变房屋结构：</span>
                                                <span style="font-size:12px;">若有，请提供规划与基建管理中心审批意见书</span>
                                            </div>
                                            <div class=" fl-L-radio" style="margin-left：20px;">
                                                <el-radio disabled v-model="isChangeStructure" label="是">是</el-radio>
                                                <el-radio disabled v-model="isChangeStructure" label="否">否</el-radio>                                   
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <el-divider></el-divider>
                                
                                <div class="fl-item fl-item-make">   
                                    <div class="fl-item-head">
                                        <span class="pub-family">采购清单</span>
                                    </div>

                                    <div class="fl-item-con">
                                        <el-table
                                        :data="cgxqList"
                                        style="width: 100%">
                                            <el-table-column
                                                prop="name"  
                                                label="采购内容"
                                                width="180">
                                            </el-table-column>
                                            <el-table-column
                                                prop="cgNumber"
                                                label="数量"
                                                width="80">
                                            </el-table-column>
                                            <el-table-column
                                                prop="company"
                                                label="单位"
                                                width="180">
                                            </el-table-column>
                                            <el-table-column
                                                prop="planMoney"
                                                label="计划金额（万元）">
                                            </el-table-column>
                                        </el-table>  
                                    </div>
                                </div>

                                <el-divider></el-divider>

                                <div class="fl-item fl-item-supllier">
                                    <div class="fl-item-head">
                                        <span class="pub-family">供应商信息</span>
                                    </div>
                                    <div class="fl-item-con">
                                    <el-table
                                        :data="supperList"
                                        style="width: 100%">
                                        <el-table-column
                                            prop="name"  
                                            label="推荐供应商/代理商"
                                            width="150">
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="品牌/国别"
                                            width="140">
                                        </el-table-column>
                                        <el-table-column
                                            prop="legalPerson"
                                            label="联系人"
                                            width="120">
                                        </el-table-column>
                                        <el-table-column
                                            prop="phone "
                                            label="手机号码"
                                            width="140">
                                        </el-table-column>
                                        <el-table-column
                                            prop="email"
                                            label="E-mail">
                                        </el-table-column>
                                    </el-table> 
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
                                            v-model="cgtxt1">
                                        </el-input>
                                    </div>

                                    <div class="fl-basis-block">
                                        <div class="fl-basis-title">技术指标：</div>
                                        <el-input
                                            type="textarea"
                                            :rows="4"
                                            maxlength="10000字"
                                            v-model="cgtxt2">
                                        </el-input>
                                    </div>
                                </div>

                                <el-divider></el-divider>

                                <div class="fl-item">
                                    <p class="fl-matters-head">如您申请采购的是进口科教用品，请阅读并确认以下事宜：</p>
                                    <p class="fl-matters-list">1. 项目单位应保证进口科教用品来源合法。</p>
                                    <p class="fl-matters-list">2. 进口科教用品免税有严格的规定，并不是所有科教用品都可以免税，项目单位应预留资金以备不能免税时缴纳进口</p>
                                    <p class="fl-matters-list">关税及增值税。进口过程的汇率风险及产生的一切费用由项目单位承担。</p>
                                    <p class="fl-matters-list">3. 外贸合同一经签订即具有法律效力，项目单位不得以免税未批准或经费不充足为由撤销外贸合同，否则责任自负，</p>
                                    <p class="fl-matters-list">但项目单位与供货商事先有约定的除外。</p>
                                    <p class="fl-matters-list">4. 进口科教用品采购周期较长，请项目单位事先做好充分准备并积极配合采购与招标管理办公室工作，以免耽误您的</p>
                                    <p class="fl-matters-list">使用时间。项目单位可凭合同号查询进口业务的进展情况。</p>
                                    <p class="fl-matters-list">5. 在海关监管的五年期间内，使用单位不得将进口免税科教用品擅自转让、移作他用或者进行其他处置（如出租、调</p>
                                    <p class="fl-matters-list">换、改装等）。进口免税科教用品须放置于免税申报时的使用地点，只能用于申报时所列的特定用途。如擅自改变特定</p>
                                    <p class="fl-matters-list">用途、放置地点的，将视情节依法追究责任人的责任乃至法律责任。</p>
                                </div>

                                <el-divider></el-divider>

                                <div class="fl-item fl-item-agreement">
                                    <div class="fl-item-head">
                                        <span class="pub-family">项目负责人意见</span>
                                    </div>
                                    <p class="fl-check-title">我单位承诺，该采购项目安置地点（货物类）和购置经费均已落实</p>
                                    <el-checkbox class="fl-check" v-model="isAgree">同意购置</el-checkbox>
                                </div>
                            </div>
                        </div>
                        </div>
                        
                        <div style="text-align: center;margin-top: 30px;">
                            <el-row class="ma-btn-block" >
                                <el-button type="" round @click="handleClose()">关闭</el-button>
                            </el-row>
                        </div>
                    </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import proInfoHead from '@/components/Common/ProInfoHead'
export default {
    props:[
        'type',
        'proInfo',
        'rowInfo',
        'handleChangeDetail',
        "tableType"
    ],
    components:{
        proInfoHead
    },
    data() {
        return {
            activeName: '',         // 绑定值需为 String 否则为 Array
            radio:'1',
            isClear:false,
            textarea:'',
            title:'上传文件',
            dialogVisible:false,
            newtemplate:false,
            roleArr:[
                {
                    name:'创立项目'
                },
                {
                    name:'部门主管'
                },
                {
                    name:'中心副主任'
                },
                {
                    name:'采购工作小组组长'
                }
            ],
            steps:0,
            exproInfo:{},
            hasNode:false,
            hasNodeInfo:[],
            yfkList:[],
            lxzbList:[],
            lxzbList2:[],
            cgsqList:[],
            cgsqList1:[],
            cgsqList2:[],
            xqlzList:[],
            cghList:[],
            qdhtList:[],
            xmzxList:[],
            cgmsg:{},
            cgname:'',
            cgxqList:[],
            supperList:[],
            isAgree:false,
            cgtxt2:'',
            cgtxt1:'',
            purchaseNo:'',
            createTime:'',
            isChangeStructure:'',
            cgfkList:[],
            htbh:"",
            zbbh:'',
            zbje:'', zbj:'', zbq:'', htqdrq:'', fwfje:'', zjfwf:'', zbaoje:'', gys:'',
            exRowInfo:'',
            fileName:'',
            fileType:'',
            fileUrl:'',
            extableType:'',
            lxlzList:[],
            getuploadUrl1:'',
            fileList:[]
        }
    },
    methods:{
        handleLook(type) {
            if(type === 'rotate') {
                
            }else if(type === 'node'){
                if(!this.hasNode){
                    this.$message.info('本节点无审批流程')
                }else{
                    this.dialogVisible = true
                }
            }
        },

        handleActiveName() {
            // console.log(this.activeName)
            
        },

        handleComfire() {            
            var rowmsg=this.exRowInfo;
            if(this.radio==2){
                if(!this.textarea){
                  return this.$message("驳回原因不能为空") ;
                }
            }
           if(rowmsg.projectNode=="6a3c8fb95ebe4a4696cd13e2051473b4"||rowmsg.projectNode=="2798118bf3ca47439750b4e4acdd7735"||rowmsg.projectNode=="a2414bacf75144098799a178f0ff2a41"){
                var param={fileName:this.fileName,fileUrl:this.fileUrl,fileType:this.fileType,pid:rowmsg.id,nodeId:rowmsg.projectNode,pl:rowmsg.pl,type:rowmsg.approveType,spState:this.radio,remark:this.textarea};
     
            this.$http.post("/api/project/confirmApproval",param).then(res =>{
                    if(res.code=="00000"){
                        this.$message(res.message);
                        // this.$message({
                        //     type:'success',
                        //     dangerouslyUseHTMLString: true,
                        //     message:'<p style="font-size:14px;color:#666666;margin:0 0 10px 0;">已成功！</p> <p style="font-size:13px;color:#999999;">下一审批节点：XXXXXX，请及时跟进审核状态。如有问题，请联系审核人员或联系8266-XXXX。</p><p></p>',
                        //     showClose:true
                        // })
                        this.$emit('handleChangeDetail', false)
                    }else{
                        this.$message(res.message)
                    }
                })
           }


        },

        handleCancel() {
            this.$emit('handleChangeDetail', false)
        },

        handleHasNode(){
            let params = {
                id:this.exproInfo.id,
                nodeId:this.exproInfo.projectNode
            }
            this.$http.post('/api/project/getExamineList', params)
            .then((res) => {
                // res = {
                //     "code": "00000",
                //     "data": [
                //         {
                //             "spName":"主管部门",//审批名称
                //             "time":"2019-01-12",//时间
                //             "remark": '小菜审批',
                //             "state": 1,//状态0：待审核，1：审核通过；2：审核被驳回，3：重新提交待审核
                //             "userName": "谢奎" //审核人姓名
                //         },
                //         {   
                //             "spName":"主管部门",
                //             "time":"2019-01-12",
                //             "remark": '小菜审批',
                //             "state": 1,
                //             "userName": "谢奎" 
                //         },
                //         {
                //             "spName":"主管部门",
                //             "time":"2019-01-12",
                //             "remark": '小菜审批',
                //             "state": 2,
                //             "userName": "谢奎" 
                //         },
                //         {
                //             "spName":"主管部门"
                //         },
                //         {
                //             "spName":"主管部门"
                //         }
                //     ],
                //     "message": "操作成功"
                // }
                if(res.message == '本节点无审批流程'){
                    this.hasNode = false
                }else{
                    this.hasNode = true
                    for(let i = 0; i < res.data.length; i ++) {
                        if(res.data[i].state == 0) {
                            res.data[i].state = '待审核'
                        }else if(res.data[i].state == 1) {
                            res.data[i].state = '审核通过'
                            this.steps = i + 1
                        }else if(res.data[i].state == 2) {
                            res.data[i].state = '审核被驳回'
                        }else if(res.data[i].state == 3) {
                            res.data[i].state = '重新提交待审核'
                        }
                    }
                    this.hasNodeInfo = res.data
                    
                }
            })
            
        },
        handleClose(){
            this.newtemplate=false;
        },
        handleCgLook(){
            this.newtemplate=true; 
        },
        getProjectStatusMsg(){
            let params = { id:this.exproInfo.id}
            this.$http.post('/api/project/getSpProjectDetails', params).then(res=>{
                if(res.code=="00000"){
                    var dataList=res.data;
                    //立项-预付款
                    var yfkMsg=(dataList[0].list)[0].yfkList;
                    this.yfkList=[];
                    if(yfkMsg && yfkMsg.length) {
                        for(var i=0;i<yfkMsg.length;i++){//立项-预付款
                            var obj={};
                            obj.expectTime=yfkMsg[i].expectTime.slice(0, 10);
                            obj.payRatio=yfkMsg[i].payRatio;
                            obj.payMoney=yfkMsg[i].payMoney;
                            obj.remark=yfkMsg[i].remark;
                            this.yfkList.push(obj);
                        }
                    }
                    
                    //立项-立项准备资料模板
                    var lxzbMsg=(dataList[0].list)[0].zlList;
                    this.lxzbList=[];
                    for(var i=0;i<lxzbMsg.length;i++){
                        var obj={};
                        obj.createTime=lxzbMsg[i].createTime
                        obj.createUserName=lxzbMsg[i].createUserName;
                        obj.attachName=lxzbMsg[i].attachName;
                        this.lxzbList.push(obj);
                    }

                    //立项-立项准备其他资料
                    var lxzbqtMsg=(dataList[0].list)[0].qtList;
                    this.lxzbList2=[];
                    for(var i=0;i<lxzbqtMsg.length;i++){//立项-资料
                        var obj={};
                        obj.createTime=lxzbqtMsg[i].createTime
                        obj.createUserName=lxzbqtMsg[i].createUserName;
                        obj.attachName=lxzbqtMsg[i].attachName;
                        this.lxzbList2.push(obj);
                    }

                    //立项-立项论证资料
                    let lxlzListOne = (dataList[0].list)[1].zlList
                    if(this.lxlzList) {
                        for(let i = 0; i < lxlzListOne.length; i ++) {
                            let obj = {}
                            obj.createTime=lxlzListOne[i].createTime
                            obj.createUserName=lxlzListOne[i].createUserName;
                            obj.attachName=lxlzListOne[i].attachName;
                            this.lxlzList.push(obj);
                        }
                    }


                    //项目采购
                    var xmcgMsg=(dataList[1].list);
                    this.xqlzList=[];
                    //需求论证
                    var xqlzzllist=xmcgMsg[0].zlList;
                    if(xqlzzllist.length>0){
                      for(var j=0;j<xqlzzllist.length; j++){
                        var obj={};
                        obj.createTime=xqlzzllist[j].createTime
                        obj.createUserName=xqlzzllist[j].createUserName;
                        obj.attachName=xqlzzllist[j].attachName;
                        this.xqlzList.push(obj);
                      }
                    }
                    //采购申请
                    var cgsqzllist=xmcgMsg[1].zlList;
                    var cgsqqtlist=xmcgMsg[1].qtList;
                    var cgsqsplist=xmcgMsg[1].spList;
                    this.cgsqList=[];
                    this.cgsqList1=[];
                    this.cgsqList2=[];
                    if(cgsqzllist.length>0){
                        for(var j=0;j<cgsqzllist.length;j++){
                            var obj={};
                            obj.createTime=cgsqzllist[j].createTime
                            obj.createUserName=cgsqzllist[j].createUserName;
                            obj.attachName=cgsqzllist[j].attachName;
                            this.cgsqList.push(obj); 
                        }
                    }
                    if(cgsqqtlist.length>0){
                        for(var j=0;j<cgsqqtlist.length;j++){
                            var obj={};
                            obj.createTime=cgsqqtlist[j].createTime
                            obj.createUserName=cgsqqtlist[j].createUserName;
                            obj.attachName=cgsqqtlist[j].attachName;
                            this.cgsqList1.push(obj); 
                        }
                    }
                    if(cgsqsplist.length>0){
                        for(var j=0;j<cgsqsplist.length;j++){
                            var obj={};
                            obj.createTime=cgsqsplist[j].createTime
                            obj.createUserName=cgsqsplist[j].createUserName;
                            obj.attachName=cgsqsplist[j].attachName;
                            this.cgsqList2.push(obj); 
                        }
                    }
                    //采购详情
                    var cgmsg=(dataList[1].list)[1].cgMsg;
                    if(cgmsg){
                        this.cgname=cgmsg.purchaseName;
                        this.purchaseNo=cgmsg.purchaseNo;
                        this.cgtxt2=cgmsg.technicalIndicators;
                        this.cgtxt1=cgmsg.investigation;
                        this.createTime=cgmsg.createTime.slice(0,10);
                        if(cgmsg.isChangeStructure=="1"){
                              this.isChangeStructure='是';
                        }else{
                            this.isChangeStructure='否';
                        }
                        if(cgmsg.isAgree==1){
                        this.isAgree=false;
                        }else{
                            this.isAgree=true;
                        }
                    }
                    //采购列表
                    var cglists=(dataList[1].list)[1].cgList;
                    if(cglists && cglists.length>0){
                        this.cgxqList=[];
                        for(var j=0;j<cglists.length;j++){
                            var obj={};
                            obj.cgNumber=cglists[j].cgNumber
                            obj.company=cglists[j].company;
                            obj.name=cglists[j].name;
                            obj.planMoney=cglists[j].planMoney;
                            this.cgxqList.push(obj);
                        }
                    }
                    //供应商列表
                    var splist=(dataList[1].list)[1].gysList;
                    if(splist && splist.length>0){
                        this.supperList=[];
                        for(var j=0;j<splist.length;j++){
                            var obj={};
                            obj.address=splist[j].address
                            obj.email=splist[j].email;
                            obj.legalPerson=splist[j].legalPerson;
                            obj.name=splist[j].name;
                            obj.phone=splist[j].phone;
                            this.supperList.push(obj);
                        }
                    }
                    //采购会-附件
                    this.cghList=[];
                    var cghzllist=(dataList[1].list)[2].zlList;
                    if(cghzllist.length>0){
                        for(var j=0;j<cghzllist.length;j++){
                            var obj={};
                            obj.createTime=cghzllist[j].createTime
                            obj.createUserName=cghzllist[j].createUserName;
                            obj.attachName=cghzllist[j].attachName;
                            this.cghList.push(obj); 
                        }
                    }
                    //采购合同
                    var cgfklist= (dataList[1].list)[3].fkList;
                    this.cgfkList=[];
                    this.qdhtList=[];
                    var qdhtzllist=(dataList[1].list)[3].zlList; 
                    if(cgfklist && cgfklist.length>0){
                        this.cgfkList=[];
                        for(var j=0;j<cgfklist.length;j++){
                            var obj={};
                            if(cgfklist[j].createTime){
                                 obj.createTime=cgfklist[j].createTime.slice(0,10);
                            }else{
                                 obj.createTime=cgfklist[j].createTime;
                            }
                            obj.payMoney=cgfklist[j].payMoney;
                            obj.payRatio=cgfklist[j].payRatio;
                            obj.surplusMoney=cgfklist[j].surplusMoney;
                            obj.remark=cgfklist[j].remark;
                            this.cgfkList.push(obj);
                        }
                    } 
                    var htmsg=(dataList[1].list)[3].htMsg; 
                    if(htmsg){
                        this.htbh=htmsg.contractNo;
                        this.zbbh=htmsg.biddinfNo;
                        this.zbje=htmsg.zbiaoJe;
                        this.zbj=htmsg.RETENTION_MONEY;
                        this.zbq=htmsg.repairPeriod;
                        if(htmsg.contractTime){
                            this.htqdrq=htmsg.contractTime.slice(0,10);
                        }else{
                            this.htqdrq=htmsg.contractTime;
                        }
                        this.fwfje=htmsg.serviceFee;
                        if(htmsg.isServiceFee==0){
                            this.zjfwf="不需要";
                        }else{
                             this.zjfwf="需要";
                        }
                        this.zbaoje=htmsg.zbaoje;
                        this.gys=htmsg.supplier;

                    }
                    //签订合同-资料列表
                    if(qdhtzllist.length>0){
                        for(var j=0;j<qdhtzllist.length;j++){
                            var obj={};
                            obj.createTime=qdhtzllist[j].createTime
                            obj.createUserName=qdhtzllist[j].createUserName;
                            obj.attachName=qdhtzllist[j].attachName;
                            this.qdhtList.push(obj); 
                        }
                    }
                    //项目执行
                    var xmzxMsg=(dataList[2].list);
                    if(xmzxMsg.length>0){
                        this.xmzxList=[];
                        for(var i=0;i<xmzxMsg.length;i++){
                        var zxlist=xmzxMsg[i].zlList;
                        for(var j=0;j<zxlist.length; j++){
                                var obj={};
                                obj.createTime=zxlist[j].createTime
                                obj.createUserName=zxlist[j].createUserName;
                                obj.attachName=zxlist[j].attachName;
                            this.xmzxList.push(obj);
                        }
                        }
                    }

                }
            })
        },

        handleSellectNode() {
            // console.log(2)
        },

        handleLookNode(type, index, number, nodeName) {
            this.activeName = type
            let elCollection = ""
            if(nodeName == "lxbox") {
                elCollection = this.$refs.lxbox.getElementsByClassName('sh-file-box')
            }else if(nodeName == "cgbox") {
                elCollection = this.$refs.cgbox.getElementsByClassName('sh-file-box')
            }else if(nodeName == "zxbox") {
                elCollection = this.$refs.zxbox.getElementsByClassName('sh-file-box')
            }
            for(let i = 0; i < elCollection.length; i ++) {
                elCollection[i].style.display = "none"
            }
            elCollection[index].style.display = "block"
        },
        

        handleDel(file, fileList) {
            this.fileName="";
            this.fileUrl="";
            this.fileType="";
        },
        
        handleExc(files, fileList) {
            this.$message.warning(`如需更换文件请先删除后操作`);
        },

        // change upload
        handleBefore(file) {
            this.files = file
            if(this.fileList.length) {
                this.$message.warning(`如需更换文件请先删除后操作`);
                return false
            }
            
            
        },

        customRequest() {
            const formData = new FormData();
            
            formData.append('file',this.files);
            
            
            this.$http.post("/api/system/project/uploadAppdenix", formData)
            .then((res) => {
                if(res.code == "00000") {
                    this.$message({
                        type:'success',
                        message:res.message
                    })

                    this.fileName=res.data.fileName;
                    this.fileUrl=res.data.fileUrl;
                    this.fileType=res.data.fileType;
                    
                }else{
                    this.fileList = []
                    this.$message({
                        type:'error',
                        message:err.message
                    })
                }
            })
            .catch((err) => {
                this.fileList = []
                this.$message({
                    type:'error',
                    message:err.message
                })
            })
        }
    },
    watch:{
        '$route'(to, from){
            // console.log(to)
        }
    },
    mounted(){
        this.exproInfo = this.proInfo
        this.handleHasNode();
        this.getProjectStatusMsg();
        this.exRowInfo=this.rowInfo;
        if(this.tableType == "已审批") {
            this.extableType = true
        }else if(this.tableType == "待审批") {
            this.extableType = false
        }
         
    }
}
</script>

<style lang="less" scoped>
#sh-wrapper{

    & /deep/ textarea::placeholder{
        font-size: 12px;
    }
    .sh-node-content{
        display: flex;
        justify-content: flex-end;
        .sh-node-left{
            flex: 2;
            margin-right: 20px;
            .sh-node-item{
                width: 100%;
                .sh-node-item-head{
                    border-radius: 4px;
                    height: 54px;
                    display: flex;
                    justify-content: space-between;
                    .sh-node-box{
                        flex: 1;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        .sh-node-icon{
                            display: inline-block;
                            width: 20px;
                            height:20px;
                            background-color: #3B7CFF;
                            border-radius: 50%;
                            font-size: 12px;
                            color: #FFFFFF;
                            margin: 0 10px 0 20px;
                            text-align: center;
                            line-height: 20px;
                        }
                        .sh-node-finish{
                            background-position: -376px -50px;
                        }
                        img{
                            width: 10px;
                            margin: 0 20px;
                            transform-origin:center center;
                            transition:all .2s ease-in;
                        }
                        a{
                            font-size: 12px;
                            color: #3B7CFF;
                        }
                        .pj-transform{
                            display:inline-block;
                            transform-origin:center center;
                            transition:all .2s ease-in;
                            transform:rotate(-180deg)
                        }
                        .sh-change-padding{
                            padding-right: 10px;
                        }
                    }
                    .sh-node-box:nth-child(2){
                        justify-content: flex-end;
                    }
                }
            }
            & /deep/ .el-collapse-item__header{
                height: 35px;
                background: #EFF2F7;
                box-shadow: 0 2px 4px 0 #EFF2F7;
                
            }
            // add css
            & /deep/ .el-dropdown .el-button-group{
                background: #EFF2F7;
                line-height: auto;
            }


             & /deep/ .el-collapse-item{
                margin-bottom: 10px;
                box-shadow: 0 2px 4px 0 #EFF2F7;
             }
            & /deep/ .el-collapse-item__arrow{
                display: none;
            }
            .sh-file-box{
                display: none;
                padding: 20px;
                .sh-file-item{
                    box-shadow: 0 2px 4px 0 #EFF2F7;
                    margin-bottom:20px; 
                   >div{
                        height: auto;
                        line-height: 50px;
                        display: flex;
                        >span{
                            flex:1;
                            text-align: center;
                            font-size: 14px;
                            i{
                                cursor: pointer;
                                color:  #3B7CFF;
                                margin: 0 10px;  
                            }
                        }
                        
                   }
                   .sh-file-list{
                        >span{
                            font-size: 14px;
                            color: #8998AC;
                        }
                        .sh-title-blue{
                            color:  #3B7CFF;
                            cursor: pointer;
                        }
                        
                    }
                   >div:nth-child(odd){
                       background: #F8F9FB;
                   }
                   >div:nth-child(even){
                       background: #FCFDFF;
                   }
                    .sh-file-head{
                        
                    }
                    .pl-info-title{
                        font-size: 14px;
                        color: #3B4859;
                    }
                }

                .pl-sign{
                    display: block!important;
                    .pl-item-wrapper{
                        display: flex;
                        >.pl-input{
                            flex: 1;
                            display: flex;
                            justify-content: flex-start;
                            align-items:center;
                            .pl-input-name{
                                font-size: 14px;
                                color: #39475B;
                                display: inline-block;
                                min-width: 120px;
                                i{
                                    color: #FE5959;
                                    font-size: 18px;
                                    padding: 0 5px;
                                }
                            }
                            & /deep/ .el-input-group__append, .el-input-group__prepend{
                                width: 50px;
                                text-align: center;
                                padding: 0;
                            }
                        }
                        >.pl-input:nth-child(1){
                            margin-right: 5px;
                        }
                        >.pl-input:nth-child(2){
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
        .sh-node-right{
            width: 335px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #EFF2F7;
            border-radius: 4px;
            padding: 0 20px 20px;
            .sh-node-operate{
                padding: 30px 0px 10px;
            }
            & /deep/ .el-radio__input.is-checked .el-radio__inner{
                border-color: #3B7CFF;
                background: #3B7CFF;
            }
            .sh-node-textarea{
                display: block;
                margin: 0 auto;
            }
            .sh-node-tips{
                font-size: 14px;
                color: #8392A7;
                margin-top: 10px;  
                >div{
                    margin-bottom: 10px;  
                    & /deep/ .el-upload{
                        margin-left: -10px;
                    }
                    
                } 
                span{
                    // color: #3B7CFF;
                }
                .el-button--primary{
                    background: rgba(59, 124, 255, 0);
                    border: none;
                    padding: 6px 10px;
                }
                
                .st-upload-icon{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background-position: -10px -365px;
                    margin-top: 10px;
                }
            }
            .sh-node-btn{
                margin: 20px 0 10px;
                display: flex;
                button{
                    height: 36px;
                    font-size: 14px;
                    color: #8392A7;
                }
                button:nth-child(1){
                    width: 80px;
                    background: #F9FAFC;
                    border: 1px solid #AEB9CA;
                    border-radius: 4px;
                    margin-right: 30px;
                }
                button:nth-child(2){
                    flex:2;
                    background: #3B7CFF;
                    border-radius: 4px;
                    color: #FFFFFF;
                }
            }

            .sh-node-agree{
                font-size: 18px;
                color: #3B4859;
                letter-spacing: 0;
                margin: 42px 0 20px 10px;
            }
            .sh-node-agree-reason{
                font-size: 16px;
                color: #3B4859;
                letter-spacing: 0;
                margin-left: 10px;
            }
            .sh-node-agree-file{
                font-size: 14px;
                color: #3B7CFF;
                letter-spacing: 0;
                margin: 20px 0 10px 10px;
            }
        }
    }

    & /deep/ .el-collapse-item__content{
        padding-bottom: 0;
    }

    @import url('../../components/Common/less/commNode.less');
    
    .st-steps-bot-name p{
        font-size: 12px!important;
    }
    @import url('../../components/Common/less/fillAppalication.less');
    // dialog
    .ma-dialog{
        .el-dialog__header{
            font-size: 28px;
            color: #3B4859;
            letter-spacing: 0;
        }
    }
}
            
.el-dropdown-menu{
    padding: 0;
}
.el-dropdown-menu__item{
    font-size: 12px;
    padding-top: 0;
    padding-bottom: 0;
}
</style>