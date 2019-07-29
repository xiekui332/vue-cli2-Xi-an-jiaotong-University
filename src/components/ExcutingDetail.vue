<template>
    <div id="excuting-wrapper">
        <transition name="fade">
            <div class="et-error" v-show="hasErrorTips">
                <div class="et-l">
                    <img src="../assets/svg/Icon.svg" alt="">
                </div>
                <div class="et-c">
                    <p>
                        【驳回原因】：《磋商文件》中关于采购人、政府采购代理机构通过组建竞争性磋商就采购货物、工程和服务事宜进行磋商的说明有问题，不清楚不理解，请要求填写。
                    </p>
                    <p>【审批人】：艾米 | 2019-03-24</p>
                </div>
                <div class="et-r" @click="handleClose">
                    ×
                </div>
            </div>
        </transition>

        <proInfoHead />

        <div class="et-content">
            <div class="et-con-le">
                <p class="et-con-le-title">项目进度</p>
                <div class="et-steps-wrapper">
                    <ul class="et-steps-ul">
                        <li v-for="(i, ind) in steps" :key="ind" :class="{'et-active':i.active}">
                            <a href="javascript:;">
                                <span>{{i.title}}</span>
                                <i class="pub-css et-steps-icon" v-if="i.hasNow"></i>
                                <i v-else></i>
                            </a>
                            <div class="et-steps-line"></div>
                            <ul class="et-steps-ul-children">
                                <li v-for="(i, ind) in i.children" :key="ind">
                                    <router-link :to="i.path">{{ind + 1}} {{i.title}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                
            </div>

            <div class="et-con-ri">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import stepsComm from '@/components/ProjectProgress/StepsComponents'
import proInfoHead from '@/components/Common/ProInfoHead'
export default {
    components:{
        stepsComm,
        proInfoHead
    },
    data() {
        return {
            steps:[
                {
                  title:'项目立项',
                  active:true ,
                  children:[
                      {
                        title:'执行计划', 
                        path:'/proj/excuting/plan',
                        status:false
                      },
                      {
                        title:'立项准备', 
                        path:'/proj/excuting/preparation',
                        status:false
                      },
                  ] 
                },
                {
                  title:'项目采购',
                  active:true,
                  hasNow:true,
                  children:[
                      {
                        title:'需求论证', 
                        path:'/proj/excuting/plan',
                        status:false
                      },
                      {
                        title:'采购申请', 
                        path:'/proj/excuting/plan',
                        status:false
                      },
                      {
                        title:'采购会', 
                        path:'/proj/excuting/plan',
                        status:false
                      },
                      {
                        title:'签订合同', 
                        path:'/proj/excuting/sign?type=sign',
                        status:true
                      }
                  ]  
                },
                {
                  title:'项目验收',
                  active:false  
                },
                {
                  title:'项目维护',
                  active:false  
                },
            ],
            hasErrorTips:false
        }
    },
    methods:{
        handleToRoute() {
            if(this.steps.length) {
                for(let i = 0; i < this.steps.length; i ++ ) {
                    if(this.steps[i].children && this.steps[i].children.length) {
                        for(let j = 0; j < this.steps[i].children.length; j ++) {
                            if(this.steps[i].children[j].status === true){
                                location.hash= this.steps[i].children[j].path
                            }
                        }
                    }
                }
            }
            
        },
        handleCommit(path) {
            
        },
        handleClose(){
            this.hasErrorTips = false
        }
    },
    mounted() {
        this.handleToRoute()
        
    },
    destroyed(){

    }
}
</script>

<style lang="less" scoped>
#excuting-wrapper{
    min-height: 100%;
    .pub-css{
        background: url('../assets/img/css_sprites.png');
        background-size:440px 391px; 
    }
    .et-content{
        display: flex;
        .et-con-le{
            width: 240px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 #EFF2F7;
            border-radius: 4px;
            .et-con-le-title{
                font-size: 18px;
                color: #3B4859;
                letter-spacing: 0;
                padding: 20px 0 40px 20px;
            }
            .et-steps-wrapper{
                padding-left: 26px;
                padding-bottom: 30px;
                .et-steps-ul li{
                    position: relative;
                    .et-steps-line{
                        height: 100%;
                        position: absolute;
                        z-index: 1;
                        left: -1px;
                        top: 10px;
                        opacity: 0.5;
                        border-left: 1.5px dashed #AEB9CF;
                    }
                    .et-steps-icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        background-position:-416px -46px; 
                        margin-left: 10px;
                    }
                    .et-steps-ul-children{
                        margin-left: 34px;
                        padding: 10px;
                        li{
                            a{
                                line-height: 40px;
                                font-size: 17px;
                                letter-spacing: 0;
                                color: #3B4859;
                            }
                            
                            .router-link-exact-active{
                                color: #3B7CFF;
                            }
                        }
                    }
                    
                }
                .et-steps-ul li:last-child{
                    .et-steps-line{
                        display: none;
                    }
                }
                
                .et-steps-ul li.et-active{
                    .et-steps-line{
                        border-left: 1.5px solid #3B7CFF;
                    }
                }
                .et-steps-ul>li>a{
                    display: block;
                    margin-left: 15px;
                    position: relative;
                    font-size: 18px;
                    color: #AEB9CF;
                    letter-spacing: 0;
                }
                .et-steps-ul>li.et-active>a{
                    color: #3B4859;
                }
                .et-steps-ul>li>a::before{
                    display: block;
                    content: '';
                    width: 10px;
                    height: 10px;
                    background: #D8DFED;
                    border-radius: 50%;
                    position: absolute;
                    z-index: 2;
                    left: -20px;
                    top: 7px;
                }
                .et-steps-ul>li.et-active>a::before{
                    background: #3B7CFF;
                    
                }
                
            }
        }
        .et-con-ri{
            flex: 2;
            margin-left: 20px;
        }
    }

    // 执行中异常
    .et-error{
        background: #FFEAEA;
        border: 1px solid #F50000;
        border-radius: 4px;
        display: flex;
        margin-bottom: 20px;
        .et-l{
            width: 64px;
            background: #F50000;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 23px;
                height: 20px;
            }
        }
        .et-c{
            font-size: 14px;
            color: #F50000;
            letter-spacing: 0;
            display: flex;
            flex-direction: column;
            padding: 10px 0 10px 20px;
            p{
                line-height: 30px;
            }
        }
        .et-r{
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #F50000;
            font-size:30px;
            cursor: pointer;
            text-align: right;
            padding-right: 20px;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        opacity: 0
    }
}
</style>