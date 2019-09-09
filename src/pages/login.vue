<template>
    <div id="demo">
		<div id="nav">
			<img src="../assets/img/LOGO.png" alt="logo" class="lg-logo">

			<div class="lg-container">
				<p class="lg-title">项目管理平台</p>
				<div class="lg-wrapper">
					<div class="lg-icon pub-css lg-icon-1 "></div>
					<el-input v-model="acount" placeholder="工号" autofocus @keyup.enter.native="login"></el-input>
				</div>
				<div class="lg-wrapper">
					<div class="lg-icon pub-css lg-icon-2 "></div>
					<el-input v-model="password" placeholder="密码" type="password" @keyup.enter.native="login"></el-input>
				</div>

				<el-row>
					<el-button @click="login" type="primary" round>登录系统</el-button>
				</el-row>
				<p class="lg-txt">技术支持：西安交通大学网络信息中心  服务热线：82667918</p>
			</div>
		</div>
	</div>
</template>

<script>
import { setSession } from '../utils/util.js'
import { handleLogin } from '../utils/api.js'
export default {
    data() {
        return {
            acount: '',
			password:'' 
        }
    },
    methods:{
        pubmes(msg, tips, type){
            this.$alert(msg, tips, {
                confirmButtonText: '确定',
                callback: action => {
                    
                }
            });
        },
        login() {
            if(!this.acount || !this.password){
				this.pubmes('工号或密码错误，请重新输入！', '提示', 'info');
            }else{

				let param={
					userName:this.acount,
					password:this.password
				}
				handleLogin(param).then((res) => {
					let data = res.data
					if(res.code == "00000") {	
						setSession('token',true);
						setSession('userName', data.userName)
						setSession('userid', data.id)
						this.$router.push({
							path:'/stage?pid=c63413dae6034485b7cb6275f78c0091'
						})
					}else{
						this.pubmes(data.message);
					}
				})
				.catch((err) => {
					this.pubmes('响应失败');
				})
            }           
        }
	},
	
	mounted() {
		
	}
}
</script>

<style lang="less" scoped>
#demo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('../assets/img/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  overflow: hidden;
}
.pub-css{
	background: url('../assets/img/css_sprites.png');
	background-size:440px 391px; 
}

// 路由样式高亮
// font-weight: bold;
// color: #2c3e50;
// &.router-link-exact-active {
//   color: #42b983;
// }

#nav {
	overflow-y: auto;
	.lg-logo {
		display: block;
		width: 360px;
		height: 96px;
		margin: 60px 0 0 90px;
	}
	.lg-container{
		width: 360px;
		height: 340px;
		background: #ffffff;
		box-shadow: 0 2px 4px 0 #D0D0D0;
		border-radius: 4px;
		margin: 124px 0 0 200px;
		overflow: hidden;
		.lg-title{
			font-size: 24px;
			color: #39475B;
			letter-spacing: 0;
			margin: 30px 0 30px 30px;
			text-align: left;
		}
		.lg-wrapper{
			width: 320px;
			height: 50px;
			border: 1px solid #F0F3F7;
			border-radius: 4px;
			margin: 0 auto 20px;
			display: flex;
			overflow: hidden;
			.lg-icon{
				width: 24px;
				height: 22px;
				justify-content: start;
				margin: 13px 0px 0 15px;
			}
			& /deep/ .el-input__inner{
				border: none!important;
				margin: 5px 0 5px 0;
			}
			.lg-icon-1{
				background-position:-312px -313px; 
			}
			.lg-icon-2{
				background-position:-375px -127px; 
			}
		}
		.el-row button{
			width: 320px;
			height: 42px;

		}
		.el-button--primary{
			background-color:#3B7CFF;
		}
		.lg-txt{
			font-size: 12px;
			color: #8998AC;
			letter-spacing: 0;
			margin:30px auto 18px;
		}
	}
}
.el-message-box{
	& /deep/ .el-button--primary{
		background-color: #3B7CFF;
	}
	& /deep/ .el-button--primary:hover{
		background-color: #3B7CFF;
	}
}
</style>



