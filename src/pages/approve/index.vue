<template>
    <LeftMenu :navArray='navArray' />
</template>

<script>
import LeftMenu from '@/components/Common/LeftMenu';
import { getUrlParams,getSession } from '../../utils/util';
export default {
    components:{
        LeftMenu
    },
    data() {
        return {
            navArray:[
            ]
        }
    },
    mounted (){
         this.getPower2();
    },
    methods:{
        getPower2(){ //获取用户系统管理下的2级权限
            var pid=getUrlParams("pid");
            var param={powerId:pid}
            this.$http.post("/api/user/getUserPowerLevelTwo",param).then((res) =>{
                    if(res.code!="10001"){
                        var list=[];
                        var dataMsg=res.data;
                        var msg={};
                        msg["item"]="审批";
                        msg["isChildren"]=false;
                        var li=[];
                        for(var i=0;i<dataMsg.length;i++){ 
                            var limsg={};
                            limsg["title"]=dataMsg[i].name;
                            limsg["path"]=dataMsg[i].url;
                            li[i]=limsg;
                        }
                        msg["children"]=li;
                        list[0]=msg;
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