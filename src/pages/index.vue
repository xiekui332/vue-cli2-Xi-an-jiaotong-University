<template>
    <div id="manage">
        <div class="ma-header">
            <div class="ma-logo-box">
                <div class="ma-logo">
                    <img src="../assets/img/logo.png" alt="">
                </div>
                <p class="ma-title">项目管理</p>
                <div class="ma-header-navs">
                    <ul class="ma-header-ul">
                        <li v-for="(i, ind) in nav" :key="ind">
                            <!-- <router-link :to='i.path'> -->
                                <a href="javascript:;" @click="handleNav(i, ind)" :class="i.active?'router-link-exact-active router-link-active':''">
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
                                </a>
                            <!-- </router-link> -->
                            <span class="ma-transparent"></span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="ma-info">
                <el-dropdown @command='handleCommand' trigger="click" >
                    <span class="el-dropdown-link">
                        {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="handlelogout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </div>

        <router-view/>
    </div>
</template>

<script>
import { clearSession, getSession, setSession } from '../utils/util.js'
export default {
    data() {
        return {
            nav:[],
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
                     msg["active"] = false
                     msg["id"] = msglist[i].id;
                     list[i]=msg;
                   }
                   this.nav=list;
                   this.init()
               }
            })
        },

        init() {
            this.nav[Number(getSession('subMeneNum'))].active = true
        },

        handleNav(i, ind) {
            for(let i = 0;i < this.nav.length; i ++) {
                this.nav[i].active = false
            }
            i.active = true
            setSession('subMeneNum', ind)

            if(i.id == "c63413dae6034485b7cb6275f78c0091") {
                this.$router.push({
                    path:i.path
                })

                return false
            }
            
            let param={
                powerId:i.id
            }

            this.$http.post("/api/user/getUserPowerLevelTwo",param).then((res) =>{
                if(res.code!="10001"){
                    var dataMsg=res.data;
                    
                    if(dataMsg.length) {
                        if(dataMsg[0].list) {
                            this.$router.push({
                                path:dataMsg[0].list[0].url
                            })
                        }else{
                            this.$router.push({
                                path:dataMsg[0].url
                            })
                        }
                        
                    }
                    
                }    
            })

        }
    },
    mounted() {
        this.getmeneOne();
        
    },

    computed: {
        
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
        // height: 64px;
        height: 40px;
        background: #004E97;
        position: relative;
        .ma-logo-box{
            display: flex;
            align-items: center;
            height: 100%;
            .ma-logo{
                width: 30px;
                height: 30px;
                margin: 0 10px 0 43px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .ma-title{
                // line-height: 64px;
                line-height: 40px;
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
                        // line-height: 64px;
                        line-height: 40px;
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
                // line-height: 64px;
                line-height: 40px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
            }
        }
    }
}


</style>