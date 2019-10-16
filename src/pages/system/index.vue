<template>
    <LeftMenu :navArray='navArray' />
</template>

<script>
import LeftMenu from '@/components/Common/LeftMenu'
import { getUrlParams,getSession } from '../../utils/util';
export default {
    components:{
        LeftMenu
    },
    data() {
        return {
            navArray:[]
        }
    },
    mounted (){
         this.getPower2();
    },
    methods:{
        getPower2(){ //获取用户系统管理下的2级权限
            var pid=getUrlParams("pid");
            var param={powerId:pid}
            this.$http.post("/api/user/getUserPowerLevelTwo",param
                ).then((res) =>{
                    if(res.code!="10001"){
                        var list=[];
                        var dataMsg=res.data;
                        for(var i=0;i<dataMsg.length;i++){
                            var l={};
                            l["item"]=dataMsg[i].name;
                            if(dataMsg[i].url){
                               l["path"]=dataMsg[i].url;
                            }
                            var ls=dataMsg[i].list;
                            if(ls){
                               var Clist=[];                                   
                               for(var j=0;j<ls.length;j++){
                                  var cl={};
                                   cl["title"]=ls[j].name;
                                   cl["path"]=ls[j].url;
                                   Clist[j]=cl;
                               }
                                 l["children"]= Clist;
                            }else{      
                                 l["children"]=[];
                            }
                            l["isChildren"]="false";
                            list[i]=l; 
                        }
                        this.navArray=list;
                        this.$forceUpdate()                                      
                    }    
            })          
        }
    },
    watch:{

    }
}
</script>

<style lang="less" scoped>

</style>