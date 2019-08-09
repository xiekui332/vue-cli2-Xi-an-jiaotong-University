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
            navArray:[
                {
                    item:'模板管理',
                    children:[
                        {
                            title:'资料模板上传',
                            path:'/system/upload'
                        }
                    ],
                    isChildren:false
                },
                {
                    item:'用户管理',
                    children:[],
                    isChildren:false,
                    path:'/system/user'
                },
                {
                    item:'角色管理',
                    children:[],
                    isChildren:false,
                    path:'/system/role'
                },
                {
                    item:'日志与消息',
                    children:[],
                    isChildren:false,
                    path:'/system/log'
                }
            ]
        }
    },
    mounted:function(){
        this.getPower2();
    },
    methods:{
        getPower2(){ //获取用户系统管理下的2级权限
            var userId =getSession("token");
            if(userId!=null){
                userId= JSON.parse(getSession("user")).id;
            }
            var param={id:userId,powerId:"a27a5ddcd70c4b258879a87ad1b00950"}
            this.$http.post("/api/user/getUserPowerLevelTwo",param
                ).then((res) =>{
                    console.log(res)
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
                                   cl["item"]=dataMsg[j].name;
                                   cl["path"]=dataMsg[j].url;
                                   Clist[j]=cl;
                               }
                                 l["children"]= Clist;
                            }else{      
                                 l["children"]=[];
                            }
                            l["isChildren"]="false";
                          

                            list[i]=l; 
                        }
                        console.log(list);
                       this.nav=list;
                    }
     
            }) 
          
        }

        
    }
}
</script>

<style lang="less" scoped>

</style>