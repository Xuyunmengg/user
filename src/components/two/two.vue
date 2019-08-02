<!-- html部分 -->
<template>
	<div>
		<div class="search">
			<span>姓名：</span>
			<el-select v-model="empl_id" filterable placeholder="请选择">
				<el-option v-for="item in empllist" :key="item.id" :label="item.nm" :value="item.id"></el-option>
			</el-select>
			<span>材料编号：</span>
			<el-input v-model="issue" placeholder="请输入材料编号" style="width: 160px;"></el-input>
			<el-button class="buttons" type="primary" size="mini" @click="search">查询</el-button>
			<el-button class="buttons" type="primary" size="mini" @click="empty">重置</el-button>
			<el-button class="buttons" type="danger" size="mini" danger @click="add">
				新增档案
			</el-button>
			<el-button class="buttons" type="danger" size="mini" @click="">批量导入</el-button>
		</div>
		<!-- 左边 -->
		<div id="leftt">
			<el-row class="tac" style="width: 100%;height: 100%;">
				<el-col :span="12" style="width: 100%;height: 100%;text-align: center;">
					<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="silver"
					 text-color="black" active-text-color="yellow">
						<el-menu-item index="1" class="el-menu-item" @click="category(1)"><span slot="title">履历材料</span></el-menu-item>

						<el-menu-item index="2" class="el-menu-item" @click="category(2)"><span slot="title">自传与思想类</span></el-menu-item>

						<el-menu-item index="3" class="el-menu-item" @click="category(3)"><span slot="title">考核鉴定类</span></el-menu-item>

						<el-menu-item index="4" class="el-menu-item" @click="category(4)"><span slot="title">学历学位</span></el-menu-item>

						<el-menu-item index="5" class="el-menu-item" @click="category(5)"><span slot="title">政审、审计类</span></el-menu-item>

						<el-menu-item index="6" class="el-menu-item" @click="category(6)"><span slot="title">党团类</span></el-menu-item>

						<el-menu-item index="7" class="el-menu-item" @click="category(7)"><span slot="title">表彰类</span></el-menu-item>

						<el-menu-item index="8" class="el-menu-item" @click="category(8)"><span slot="title">处分类</span></el-menu-item>

						<el-menu-item index="9" class="el-menu-item" @click="category(9)"><span slot="title">工资类</span></el-menu-item>

						<el-menu-item index="10" class="el-menu-item" @click="category(10)"><span slot="title">其他类</span></el-menu-item>
					</el-menu>
				</el-col>
			</el-row>
		</div>
		<!-- 表格 -->
		<div class="tables">
			<div>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="45"></el-table-column>
					<el-table-column prop="empl_nm" label="员工姓名" width="100"></el-table-column>
					<el-table-column prop="issue" label="材料编号" width="200"></el-table-column>
					<el-table-column prop="nm" label="材料名称" width="120"></el-table-column>
					<el-table-column prop="created" label="材料时间" width="100"></el-table-column>
					<el-table-column prop="group_num" label="份数" width="80"></el-table-column>
					<el-table-column prop="page_num" label="页数" width="80"></el-table-column>
					<el-table-column prop="remark" label="档案备注" width="120"></el-table-column>

					<el-table-column prop="look" label="查看附件" width="120">
						<template slot-scope="scope">
							<el-button size="mini" @click="look">查看附件</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name: '',
		data() {
			return {
				type:1,
				empl_id:'',
				empl_nm: '',
				empllist:[],
				nm: '',
				gender: '',
				mobile: '',
				dept_nm: '',
				post_nm: '',
				issue: '',
				tableData: [],
				multipleSelection: [],
				// 重置按钮
				searchName: '',
				// 查询姓名为下拉框
	
			};
		},
		methods: {
			// 查询姓名下拉框
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
			// 重置
			empty() {
				this.empl_id = '';
				this.issue = '';
			},
			add() {
				//路由跳转
				this.$router.push({
					path: '/Add'
				});
			},
			look() {
				// const {
				// 	href
				// } = this.$router.resolve({
				// 	name: "examine",
				// 	params: {
				// 		id: this.empl_id,
				// 	}
				// });
				// window.open(href, '_blank', 'toolbar=yes, width=900, height=700')
			},
			search() {
				// 后端网址  材料
				let material_url = '/material/list';
				// 传递给后端的数据
				var material_params = {
					empl_id: this.empl_id,
					type:this.type,
					issue:this.issue,
					key: sessionStorage.getItem('key'),
					token: sessionStorage.getItem('token')
				};
				// 后端网址  员工
				let empl_url = '/empl/list';
				// 传递给后端的数据
				let empl_data = {
					key: sessionStorage.getItem('key'),
					token: sessionStorage.getItem('token')
				};
				this.$axios
					.get(material_url, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'X-Requested-With': 'XMLHttpRequest'
						},
						params: material_params
					})
					.then(res => {
						// console.log(res);
						let arr = res.data.data.material_list;
	
						this.$axios
							.get(empl_url, {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
									'X-Requested-With': 'XMLHttpRequest'
								},
								params: empl_data
							})
							.then(res1 => {
								this.empllist=res1.data.data.empl_list
								let material_data = [];
								for (var obj of arr) {
									//时间截取
									this.d = obj.created;
									this.d1 = this.d.substring(0, 11);
									obj.created = this.d1;
									material_data.push(obj);
	
									let empl_info = res1.data.data.empl_list.filter(item => item.id == obj.empl_id);
									if (empl_info.length > 0) {
										obj.empl_nm = empl_info[0].nm;
									}
								}
								this.tableData = [...material_data]
							});
					}).catch(function(err) {
	
					});
	
			},
			category(val) {
				this.type = val;
				this.search();
			}
		},
		mounted: function() {
			// 查询姓名为下拉框
			this.search();
			let that = this
			// 后端网址
			var url = "/material_affix/list"
			// 传递给后端的数据
			var data = {
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			that.$axios.get(url, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest'
				},
				params: data
			}).then(res => {
				console.log(res)
			})
		}
	};
</script>
<!-- css部分 -->
<style scoped>
	.search {
		width: 100%;
		text-align: center;
	}

	#leftt {
		width: 200px;
		height: 650px;
		float: left;
	}

	.tables {
		margin-left: 50px;
		width: 70%;
		float: left;
		/* display: inline-block; */
	}
</style>
