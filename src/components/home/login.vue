<template>
	<div class="login-wrap">
		<div class="ms-login">

			<div class="ms-title">人事档案管理系统</div>

			<el-form :model="form" ref="form" label-width="80px" class="ms-content">
				<el-form-item label="用户名">
					<el-input v-model="form.uid" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" placeholder="请输入密码" 
					v-model="form.pwd" @keyup.enter.native="onSubmit('form')">
					</el-input>
				</el-form-item>
				<el-checkbox-group class="el-checkbox-group" v-model="checkList">
					<el-checkbox style="margin-left: 80px;" label="记住密码" @click="remember()"></el-checkbox>
				</el-checkbox-group>
				<a href="#" class="a">忘记密码</a>
				<div class="login-btn">
					<el-button type="primary" @click="onSubmit('form')">登录</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				// 加载动效	
				fullscreenLoading: false,
				form: {
					uid: '',
					pwd: ''
				},
				checkList: ['复选框 A'],
				key: "",
				token: ""
			}
		},
		methods: {
			// 记住密码
			remember() {

			},
			onSubmit() {
				// 加载动效
				const loading = this.$loading({
					lock: true,
					text: '正在加载',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
					loading.close();
				}, 1000);
				
				/* 登录验证 */
				// 后端网址
				let that = this;
				var url = "/admin/login"
				// 传递给后端的数据
				var data = {
					uid: that.form.uid,
					pwd: that.form.pwd
				};
				that.$axios.post(url, that.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						
						sessionStorage.setItem('admin_uid', res.data.data.admin.uid);
						sessionStorage.setItem('key', res.data.data.key);
						sessionStorage.setItem("token", res.data.data.token);
						//更改登录标记
						// sessionStorage.setItem('loginState', false)
						// this.$store.state.loginFlag = true
						// 跳转到首页
						that.$message({
							showClose: true,
							message: '登录成功',
							type: 'success'
						});
						that.$router.push({path: '/Welcome'});
					} else if (res.data.code == 404) {
						that.$message({
							showClose: true,
							message: '用户名或密码错误',
							type: 'error'
						});
					} else if (res.data.code == 400) {
						that.$message({
							showClose: true,
							message: '用户名和密码不能为空',
							type: 'warning'
						});
					} else if (res.data.code == 409) {
						that.$message({
							showClose: true,
							message: '密码错误',
							type: 'warning'
						});
					} else {
						that.$message({
							showClose: true,
							message: '服务器错误',
							type: 'warning'
						});
					}
				})
			}
		}

	}
</script>

<style>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 753px;
		background: url(../../assets/imgs/bg.jpg);
	}

	.ms-title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: gray;
	}

	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 400px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.7);
		overflow: hidden;
	}

	.el-menu-demo {
		background: rgba(255, 255, 255, 0.3);
	}

	.ms-content {
		padding: 30px 30px;
	}

	.login-btn {
		text-align: center;
	}

	.login-btn button {
		width: 100%;
		height: 36px;
		margin-bottom: 10px;
		margin-top: 20px;

	}

	.login-tips {
		font-size: 12px;
		line-height: 30px;
		color: #fff;
	}

	.el-form-item {
		margin-bottom: 22px;
		margin-top: 40px;
	}

	.a {
		float: right;
		margin-top: -20px;
		text-decoration: none;
		color: cornflowerblue;
	}

	.el-checkbox-group {
		margin-left: -40px;
	}

	.weixin-btn {
		width: 80%;
		height: 36px;
		margin-bottom: 10px;
		margin-top: 20px;
		background: cornflowerblue;
	}

	.weixin-login img {
		width: 230px;
		height: 180px;
	}
</style>
