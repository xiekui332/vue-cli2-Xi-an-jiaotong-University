<template>
    <!-- 执行中项目查看 -->
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' :parentRoute='parentRoute' :proInfo="proInfo" :paramsUrl="paramsUrl" />
    <div id="detail" v-else>
        <HeaderSearch 
            :options1='options1' 
            :options2='options2' 
            :options3='options3' 
            :options4='options4'
            :options5='options5'
            :select1 = 'select1' 
            :select2 = 'select2' 
            :select3 = 'select3' 
            :select4 = 'select4' 
            :searchTex = 'searchTex'
            @handleSearchRes = 'handleSearchRes'
            @handleChangeStatus='handleChangeStatus'
            :type='type'
        />

        <div class="de-tips">
            <i class="pub-css de-icon"></i>
            <p class="de-tips-txt">项目总计 <span>{{allCount.a}}</span> 项   立项阶段 {{ allCount.b }} 项  采购阶段 {{ allCount.c }} 项  执行阶段 {{ allCount.d }} 项   验收阶段 {{ allCount.e }} 项   维保阶段 {{ allCount.f }} 项</p>
        </div>

        <ul class="de-items">
            <li class="de-item" v-for="(i, ind) in pageList" :key="ind">
                <!-- <div class="de-item-order">
                    {{ind + 1}}
                </div> -->
                <div class="de-item-name">
                    <p class="de-item-name-title">{{i.name?i.name:'暂无'}}</p>
                    <p class="de-item-name-time"><span>{{i.no?i.no:'暂无'}}</span> | <span>{{i.createTime?i.createTime:'暂无'}}</span></p>
                </div>
                <div class="de-item-num">
                    <span>中标</span>
                    <span><span>{{i.zbje?i.zbje:'0.00'}}</span>万</span>
                </div>
                <div class="de-item-percent">
                    <p>
                        <span>{{isNaN(i.yfje/i.zbje)?0.00:(i.yfje/i.zbje).toFixed(2)*100}}%</span>
                        <span>{{i.projectStateName?i.projectStateName:'暂无'}} | {{i.projectNodeName?i.projectNodeName:'暂无'}}</span>
                    </p>
                    <el-progress :percentage="isNaN(i.yfje/i.zbje)?0:(i.yfje/i.zbje).toFixed(2)*100" :format="format"></el-progress>
                </div>
                <div class="de-item-btn" @click="handleLook(i.id)">
                    查看
                </div>

                <!-- <div class="pub-css de-back"></div> -->
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import ExcutingDetail from '@/components/ExcutingDetail'
import { splitUrl } from '../../utils/util.js'
import { store } from '@/store'
export default {
    // 注册组件
    components:{
        HeaderSearch,
        ExcutingDetail
    },
    data() {
        return {
            options1: [],
            options2: [     // 项目类型
                {}
            ],
            options3: [     // 经费来源
                {}
            ],
            options4: [     // 项目状态
                {}],
            options5: [     // 项目节点
                {}
            ],
            select1: '',
            select2: '',
            select3: '',
            select4: '',
            searchTex:'',
            hasExcutingDetail:false,
            type:'excuting',
            parentRoute:'/proj',
            statusList1:[],
            pageList:[],
            allCount:{},
            proInfo:{},
            paramsUrl:''
        }
    },
    methods:{
        format(percentage) {
            return percentage === 100 ? '' : ``;
        },

        handleSearchRes(params) {
            this.$http.post("/api/project/getProjectZXZList", params)
            .then((res) => {
                this.pageList = []
                if(res.code == "00000") {
                    this.pageList = res.data
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
            
            let obj = {}
            obj.year = params.year
            obj.yeprojectTypear = params.projectType
            obj.fundsSources = params.fundsSources
            obj.searchText = params.searchText
            this.getProjectStateCount(obj)

        },

        handleLook(id) {
            this.getProjectMsgById(id)
        },

        getProjectMsgById(id){
            let params = {
                id:id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
                if(res.code === '00000') {
                    this.proInfo = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.hasExcutingDetail = true;
                }else{
                    this.$message.error(res.message);
                }
            })
        },

        
        getPastYear(n) {
            for(let last = new Date().getFullYear(), i = last - n; i <= last; i ++ ) {
                // unshift 插入到数组开头
                this.options1.unshift({
                    value:i,
                    label:i + ' 年'
                })
            }
        },

        getFundsSource(){
            let params = {}
            this.$http.post('/api/project/getFundsSource')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.options3 = []
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.options3.push(obj)
                        }
                    }
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },

        getStatusAndNodes() {
            this.$http.post("/api/template/getStatusAndNodes", {})
            .then((res) => {
                if(res.code == '00000') {
                    this.statusList1 = res.data
                    this.options4 = [{'value':"0",'label':"全部"}]
                    if(this.statusList1.length) {
                        for(var a=0;a<this.statusList1.length;a++){
                            var msg={};
                            msg['value']=this.statusList1[a].id;
                            msg['label']=this.statusList1[a].name;
                            this.options4.push(msg);
                        } 
                    }
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },
        
        handleChangeStatus(param){
           if(param==0){
                this.options5=[{'value':"0",'label':"全部"}]
           }else{
                var list=this.statusList1;
                for(var i=0;i<list.length;i++){
                    if(list[i].id==param){
                        var nodeList=list[i].list;
                        this.options5=[{'value':"0",'label':"全部"}]
                            for(var j=0;j<nodeList.length;j++){
                                    var msg={};
                                    msg['value']=nodeList[j].id;
                                    msg['label']=nodeList[j].name;
                                    this.options5.push(msg);
                            }
                            
                    }
                }
           }
        },

        getProjectType(){
            this.$http.post('/api/project/getProjectType')
            .then((res) => {
                if(res.code === '00000'){
                    if(res.data.length){
                        this.options2 = [{"value":"全部","lable":"0"}];
                        for(let i = 0; i < res.data.length; i ++){
                            let obj = {}
                            obj.label = res.data[i].name
                            obj.value = res.data[i].id
                            this.options2.push(obj)
                        }
                    }
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },

        getProjectStateCount(params) {
            this.$http.post("/api/project/getProjectStateCount", params)
            .then((res) => {
                if(res.code == "00000") {
                    let n = 0
                    for(let i = 0; i < res.data.length; i ++ ) {
                        n += res.data[i]
                    }
                    this.allCount.a = n
                    this.allCount.b = res.data[0]
                    this.allCount.c = res.data[1]
                    this.allCount.d = res.data[2]
                    this.allCount.e = res.data[3]
                    this.allCount.f = res.data[4]
                }else{
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },

        init() {
            
        }
    },
    mounted() {
        this.getPastYear(20)
        this.getFundsSource()
        this.getStatusAndNodes()
        this.getProjectType()
        this.init()
        this.paramsUrl = splitUrl('?')
        // console.log(splitUrl('?'))
    },
    watch:{
        '$route'(to, from) {
            if(to.name === 'excuting') {
                this.hasExcutingDetail = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
#detail{
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #EFF2F7;
    border-radius: 4px;
    padding: 20px;
    min-height: 100%;
    .pub-css{
        background: url('../../assets/img/css_sprites.png');
        background-size:440px 391px; 
    }
    

    .de-tips{
        height: 36px;
        background: #D0ECFF;
        border-radius: 4px;
        
        .de-icon{
            display: block;
            width: 20px;
            height:20px;
            border-radius: 50%;
            background-position: -376px -10px;
            margin: 8px 5px 0 20px;
            float: left;
        }
        .de-tips-txt{
            font-size: 12px;
            color: #6F7C84;
            letter-spacing: 0;
            line-height: 36px;
            float: left;
            span{
                font-size: 14px;
                color: #3B7CFF;
            }
        }
    }
    
    .de-items{
        display: block;
        .de-item{
            width: 100%;
            height: 88px;
            box-shadow: 0 0 6px 1px rgba(0,0,0,0.09);
            border-radius: 4px;
            margin-top: 10px;   
            display: flex;
            justify-content: flex-start;
            position: relative;
            // overflow: hidden;
            >div{
                height: 100%;
                float: left;
            }
            .de-item-order{
                font-size: 14px;
                color: #7887A7;
                line-height: 88px;
                margin: 0 0 0 15px;
            }
            .de-item-name{
                width: 380px;
            }
            .de-item-num{
                width: 240px;
                >span{
                    line-height: 88px;
                }
                >span:nth-child(1){
                    font-size: 14px;
                    color: #7887A7;
                }
                >span:nth-child(2){
                    font-size: 14px;
                    color: #FE5959;
                    span{
                        font-size: 32px;
                        padding: 0 5px;
                    }
                }
            }
            .de-item-percent{
                width: 404px;
                >p:nth-child(1){
                    margin: 30px 0 0 0;
                    >span:nth-child(1){
                        font-size: 18px;
                        color: #8998AC;
                        letter-spacing: 0;
                    }
                    >span:nth-child(2){
                        font-size: 12px;
                        color: #404040;
                        letter-spacing: 1px;
                    }
                }
            }
            .de-item-btn{
                width: 50px;
                font-size: 12px;
                color: #3B7CFF;
                letter-spacing: 1px;
                cursor: pointer;
                line-height: 88px;
                margin-left: 30px;
                margin-right: 10px;
            }
            .de-item-name-title{
                font-size: 18px;
                color: #404040;
                letter-spacing: 1px;
                margin: 23px 0 5px 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .de-item-name-time{
                margin: 0 0 0 20px;
                font-size: 12px;
                color: #404040;
                letter-spacing: 1px;
            }
            .de-back{
                width: 54px;
                height: 22px;
                background-position: -128px -214px;
                position: absolute;top: 0;
                right: 0;
            }
        }
    }
}


</style>