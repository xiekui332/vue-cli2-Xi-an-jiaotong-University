<template>
    <div id="project" ref="client">
        <div class="pj-left">
            <div class="pj-wrapper" ref="allItem" v-for="(i, ind) in menu" :key="ind">
                <div class="pj-head" @click="handleDrop(ind, i.isChildren, i)">
                    <div class="pj-icon pub-css"></div>
                    <span class="pj-txt">{{i.item}}</span>
                    <img class="pj-more pj-transform" ref="transform" src="../../assets/img/more-L.png" alt="img">
                </div>
                
                <ul class="pj-children-item">
                    <li v-for="(i, ind) in i.children" :key="ind">
                        <router-link :to='i.path'>
                        {{i.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 右边部分 -->
        <div class="pj-container" ref="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'navArray'
    ],
    data() {
        return {
            count:1,
            menu:this.navArray
        }
    },
    methods:{
        handleDrop(ind, isChildren, i) {
            
            i.isChildren = !isChildren
            let ht = this.navArray[ind].children.length * 48 + 'px'
            this.$refs.allItem[ind].children[1].style.height = this.navArray[ind].isChildren ? ht : 0 + 'px';
            
            
            let str = this.$refs.allItem[ind].children[1].style.height;
            if(Number(str.slice(0, str.length - 2) > 0)) {
                this.$refs.transform[ind].style.transform = 'rotate('+ 180*this.count +'deg)'
            }else{
                this.$refs.transform[ind].style.transform = 'rotate('+ 0*this.count +'deg)'
            }
            
        },
        init() {
            this.$refs.client.style.height = window.innerHeight - 64 + 'px'
            this.$refs.container.style.height = window.innerHeight - 104 + 'px'
            
        }
    },

    mounted() {
        this.init()
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
        min-width: 240px;
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
        .pj-wrapper{
            .pj-head{
                height: 48px;
                position: relative;
                display: flex;
                justify-content:start;
                cursor: default;
                
            }
            .pj-children-item{
                transition: all ease-in .15s;
                width: 100%;
                height: 0;
                overflow: hidden;
                li a{
                    display: block;
                    text-indent: 5.6em;
                    line-height: 48px;
                    font-size: 13px;
                    color: #8998AC;
                    letter-spacing: 0;
                    transition: all .1s ease-in;
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
            .pj-icon{
                width: 23px;
                height: 24px;
                background-position: -256px -264px;
                margin: 12px 10px 0 40px;
            }
            .pj-txt{
                font-size: 14px;
                color: #3B4859;
                letter-spacing: 0;
                line-height: 48px;
            }
            .pj-more{
                width: 7px;
                height: 5px;
                position: absolute;
                right: 20px;
                top: 23px;
            }
            .pj-transform{
                display:inline-block;
                transform-origin:center center;
                transition:all .2s ease-in;
            }
        }
    }

    // 右边部分
    .pj-container{
        flex: 2;
        padding: 20px;
        background: #f9fafc;
        overflow-y: auto;
    }
}
</style>


