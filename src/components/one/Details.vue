<template>
	<div id="app">
		<!-- 头部 -->
		<div id="header"><p>档案详情</p></div>
		<div id="info" :data="tableData">
			<div class="info1">
				<span>姓名：</span>
				<span class="info-1">{{ nm }}</span>
			</div>
			<div class="info2">
				<span>性别：</span>
				<span class="info-1">{{ gender }}</span>
			</div>
			<div class="info3">
				<span>电话：</span>
				<span class="info-1">{{ mobile }}</span>
			</div>
			<div class="info3">
				<span>部门：</span>
				<span class="info-1">{{ dept_nm }}</span>
			</div>
			<div class="info3">
				<span>岗位：</span>
				<span class="info-1">{{ post_nm }}</span>
			</div>
			<div class="info4">
				<span>档案号：</span>
				<span class="info-1">{{ issue }}</span>
			</div>
		</div>
		<div id="u4940"><img src="../../img/u4940.jpg" /></div>

		<!-- 左侧栏 -->
		<div id="left">
			<el-row class="tac" style="width: 100%;margin-top: 75px;line-height: 20px;">
				<el-col :span="12">
					<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
						background-color="silver" text-color="black" active-text-color="yellow">
						<a class="backTop" href="#">
							<el-menu-item index="1" class="el-menu-item"><span slot="title">回到顶部</span></el-menu-item>
						</a>
						<a href="#table1">
							<el-menu-item index="2" class="el-menu-item"><span slot="title">履历材料</span></el-menu-item>
						</a>
						<a href="#table2">
							<el-menu-item index="3" class="el-menu-item"><span slot="title">自传与思想类</span></el-menu-item>
						</a>
						<a href="#table3">
							<el-menu-item index="4"><span slot="title">考核鉴定类</span></el-menu-item>
						</a>
						<a href="#table4">
							<el-menu-item index="5"><span slot="title">学历学位</span></el-menu-item>
						</a>
						<a href="#table5">
							<el-menu-item index="6"><span slot="title">政审、审计类</span></el-menu-item>
						</a>
						<a href="#table6">
							<el-menu-item index="7"><span slot="title">党团类</span></el-menu-item>
						</a>
						<a href="#table7">
							<el-menu-item index="8"><span slot="title">表彰类</span></el-menu-item>
						</a>
						<a href="#table8">
							<el-menu-item index="9"><span slot="title">处分类</span></el-menu-item>
						</a>
						<a href="#table9">
							<el-menu-item index="10"><span slot="title">工资类</span></el-menu-item>
						</a>
						<a href="#table10">
							<el-menu-item index="11"><span slot="title">其他类</span></el-menu-item>
						</a>
					</el-menu>
				</el-col>
			</el-row>
		</div>
		<!-- <div class="biaoge"> -->
		<!-- 表格 1-->
		<div id="table1">
			<div class="table-1"><p>履历材料</p></div>
			<el-table :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t1()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<!-- <el-table-column label="类别" width="120">
					<template slot-scope="scope">
						<span>{{ scope.row.type | typeFilters("type") }}</span>
					</template>
				</el-table-column> -->
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 表格2 -->
		<div id="table2">
			<div class="table-2"><p>自传与思想类</p></div>
			<el-table :header-cell-style="{background:'whitesmoke',color:'#606226'}" 
			ref="multipleTable" :data="t2()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格3 -->
		<div id="table3">
			<div class="table-3"><p>考核鉴定类</p></div>
			<el-table :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			 ref="multipleTable" :data="t3()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格4 -->
		<div id="table4">
			<div class="table-4"><p>学历学位</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			 ref="multipleTable" :data="t4()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格5 -->
		<div id="table5">
			<div class="table-5"><p>政审、审计类</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t5()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格6 -->
		<div id="table6">
			<div class="table-6"><p>党团类</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t6()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格7 -->
		<div id="table7">
			<div class="table-7"><p>表彰类</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t7()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格8 -->
		<div id="table8">
			<div class="table-8"><p>处分类</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t8()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格9 -->
		<div id="table9">
			<div class="table-9"><p>工资类</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t9()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 表格10 -->
		<div id="table10">
			<div class="table-10"><p>其他类</p></div>
			<el-table  :header-cell-style="{background:'whitesmoke',color:'#606226'}"
			ref="multipleTable" :data="t10()" tooltip-effect="dark" style="width: 95%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="id" label="材料编号" width="100"></el-table-column>
				<el-table-column prop="nm" label="材料名称" width="130"></el-table-column>
				<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
				<el-table-column prop="group_num" label="份数" width="100"></el-table-column>
				<el-table-column prop="page_num" label="页数" width="100"></el-table-column>
				<el-table-column prop="issue" label="档案号" width="160"></el-table-column>
				<el-table-column prop="remark" label="档案备注" width="130"></el-table-column>

				<el-table-column prop="look" label="查看附件" width="120">
					<template slot-scope="scope">
						<el-button size="mini">查看附件</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	<!-- </div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			empl_no: '',
			nm: '',
			gender: '',
			mobile: '',
			dept_nm: '',
			post_nm: '',
			issue: '',
			multipleSelection: [],
			tableData: [],
			tableData1: [],
			// 时间截取
			d: '',
			d1: ''
		};
	},
	computed: {},
	methods: {
		// 表格
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleOpen() {},
		handleClose() {},
		fn() {
			// console.log(this.$route.params.empl_no);
			// 档案详情
			var url = '/material/list';
			var data = {
				key: sessionStorage.getItem("key"),
				token: sessionStorage.getItem("token")
			};
			// 档案
			this.$axios
				.get(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data
				})
				.then(res => {
					
					var arr = res.data.data.material_list;
					// console.log("11")
					console.log(res.data.data.material_list)
					var empl_id = this.$qs.parse(this.$route.query.row).id;
					console.log(empl_id)
					for (var obj of arr) {
						if (obj.empl_id == empl_id) {
							this.d = obj.created;
							this.d1 = this.d.substring(0, 11);
							obj.created = this.d1;
							this.tableData1.push(obj);
						}
					}
				})
				.catch(function(err) {});
		},

		t1: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 1;
			});
		},
		t2: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 2;
			});
		},
		t3: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 3;
			});
		},
		t4: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 4;
			});
		},
		t5: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 5;
			});
		},
		t6: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 6;
			});
		},
		t7: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 7;
			});
		},
		t8: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 8;
			});
		},
		t9: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 9;
			});
		},
		t10: function() {
			return this.tableData1.filter(function(obj, index) {
				return obj.type == 10;
			});
		}
	},
	mounted: function() {
		this.fn();
		let it = {};
		if (this.$route.query) {
			it = this.$qs.parse(this.$route.query.row);
			this.nm = it.nm;
			this.gender = it.gender;
			this.mobile = it.mobile;
			this.dept_nm = it.dept_nm;
			this.post_nm = it.post_nm;
			this.issue = it.issue;
			this.id = it.id;
		}
		
	}
};
</script>

