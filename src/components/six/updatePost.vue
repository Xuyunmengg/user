<template>
	<div style="text-align: center;">
		岗位：<el-input v-model="nm" style="width: 200px;"></el-input>
		<el-row style="margin-top: 50px;">
			<el-col :span="24">
				<el-button type="primary" @click="updatePost">确认修改</el-button>
				<el-button @click="cancel">返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				nm:'',
			}
		},
		
		methods: {
			//返回
			cancel() {
				this.$router.go(-1);
			},
			updatePost(){
				// 档案
				var url = "/post/put"
				// 传递给后端的数据
				var data = {
					id:this.id,
					nm: this.nm,
					sn:this.sn,
					key: sessionStorage.getItem("key"),
					token: sessionStorage.getItem("token")
				};
				this.$axios.put(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(res => {
					console.log(res)
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message("修改成功");
						this.$router.push({path: '/six'});
					} else {
						this.$message("修改失败");
					}
				
				}).catch(function(err) {
				
				})
			},
		},
		mounted:function(){
			var obj = this.$route.params.row;
			this.id = obj.id;
			this.nm = obj.nm;	
			this.sn = obj.sn;
		}
	}
</script>

<style>

	
</style>
