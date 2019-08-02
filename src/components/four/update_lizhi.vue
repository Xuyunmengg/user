<template>
	<div>
		<h1>修改员工离职</h1>
		<el-row>
			<el-col :span="12">
				员工编号：
				<el-input style="width:300px;margin-top: 20px;" v-model="empl_nm">
				</el-input>
			</el-col>
			<el-col :span="12">
				文档名称：
				<el-input style="width:300px;margin-top: 20px;" v-model="nm">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				离职原因：
				<el-select v-model="graduate_school" placeholder="请选择档案类别" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in option" :key="item.type" :label="item.label" :value="item.label">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="12">
				离职时间：
				<el-date-picker placeholder="请选择结束时间" style='width: 300px; margin-top: 20px;' v-model="graduate_date" type="date" format="yyyy 年 MM 月 dd 日"
				 value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<span style="margin-left: 35px;">备注：</span>
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入备注" v-model="remark">
				</el-input>
			</el-col>
			<el-col :span="12">
				
				<!-- 类别： -->
				<el-input style="width:300px;margin-top: 20px;" type="hidden" placeholder="请输入类别" v-model="type">
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<!-- 页数： -->
				<el-input style="width:300px;margin-top: 20px;" type="hidden" placeholder="请输入页数" v-model="page_num ">
				</el-input>
			</el-col>
			<el-col :span="12">
				<!-- 份数： -->
				<el-input style="width:300px;margin-top: 20px;" type="hidden" placeholder="请输入份数" v-model="group_num ">
				</el-input>
				
			</el-col>
		</el-row>
		
		<el-row style="margin-top: -20px;text-align: center;">
			<el-col :span="24">
				<el-button type="primary" @click="update_biandong">确认保存</el-button>
				<el-button @click="cancel">返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
				empl_nm:'',//员工编号
				nm:'',//姓名
				graduate_major:'',//文档名称
				type:12,//类别
				graduate_date :'',//离职时间
				graduate_school :'',//离职原因
				group_num:0,//批准文号
				page_num:0,//页数	
				remark:'',//备注
				
				// 离职原因
				option: [{
					type: '1',
					label: '退休'
				}, {
					type: '2',
					label: '辞职'
				}, {
					type: '3',
					label: '开除'
				}, {
					type: '4',
					label: '合同到期'
				}],
			}
		},
		
		methods: {
			//返回
			cancel() {
				this.$router.go(-1);
			},
			update_biandong(){
				// 档案
				var url = "/material/put"
				// 传递给后端的数据
				var data = {
					id:this.id,
					empl_nm: this.empl_nm,
					nm: this.nm,
					graduate_major: this.graduate_major,
					group_num: this.group_num,
					graduate_date: this.graduate_date,
					graduate_school: this.graduate_school,
					type: this.type,
					page_num: this.page_num,
					remark: this.remark,
					sn:this.sn,
					key: sessionStorage.getItem("key"),
					token: sessionStorage.getItem("token")
				};
				console.log(data)
				this.$axios.put(url, this.$qs.stringify(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'X-Requested-With': 'XMLHttpRequest'
					}
				}).then(res => {
					console.log(res)
					// res是后端的响应
					if (res.data.code == 200) {
						this.$message("修改成功");
						this.$router.push({path: '/four'});
					} else {
						this.$message("修改失败");
					}
				
				}).catch(function(err) {
				
				})
			}
		},
		mounted:function(){
			//接受路由传递的数据
			var obj = this.$route.params.row;
					this.id = obj.id;
					this.empl_nm= obj.empl_nm
					this.nm = obj.nm;
					this.graduate_major = obj.graduate_major;
					this.type = obj.type;
					this.graduate_date = obj.graduate_date;
					this.graduate_school = obj.graduate_school;
					this.group_num = obj.group_num;
					this.page_num = obj.page_num;
					this.remark = obj.remark;
					this.sn =obj.sn;
		}
	}
</script>

<style>

	
</style>