<style scoped>
	/* @import url('../../css/Details.css'); */
	#header{
		width: 60%;
		height: 50px;
		border: 0px solid;
		border-bottom: 2px #DCDFE6 solid;
		margin-left: 250px;
		padding-top: 10px;
		margin-top: -10px;
	}
	#header p{
		font-size: 28px;
		line-height: 0px;
	}
	#info{
		width: 55%;
		height: 40px;
		border: 0px solid;
		margin-left: 285px;
		line-height: 40px;
	}
	.info1{
		float: left;
	}
	.info2{
		float: left;
		padding-left: 20px;
	}
	.info3{
		float: left;
		padding-left: 20px;
	}
	.info4{
		float: left;
		padding-left: 20px;
	}
	
	.info-1{
		color: #C8C9CC;
		
	}
	#u4940{
		width: 120px;
		height: 110px;
		border: 0px solid;
		float: right;
		margin-right: 140px;
		margin-top: -80px;
	}
	#u4940 img{
		width: 120px;
		height: 110px;
	}
	
	/* 左侧栏 */
	#left{
		position: fixed;
	}
	
	#left a{
		text-decoration: none;
		color: black;
	}
	
	.el-menu-item{
	    line-height: 45px;
	    height: 45px;
		width: 150px;
		border: 0px solid;
	}
	/* 表格 */
	/* .el-table th{
	    background-color: whitesmoke;
	} */
	#table1{
		width: 1050px;
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-1{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		margin-bottom: -5px;
		background: #ECECEC;
	}
	.table-1 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 23px;
	}
	
	#table2{
		width: 1050px;
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-2{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-2 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 2px;
	}
	#table3{
		width: 1050px;
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-3{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-3 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 12px;
	}
	#table4{
		width: 1050px;
		/* height: 330px; */
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-4{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-4 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 23px;
	}
	#table5{
		width: 1050px;
		/* height: 330px; */
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-5{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-5 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 2px;
	}
	#table6{
		width: 1050px;
		/* height: 330px; */
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-6{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-6 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 32px;
	}
	#table7{
		width: 1050px;
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-7{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-7 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 30px;
	}
	#table8{
		width: 1050px;
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-8{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-8 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 30px;
	}
	#table9{
		width: 1050px;
		/* height: 330px; */
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-9{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-9 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 30px;
	}
	#table10{
		width: 1050px;
		border: 0px solid;
		margin-left: 270px;
		margin-top: 30px;
	}
	.table-10{
		width: 120px;
		height: 35px;
		border: 1px solid;
		border-radius: 8px;
		background: #ECECEC;
		margin-bottom: -5px;
	}
	.table-10 p{
		font-size: 19px;
		line-height: 0px;
		margin-left: 30px;
	}
	
	
</style>
