<!-- html部分 -->
<template>
	<div id="app">
		<div class="asa">
			姓名：<el-input v-model="nm" placeholder="请输入姓名" style="width: 160px;">
			</el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			档案号：<el-input v-model="issue" placeholder="请输入档案号" style="width: 160px;">
			</el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			联系电话：<el-input v-model="number_input" placeholder="请输入联系电话" style="width: 160px;">
			</el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			岗位：
			<el-select v-model="post_id" placeholder="职称" style="width: 200px;margin-top: 20px;">
				<el-option v-for="item2 in postList" :key="item2.id" :label="item2.nm" :value="item2.id">
				</el-option>
			</el-select>
			</el-input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<el-button type="primary" size="mini" @click="query2">查询</el-button>
			<el-button type="primary" size="mini" plain @click=" empty">重置</el-button>
		</div>
		<!-- 数据展示 -->
		<div id="B">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="empl_no" label="员工编号" width="100px"></el-table-column>
				<el-table-column prop="nm" label="姓名" width="100"></el-table-column>
				<el-table-column prop="gender" label="性别" width="100"></el-table-column>
				<el-table-column prop="birthday" label="出生年月" width="160"></el-table-column>
				<el-table-column prop="dept_nm" label="部门" width="100"></el-table-column>
				<el-table-column prop="post_nm" label="岗位" width="100"></el-table-column>
				<el-table-column prop="mobile" label="联系电话" width="130"></el-table-column>
				<el-table-column prop="entry_date" label="入职时间" width="160"></el-table-column>
				<el-table-column prop="issue" label="档案编号" width="130"></el-table-column>
				<el-table-column prop="location" label="档案位置" width="130"></el-table-column>
				<el-table-column prop="look" label="操作" width="160">
					<template slot-scope="scope">
						<el-button @click="add(scope.row)" type="warning" size="small">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[2, 5, 8, 10]" :page-size="pageSize"
			 :total="total" :current-page.sync="currentPage" @size-change='sizeChange' @current-change='currentChange()'>
			</el-pagination>
		</div>
	</div>
</template>
<!-- js部分 -->
<script>
	export default {
		name: '',
		data() {
			return {
				// 分页
				currentPage: 1, //默认开始页面
				pageSize: 5, //每页的数据条数
				total: 0, //默认数据总数

				// 出生年月 日期截取所需要的容器
				aa: '',
				a: '',
				// 入职时间日期截取所需要的容器
				bb: '',
				b: '',
				// 重置按钮
				nm: '',
				issue: "",
				number_input: "",
				post_id: "",
				postList: [],

				tableData: [],
				// list: [],
				search_devname: '',

			};
		},
		methods: {
			// 重置
			empty() {
				this.nm = "";
				this.issue = "";
				this.number_input = "";
				this.post_id = ""
			},
			// 表格
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			query2(){
				this.limit = 1;
				this.query1()
			},
			// 查询
			query1() {
				let that = this
				// 后端网址  员工
				var url = "/empl/list"
				// 传递给后端的数据
				var data = {
					nm: that.nm,
					issue: that.issue,
					mobile: that.number_input,
					offset: that.currentPage,
					limit: that.pageSize,
					post_id: that.post_id,
					key: sessionStorage.getItem("key"),
					token: sessionStorage.getItem("token")
				};
				// 后端网址  部门
				var url1 = "/dept/list"
				// 传递给后端的数据
				var data1 = {
					key: sessionStorage.getItem("key"),
					token: sessionStorage.getItem("token")
				};
				// 后端网址  岗位
				var url2 = "/post/list"
				// 传递给后端的数据
				var data2 = {
					key: sessionStorage.getItem("key"),
					token: sessionStorage.getItem("token")
				};
				// 数据总量 admin/info
				var url3 = "/empl/info"
				
				// 员工
				that.$axios.get(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data
				}).then(res => {
					// 员工
					var arr = res.data.data.empl_list
					console.log(res)
					// 部门
					that.$axios.get(url1, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'X-Requested-With': 'XMLHttpRequest'
						},
						params: data1
					}).then(res1 => {
						// 岗位
						that.$axios.get(url2, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
								'X-Requested-With': 'XMLHttpRequest'
							},
							params: data2
						}).then(res2 => {
							that.postList = res2.data.data.post_list;
							console.log(res2)
							// 员工数量
							that.$axios.get(url3, {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
									'X-Requested-With': 'XMLHttpRequest'
								},
								params: data
							}).then(res3 => {
								console.log(data2)
								let list = []
								if (res.data.code == 200) {
									// 日期截取和性别数据处理
									for (var obj of arr) {
										obj.gender = obj.gender % 2 == 1 ? '男' : '女';
										that.aa = obj.birthday;
										that.a = that.aa.substring(0, 11);
										obj.birthday = that.a

										that.bb = obj.entry_date
										that.b = that.bb.substring(0, 11)
										obj.entry_date = that.b

										let dept_info = res1.data.data.dept_list.filter(item => item.id == obj.dept_id)
										let post_info = res2.data.data.post_list.filter(item => item.id == obj.post_id)
										if (dept_info.length > 0) {
											obj.dept_nm = dept_info[0].nm
										}
										if (post_info.length > 0) {
											obj.post_nm = post_info[0].nm
										}
										list.push(obj)
									}
									
									that.total = res3.data.data.empl_info.count
									console.log(that.total)
									that.tableData = list;
								}else{
									that.$message("数据错误，即将返回首页");
									that.$router.push({path: '/login'});
								}

							})
						})

					}).catch(function(err1) {
					
					})


				}).catch(function(err) {
					console.log(err)
				})
			},
			// 分页
			currentChange() {
				this.query1()
			},
			// 页条数事件
			sizeChange(val) {
				this.pageSize = val
				this.query1()
			},
			// 查看详情
			add(row) {
				// console.log(row)
				let rowString = this.$qs.stringify({
					id:row.id,
					nm: row.nm,
					gender: row.gender,
					mobile: row.mobile,
					dept_nm: row.dept_nm,
					post_nm: row.post_nm,
					issue: row.issue,
					
				})

				let routeUrl = this.$router.resolve({
					path: '/Details',
					query: {
						row: rowString
					}
				});

				window.open(routeUrl.href, '_blank');
			}

		},
		mounted: function() {
			this.query1();
			this.query2();
		}
	}
</script>
<!-- css部分 -->
<style scoped>
	.asa {
		color: black;
	}

	.el-input__inner {
		height: 30px;
	}

	#B {
		margin-top: 20px;
	}
	.block {
		float: right;
		margin-top: 60px;
	}
</style>
