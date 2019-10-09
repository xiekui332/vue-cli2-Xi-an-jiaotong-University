<template>
<!-- 执行中项目查看 -->
    <ExcutingDetail v-if="hasExcutingDetail" :type='type' :parentRoute='parentRoute' :proInfo="proInfo" :paramsUrl="paramsUrl" />
    <div id="tracking" v-else>
        <div class="tr-wrapper">
            <div class="tr-head">
                <HeaderSearch :optionsDate='optionsDate' @handleSearchRes='handleSearchRes' :type='type' />
            </div>
            
            <el-divider></el-divider>

            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :stripe='true'>
                <el-table-column 
                    v-for="(i, ind) in tablekind"
                    :key="ind"
                    :prop="i.prop"
                    :label="i.label"
                    :min-width="i.width"
                    show-overflow-tooltip>
                </el-table-column>
                
                <el-table-column
                    prop=""
                    label="操作"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">
                        <div class="ma-icon ma-todo" @click="trackingDetail(scope.row)">
                            详情
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <CommPage :hasPage='hasPage' :total="total"  @handlePageUp='handlePageUp' @handlePageRows='handlePageRows'/>
        </div>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
import CommPage from '@/components/CommPage'
import ExcutingDetail from '@/components/ExcutingDetail'
import { splitUrl } from '../../utils/util.js'
import { store } from '@/store'
export default {
    components:{
        HeaderSearch,
        CommPage,
        ExcutingDetail
    },
    data() {
        return {
            optionsDate:[
                {
                    value:'0',
                    label:'已到期'
                },
                {
                    value:'7',
                    label:'剩余7天'
                },
                {
                    value:'30',
                    label:'剩余30天'
                }


            ],
            type:'tracking',
            parentRoute:'/proj',
            tableData:[],
            tablekind:[
                {
                    prop:'RNUM',
                    label:'序号',
                    width:'40'
                },
                {
                    prop:'no',
                    label:'项目编号',
                    width:'80'
                },
                {
                    prop:'name',
                    label:'项目名称',
                    width:'200'
                },
                {
                    prop:'zbje',
                    label:'中标金额',
                    width:'60'
                },
                {
                    prop:'repairEndTime',
                    label:'维保结束日期',
                    width:'90'
                },
                {
                    prop:'projectStateNodeName',
                    label:'项目状态',
                    width:'90'
                },
                {
                    prop:'leaderNames',
                    label:'负责人',
                    width:''
                },
                {
                    prop:'projectTypeName',
                    label:'类型',
                    width:''
                }
            ],
            hasPage:true,
            hasExcutingDetail: false,
            page:1,
            rows:10,
            total:0,
            days:'',
            tex:'',
            proInfo:{},
            paramsUrl:''
        }
    },

    methods:{
        handleSearchRes(params) {
             this.days=params.days;
             this.tex=params.tex;
             this.init();
        },
        handleTrackLook() {
            this.hasExcutingDetail = true
        },
        trackingDetail(msg){
            this.getProjectMsgById(msg.id);
        }, 
        getProjectMsgById(id){
            let params = {
                id:id
            }
            this.$http.post('/api/project/getProjectMsgById', params)
            .then((res) => {
              //  console.log(res)
                if(res.code === '00000') {
                    this.proInfo = res.data
                    store.dispatch('commitChangeProInfo',res.data)
                    this.hasExcutingDetail = true;
                }else{
                    this.$message.error(res.message);
                }
            })
        },    
        handlePageUp(params) {
         this.page=params;
         this.init();
        },
        handlePageRows(params){
         this.rows=params;
         this.init();
        },
        init(){
          var params={datas:this.days,searchText:this.tex,page:this.page,rows:this.rows};
          this.$http.post("/api/project/wkgzList",params).then(res =>{
             if(res.success==true){
                 this.tableData=res.rows;
                 this.total=res.total;
             }else{
                 this.$message.error(res.message);
             }
          })
        }
    },

    mounted() {
        this.paramsUrl = splitUrl('?')
    },
    beforeRouteEnter(to,from,next) {
        
        next((vm => {
            vm.hasExcutingDetail = false
        }))
    },
    watch:{
        '$route'(to, from) {
            if(to.name === 'tracking') {
                this.hasExcutingDetail = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
#tracking{
    background: #ffffff;
    padding: 0px 20px 0;
    height: 100%;
    .tr-wrapper{
        .el-divider--horizontal{
            margin: 5px 0;
            background: #F0F3F7;
        }
    }
}
.ma-todo{
     color: #3B7CFF!important;
     cursor:pointer;
}
</style>