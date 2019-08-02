<!-- html部分 -->
<template>
	<div id="app">
		<template>
			<div id="aa">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="账号管理" name="first">
						<!-- 查询 -->
						<div id="search">
							<span>用户名：</span>
							<el-input v-model="uid" placeholder="请输入用户名" style="width: 160px;"></el-input>
							<el-button class="buttons" type="primary" size="mini" @click="admin">查询</el-button>
							<el-button class="buttons" type="primary" size="mini" @click="empty">重置</el-button>
							<el-button class="buttons" type="primary" size="mini" @click="add">新增管理员</el-button>
						</div>
						<!-- 表格 1-->
						<template>
							<div id="info">
								<el-table ref="multipleTable" :data="adminlist" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
									<!-- <el-table-column type="selection" width="55"></el-table-column> -->
									<el-table-column prop="id" label="管理员编号" width="120"></el-table-column>
									<el-table-column prop="uid" label="用户名" width="90"></el-table-column>
									<el-table-column prop="created" label="添加时间" width="200"></el-table-column>
									<el-table-column prop="look" label="操作" width="160">
										<template slot-scope="scope">
											<el-button @click="update(scope.row)" 
												:disabled="scope.row.locked===true"
												type="warning" size="mini">修改
											</el-button>
											
											<el-button @click="freeze(scope.row)" 
												:disabled="scope.row.locked===true"
												type="warning" size="mini">冻结
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</template>
					</el-tab-pane>
					<!-- 表格2 -->
					<el-tab-pane label="基础数据" name="second">
						<template>
							<div>
								<!-- 添加部门 -->
								添加部门：
								<el-input v-model="nm1" placeholder="请输入部门" style="width: 160px;"></el-input>
								<el-button type="primary" size="small" @click="addDept">确定</el-button>
								<!-- 添加岗位 -->
								<span style="margin-left: 120px;">添加岗位：</span>
								<el-input v-model="nm2" placeholder="请输入岗位" style="width: 160px;"></el-input>
								<el-button type="primary" size="small" @click="addPost">确定</el-button>
							</div>
							<div id="one">
								<el-table @row-click="center" ref="multipleTable" :data="deptlist" tooltip-effect="dark" style="width: 100%"
									@selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="id" label="部门编号" width="100px"></el-table-column>
									<el-table-column prop="nm" label="部门名称" width="100"></el-table-column>

									<el-table-column prop="look" label="操作" width="160">
										<template slot-scope="scope">
											<!-- 修改部门 -->
											<el-button type="warning" size="small">修改</el-button>
										</template>
									</el-table-column>
								</el-table>
								<el-dialog title="修改" :visible.sync="centerDialogVisible" width="30%" :before-close="cancelDialog">
									修改部门：
									<el-input v-model="nm3" value="nm3"></el-input>
									<span slot="footer" class="dialog-footer">
										<el-button @click="cancelDialog">取 消</el-button>
										<el-button type="primary" @click="updateDept">确 定</el-button>
									</span>
								</el-dialog>
							</div>
							<div id="two">
								<el-table @row-click="center2" ref="multipleTable" :data="postlist" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="id" label="岗位编号" width="100px"></el-table-column>
									<el-table-column prop="nm" label="岗位名称" width="100"></el-table-column>

									<el-table-column prop="look" label="操作" width="160">
										<template slot-scope="scope">
											<!-- <el-button @click="updatePost(scope.row)" type="warning" size="small">修改</el-button> -->
											<!-- 修改部门 -->
											<el-button type="warning" size="small">修改</el-button>
										</template>
									</el-table-column>
								</el-table>
								<el-dialog title="修改" :visible.sync="centerDialogVisible2" width="30%" :before-close="cancelDialog2">
									修改岗位：
									<el-input v-model="nm4" value="nm4"></el-input>
									<span slot="footer" class="dialog-footer">
										<el-button @click="cancelDialog2">取 消</el-button>
										<el-button type="primary" @click="updatePost">确 定</el-button>
									</span>
								</el-dialog>
							</div>

							<div id="three">
								<el-table ref="multipleTable" :data="options" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column prop="id" label="学历编号" width="100px"></el-table-column>
									<el-table-column prop="education" label="学历名称" width="100"></el-table-column>
								</el-table>
							</div>
						</template>
					</el-tab-pane>
					<!-- 表格3 -->
					<el-tab-pane label="修改密码" name="third">
						<template>
							<div style="border: red 4px; width: 300px;height: 300px;">
								<el-row style="margin-top: 20px;">
									<el-col>
										用户名：
										<span>{{ adminuid }}</span>
									</el-col>
								</el-row>
								<el-row>
									原密码：
									<el-input style="width:200px;margin-top: 20px;" v-model="oldpossword" placeholder="请输入新密码"></el-input>
								</el-row>
								<el-row>
									新密码：
									<el-input style="width:200px;margin-top: 20px;" v-model="newpwd" placeholder="请输入新密码"></el-input>
								</el-row>
								<el-row>
									确认密码：
									<el-input style="width:200px;margin-top: 20px;" v-model="newpwd1" placeholder="请确认密码"></el-input>
								</el-row>
								<el-row style="margin-top: 20px;margin-left: 20%;">
									<el-col :span="24">
										<el-button type="primary" @click="affirm">确认修改</el-button>
										<el-button>取消</el-button>
									</el-col>
								</el-row>
							</div>
						</template>
					</el-tab-pane>
				</el-tabs>
			</div>
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
			// 部门修改
			visible2: false,
			adminlist: [],
			deptlist: [],
			postlist: [],
			// 添加部门
			nm1: '',
			// 添加岗位
			nm2: '',
			// 修改部门
			nm3: '',
			// 修改岗位
			nm4: '',
			// 查询
			uid: '',
			// 个人修改密码
			oldpossword: '',
			newpwd: '',
			newpwd1: '',
			adminuid: sessionStorage.getItem('admin_uid'),

			count: '', //倒计时
			// 学历
			options: [
				{
					id: '1',
					education: '博士'
				},
				{
					id: '2',
					education: '硕士'
				},
				{
					id: '3',
					education: '本科'
				},
				{
					id: '4',
					education: '大专'
				},
				{
					id: '5',
					education: '高中'
				}
			],
			centerDialogVisible: false,
			centerDialogVisible2: false
		};
	},
	// 方法
	methods: {
		handleClick(tab, event) {
			// console.log(tab, event);
		},
		// 修改部门
		center(row, event, column) {
			if (!this.centerDialogVisible) {
				this.centerDialogVisible = true;
				this.nm3 = row && row.nm ? row.nm : '';
				this.sn = row && row.sn ? row.sn : '';
				this.id = row && row.id ? row.id : '';
			}
		},
		// 修改岗位
		center2(row, event, column) {
			if (!this.centerDialogVisible2) {
				this.centerDialogVisible2 = true;
				this.nm4 = row && row.nm ? row.nm : '';
				this.sn = row && row.sn ? row.sn : '';
				this.id = row && row.id ? row.id : '';
			}
		},
		
		// 关闭
		cancelDialog() {
			this.centerDialogVisible = false;
		},
		cancelDialog2() {
			this.centerDialogVisible2 = false;
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
			this.uid = '';
		},

		// 添加部门
		addDept() {
			// 后端网址  管理员
			var url = '/dept/add';
			// 传递给后端的数据
			var data = {
				nm: this.nm1,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			this.$axios
				.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				})
				.then(res => {
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message('添加成功');
						this.$router.push({
							path: '/six'
						});
						this.getDept();
						this.nm1 = '';
					} else {
						this.$message('添加失败');
					}
				});
		},
		// 修改部门
		updateDept(row) {
			console.log(this.nm3); //这个就是修改的时候传给后端的那个输入部门的参数
			// 档案
			var url = '/dept/put';
			// 传递给后端的数据
			var data = {
				id: this.id,
				nm: this.nm3,
				sn: this.sn,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			this.$axios.put(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(res => {
					console.log(res);
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message('修改成功');
						this.$router.push({ path: '/six' });
						this.cancelDialog();
						this.getDept();
					} else {
						this.$message('修改失败');
					}
				})
				.catch(function(err) {});
		},
		// 添加岗位
		addPost() {
			// 后端网址  管理员
			var url = '/post/add';
			// 传递给后端的数据
			var data = {
				nm: this.nm2,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			this.$axios
				.post(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				})
				.then(res => {
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message('添加成功');
						this.$router.push({
							path: '/six'
						});
						this.getPost();
						this.nm2 = '';
					} else {
						this.$message('添加失败');
					}
				});
		},
		// 修改岗位
		updatePost(row) {
			console.log(this.nm4); //这个就是修改的时候传给后端的那个输入部门的参数
			// 档案
			var url = '/post/put';
			// 传递给后端的数据
			var data = {
				id: this.id,
				nm: this.nm4,
				sn: this.sn,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			this.$axios
				.put(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				})
				.then(res => {
					console.log(res);
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message('修改成功');
						this.$router.push({ path: '/six' });
						this.cancelDialog2();
						this.getPost();
					} else {
						this.$message('修改失败');
					}
				})
				.catch(function(err) {});
		},
		// 修改
		update(row) {
			this.$router.push({
				name: 'admin_update',
				params: {
					row: row
				}
			});
		},
		// 新增管理员
		add() {
			this.$router.push({
				path: '/admin_add'
			});
		},
		// 冻结
		freeze(row) {
			this.$router.push({ name: 'admin_freeze', params: { row: row } });
		},
		// 管理员
		admin() {
			// 后端网址  管理员
			var url = '/admin/list';
			// 传递给后端的数据
			var data = {
				uid: this.uid,
				key: sessionStorage.getItem('key'),
				token: sessionStorage.getItem('token')
			};
			this.$axios
				.get(url, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					},
					params: data
				})
				.then(res => {
					console.log(res);
					if (res.data.code == 200) {
						this.adminlist = res.data.data.admin_list;
					}
				});
		},
		affirm() {
			if(this.newpwd!=this.newpwd1){
				this.$message("密码不一致，请重新输入")
				}else{
				// 后端网址  管理员 修改密码(本人)
				var url = '/admin/put/pwd';
				// 传递给后端的数据
				var data = {
					old_pwd: this.oldpossword,
					pwd: this.newpwd,
					key: sessionStorage.getItem('key'),
					token: sessionStorage.getItem('token')
				};
				this.$axios
					.put(url, this.$qs.stringify(data), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'X-Requested-With': 'XMLHttpRequest'
						}
					})
					.then(res => {
						console.log(res);
						if (res.data.code == 200) {
							
							
							this.$message({
								howClose: true,
								message: '修改密码成功，三秒后进入首页重新登录',
								type: 'success'
							});
							
							// 定时器
							const TIME_COUNT = 3;
							if (!this.timer) {
								this.count = TIME_COUNT;
								this.show = false;
								this.timer = setInterval(() => {
									if (this.count > 0 && this.count <= TIME_COUNT) {
										this.count--;
									} else {
										this.show = true;
										clearInterval(this.timer);
										this.timer = null;
										//跳转的页面写在此处
										sessionStorage.removeItem('uid');
										sessionStorage.removeItem('key');
										sessionStorage.removeItem('token');
										this.$router.push({
											path: '/login'
										});
									}
								}, 1000);
							}
						} else {
							this.$message({
								showClose: true,
								message: '原密码错误，请重新登录',
								type: 'error'
							});
						}
						
					});
				}
		},
		// 部门
		getDept() {
			// 后端网址  部门
			var url = '/dept/list';
			// 传递给后端的数据
			var data = {
				uid: this.uid,
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
						console.log(res);
						if (res.data.code == 200) {
							this.deptlist = res.data.data.dept_list;
							resolve(res);
						}
					});
			});
		},

		//岗位
		getPost() {
			// 后端网址  岗位
			var url = '/post/list';
			// 传递给后端的数据
			var data = {
				uid: this.uid,
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
							this.postlist = res.data.data.post_list;
							resolve(res);
						}
					});
			});
		}
	},

	// 进入页面加载
	mounted: function() {
		this.admin();
		this.getDept();
		this.getPost();
		// this.getEmpl();

		//接受路由传递的数据
		// var obj = this.$route.params.row;
		// 		this.id = obj.id;
		// 		this.sn = obj.sn;
		// 		this.nm = obj.nm;
	}
};
</script>
<!-- css部分 -->
<style scoped>
#search {
	width: 100%;
}

#info {
	width: 100%;
}

#one {
	width: 30%;
	float: left;
}

#two {
	width: 30%;
	float: left;
}

#three {
	width: 30%;
	float: left;
}

.el-dialog {
	position: relative;
	margin: 0 auto 50px;
	border-radius: 2px;
	-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	width: 30%;
}
</style>
