<template>
    <div id="project" ref="client">
        <div class="pj-left">
            <el-collapse class="nav-menu-wrapper" v-model="activeName" accordion>
                <el-collapse-item v-for="(i, ind) in menu" :key="ind" :name="ind + 1">
                    <template slot="title">
                        <div v-if="i.children.length" class="nav-menu">
                            <div class="nav-two-box">
                                <div class="nav-icon pub-css"></div>
                                <span class="nav-txt pub-family">{{i.item}}</span>
                            </div>
                            <img 
                            ref="transform" 
                            src="../../assets/img/more-L.png" 
                            alt="img"
                            :class="activeName == ind + 1?'nav-transform nav-more':'nav-more'"
                            v-if="i.children.length"
                            >
                        </div>
                        <router-link v-else tag="div" :to="i.path" class="nav-menu" @click="handleSetStore">
                            <div class="nav-two-box">
                                <div class="nav-icon pub-css"></div>
                                <span class="nav-txt pub-family">{{i.item}}</span>
                            </div>
                            <img 
                            ref="transform" 
                            src="../../assets/img/more-L.png" 
                            alt="img"
                            :class="activeName == ind + 1?'nav-transform nav-more':'nav-more'"
                            v-if="i.children.length"
                            >
                        </router-link>
                    </template>
                    <ul class="nav-children-item" v-if="i.children.length">
                        <li v-for="(i, ind) in i.children" :key="ind">
                            <router-link :to='i.path'>
                            {{i.title}}
                            </router-link>
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- 右边部分 -->
        <div class="pj-container" ref="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { getUrlParams } from '@/utils/util.js'
export default {
    props:[
        'navArray'
    ],
    data() {
        return {
            count:1,
            menu:[],
            activeName:1,
            screenWidth:document.body.clientWidth
        }
    },
    methods:{
       
        init() {
            this.$refs.client.style.height = window.innerHeight - 40 + 'px'
            this.$refs.container.style.height = window.innerHeight - 65 + 'px'
            
        },

        handlePush() {
            let id = getUrlParams('id')
            if(this.menu.length) {
                if(!id) {
                    let path ="";
                    if(this.menu[0].children.length){
                        path = this.menu[0].children[0].path;
                    }else{
                        path = this.menu[0].path;
                    }
             
                    this.$router.push({
                        path:path
                    })
                }else{

                }
                
            }
        },

        handleSetStore() {
            // store.dispatch('commitChangeRouteUpdate',true)
        }
    },

    mounted() {
        this.init();
        // console.log(this.screenWidth)
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                this.screenWidth = window.screenWidth
            })()
        }
        
    },

    created() { 
        
    },

    watch:{
        activeName(params) {
           //  console.log(params)
        },
        navArray(params){
            // console.log(params)
            this.menu = params
            // this.handlePush();
        },

        screenWidth(val) {
            if(!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    // console.log(that.screenWidth)
                    that.timer = false
                    that.init()
                },400)
            }
        }
    },
    directives:{
        trigger:{
            inserted(el,binging){
                el.click()
            }
        }
    },
    updated(){
        
    }
}
</script>

<style lang="less" scoped>
#project{
    height: 100%;
    background: #f9fafc;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    .pub-css{
        background: url('../../assets/img/css_sprites.png');
        background-size:440px 391px; 
    }
    .pj-left{
        min-width: 220px;
        background: #ffffff;
        box-shadow: 1px 0 4px 0 rgba(59,124,255,0.10);
        overflow-y: auto;
        &::-webkit-scrollbar-track-piece { 
            background-color:#ffffff;
        }
        &::-webkit-scrollbar{
            width: 2px;
        }
        &::-webkit-scrollbar-thumb
        {
            background-color:#ffffff;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        }

        // new nav components
        .nav-menu-wrapper{
            border: none;
            & /deep/ .el-collapse-item__header{
                border: none;
            } 
            .nav-menu{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .nav-more{
                    width: 10px;
                    height: 11px;
                    margin-right: 20px;
                    transition:all .2s ease-in;
                    transform-origin:center center;
                }
                .nav-transform{
                    display:inline-block;
                    transform-origin:center center;
                    transition:all .2s ease-in;
                    transform:rotate(-180deg)
                }
                .nav-icon{
                    width: 23px;
                    height: 24px;
                    background-position: -256px -264px;
                    margin-left: 40px;
                    margin-right: 10px;
                }
                .nav-txt{
                    font-size: 14px;
                    color: #3B4859;
                }
                .nav-two-box{
                    display: flex;
                    align-items: center;
                }
            }
            // 命中路由样式
            .router-link-exact-active,.router-link-active{
                background: #EBF1F9;
                border-right: 4px #3B7CFF solid;
                color: #3B7CFF;
            }
            & /deep/ .el-collapse-item__arrow{
                display: none;
            }
            .nav-children-item{
                width: 100%;
                li{
                    height: 50px;
                    a{
                        display: block;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        text-indent: 5.6em;
                        font-size: 13px;
                        color: #8998AC;
                        letter-spacing: 0;
                        border-right: 4px #ffffff solid;
                        white-space:nowrap; text-overflow:ellipsis; overflow:hidden;
                    }
                    // 命中路由样式
                    .router-link-exact-active,.router-link-active{
                        background: #EBF1F9;
                        border-right: 4px #3B7CFF solid;
                        color: #3B7CFF;
                    }
                }
            }
            & /deep/ .el-collapse-item__content{
                padding-bottom: 0;
            }
            & /deep/ .el-collapse-item__wrap{
                border-bottom: none;
            }
        }
        
    }

    // 右边部分
    .pj-container{
        flex: 2;
        padding: 10px 15px 0;
        background: #f9fafc;
        overflow-y: auto;
    }
}
</style>


