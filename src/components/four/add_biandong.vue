<template>
	<div>
		<h1>岗位变动</h1>
		<el-row>
			<el-col :span="12">
				员工姓名：
				<el-select v-model="empl_id" filterable placeholder="请选择员工姓名" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in nmarr" :key="item.id" :label="item.nm" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				文件名称：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入员工编号" v-model="graduate_major">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				开始时间：
				<el-date-picker placeholder="请选择开始时间" style='width: 300px; margin-top: 20px;' v-model="graduate_date" type="date" format="yyyy 年 MM 月 dd 日"
				 value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-col>
			<el-col :span="12">
				结束时间：
				<el-date-picker placeholder="请选择结束时间" style='width: 300px; margin-top: 20px;' v-model="graduate_start_date " type="date" format="yyyy 年 MM 月 dd 日"
				 value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				部门：
				<el-select v-model="dept_id" filterable placeholder="请选择岗位" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in deptlist" :key="item.id" :label="item.nm" :value="item.nm">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				岗位：
				<el-select v-model="post_id" filterable placeholder="请选择部门" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in postlist" :key="item.id" :label="item.nm" :value="item.nm">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				批准文号：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入批准文号" v-model="nm">
				</el-input>
			</el-col>
			<el-col :span="12">
				备注：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入备注" v-model="remark">
				</el-input>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="12">
				
			</el-col>
			<el-col :span="12">
				<!-- 类别： -->
				<el-input style="width:300px;margin-top: 20px;" type="hidden" placeholder="请输入类别" v-model="type">
				</el-input>
			</el-col>
			
		</el-row>
		<el-row>
			<el-col :span="12">
				<!-- 份数	： -->
				<el-input style="width:300px;margin-top: 20px;" type="hidden" placeholder="请输入份数" v-model="group_num">
				</el-input>
			</el-col>
			<el-col :span="12">
				<!-- 页数: -->
				<el-input style="width:300px;margin-top: 20px;" type="hidden" placeholder="请输入页数" v-model="page_num ">
				</el-input>
			</el-col>
			
		</el-row>
		<el-row style="margin-top: -20px;text-align: center;">
			<el-col :span="24">
				<el-button type="primary" @click="add_biandong">确认变动</el-button>
				<el-button @click="cancel">返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				empl_id:'',//员工姓名
				nm:'',//文档名称
				graduate_major:'',//批准文号
				graduate_date:'',//开始时间
				graduate_start_date  :'',//结束时间
				dept_id :'',//部门
				post_id :'',//岗位
				type:11,//类别
				group_num:0,//份数					
				page_num:0,//页数	
				remark:'',//备注
				nmarr:[],
				postlist:[],
				deptlist:[]
				
			}
		},
		
		methods: {
			//返回
			cancel() {
				this.$router.go(-1);
			},
			add_biandong(){
				// 档案
				var url = "/material/add"
				// 传递给后端的数据
				var data = {
					empl_id:this.empl_id,//员工编号
					nm: this.nm,//文档姓名
					graduate_major: this.graduate_major,//批准文号
					graduate_date: this.graduate_date,//开始时间
					graduate_start_date : this.graduate_start_date ,//结束时间
					graduate_school: this.dept_id,//部门
					graduate_education: this.post_id,//岗位
					type: this.type,//类别
					group_num: this.group_num,//页数	
					page_num: this.page_num,//页数	
					remark: this.remark,//备注
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
		},
		mounted:function(){
			// 员工
			var url = "/empl/list"
			// 传递给后端的数据
			var data = {
				key: sessionStorage.getItem("key"),
				token: sessionStorage.getItem("token")
			};
			this.$axios.get(url, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest'
				},
				params: data
			}).then(res => {
				console.log(res)
				this.nmarr = res.data.data.empl_list;
			}).catch(function(err) {
			
			})
			
			var url = "/post/list"
			// 传递给后端的数据
			var data = {
				key: sessionStorage.getItem("key"),
				token: sessionStorage.getItem("token")
			};
			this.$axios.get(url, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest'
				},
				params: data
			}).then(res => {
				console.log(res)
				this.postlist = res.data.data.post_list;
			}).catch(function(err) {
			
			})
			
			var url = "/dept/list"
			// 传递给后端的数据
			var data = {
				key: sessionStorage.getItem("key"),
				token: sessionStorage.getItem("token")
			};
			this.$axios.get(url, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest'
				},
				params: data
			}).then(res => {
				console.log(res)
				this.deptlist = res.data.data.dept_list;
			}).catch(function(err) {
			
			})
			
		}
	}
</script>

<style>

	
</style>
