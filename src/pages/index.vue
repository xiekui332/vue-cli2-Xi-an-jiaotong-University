<template>
    <div id="manage">
        <div class="ma-header">
            <div class="ma-logo-box">
                <div class="pub-css ma-logo"></div>
                <p class="ma-title">项目管理</p>
                <div class="ma-header-navs">
                    <ul class="ma-header-ul">
                        <li v-for="(i, ind) in nav" :key="ind">
                            <router-link :to='i.path'>
                                <i class="ma-icon" v-if="i.title ==='总览'">
                                    <img src="../assets/svg/zonglan.svg" alt="">
                                </i>
                                <i class="ma-icon" v-else-if="i.title ==='项目'">
                                    <img src="../assets/img/icon/xiangmu.png" alt="">
                                </i>
                                <i class="ma-icon" v-else-if="i.title ==='审批'">
                                    <img src="../assets/img/icon/shenpi.png" alt="">
                                </i>
                                <i class="ma-icon" v-else-if="i.title ==='系统管理'">
                                    <img src="../assets/img/icon/xitongguanli.png" alt="">
                                </i>
                                <p>{{i.title}}</p>
                            </router-link>
                            <span class="ma-transparent"></span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="ma-info">
                <el-dropdown @command='handleCommand'>
                    <span class="el-dropdown-link">
                        {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="handlelogout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </div>

        <router-view/>
    </div>
</template>

<script>
import { clearSession, getSession } from '../utils/util.js'
export default {
    data() {
        return {
            nav:[

            ],
            user:getSession('userName')
        }
    },
    methods:{
        handleCommand(command) {
            if(command === 'handlelogout') {
                this.$http.post("/api/user/logout").then(res =>{
                    if(res.code=="00000"){
                        clearSession()
                        this.$router.push({
                            path:'/'
                        })
                    }
                })

            }
            
        },
        getmeneOne(){
           this.$http.post("/api/user/getUserPowerLevelOne",{}).then(res =>{
               if(res.code=="00000"){

                    var list=[];
                    var msglist=res.data;
                   for(var i=0;i<msglist.length;i++){
                     var msg={};
                     msg["title"]=msglist[i].name;
                     msg["path"]=msglist[i].url;
                     list[i]=msg;
                   }
                   this.nav=list;
               }
            })
        },

        init() {
            let el = document.getElementsByClassName('ma-header-ul')[0]
            // console.log(el)
            
        }
    },
    mounted() {
        this.getmeneOne();
        this.init()
    }
}
</script>

<style lang="less" scoped>
#manage{
    
    .pub-css{
        background: url('../assets/img/css_sprites.png');
        background-size:440px 391px; 
    }
    height: 100%;
    .ma-header{
        height: 64px;
        background: #004E97;
        position: relative;
        .ma-logo-box{
            display: flex;
            align-items: center;
            height: 100%;
            .ma-logo{
                width: 40px;
                height: 40px;
                background-position: -316px -10px;
                margin: 0 10px 0 43px;
            }
            .ma-title{
                line-height: 64px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                margin-right: 111px;
            }
            .ma-header-navs{
                height: 100%;
                .router-link-exact-active,.router-link-active{
                     background: #3B7CFF;
                    p{
                        color: #FFFFFF;
                    }
                }
                .router-link-exact-active + .ma-transparent{
                    display: block!important;
                }
                .router-link-active + .ma-transparent{
                    display: block!important;
                }
                >ul{
                    display: flex;
                }
                >ul>li{
                    justify-content: start;
                    position: relative;
                    .ma-transparent{
                        width: 0;
                        height: 0;
                        border: 5px solid;
                        border-color: transparent transparent #ffffff;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -2.5px;
                        display: none;
                    }
                }
                >ul>li:hover{
                    background: rgb(7, 56, 102);
                    transition: all .2s ease-in;
                }
                >ul>li>a{
                    display: flex;
                    align-items: center;
                    padding: 0 30px;
                    i{
                        display: inline-block;
                        width: 23px;
                        height: 23px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        margin-right: 10px;
                    }
                    p{
                        font-size: 14px;
                        color: rgb(176, 192, 224);
                        letter-spacing: 0;
                        line-height: 64px;
                    }
                }
                
                
            }
            
        }
        
        
        // user info
        .ma-info{
            position: absolute;
            right:25px;
            top: 0;
            height: 100%;
            .el-dropdown-link {
                cursor: pointer;
                color: #409EFF;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
            .el-dropdown{
                height: 100%;
            }
            .el-dropdown span{
                display: inline-block;
                height: 100%;
                line-height: 64px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
            }
        }
    }
}
</style>