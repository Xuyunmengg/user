<template>
	<div id="app">
		<div id="header">
			<!-- <img src="../../static/img/u844.jpg"/> -->
			<p>人事档案管理系统</p>
			<div class="head1">
				<a href="">档案查询</a>
			</div>
			<div class="head2">
				<a href="">新增档案</a>
			</div>
			<div class="head3">
				<a href="">目录管理</a>
			</div>
			<div class="head4">
				<a href="">员工管理</a>
			</div>
			<div class="head5">
				<a href="">统计数据</a>
			</div>
			<div class="head6">
				<a href="">系统设置</a>
			</div>
			<div class="head7">
				<a href="">退出系统</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import url("../../css/query.css");
</style>
