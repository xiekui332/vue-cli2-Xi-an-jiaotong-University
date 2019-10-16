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
                                        <i class="sh-node-icon pub-css">1</i>
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
                                        
                                        <div @click="handleLook('rotate')">

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
                                                min-width="100"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                prop="payRatio"
                                                label="计划付款%"
                                                min-width="100"
                                                >
                                            </el-table-column>
                                            <el-table-column
                                                prop="payMoney"
                                                label="计划付款金额(万元)"
                                                min-width="100">
                                            </el-table-column>
                                            <el-table-column
                                                prop="remark"
                                                label="备注"
                                                min-width="100">
                                            </el-table-column>
                                            </el-table>                                  
                                    </div>                
                                </div>
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="lxzbList"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料附件"
                                                width="280"
                                                show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                                prop="createTime"
                                                label="操作时间"
                                                width="200"
                                                show-overflow-tooltip>
                                            </el-table-column>
                                            <el-table-column
                                                prop="createUserName"
                                                label="操作人"
                                                show-overflow-tooltip>
                                            </el-table-column>
                                        </el-table>                                  
                                    </div>   
                                </div>
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                            <el-table
                                                :data="lxzbList2"
                                                style="width: 100%"
                                                @cell-click="handleCell"
                                                :cell-class-name="cell"
                                                >
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
                                        style="width: 100%"
                                        @cell-click="handleCell"
                                        :cell-class-name="cell">
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
                                        :data="lxlzList2"
                                        style="width: 100%"
                                        @cell-click="handleCell"
                                        :cell-class-name="cell">
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
                                                <el-dropdown-item icon="" @click.native="handleLookNode('2', 2, 8, 'cgbox')">采购磋商</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('2', 3, 9, 'cgbox')">合同签订</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>

                                    </div>
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <a class="sh-change-padding" href="javascript:;" @click.stop.prevent="handleLook('node', 'cg')">节点流程</a>
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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            :data="xqlzList2"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            :data="cghList2"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                                            :data="qdhtList2"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell">
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
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="3">
                        <template slot="title">
                            <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <i class="sh-node-icon">3</i>

                                        <el-dropdown trigger="click">
                                            <span class="pub-family el-dropdown-link">
                                                项目执行<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="" @click.native="handleLookNode('3', 0, 10, 'zxbox')">执行资料</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>

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
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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
                                            :data="xmzxList2"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="4">
                        <template slot="title">
                            <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <i class="sh-node-icon">4</i>

                                        <el-dropdown trigger="click">
                                            <span class="pub-family el-dropdown-link">
                                                项目验收<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="" @click.native="handleLookNode('4', 0, 11, 'yhbox')">验收申请</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('4', 1, 12, 'yhbox')">预验收</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('4', 2, 13, 'yhbox')">验收复核</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <a class="sh-change-padding" href="javascript:;" @click.stop.prevent="handleLook('node', 'ys')">节点流程</a>
                                        
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="sh-node-wrapper" ref="yhbox">
                            <div class="sh-file-box">
                                <div class="st-item">
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>安装地点：</span>
                                            <el-input class="pl-input-box" v-model="installationAddress" :disabled="true"></el-input>
                                        </div>
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>到货日期：</span>
                                            <el-date-picker
                                            v-model="arrivalTime"
                                            type="date"
                                            class="pl-input-box"
                                            :disabled="true">
                                            </el-date-picker>
                                        </div>
                                    </div>

                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>安装日期：</span>
                                            <el-date-picker
                                            v-model="installationTime"
                                            type="date"
                                            class="pl-input-box"
                                            :disabled="true">
                                            </el-date-picker>
                                        </div>
                                        <div class="pl-input"></div>
                                    </div>
                                </div>

                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmyhzl"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料模板"
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
                                            :data="xmyhqt"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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

                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmyhsp"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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

                            <div class="sh-file-box">
                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmyyszl"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料模板"
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
                                            :data="xmyysqt"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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
                                <div class="st-item">
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>验收日期：</span>
                                            <el-input class="pl-input-box" v-model="installationAddress" :disabled="true"></el-input>
                                        </div>
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>验收备注：</span>
                                            <el-input class="pl-input-box" type="textarea" rows="3" v-model="installationAddress" :disabled="true"></el-input>
                                        </div>
                                    </div>

                                    <div class="st-edit-content">
                                        <div class="st-edit-item st-ed-head">
                                            <div><i>*</i> <span>付款时间</span></div>
                                            <div><i>*</i> <span>付款比%</span></div>
                                            <div><i>*</i> <span>付款金额(万)</span></div>
                                            <div><i>*</i> <span>剩余付款金额(万)</span></div>
                                            <div> <span>备注</span></div>
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
                                        </div>
                                    </div>
                                </div>

                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmysfhzl"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料模板"
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
                                            :data="xmysfhqt"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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
                        </div>

                    </el-collapse-item>

                    <el-collapse-item name="5">
                        <template slot="title">
                            <div class="sh-node-item">
                                <div class="sh-node-item-head">
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <i class="sh-node-icon">5</i>

                                        <el-dropdown trigger="click">
                                            <span class="pub-family el-dropdown-link">
                                                项目维保<i class="el-icon-arrow-down el-icon--right"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item icon="" @click.native="handleLookNode('5', 0, 14, 'wbbox')">维保结束申请</el-dropdown-item>
                                                <el-dropdown-item icon="" @click.native="handleLookNode('5', 1, 15, 'wbbox')">技术指标验收</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <div class="sh-node-box" @click.stop.prevent="handleSellectNode()">
                                        <a class="sh-change-padding" href="javascript:;" @click.stop.prevent="handleLook('node', 'wb')">节点流程</a>
                                    </div>
                                </div>
                            </div>
                        </template>

                         <div class="sh-node-wrapper" ref="wbbox">
                             <div class="sh-file-box">
                                <div class="st-item st-item-two">
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>退还质保金%：</span>
                                            <el-input class="pl-input-box" v-model="tZbjRatio" :disabled="true"></el-input>
                                        </div>
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i></i>退还质保金额：</span>
                                            <el-input class="pl-input-box" v-model="tZbj" :disabled="true"></el-input>
                                        </div>
                                    </div>

                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i></i>备注说明：</span>
                                            <el-input class="pl-input-box pl-text-box" type="textarea" rows="2" v-model="tZbjRemark" :disabled="true"></el-input>
                                        </div>
                                    </div>
                                </div>

                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmwbjszl"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料模板"
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
                                            :data="xmwbjsqt"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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

                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmwbjssp"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="审批附件名称"
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
                                <div class="st-item st-item-two">
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>退保情况：</span>
                                            <el-radio v-model="isTB" :disabled="true" label="1">全额退保</el-radio>
                                            <el-radio v-model="isTB" :disabled="true" label="2">不予退还</el-radio>
                                        </div>
                                    </div>
                                    
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>实际退还%：</span>
                                            <el-input class="pl-input-box" type="number" :disabled="true" @change="handleChangeMoney()" v-model="sjTbaoRatio"></el-input>
                                        </div>
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i></i>退还质保金额：</span>
                                            <el-input class="pl-input-box" v-model="sjTaoMoney" :disabled="true"></el-input>
                                        </div>
                                    </div>
                                    
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i>*</i>实际退还日期：</span>
                                            <el-date-picker
                                            v-model="sjTbaoTime"
                                            type="date"
                                            class="pl-input-box"
                                            :disabled="true">
                                            </el-date-picker>
                                        </div>
                                        <div class="pl-input">
                                            <span class="pl-input-name" v-if="radio === '2'"><i>*</i>不予退还原因：</span>
                                            <el-input class="pl-input-box" v-if="radio === '2'" v-model="nTbaoRemark" :disabled="true"></el-input>
                                        </div>
                                    </div>
                                    
                                    <div class="pl-item-wrapper">
                                        <div class="pl-input">
                                            <span class="pl-input-name"><i></i>备注说明：</span>
                                            <el-input class="pl-input-box" v-model="tbaoRemark" :disabled="true"></el-input>
                                        </div>
                                    </div>
                                </div>

                                <div class="sh-file-item">
                                    <div class="sh-file-list">
                                        <el-table
                                            :data="xmjszbzl"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
                                            <el-table-column
                                                prop="attachName"  
                                                label="资料模板"
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
                                            :data="xmjszbqt"
                                            style="width: 100%"
                                            @cell-click="handleCell"
                                            :cell-class-name="cell"
                                            >
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
                                :on-preview="handlePreview"
                                :http-request="customRequest"
                                :on-exceed="handleExc"
                                 multiple
                                :limit="3"
                                :file-list="fileList"
                                accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'>
                                <el-button size="small" type="primary">
                                    <i class="pub-css st-upload-icon"> <span class="zdy-upload-text">如需上传资料请点击</span> </i>
                                </el-button> 
                            </el-upload>
                        </div>
                        <div class="ro-item ro-file-wrapper" >
                        <span class="ro-title-b"></span>
                        <div>
                            <div class="ro-file-b" v-for="(item,index) in oldAppdendixList" :key="index">
                                <i class="pub-css st-icon-file"></i>
                                <span @click="handleDOwnLoad(item.attachUrl)">{{item.attachName}}</span>
                                <i  class="pub-css st-icon-del" @click="handleDelet(item)"></i>
                            </div>
                            
                        </div>
                        
                    </div>
                       
                    </div>
    
                    <el-row class="sh-node-btn">
                        <el-button type="primary" @click="handleCancel()">取消</el-button>
                        <el-button type="primary" :disabled="extableType" @click="handleComfire()">确认审批</el-button>
                    </el-row>
                </div>

                <div v-else>
                    <p class="pub-family sh-node-agree">审批意见: 
                        <!-- {{approveState}} -->
                        <el-radio v-model="radio" label="1" :disabled="true">同意</el-radio>
                        <el-radio v-model="radio" label="2" :disabled="true">驳回</el-radio>
                    </p>
                    <p class="sh-node-agree-reason">{{approveRemark}}</p>
                    <p class="sh-node-agree-file" @click="handleDOwnLoad(approveFileS.attachUrl)">{{approveFileS.attachName}}</p>
                    <el-row class="sh-node-btn">
                        <el-button type="primary" @click="handleCancel()">返回列表</el-button>
                    </el-row>
                </div>
            </div>
        </div>

        <el-dialog
            class="st-dialog"
            :visible.sync="dialogVisible"
            :show-close=true
            width="60%"
            >
            <p class="st-steps-title pub-family">{{proTxt}}</p>
            <div class="st-steps-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.spName?i.spName:''}}</p>
            </div>
            <el-steps :active="steps" 
                align-center
                process-status='wait'
            
            >
                <el-step  v-for="(i, ind) in hasNodeInfo" :key="ind" :title="i.userName?i.userName:''" :description="i.state?i.state:''"></el-step>
            </el-steps>  
            <div class="st-steps-name st-steps-bot-name">
                <p :class="ind + 1 <= steps?'st-black':''" v-for="(i, ind) in hasNodeInfo" :key="ind">{{i.time?i.time:''}}</p>
            </div>
            <div class="st-steps-name st-steps-bot-name st-change-height">
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
                >
                <el-divider></el-divider>
                    <div class="ma-dia-content">
                        <div class="ma-item-wrapper">
                        <div>
                            <div id="printFill">
                                <p class="pub-family fl-title">院处采购申请单</p>
                                <div class="fl-item fl-item-basic">
                                    <p class="pub-family fl-item-basic-title">基本信息</p>
                                    <div class="fl-item-basic-block">
                                        <div class="fl-L">
                                            <span class="fl-L-title">采购申请编号：</span>
                                            <span>{{purchaseNo}}</span>
                                        </div>
                                        <div class="fl-L">
                                            <span class="fl-L-title">填报日期：</span>
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
                                                width="200">
                                            </el-table-column>
                                            <el-table-column
                                                prop="cgNumber"
                                                label="数量"
                                                width="80">
                                            </el-table-column>
                                            <el-table-column
                                                prop="company"
                                                label="单位"
                                                width="200">
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
                                            width="180">
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
                                            :rows="8"
                                            maxlength="1000字"
                                            v-model="cgtxt1"
                                            :disabled="true">
                                        </el-input>
                                    </div>

                                    <div class="fl-basis-block">
                                        <div class="fl-basis-title">技术指标：</div>
                                        <el-input
                                            type="textarea"
                                            :rows="8"
                                            maxlength="10000字"
                                            v-model="cgtxt2"
                                            :disabled="true">
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
                                    <el-checkbox class="fl-check" v-model="isAgree" :disabled="true">同意购置</el-checkbox>
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
import { store } from "@/store"
export default {
    props:[
        'type',
        'proInfo',
        'rowInfo',
        'handleChangeDetail',
        "tableType",
        "approveType"
    ],
    components:{
        proInfoHead
    },
    data() {
        return {
            activeName: '',         // 绑定值需为 String 否则为 Array
            radio:0,
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
            hasNodeInfo:[],
            yfkList:[],
            lxzbList:[],
            lxzbList2:[],
            cgsqList:[],
            cgsqList1:[],
            cgsqList2:[],
            xqlzList:[],
            xqlzList2:[],
            cghList:[],
            cghList2:[],
            qdhtList:[],
            qdhtList2:[],
            xmzxList:[],
            xmzxList2:[],

            xmyhzl:[],
            xmyhqt:[],
            xmyhsp:[],

            xmyyszl:[],
            xmyysqt:[],
            infoArr:[],
            xmysfhzl:[],
            xmysfhqt:[],

            xmwbjszl:[],
            xmwbjsqt:[],
            xmwbjssp:[],

            tZbjRatio:"",
            tZbj:"",
            tZbjRemark:"",

            xmjszbzl:[],
            xmjszbqt:[],

            isTB:"",
            sjTbaoRatio:"",
            sjTaoMoney:"",
            sjTbaoTime:"",
            nTbaoRemark:"",
            tbaoRemark:"",

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
            lxlzList2:[],
            getuploadUrl1:'',
            fileList:[],
            jdId:'',

            exApproveType:"",
            approveRemark:"",
            approveState:"",
            approveFileS:{},
            proTxt:"阶段进行中",

            // basic info
            arrivalTime:"",         // 到货时间
            installationAddress:"", // 安装地址
            installationTime:"",     // 安装时间
            oldAppdendixList:[]

        }
    },
    methods:{
        handleLook(type, kind) {

            if(kind == 'cg') {
                this.jdId = '6a3c8fb95ebe4a4696cd13e2051473b4'
            }else if(kind == 'ys') {
                this.jdId = '2798118bf3ca47439750b4e4acdd7735'
            }else if(kind == 'wb') {
                this.jdId = 'a2414bacf75144098799a178f0ff2a41'
            }

            if(type === 'rotate') {
                
            }else if(type === 'node'){
                this.handleHasNode();
                
            }
        },

        handleActiveName() {
            // console.log(this.activeName)
            
        },

        handleComfire() { 
            if(this.radio==0){
                return this.$message.error("请选择审批类型(同意或者驳回)") ;
            }        
            var rowmsg=this.exRowInfo;
            if(this.radio==2){
                if(!this.textarea){
                  return this.$message.error("驳回原因不能为空") ;
                }
            }
           if(rowmsg.projectNode=="6a3c8fb95ebe4a4696cd13e2051473b4"||rowmsg.projectNode=="2798118bf3ca47439750b4e4acdd7735"||rowmsg.projectNode=="a2414bacf75144098799a178f0ff2a41"){
            var param={fileName:"",fileUrl:"",fileType:"",pid:rowmsg.id,nodeId:rowmsg.projectNode,pl:rowmsg.pl,type:rowmsg.approveType,spState:this.radio,remark:this.textarea};    
            this.$http.post("/api/project/confirmApproval",param).then(res =>{
                    if(res.code=="00000"){                       
                        if(res.data.message) {
                            this.$message({
                                type:'success',
                                dangerouslyUseHTMLString: true,
                                message:'<p style="font-size:14px;color:#666666;margin:0 0 10px 0;">已成功！</p> <p style="font-size:13px;color:#999999;">下一审批节点：'+ res.data.message +'，请及时跟进审核状态。</p><p></p>',
                                showClose:true
                            })
                        }else{
                            this.$message.success(res.message);
                        }
                        
                        this.$emit('handleChangeDetail', false)
                    }else{
                        this.$message.error(res.message)
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
                nodeId:this.jdId
            }
            this.$http.post('/api/project/getExamineList', params)
            .then((res) => {
                // console.log(res)
                if(res.message == '本节点无审批流程'){
                    this.$message.error('本节点无审批流程')
                    this.dialogVisible = false
                }else{
                    for(let i = 0; i < res.data.length; i ++) {
                        if(res.data[i].state == 0) {
                            res.data[i].state = '待审核'
                        }else if(res.data[i].state == 1) {
                            if(i==0){
                                res.data[i].state = ''
                            }else{
                                res.data[i].state = '审核通过'
                            }
                            this.steps = i + 1
                        }else if(res.data[i].state == 2) {
                            res.data[i].state = '审核被驳回'
                        }else if(res.data[i].state == 3) {
                            res.data[i].state = '重新提交待审核'
                        }

                        if(res.data[res.data.length - 1].state == '审核通过') {
                            this.proTxt = "阶段完成"
                        }

                        res.data[i].remark?res.data[i].remark:""
                        res.data[i].spName?res.data[i].spName:""
                        res.data[i].time?res.data[i].time:""
                        res.data[i].userName?res.data[i].userName:""
                    }
                    this.hasNodeInfo = res.data
                    this.dialogVisible = true
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
                    if(lxzbMsg.length) {
                        for(var i=0;i<lxzbMsg.length;i++){
                            var obj={};
                            obj.createTime=lxzbMsg[i].createTime
                            obj.createUserName=lxzbMsg[i].createUserName;
                            obj.attachName=lxzbMsg[i].attachName;
                            obj.attachUrl=lxzbMsg[i].attachUrl;
                            this.lxzbList.push(obj);
                        }
                    }
                    

                    //立项-立项准备其他资料
                    var lxzbqtMsg=(dataList[0].list)[0].qtList;
                    this.lxzbList2=[];
                    if(lxzbqtMsg.length) {
                        for(var i=0;i<lxzbqtMsg.length;i++){//立项-资料
                            var obj={};
                            obj.createTime=lxzbqtMsg[i].createTime
                            obj.createUserName=lxzbqtMsg[i].createUserName;
                            obj.attachName=lxzbqtMsg[i].attachName;
                            obj.attachUrl=lxzbqtMsg[i].attachUrl;
                            this.lxzbList2.push(obj);
                        }
                    }
                    

                    //立项-立项论证资料
                    let lxlzListOne = (dataList[0].list)[1].zlList
                    if(lxlzListOne.length) {
                        for(let i = 0; i < lxlzListOne.length; i ++) {
                            let obj = {}
                            obj.createTime=lxlzListOne[i].createTime
                            obj.createUserName=lxlzListOne[i].createUserName;
                            obj.attachName=lxlzListOne[i].attachName;
                            obj.attachUrl=lxlzListOne[i].attachUrl;
                            this.lxlzList.push(obj);
                        }
                    }

                    // 立项论证其他资料
                    let lxlzListTwo = (dataList[0].list)[1].qtList
                    if(lxlzListTwo.length) {
                        for(let i = 0; i < lxlzListTwo.length; i ++) {
                            let obj = {}
                            obj.createTime=lxlzListTwo[i].createTime
                            obj.createUserName=lxlzListTwo[i].createUserName;
                            obj.attachName=lxlzListTwo[i].attachName;
                            obj.attachUrl=lxlzListTwo[i].attachUrl;
                            this.lxlzList2.push(obj);
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
                        obj.attachUrl=xqlzzllist[j].attachUrl;
                        this.xqlzList.push(obj);
                      }
                    }

                    // 需求论证-- 其他资料
                    let xqlzzllistTwo=xmcgMsg[0].qtList;
                    if(xqlzzllistTwo.length>0){
                      for(var j=0;j<xqlzzllistTwo.length; j++){
                        var obj={};
                        obj.createTime=xqlzzllistTwo[j].createTime
                        obj.createUserName=xqlzzllistTwo[j].createUserName;
                        obj.attachName=xqlzzllistTwo[j].attachName;
                        obj.attachUrl=xqlzzllistTwo[j].attachUrl;
                        this.xqlzList2.push(obj);
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
                            obj.attachUrl=cgsqzllist[j].attachUrl;
                            this.cgsqList.push(obj); 
                        }
                    }
                    if(cgsqqtlist.length>0){
                        for(var j=0;j<cgsqqtlist.length;j++){
                            var obj={};
                            obj.createTime=cgsqqtlist[j].createTime
                            obj.createUserName=cgsqqtlist[j].createUserName;
                            obj.attachName=cgsqqtlist[j].attachName;
                            obj.attachUrl=cgsqqtlist[j].attachUrl;
                            this.cgsqList1.push(obj); 
                        }
                    }
                    if(cgsqsplist.length>0){
                        for(var j=0;j<cgsqsplist.length;j++){
                            var obj={};
                            obj.createTime=cgsqsplist[j].createTime
                            obj.createUserName=cgsqsplist[j].createUserName;
                            obj.attachName=cgsqsplist[j].attachName;
                            obj.attachUrl=cgsqsplist[j].attachUrl;
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
                            obj.attachUrl=cghzllist[j].attachUrl;
                            this.cghList.push(obj); 
                        }
                    }

                    //采购会-其他资料
                    this.cghLis2=[];
                    var cghzllistTwo=(dataList[1].list)[2].qtList;
                    if(cghzllistTwo.length>0){
                        for(var j=0;j<cghzllistTwo.length;j++){
                            var obj={};
                            obj.createTime=cghzllistTwo[j].createTime
                            obj.createUserName=cghzllistTwo[j].createUserName;
                            obj.attachName=cghzllistTwo[j].attachName;
                            obj.attachUrl=cghzllistTwo[j].attachUrl;
                            this.cghList2.push(obj); 
                        }
                    }



                    //采购合同
                    var cgfklist= (dataList[1].list)[3].fkList;
                    this.cgfkList=[];
                    this.qdhtList=[];
                    var qdhtzllist=(dataList[1].list)[3].zlList; 
                    var qdhtzllistTwo=(dataList[1].list)[3].qtList; 
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
                            obj.attachUrl=qdhtzllist[j].attachUrl;
                            this.qdhtList.push(obj); 
                        }
                    }

                    //签订合同-其他资料
                    if(qdhtzllistTwo.length>0){
                        for(var j=0;j<qdhtzllistTwo.length;j++){
                            var obj={};
                            obj.createTime=qdhtzllistTwo[j].createTime
                            obj.createUserName=qdhtzllistTwo[j].createUserName;
                            obj.attachName=qdhtzllistTwo[j].attachName;
                            obj.attachUrl=qdhtzllistTwo[j].attachUrl;
                            this.qdhtList2.push(obj); 
                        }
                    }

                    //项目执行
                    if(dataList[2].list.length) {
                        var xmzxMsg = (dataList[2].list[0].zlList);
                        let xmzxMsg2 = dataList[2].list[0].qtList;
                        if(xmzxMsg.length>0){
                            this.xmzxList=[];
                            for(let i = 0; i < xmzxMsg.length; i ++) {
                                let obj = {}
                                obj.createTime=xmzxMsg[i].createTime
                                obj.createUserName=xmzxMsg[i].createUserName;
                                obj.attachName=xmzxMsg[i].attachName;
                                obj.attachUrl=xmzxMsg[i].attachUrl;
                                this.xmzxList.push(obj)
                            }
                        }

                        if(xmzxMsg2.length) {
                            let list = []
                            for(let i = 0; i < xmzxMsg2.length; i ++) {
                                let obj = {}
                                obj.createTime=xmzxMsg2[i].createTime
                                obj.createUserName=xmzxMsg2[i].createUserName;
                                obj.attachName=xmzxMsg2[i].attachName;
                                obj.attachUrl=xmzxMsg2[i].attachUrl;
                                list.push(obj)
                            }
                            this.xmzxList2 = list
                        }
                    }
                    


                    // 项目验收
                    if(dataList[3].list.length) {
                        let result = dataList[3].list
                        this.xmyhzl = result[0].zlList
                        this.xmyhqt = result[0].qtList
                        this.xmyhsp = result[0].spList

                        this.xmyyszl = result[1].zlList
                        this.xmyysqt = result[1].qtList

                        this.xmysfhzl = result[2].zlList
                        this.xmysfhqt = result[2].qtList
                    }

                    // 项目维保 xmwbjszl 
                    if(dataList[4].list.length) {
                        let result = dataList[4].list
                        this.xmwbjszl = result[0].zlList
                        this.xmwbjsqt = result[0].qtList
                        this.xmwbjssp = result[0].spList
                        
                        this.xmjszbzl = result[1].zlList
                        this.xmjszbqt = result[1].qtList
                    }

                }
            })
        },

        handleSellectNode() {
            
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
            }else if(nodeName == "yhbox") {
                elCollection = this.$refs.yhbox.getElementsByClassName('sh-file-box')
            }else if(nodeName == "wbbox") {
                elCollection = this.$refs.wbbox.getElementsByClassName('sh-file-box')
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
            this.$message.error(`如需更换文件请先删除后操作`);
        },

        // change upload
        handleBefore(file) {
            this.files = file
            
            let limitCount = 1024*1024*5
            if(file.size > limitCount) {
                this.$message.error(`请选择小于5M的文件`);
                return false
            }
            
            if(this.fileList.length) {
                this.$message.error(`如需更换文件请先删除后操作`);
                return false
            }
            
            
        },
        handlePreview(file) {
        },
        handleDelet(item) {//删除附件
            if(item.id) {
                let params = {
                    appendixId:item.id
                }
                this.$http.post("/api/project/deletedNodeAppendixZxjh", params)
                .then((res) => {
                    if(res.code == "00000") {
                        this.getAppendix(this.projectId);
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    this.$message.error(err.message);
                })
            }else{
                for(let i = 0; i < this.fileMsgList.length; i ++) {
                    if(this.fileMsgList[i].fileName == item.fileName) {
                        this.fileMsgList.splice(i, 1)
                    }
                }
            }
            
        },  
        getAppendix(){//获取附件
            var rowmsg=this.exRowInfo;
            var params={pid:rowmsg.id,nodeId:rowmsg.projectNode,pl:rowmsg.pl};
            this.$http.post("/api/project/getSpAppendix",params).then(res =>{
              //  console.log(res)
              if(res.code=="00000"){
                  var msglsit=res.data;
                  this.oldAppdendixList=[];
                  for(var i=0;i<msglsit.length;i++){
                      var msg={};
                      msg.attachName=msglsit[i].attachName;
                      msg.id=msglsit[i].id;
                       this.oldAppdendixList.push(msg);
                  }
              } else{
                  this.oldAppdendixList=[];
              }
            })
        },
        customRequest() {
            const formData = new FormData();          
            formData.append('file',this.files);
            var rowmsg=this.exRowInfo;
            formData.append('pid',rowmsg.id);
            formData.append('nodeId',rowmsg.projectNode);
            formData.append('pl',rowmsg.pl);
            formData.append('type',rowmsg.approveType);
           this.$http.post("/api/system/spUploadAppenddix", formData)
            .then((res) => {
               // console.log(res)
                if(res.code == "00000") {
                    this.$message.success(res.message);
                    this.oldAppdendixList.push(res.data);         
                }else{
                    this.fileList = []
                    this.$message(res.message);
                }
            })
            .catch((err) => {
                this.fileList = []
                this.$message(err.message)
            })
        },

        getApproveDetail() {
            let params = {
                type:this.exApproveType,
                pl:this.exRowInfo.pl,
                pid:this.exRowInfo.id
            }
            this.$http.post("/api/project/getExamineOpinion", params)
            .then((res) => {
                if(res.code == "00000") {
                    this.approveRemark = res.data.remark
                    this.approveState = res.data.state
                    this.radio = res.data.state
                    this.radio = (this.radio).toString()
                    if(res.data.fj) {
                        this.approveFileS = res.data.fj
                    }else{
                        this.approveFileS = {
                            id:"",
                            attachName:"",
                            attachUrl:""
                        }
                    }
                    
                }
            })
            .catch((err) => {

            })
        },

        handleDOwnLoad(url) {
            window.open(url)
        },

        handleCell(row, column, cell, event) {
            if(column.property == "attachName") {
                window.open(row.attachUrl)
            }
        },

        cell({row, column, rowIndex, columnIndex}) {
            if( columnIndex == 0){
                return 'project-style'
            }
        },

        handleCommand() {
            let status = Number(store.state.proInfo.status)
            let index = 0
            let elCollection = ""
            // console.log(status)
            if(status == 4 || status == 5) {
                this.activeName = "1"
                elCollection = this.$refs.lxbox.getElementsByClassName('sh-file-box')
            }else if(status == 6 || status == 7 || status == 8 || status == 9) {
                this.activeName = "2"
                elCollection = this.$refs.cgbox.getElementsByClassName('sh-file-box')
            }else if(status == 10) {
                this.activeName = "3"
                elCollection = this.$refs.zxbox.getElementsByClassName('sh-file-box')
            }else if(status == 11 || status == 12 || status == 13) {
                this.activeName = "4"
            }else if(status == 14 || status == 15) {
                this.activeName = "5"
            }

            if(status == 4 || status == 6 || status == 10 || status == 11 || status == 14) {
                index = 0
            }else if(status == 5 || status == 7 || status == 12 || status == 15) {
                index = 1
            }else if(status == 8 || status == 13) {
                index = 2
            }else if(status == 9) {
                index = 3
            }

            if(elCollection.length) {
                for(let i = 0; i < elCollection.length; i ++) {
                    elCollection[i].style.display = "none"
                }
                elCollection[index].style.display = "block"
            }
            
        },

        init() {
            let params = { 
                id:this.exproInfo.id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code == "00000") {
                    this.arrivalTime = res.data.arrivalTime
                    this.installationAddress = res.data.installationAddress
                    this.installationTime = res.data.installationTime

                    this.tZbjRatio=res.data.tZbjRatio;
                    this.tZbj=res.data.tZbj;
                    this.tZbjRemark=res.data.tZbjRemark;

                    if(res.data.isTbao){    
                        if(res.data.isTbao!=0){ 
                            if(res.data.isTbao==1){
                                this.isTB='1';

                                if( res.data.sjTbaoRatio){
                                    this.sjTbaoRatio=res.data.sjTbaoRatio;
                                }
                                if( res.data.sjTaoMoney){
                                    this.sjTaoMoney=res.data.sjTaoMoney;
                                }
                                if( res.data.sjTbaoTime){
                                    this.sjTbaoTime=res.data.sjTbaoTime;
                                }

                            }else{
                                this.isTB='2'; 
                                if( res.data.nTbaoRemark){
                                    this.nTbaoRemark=res.data.nTbaoRemark;
                                }
                                this.sjTbaoRatio='';
                                this.sjTaoMoney='';
                                this.sjTbaoTime='';
                            }
                        }                           
                    }
                    this.tbaoRemark=res.data.tbaoRemark;
                }else{

                }
            })
            .catch((err) => {

            })
        },

        getPayMentList(){
            let params = {
                pid:this.exproInfo.id
            };
            this.$http.post('/api/project/getYsfhPayMent', params)
            .then((res) => {
              if(res.code=="00000"){               
                  this.infoArr=res.data; 
              }
            })
            .catch((err) => {
                console.log(err)
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
        
        this.getProjectStatusMsg();
        this.exRowInfo=this.rowInfo;
        
        if(this.tableType == "已审批") {
            this.extableType = true
        }else if(this.tableType == "待审批") {
            this.extableType = false
        }

        // get approve detail
        this.getApproveDetail()

        // init
        this.init()

        this.getAppendix();
        
        // auto open command
        this.handleCommand();

        // 付款信息列表
        this.getPayMentList()

    },

    created() {
        this.exApproveType = this.approveType
    },

    computed: {
        // storeProInfo () {
        //     return store.state.proInfo
        // }
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
                        // flex: 1;
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

                // new acceptance
                .st-item{
                    .pl-item-wrapper{
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        .pl-input{
                            flex: 1;
                            display: flex;
                            align-items: center;
                            .pl-input-name{
                                min-width: 100px;
                                font-size: 16px;
                                color: #39475B;
                                i{
                                    color: red;
                                }
                            }
                            .pl-input-name+div{
                                width: 220px;
                            }
                        }
                    }

                    .st-edit-content{
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
                                .el-date-editor.el-input, .el-date-editor.el-input__inner{
                                    width: 100%;
                                }
                                flex: 1;
                                & /deep/ input{
                                    text-align: center;
                                    border: none;
                                }
                                & /deep/ input[type=number]::-webkit-inner-spin-button,
                                & /deep/ input[type=number]::-webkit-outer-spin-button {
                                    -webkit-appearance: none;
                                    margin: 0;
                                }
                                .st-icon-edit{
                                    display: inline-block;
                                    background-position: -377px -91px;
                                }
                                .st-icon-del{
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    background-position: -377px -168px;
                                    margin-left: 44px;
                                }
                                & /deep/ .el-input__prefix{
                                    display: none;
                                }
                                
                            }
                            .st-oparate-btn{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
                }
                .st-item-two{
                    .pl-item-wrapper{
                        .pl-input{
                            .pl-input-name{
                                min-width: 120px;
                                margin-left: 10px;
                            }
                        }
                        
                    }
                    .pl-item-wrapper:nth-child(2) {
                        .pl-input{
                            flex:2;
                            .pl-input-box{
                                flex:2;
                            }
                        }
                    }
                    
                }
            }

            .sh-node-wrapper{
                .sh-file-box:nth-child(1){
                    display: block;
                }
            }
        }
        .sh-node-right{
            width: 335px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #EFF2F7;
            border-radius: 4px;
            padding: 0 10px 20px;
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
                    overflow: hidden;
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
                & /deep/ .el-upload-list{
                    height: 0;
                    overflow: hidden;
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
                    // width: 100px;
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
                cursor:pointer;
            }
        }
    }
    & /deep/ .el-collapse-item__content{
        padding-bottom: 0;
    }

    & /deep/ .el-table .el-table__header-wrapper .cell{
        text-indent: 1em;
    }

    & /deep/ .el-table .el-table__body-wrapper .cell{
        text-indent: 1em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @import url('../../components/Common/less/commNode.less');
    
    .st-steps-bot-name p{
        font-size: 12px!important;
    }
    .st-change-height{
        margin-top: -5px;
    }
    & /deep/ .el-step__description{
        margin-top: 0;
    }
    @import url('../../components/Common/less/fillAppalication.less');
    // dialog
    .ma-dialog{
        .el-divider--horizontal{
            margin: 0 auto;
        }
        .fl-title:nth-child(1){
            margin-top: 0!important;
        }
    }
} 
.zdy-upload-text{
    font-size: 14px;
    color: #3b7cff;
    padding-left: 28px;
}   
.ro-file-b{
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: underline;
    color: #3B7CFF;
    cursor: pointer;
    .st-icon-file{
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: -375px -314px;
        margin-right: 10px;
    }
    .st-icon-del{
        margin: 0 10px 0 0;
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: -377px -168px;
        margin:0 10px;
        cursor: pointer;
        opacity: .2;
        transition: all .3s ease;
    }
    .st-icon-del:hover{
        opacity: 1;
    }
    >span{
        display: inline-block;
        min-width: 270px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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