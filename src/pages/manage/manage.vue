<template>
    <div class="ag-wrapper">
        <div id="stage" ref="stage">
            <div class="ag-item" @click="handleSee(1)">
                <img class="pro-img" src="../../assets/img/lixiang.png" alt="图片">
                <div class="pro-count">
                    <p class="text-color1">{{lists.lxCount?lists.lxCount:"0"}}</p>
                    <p class="pub-family">立项阶段</p>
                </div>
                <a href="javascript:;">查看</a>
            </div>
            <div class="ag-item" @click="handleSee(2)">
                <img class="pro-img" src="../../assets/img/caigou.png" alt="图片">
                <div class="pro-count">
                    <p class="text-color2">{{lists.cgCount?lists.cgCount:"0"}}</p>
                    <p class="pub-family">采购阶段</p>
                </div>
                <a href="javascript:;">查看</a>
            </div>
            <div class="ag-item" @click="handleSee(3)">
                <img class="pro-img" src="../../assets/img/yanshou.png" alt="图片">
                <div class="pro-count">
                    <p class="text-color3">{{lists.ysCount?lists.ysCount:"0"}}</p>
                    <p class="pub-family">验收阶段</p>
                </div>
                <a href="javascript:;">查看</a>
            </div>
            <div class="ag-item" @click="handleSee(4)">
                <img class="pro-img" src="../../assets/img/weibao.png" alt="图片">
                <div class="pro-count">
                    <p class="text-color4">{{lists.wbCount?lists.wbCount:"0"}}</p>
                    <p class="pub-family">维保阶段</p>
                </div>
                <a href="javascript:;">查看</a>
            </div>
            <div class="ag-item" @click="handleSee(5)">
                <img class="pro-img" src="../../assets/img/daishenpi.png" alt="图片">
                <div class="pro-count">
                    <p class="text-color5">{{lists.dspCount?lists.dspCount:"0"}}</p>
                    <p class="pub-family">待审批</p>
                </div>
                <a href="javascript:;">查看</a>
            </div>
        </div>
        <el-row class="ag-badge">
            <el-badge :value="msgNum" class="item"></el-badge>
            <el-button type="primary" round @click="handleToapprove">
                待审批信息
            </el-button>
        </el-row>
    </div>
</template>

<script>
import { store } from '@/store'
export default {
    data() {
        return {
            msgNum:0,
            lists:{}
        }
    },
    methods:{
        handleToapprove() {
            var params={type:"2"};
            this.$http.post("/api/project/getIndexAuth",params).then((res) =>{
                if(res.code=="00000"){
                    this.$router.push({
                        path:res.data
                    })
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        init() {
            let params = {
                
            }

            this.$http.get("/api/project/getProjectCountByStatus")
            .then((res) => {
                if(res.code == "00000") {
                    this.lists = res.data
                }else{
                    this.$message({
                        type:"error",
                        message:res.message
                    })
                }
            })
            .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        },

        handleSee(type) {
            if(type == 5) {
                var params={type:"2"};
                this.$http.post("/api/project/getIndexAuth",params).then((res) =>{
                    if(res.code=="00000"){
                        this.$router.push({
                            path:res.data
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })

            }else{
                var params={type:"1"};
                this.$http.post("/api/project/getIndexAuth",params).then((res) =>{
                    if(res.code=="00000"){
                        this.$router.push({
                            path:"/proj/excuting?pid=b83ce29ef56849b8b43a51293e2faf00&id=f2ed28e9b1f9426eb65ebd5a81e841a4"
                        })
                        store.dispatch('commitChangeExcutStatus',type)
                    }else{
                        this.$message.error(res.message);
                    }
                })
                
            }
            
        },

        getCount() {
            this.$http.post("/api/project/getDSpProjectCount", {})
            .then((res) => {
                if(res.code == "00000") {
                    this.msgNum = res.data
                }else{

                }
            })
            .catch((err) => {
                this.$message({
                    type:"error",
                    message:err.message
                })
            })
        }
    }, 
    mounted() {
        this.init()
        this.getCount()
    },

    created() {
        // define fontSize
        if (window.screen.availWidth <= 750) {
            document.documentElement.style.fontSize = (100 / 750 * window.screen.availWidth) + 'px';
        } else {
            document.documentElement.style.fontSize = '100px';
        }
    }
}
</script>

<style lang="less" scoped>
.ag-wrapper{
    .ag-badge{
        position: fixed;
        right: 0px;
        bottom: 0px;
    }
    background: #fafafa;
}
#stage{
    display: flex;
    justify-content: flex-center;
    align-content:space-between;
    flex-wrap: wrap;
    padding: 100px 0px 0;
    width: 1200px;
    margin: 0 auto;
}
.ag-item{
    float: left;
    width: 3.4rem;
    background: #fff;
    height: 2rem;
    box-shadow: 0 9px 35px 4px rgba(0,0,0,0.03);
    border-radius: 4px;
    margin: 0 .3rem 60px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    // &:nth-child(3n+1){
    //     margin-left: 0;
    // }
    // &:nth-child(3n){
    //     margin-right: 0;
    // }
    .pro-img{
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        top: 65px;
        left: 50px;
    }
    .pro-count{
        p:nth-child(1){
            font-size: 36px;
        }
        p:nth-child(2){
            margin-top: -5px;
            font-size: 14px;
            color: #39475B;
        }
        position: absolute;
        top: 70px;
        left: 170px;
        .text-color1{
            color: #8280FF;
        }
        .text-color2{
            color: #4AD991;
        }
        .text-color3{
            color: #23A9F2;
        }
        .text-color4{
            color: #FFA131;
        }
        .text-color5{
            color: #FF6E6E;
        }
    }
    a{
        position: absolute;
        top: 15px;
        right: 10px;
        font-size: 14px;
        color: #999999;
    }
}
.el-row button{
    width: 128px;
    height: 38px;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 1.23px;
    background: #3B7CFF;
    position: absolute;
    right: 50px;
    bottom: 60px;
    z-index: 1;
}
.el-row .item{
    position: absolute;
    right: 150px;
    bottom: 80px;
    z-index: 2;
    & /deep/ .el-badge__content{
        background: #FE5959;
    }
}
</style>


