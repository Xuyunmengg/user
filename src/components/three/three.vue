<!-- html部分 -->
<template>
	<div id="app">
		<template>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="有更新" name="first">
					<!-- 查询 -->
					<div id="search" style="margin-top: 20px;">
						<span>员工姓名：</span>
						<el-select v-model="searchName" filterable placeholder="请选择">
							<el-option v-for="item in emplList" :key="item.id" :label="item.nm" :value="item.nm">
								</el-option>
						</el-select>
						<span>联系电话：</span>
						<el-input v-model="searchMobile" placeholder="请输入联系电话" style="width: 160px;"></el-input>
						<el-button class="buttons" type="primary" size="mini" @click="search">查询</el-button>
						<el-button class="buttons" type="primary" size="mini" @click="empty">重置</el-button>
						<el-button class="buttons" type="primary" size="mini" @click="">批量打印</el-button>
					</div>

					<!-- 表格 -->
					<template>
						<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column prop="empl_no" label="员工编号" width="120"></el-table-column>
							<el-table-column prop="nm" label="姓名" width="100"></el-table-column>
							<el-table-column prop="gender" label="性别" width="100"></el-table-column>
							<el-table-column prop="birthday" label="出生年月" width="130"></el-table-column>
							<el-table-column prop="mobile" label="联系电话" width="130"></el-table-column>
							<el-table-column prop="entry_date" label="入职时间" width="130"></el-table-column>
							<el-table-column prop="issue" label="档案号" width="130"></el-table-column>
							<el-table-column prop="location" label="档案位置" width="130"></el-table-column>
							<el-table-column prop="material_new_num" label="新增材料" width="120"></el-table-column>
							
							<el-table-column prop="look" label="操作" width="160">
								<template slot-scope="scope">
									<el-button @click="" type="warning" size="small">查看/打印</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-tab-pane>
				<!-- 表格2 -->
				<el-tab-pane label="常规目录" name="second">
					<!-- 查询 -->
					<div id="search" style="margin-top: 20px;">
						<span>员工姓名：</span>
						<!-- <el-input v-model="searchName" placeholder="请输入员工姓名" style="width: 160px;"></el-input> -->
						<el-select v-model="searchName1" filterable placeholder="请选择">
							<el-option v-for="item in emplList" :key="item.id" :label="item.nm" :value="item.nm">
								</el-option>
						</el-select>
						<span>联系电话：</span>
						<el-input v-model="searchMobile1" placeholder="请输入联系电话" style="width: 160px;"></el-input>
						<el-button class="buttons" type="primary" size="mini" @click="search">查询</el-button>
						<el-button class="buttons" type="primary" size="mini" @click="empty1">重置</el-button>
						<el-button class="buttons" type="primary" size="mini" @click="">批量打印</el-button>
					</div>
					<!-- 常规目录表格 -->
					<template>
						<el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column prop="empl_no" label="员工编号" width="120"></el-table-column>
							<el-table-column prop="nm" label="姓名" width="100"></el-table-column>
							<el-table-column prop="gender" label="性别" width="100"></el-table-column>
							<el-table-column prop="birthday" label="出生年月" width="130"></el-table-column>
							<el-table-column prop="mobile" label="联系电话" width="130"></el-table-column>
							<el-table-column prop="entry_date" label="入职时间" width="130"></el-table-column>
							<el-table-column prop="issue" label="档案号" width="130"></el-table-column>
							<el-table-column prop="location" label="档案位置" width="130"></el-table-column>
							<el-table-column prop="material_num" label="材料总数" width="120"></el-table-column>
							
							<el-table-column prop="look" label="操作" width="160">
								<template slot-scope="scope">
									<el-button @click="" type="warning" size="small">查看/打印</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>
