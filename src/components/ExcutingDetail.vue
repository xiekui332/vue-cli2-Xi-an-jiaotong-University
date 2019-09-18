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
                            <a href="javascript:;" class="et-default">
                                <span>{{i.title}}</span>
                                <i class="pub-css et-steps-icon" v-if="i.hasNow"></i>
                                <i v-else></i>
                            </a>
                            <transition name="fade">
                                <div v-show="!i.active" class="et-tips">
                                    <i>!</i>
                                    未进入此阶段，无法查看
                                </div>
                            </transition>
                            <div class="et-steps-line"></div>
                            <ul :class="i.active?'et-steps-ul-children hasHeight':'et-steps-ul-children noHeight'" >
                                <li v-for="(j, ind) in i.children" :key="ind" @click.capture="handleRouteUpdate(j.order)">
                                    <router-link v-if="Number(j.order) <= Number(sessionGet.status)" :to="j.path">{{ind + 1}} {{j.title}}</router-link>
                                    <a href="javascript:;" class="et-default" v-else>
                                        {{ind + 1}} {{j.title}}
                                        <div class="et-child-tips">
                                            <i>!</i>
                                            未进入此阶段，无法查看
                                        </div>
                                    </a>
                                </li>
                                <!-- <span>22</span> -->
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
import proInfoHead from '@/components/Common/ProInfoHead'
import { store } from '@/store'
export default {
    props:[
        'type',
        'parentRoute',
        'proInfo',
        "paramsUrl"
    ],
    components:{
        proInfoHead
    },
    data() {
        return {
            steps:[
                {
                  title:'项目立项',
                  active:false ,
                  hasNow:false,
                  children:[
                      {
                        title:'立项申请', 
                        path:this.parentRoute + '/' + this.type +'/step1',
                        status:false,
                        order:4
                      },
                      {
                        title:'立项论证', 
                        path:this.parentRoute + '/' + this.type +'/step2',
                        status:false,
                        order:5
                      },
                  ] 
                },
                {
                  title:'项目采购',
                  active:false,
                  hasNow:false,
                  children:[
                      {
                        title:'需求论证', 
                        path:this.parentRoute + '/' + this.type +'/step3',
                        status:false,
                        order:6
                      },
                      {
                        title:'采购申请', 
                        path:this.parentRoute + '/' + this.type +'/step4',
                        status:false,
                        order:7
                      },
                      {
                        title:'采购会', 
                        path:this.parentRoute + '/' + this.type +'/step5',
                        status:false,
                        order:8
                      },
                      {
                        title:'签订合同', 
                        path:this.parentRoute + '/' + this.type +'/step6',
                        status:false,
                        order:9
                      }
                  ]  
                },
                {
                    title:'项目执行',
                    active:false,
                    hasNow:false,
                    children:[
                        {
                            title:'执行资料', 
                            path:this.parentRoute + '/' + this.type +'/step7',
                            status:false,
                            order:10
                        }
                    ]
                },
                {
                    title:'项目验收',
                    active:false,
                    children:[
                        {
                            title:'验收申请', 
                            path:this.parentRoute + '/' + this.type +'/step8',
                            status:false,
                            order:11
                        },
                        {
                            title:'预验收', 
                            path:this.parentRoute + '/' + this.type +'/step9',
                            status:false,
                            order:12
                        },
                        {
                            title:'验收复核', 
                            path:this.parentRoute + '/' + this.type +'/step10',
                            status:false,
                            order:13
                        }
                    ]  
                },
                {
                    title:'项目维护',
                    active:false,
                    children:[
                        {
                            title:'维保结束申请', 
                            path:this.parentRoute + '/' + this.type +'/step11',
                            status:false,
                            order:14
                        },
                        {
                            title:'技术指标验收', 
                            path:this.parentRoute + '/' + this.type +'/step12',
                            status:false,
                            order:15
                        }
                    ]  
                },
            ],
            hasErrorTips:false,
            exproInfo:{},
            exparamsUrl:'',
            sessionGet:{}
        }
    },
    methods:{
        handleToRoute() {
            let params = {
                id:this.exproInfo.id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.sessionGet = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    let routerStep = this.sessionGet.status
                    console.log(routerStep)
                    // example
                    // routerStep = 7
                    
                    if(routerStep == 4) {
                        this.handleSetroute("项目立项", "立项申请")
                    }else if(routerStep == 5) {
                        this.handleSetroute("项目立项", "立项论证")
                    }else if(routerStep == 6) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购", "需求论证")
                    }else if(routerStep == 7) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购", "采购申请")
                    }else if(routerStep == 8) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购", "采购会")
                    }else if(routerStep == 9) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购", "签订合同")
                    }else if(routerStep == 10) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购")
                        this.handleSetroute("项目执行", "执行资料")
                    }else if(routerStep == 11) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购")
                        this.handleSetroute("项目执行")
                        this.handleSetroute("项目验收", "验收申请")
                    }else if(routerStep == 12) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购")
                        this.handleSetroute("项目执行")
                        this.handleSetroute("项目验收", "预验收")
                    }else if(routerStep == 13) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购")
                        this.handleSetroute("项目执行")
                        this.handleSetroute("项目验收", "验收复核")
                    }else if(routerStep == 14) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购")
                        this.handleSetroute("项目执行")
                        this.handleSetroute("项目验收")
                        this.handleSetroute("项目维护", "维保结束申请")
                    }else if(routerStep == 15) {
                        this.handleSetroute("项目立项")
                        this.handleSetroute("项目采购")
                        this.handleSetroute("项目执行")
                        this.handleSetroute("项目验收")
                        this.handleSetroute("项目维护", "技术指标验收")
                    }

                    
                    
                }else{
                    
                }
            })

            

            
        },

        handleSetroute(parentName, childName) {
            for(let i = 0; i < this.steps.length; i ++ ) {
                if(this.steps[i].title == parentName) {
                    if(childName) {
                        this.steps[i].active = true
                        this.steps[i].hasNow = true
                        for(let j = 0; j < this.steps[i].children.length; j ++) {
                            if(this.steps[i].children[j].title == childName) {
                                this.steps[i].children[j].status = true
                            }   
                        }

                        if(!this.steps[i].active) {
                            // console.log(this.steps[i])
                            this.steps[i].children = []
                        }

                            
                    }else{
                        this.steps[i].active = true
                    }

                    if(this.steps[i].children && this.steps[i].children.length) {
                        for(let j = 0; j < this.steps[i].children.length; j ++) {
                            this.steps[i].children[j].path = this.steps[i].children[j].path + this.exparamsUrl
                            if(this.steps[i].children[j].status === true){
                                this.$router.push({
                                    path:this.steps[i].children[j].path
                                })
                                // location.hash= this.steps[i].children[j].path
                                
                            }
                        }
                    }
                    
                }
                
                
            }

            console.log(this.steps)

        },
 
        handleCommit(path) {
            
        },
        handleClose(){
            this.hasErrorTips = false
        },

        handleRouteUpdate(order) {
                console.log(order)
                console.log(this.sessionGet.status)
            if(this.sessionGet.status < order) {
                store.dispatch('commitChangeRouteUpdate',false)
                
            }else{
                store.dispatch('commitChangeRouteUpdate',true)
            }
            
        }
    },
    mounted() {
        sessionStorage.setItem('params', JSON.stringify(this.proInfo))
        this.exproInfo = store.state.proInfo
        this.exparamsUrl = this.paramsUrl
        store.dispatch('commitChangePath',this.exparamsUrl)
        this.handleToRoute()
        // console.log(this.steps)
    },

    destroyed(){
       
    },



    watch:{
         GethasUpdate(params) {
            console.log(params)
            if(params) {
                store.dispatch('commitChangeRouteUpdate',true)
                this.handleToRoute()
                store.dispatch('commitChangeUpdate',false)
            }
        }
    },

    computed:{
       GethasUpdate () {
           return store.state.hasUpdate
       }
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
                .et-steps-ul{
                    .et-tips{
                        position: absolute;
                        top: 2px;
                        left: 100px;
                        background-color: #fdf6ec;
                        font-size: 12px;
                        line-height: 20px;
                        color: #666;
                        border-radius: 4px;
                        padding: 2px 20px;
                        white-space: nowrap;
                        display: none;
                        i{
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            border-radius: 50%;
                            color: #FFFFFF;
                            background:#E6A23C;
                            text-align: center;
                            margin-right: 5px;
                            line-height: 15px;
                        }
                    }

                    .noHeight{
                        height: 0;
                        overflow: hidden;
                    }
                }
                .et-steps-ul>li:hover .et-tips{
                    display: block;
                }
                .et-steps-ul .et-default{
                    cursor: default;
                    .et-child-tips{
                        position: absolute;
                        top: 8px;
                        left: 100px;
                        background-color: #fdf6ec;
                        font-size: 12px;
                        line-height: 20px;
                        color: #666;
                        border-radius: 4px;
                        padding: 2px 20px;
                        white-space: nowrap;
                        display: none;
                        z-index: 2;
                        opacity: 0;     
                        transition: all .3s ease-in;                   
                        i{
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            border-radius: 50%;
                            color: #FFFFFF;
                            background:#E6A23C;
                            text-align: center;
                            margin-right: 5px;
                            line-height: 15px;
                        }
                    }
                }
                .et-steps-ul .et-default:hover{
                    .et-child-tips{
                        display: block;
                        opacity: 1;   
                    }
                }
                
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
                            
                            .router-link-exact-active,.router-link-active{
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