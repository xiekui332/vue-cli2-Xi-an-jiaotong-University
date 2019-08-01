<template>
    <!-- 执行中项目查看 -->
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' />
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
            @handleSearch = 'handleSearchRes'
        />

        <div class="de-tips">
            <i class="pub-css de-icon"></i>
            <p class="de-tips-txt">项目总计 <span>4</span> 项   立项阶段X项  采购阶段X项  执行阶段X项   验收阶段X项   维保阶段X项</p>
        </div>

        <ul class="de-items">
            <li class="de-item" v-for="(i, ind) in 10" :key="ind">
                <div class="de-item-name">
                    <p class="de-item-name-title">西安交通大学网信中心XXX项目</p>
                    <p class="de-item-name-time"><span>GS2019003</span> | <span>2019.06.01</span> ~ <span>2019.12.12</span></p>
                </div>
                <div class="de-item-num">
                    <span>中标</span>
                    <span><span>20.00</span>万</span>
                </div>
                <div class="de-item-percent">
                    <p>
                        <span>68%</span>
                        <span>采购 | 需求论证</span>
                    </p>
                    <el-progress :percentage="68" :format="format"></el-progress>
                </div>
                <div class="de-item-btn" @click="handleLook">
                    查看
                </div>

                <div class="pub-css de-back"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import ExcutingDetail from '@/components/ExcutingDetail'
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
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '软件项目'
                }, {
                    value: '2',
                    label: '硬件项目'
                }, {
                    value: '3',
                    label: '集成项目'
                }, {
                    value: '4',
                    label: '服务项目'
                }, {
                    value: '5',
                    label: '工程项目'
                }
            ],
            options3: [     // 经费来源
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '改善办学条件'
                }, {
                    value: '2',
                    label: '一流大学'
                }, {
                    value: '3',
                    label: '校级专项'
                }, {
                    value: '4',
                    label: '课题经费'
                }, {
                    value: '5',
                    label: '银行投资经费'
                }, {
                    value: '6',
                    label: '其他'
                }
            ],
            options4: [     // 项目状态
                {
                    value: '0',
                    label: '全部'
                }, {
                    value: '1',
                    label: '项目立项'
                }, {
                    value: '2',
                    label: '项目采购'
                }, {
                    value: '3',
                    label: '项目执行'
                }, {
                    value: '4',
                    label: '项目验收'
                }, {
                    value: '5',
                    label: '项目维保'
                }
            ],
            options5: [     // 项目节点
                {
                    value: '0',
                    label: '全部'
                },{
                    value: '1',
                    label: '需求论证'
                },{
                    value: '2',
                    label: '采购申请'
                },{
                    value: '3',
                    label: '采购会'
                },{
                    value: '4',
                    label: '合同签订'
                }
            ],
            select1: '',
            select2: '',
            select3: '',
            select4: '',
            searchTex:'',
            hasExcutingDetail:false,
            type:'excuting',
        }
    },
    methods:{
        format(percentage) {
            return percentage === 100 ? '' : ``;
        },

        handleSearchRes(params) {
            // console.log(params)
        },

        handleLook() {
            this.hasExcutingDetail = true;
        },
        
        getPastYear(n) {
            for(let last = new Date().getFullYear(), i = last - n; i <= last; i ++ ) {
                // unshift 插入到数组开头
                this.options1.unshift({
                    value:i,
                    label:i + ' 年'
                })
            }
        }
    },
    mounted() {
        this.getPastYear(20)
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