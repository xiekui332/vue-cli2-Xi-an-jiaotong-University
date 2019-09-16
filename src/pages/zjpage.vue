<script>
import { setSession, getSession, getUrlParams } from '../utils/util.js'
import { handleLogin } from '../utils/api.js'
export default {
    data() {
        return {
            acount: '',
			password:''
        }
    },
    methods:{
        togo(){
		  if(!token){
              var code=getUrlParams("code");
              var state=getUrlParams("state");
              var params={code:code,state:state};
			  this.$http.post("/api/user/backmsg",params).then(res =>{
				  if(res.code=="00000"){
					 	setSession('token',true);
						setSession('userName', data.userName)
						setSession('userid', data.id)
						this.$router.push({
							path:'/stage?pid=c63413dae6034485b7cb6275f78c0091'
						})
				  }
			  })
		  }

		}

	},
	
	mounted() {
		this.togo();
	}
}
</script>