<!-- js部分 -->
<script>
export default {
	name: '',
	data() {
		return {
			activeName: 'first',

			tableData: [],
			tableData1: [],
			emplList: [],
			searchName: '',
			searchName1: '',
			searchMobile: '',
			searchMobile1: '',
			currentPage1: 5,
			currentPage2: 5,
			currentPage3: 5,
			currentPage4: 4
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		
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
		
		// 重置
		empty() {
			this.searchName = '';
			
			this.searchMobile = '';
			this.search()
		},
		empty1() {
			
			this.searchName1 = '';
			this.searchMobile1 = '';
			this.search()
		},
		getDept() {
			// 后端网址  部门
			var url = '/dept/list';
			// 传递给后端的数据
			var data = {
			
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			return new Promise((resolve, reject) => {
				// 部门
				this.$axios
					.get(url, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'X-Requested-With': 'XMLHttpRequest'
						},
						params: data
					})
					.then(res => {
						console.log('部门列表');
						console.log(res);
						if (res.data.code == 200) {
							this.deptList = res.data.data.dept_list;
							resolve(res);
						}
					});
			});
		},
		getPost() {
			// 后端网址  岗位
			var url = '/post/list';
			// 传递给后端的数据
			var data = {
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			return new Promise((resolve, reject) => {
				// 部门
				this.$axios
					.get(url, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'X-Requested-With': 'XMLHttpRequest'
						},
						params: data
					})
					.then(res => {
						console.log('岗位列表');
						console.log(res);
						if (res.data.code == 200) {
							this.postList = res.data.data.post_list;
							resolve(res);
						}
					});
			});
		},
		
		query() {
			let that = this;
			// 后端网址  员工
			var url = '/empl/list';
			// 传递给后端的数据
			var data = {
				nm: that.searchName,
				mobile: that.searchMobile,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			return new Promise((resolve, reject) => {
			// 员工
			that.$axios
				.get(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data
				})
				.then(res => {
					console.log(res);
					// 员工						
					if (res.data.code == 200) {
						let list = [];
						res.data.data.empl_list.forEach(item => {
							item.gender = item.gender % 2 == 1 ? '男' : '女';
							that.aa = item.birthday;
							that.a = that.aa.substring(0, 11);
							item.birthday = that.a;
		
							that.bb = item.entry_date;
							that.b = that.bb.substring(0, 11);
							item.entry_date = that.b;
							
							let dept_info = that.deptList.filter(item1 => item1.id == item.dept_id);
							let post_info = that.postList.filter(item1 => item1.id == item.post_id);
							if (dept_info.length > 0) {
								item.dept_nm = dept_info[0].nm;
							}
							if (post_info.length > 0) {
								item.post_nm = post_info[0].nm;
							}
							if(item.material_new_num>0){
								list.push(item);
							}
							
						});
						that.tableData = list;
						resolve(res)
					}
					// }else{
					// 	console.log("111")
					// }
					// console.log(that.tableData);
				})
				.catch(function(err) {
					// console.log(err)
				});
			});
		},
		query1() {
			let that = this;
			// 后端网址  员工
			var url = '/empl/list';
			// 传递给后端的数据
			var data = {
				nm: that.searchName1,
				mobile: that.searchMobile1,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			return new Promise((resolve, reject) => {
			// 员工
			that.$axios
				.get(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data
				})
				.then(res => {
					console.log(res);
					// 员工
					
					// if(res.data.data.empl_list.material_new_num>0){
					
					if (res.data.code == 200) {
						//var arr = res.data.data.empl_list;
						let list = [];
						res.data.data.empl_list.forEach(item => {
							item.gender = item.gender % 2 == 1 ? '男' : '女';
							that.aa = item.birthday;
							that.a = that.aa.substring(0, 11);
							item.birthday = that.a;
		
							that.bb = item.entry_date;
							that.b = that.bb.substring(0, 11);
							item.entry_date = that.b;
							
							let dept_info = that.deptList.filter(item1 => item1.id == item.dept_id);
							let post_info = that.postList.filter(item1 => item1.id == item.post_id);
							if (dept_info.length > 0) {
								item.dept_nm = dept_info[0].nm;
							}
							if (post_info.length > 0) {
								item.post_nm = post_info[0].nm;
							}
							
							list.push(item);
						});
						that.tableData1 = list;
						resolve(res)
					}
					// }else{
					// 	console.log("111")
					// }
					// console.log(that.tableData);
				})
				.catch(function(err) {
					// console.log(err)
				});
			});
		},
		
		async search() {
			await this.getDept();
			await this.getPost();
			await this.query();
			await this.query1();
		}

		
	},
	mounted: function() {
		this.search();
		// 后端网址  岗位
		var url = '/empl/list';
		// 传递给后端的数据
		var data = {
			key: sessionStorage.getItem('key'),
			token: sessionStorage.getItem('token')
		};
		return new Promise((resolve, reject) => {
			// 部门
			this.$axios
				.get(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data
				})
				.then(res => {
					if (res.data.code == 200) {
						this.emplList = res.data.data.empl_list;
						resolve(res);
					}
				});
		});
		}
	
};
</script>
<!-- css部分 -->
<style scoped>
.asa {
	color: black;
	font-size: 20px;
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
#search {
    margin-top: 0px;
    margin-left: 0px;

}
</style>
