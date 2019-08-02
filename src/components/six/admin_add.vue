<template>

	<div>
		<div>
			<el-row>
				<el-col :span="12" style="">
					用户名：
					<el-input style="width:300px;margin-top: 20px;" placeholder="请输入用户名" v-model="uid"></el-input>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-row>
				<el-col :span="12" style="">
					密  码 ：
					<el-input style="width:300px;;" placeholder="请输入密码" v-model="pwd"></el-input>
				</el-col>
			</el-row>
			<el-row style="">
				<el-col :span="24">
					<el-button type="primary" @click="admin_add">确认添加</el-button>
					<el-button @click="cancel">返回</el-button>
				</el-col>
			</el-row>
		</div>	
	</div>

</template>

<script>
	export default {
		data() {
			return {
				uid:'',
				pwd:''
			}
		},
		methods: {
			cancel() {
				this.$router.go(-1);
			},
			admin_add() {
				// 后端网址  管理员
				var url = '/admin/add';
				// 传递给后端的数据
				var data = {
					uid: this.uid,
					pwd: this.pwd,
					key: sessionStorage.getItem('key'),
					token: sessionStorage.getItem('token')
				};
				this.$axios.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(res => {
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message("添加成功");
						this.$router.push({
							path: '/six'
						});
					} else {
						this.$message("添加失败");
					}
				});
			}
		},
		mounted: function() {

		}
	}
</script>

<style>

</style>
