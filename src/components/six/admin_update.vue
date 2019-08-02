<template>
		<div style="text-align: center;">
			ID：<el-input v-model="id" :disabled="true" style="width: 200px;"></el-input>
			用户名：<el-input v-model="uid" :disabled="true" style="width: 200px;"></el-input>
			签&nbsp;&nbsp;名：<el-input :disabled="true" v-model="sn" style="width: 200px;"></el-input>
			<br />
			<br />
			<!-- 原密码：<el-input v-model="pwd" type="text" style="width: 200px;"></el-input> -->
			新密码：<el-input type="text" v-model="pwdnew" style="width: 200px;"></el-input>
			<el-row style="margin-top: 50px;">
				<el-col :span="24">
					<el-button type="primary" @click="admin_updeta">确认修改</el-button>
					<el-button @click="cancel">返回</el-button>
				</el-col>
			</el-row>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				uid:'',
				sn:'',
				// pwd:'',
				pwdnew:''
			}
		},
		methods: {
			cancel() {
				this.$router.go(-1);
			},
			admin_updeta() {
				// 后端网址  管理员
				var url = '/admin/put';
				// 传递给后端的数据
				var data = {
					id:this.id,
					sn: this.sn,
					pwdnew:this.pwd,
					key: sessionStorage.getItem('key'),
					token: sessionStorage.getItem('token')
				};
				this.$axios.put(url,this.$qs.stringify(data),{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(res => {
					console.log(res)
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message("修改成功");
						this.$router.push({
							path: '/six'
						});
					} else {
						this.$message("修改失败，该账户权限不足");
					}
				});
			}
		},
		mounted: function() {
					var obj = this.$route.params.row;
					this.id = obj.id;
					this.uid = obj.uid;	
					this.sn = obj.sn;
					// this.pwd = obj.pwd;
		}
	}
</script>

<style>

</style>
