<!-- html部分 -->
<template>
	<div id="app" style="height: 100%;text-align: left;">	
		<el-menu>
			<div v-for="obj in arr">
				<!-- 没有子菜单 -->
				<el-menu-item v-show='!obj.children'  :index='obj.index' @click='fn(obj)'>
					<span slot="title">{{obj.text}}</span>
				</el-menu-item>	
			</div>
		</el-menu>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name:'',
		data() {
			return {
				arr:[{text:'档案查询',index:'101',url:'/welcome'},
					{text:'新增档案',index:'101',url:'/'},
					{text:'目录管理',index:'101',url:'/'},
					{text:'员工管理',index:'101',url:'/'}
					 
				]

			};
		},
		methods:{
			fn(obj){
				//路由跳转
				this.$router.push({path:obj.url});
			}
		}
	}
</script>
<!-- css部分 -->
<style>
.el-menu{
	background: black;
	height: 100%;
}
span{
	display: inline-block;
}
</style>
					 