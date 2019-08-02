<template>
	<div id="aaaa">
		<div>
			<el-button>关闭</el-button>
			{{msg}}
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg:"11111"
			}
		},
		methods: {
			search(){
				let that = this
				// 后端网址  员工
				var url = "/material/affixpl"
				// 传递给后端的数据
				var data = {
					key: sessionStorage.getItem("key"),
					token: sessionStorage.getItem("token")
				};that.$axios.get(url,{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data,
				}).then( res=> {
					console.log(data)
					console.log(res)
				})
			}
		},
		mounted: function() {
			this.search();
		}
	}
</script>

<style>
	
</style>
