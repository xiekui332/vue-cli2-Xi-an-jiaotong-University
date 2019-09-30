<template>
    <div id="com-proInfoHead">
        <div class="et-detail">
            <div class="et-left">
                <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content" class="pub-width">{{exTwoproInfo.name?exTwoproInfo.name:'暂无'}}</div>
                    <p class="et-title">{{exTwoproInfo.name?exTwoproInfo.name:'暂无'}}</p>
                </el-tooltip>
                <div class="et-col-wrapper">
                    <div class="et-col-item">
                        <p>
                            <span>项目编号：</span>
                            <span>{{exTwoproInfo.no?exTwoproInfo.no:'暂无'}}</span>
                        </p>
                        <p>
                            <span>预算金额：</span>
                            <span>{{exTwoproInfo.ysje?exTwoproInfo.ysje:'暂无'}}万</span>
                        </p>
                        <p>
                            <span>立项时间：</span>
                            <span>{{exTwoproInfo.createTime?exTwoproInfo.createTime:'暂无'}}</span>
                        </p>
                    </div>
                    <div class="et-col-item">
                        <p>
                            <span>项目负责人：</span>
                            <el-tooltip class="item" effect="dark" :content="exTwoproInfo.leaderNames?exTwoproInfo.leaderNames:'暂无'" placement="top">
                                <span class="com-leaderNames">{{exTwoproInfo.leaderNames?exTwoproInfo.leaderNames:'暂无'}}</span>
                            </el-tooltip>
                        </p>
                        <p>
                            <span>项目类型：</span>
                            <span>{{exTwoproInfo.projectTypeName?exTwoproInfo.projectTypeName:'暂无'}}</span>
                        </p>
                        <p>
                            <span>计划周期：</span>
                            <el-tooltip class="item" effect="dark" placement="top-start">
                                <div slot="content" class="pub-width">{{exTwoproInfo.startTime?exTwoproInfo.startTime:'暂无'}} ~ {{exTwoproInfo.endTime?exTwoproInfo.endTime:'暂无'}}</div>
                                <span>{{exTwoproInfo.startTime?exTwoproInfo.startTime:'暂无'}} ~ {{exTwoproInfo.endTime?exTwoproInfo.endTime:'暂无'}}</span>
                            </el-tooltip>
                        </p>
                    </div>
                    <div class="et-col-item">
                        <p>
                            <span>经费来源：</span>
                            <span>{{exTwoproInfo.sourcesFundName?exTwoproInfo.sourcesFundName:'暂无'}}</span>
                        </p>
                        <p>
                            <span>供应商：</span>
                            <span>{{exTwoproInfo.supplier?exTwoproInfo.supplier:'暂无'}}</span>
                        </p>
                        <p>
                            <span>项目说明：</span>
                            <el-tooltip class="item" effect="dark" placement="top-start">
                                <div slot="content" class="pub-width">{{exTwoproInfo.remark?exTwoproInfo.remark:'暂无'}}</div>
                                <span class="com-remark">{{exTwoproInfo.remark?exTwoproInfo.remark:'暂无'}}</span>
                            </el-tooltip>
                        </p>
                    </div>
                </div>
            </div>
            <div class="et-right">
                <p class="et-flag">{{exTwoproInfo.projectStateName?exTwoproInfo.projectStateName:'暂无'}} / {{exTwoproInfo.projectNodeName?exTwoproInfo.projectNodeName:''}}</p>
                <p class="et-money-num">¥<span>{{exTwoproInfo.zbje?exTwoproInfo.zbje:'0.00'}}</span>万</p>
                <p class="et-money-txt">中标金额</p>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "@/store"
export default {
    props:[
        ''
    ],
    data() {
        return {
            
        }
    },
    watch:{
        
    },

    mounted() {
        // console.log(store.state.proInfo)
    },

    computed:{
        exTwoproInfo() {
            return store.state.proInfo
        }
    }
}
</script>

<style lang="less" scoped>
#com-proInfoHead{
    .et-detail{
        height: 228px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        display: flex;
        padding: 0 30px 0 40px;
        margin-bottom: 20px;
        .et-left{
            width: 80%;
        }
        .et-title{
            font-size: 28px;
            color: #404040;
            letter-spacing: 1px;
            margin: 30px 0 20px 0px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .et-col-wrapper{
            display: flex;
            .et-col-item {
                // max-width: 400px;
                flex: 1;
                padding-right: 20px;
                .com-leaderNames{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .com-remark{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 200px;
                }
            }
            .et-col-item:nth-child(3){
                max-width: 380px;
            }
            .et-col-item >p {
                line-height: 36px;
                font-size: 16px;
                color: #39475B;
                letter-spacing: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .et-right{
            flex: 2;
            text-align: right;
            .et-flag{
                font-size: 18px;
                color: #3560F6;
                letter-spacing: 0;
                line-height: 24px;
                margin: 40px 0px 60px 0;
            }
            .et-money-num{
                font-size: 20px;
                color: #FE5959;
                span{
                    font-size: 40px;
                    color: #FE5959;
                    padding:0 5px;
                }
            }
            .et-money-txt{
                font-size: 14px;
                color: #7887A7;
            }

        }
    }
}
</style>