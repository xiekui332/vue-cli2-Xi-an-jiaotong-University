<template>
    <div id="situatio">
        <div class="si-wrapper">
            <div class="si-block">
                <span class="si-icon pub-css si-icon-one"></span>
                <div class="si-box">
                    <p class="pub-family si-title">项目总数</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-two"></span>
                <div class="si-box">
                    <p class="pub-family si-title">采购阶段</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-three"></span>
                <div class="si-box">
                    <p class="pub-family si-title">验收阶段</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-four"></span>
                <div class="si-box">
                    <p class="pub-family si-title">维保阶段</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
            <div class="si-block">
                <span class="si-icon pub-css si-icon-five"></span>
                <div class="si-box">
                    <p class="pub-family si-title">待退保</p>
                    <p class="si-normal"><span>28</span>个</p>
                </div>
            </div>
        </div>

        <div class="si-list-wrapper">
            <HeaderSearch />
        </div>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'

export default {
    components:{
        HeaderSearch
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
#situatio{
    .si-wrapper{
        width: 100%;
        height: 148px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .si-block{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .si-icon{
                display: inline-block;
                width: 32px;
                height: 32px;
                
                margin-right: 30px;
            }
            .si-icon-one{
                background-position: -315px -68px;
            }
            .si-icon-two{
                background-position: -315px -168px;
            }
            .si-icon-three{
                background-position: -10px -312px;
            }
            .si-icon-four{
                background-position: -315px -120px;
            }
            .si-icon-five{
                background-position: -210px -264px;
            }
            .si-title{
                font-size: 14px;
                color: #39475B;
            }
            .si-normal{
                font-size: 14px;
                color: #39475B;
                span{
                    font-size: 42px;
                    color: #3B7CFF;
                    padding: 0 5px;
                }
            }
            .si-box{
                display: flex;
                flex-direction:column;
                align-items: center;
            }
        }
    }
    .si-list-wrapper{
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        padding: 20px;
    }
}
</style>