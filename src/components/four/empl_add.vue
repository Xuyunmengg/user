<template>
	<div>
		<h1>新增入职</h1>
		<el-row>
			<el-col :span="12">
				员工编号：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入员工编号" v-model="empl_no"></el-input>
			</el-col>
			<el-col :span="12">
				员工姓名：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入姓名" v-model="nm"></el-input>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="12">
				入职部门：
				<el-select v-model="dept_id" style="width: 300px;margin-top: 20px;" placeholder="请选择入职部门">
					<el-option v-for="item in deptList" :key="item.id" :label="item.nm" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				目前岗位：
				<el-select v-model="post_id" style="width: 300px;margin-top: 20px;" placeholder="请选择目前岗位">
					<el-option v-for="item in postList" :key="item.id" :label="item.nm" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				毕业院校：
				<el-input style="width:300px;margin-top: 20px;" v-model="graduate_school" placeholder="请输入毕业院校">
				</el-input>
			</el-col>
			<el-col :span="12">
				最高学历：
				<el-select v-model="education" placeholder="请选择最高学历" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in options" :key="item.education" :label="item.label" :value="item.education">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				档案编号：
				<el-input style="width:300px;margin-top: 20px;" v-model="issue" placeholder="请输入档案编号">
				</el-input>
			</el-col>
			<el-col :span="12">
				档案位置：
				<el-input style="width:300px;margin-top: 20px;" v-model="location" placeholder="请输入档案位置">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				入职时间：
				<el-date-picker placeholder="请选择入职时间" style='width: 300px; margin-top: 20px;' v-model="entry_date" type="date" format="yyyy 年 MM 月 dd 日"
				 value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-col>
			<el-col :span="12">
				身份证号：
				<el-input style="width:300px;margin-top: 20px;" v-model="idcard" placeholder="请输入身份证号">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				联系电话：
				<el-input style="width:300px;margin-top: 20px;" v-model="mobile" placeholder="请输入联系电话">
				</el-input>
			</el-col>
			<el-col :span="12">
				
			</el-col>
		</el-row>
		<el-row style="margin-top: -20px;text-align: center;">
			<el-col :span="24">
				<el-button type="primary" @click="empl_add">确认添加</el-button>
				<el-button @click="cancel">返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			empl_no:'',			//员工编号
			nm:'',				//姓名
			gender:'',			//性别
			birthday:'',		//出生年月
			dept_id:'',			//部门
			post_id:'',			//岗位
			graduate_school:'', //毕业院校
			education:'',		//最高学历
			issue:'',			//档案编号
			location:'',		//档案位置
			entry_date:'',		//入职时间
			idcard:'',			//身份证号
			mobile :'',			//联系电话
			options: [{
				education: '1',
				label: '博士'
			}, {
				education: '2',
				label: '硕士'
			}, {
				education: '3',
				label: '本科'
			}, {
				education: '4',
				label: '大专'
			}, {
				education: '5',
				label: '高中'
			}],
			option:[
				{
					gender: '1',
					label: '男'
				}, {
					gender: '2',
					label: '女'
				}
			],
			deptList:[],
			postList:[],
		};
	},

	methods: {
		empl_add(){
			// 档案
			var url = "/empl/add"
			// 传递给后端的数据
			var data = {
				empl_no: this.empl_no,
				nm: this.nm,
				gender: this.gender,
				birthday: this.birthday,
				dept_id: this.dept_id,
				post_id: this.post_id,
				graduate_school: this.graduate_school,
				education: this.education,
				issue: this.issue,
				location: this.location,
				entry_date: this.entry_date,
				idcard: this.idcard,
				mobile: this.mobile,
				
				key: sessionStorage.getItem("key"),
				token: sessionStorage.getItem("token")
			};
			console.log(data)
			this.$axios.post(url, this.$qs.stringify(data), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest'
				}
			}).then(res => {
				console.log(res)
				// res是后端的响应
				if (res.data.code == 200) {
					this.$message("添加成功");
					this.$router.push({path: '/four'});
				} else {
					this.$message("添加失败");
				}
			
			}).catch(function(err) {
			
			})
		},
		//返回
		cancel() {
			this.$router.go(-1);
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
		
	},
	mounted: function() {
		this.getDept();
		this.getPost();
	}
};
</script>

<style></style>
