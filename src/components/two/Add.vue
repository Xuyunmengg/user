<template>
	<div>
		<h1>新增档案</h1>
		<el-row>
			<el-col :span="12" style="margin-left: 30px;">
				员工姓名：
				<el-select v-model="id" filterable placeholder="请选择" @change="currentSel">
					<el-option v-for="item in nmarr" :key="item.id" :label="item.nm" :value="item.id"></el-option>
				</el-select>
			</el-col>
			<el-col :span="12" style="margin-left: -120px; margin-top: 25px;">
				<span>身份证号{{ ': ' + idcard}}</span>
				<span style="margin-left: 20px;color: red;">*自动调用</span>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12" style="margin-left: 30px;">
				材料类别：
				<!-- <el-select v-model="id" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in selArr" :key="item.id" :label="item.nm" :value="item.id" placeholder="请选择档案类别"></el-option>
				</el-select> -->
				<el-select v-model="type" placeholder="请选择档案类别" style="width: 300px;margin-top: 20px;">
					<el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.type"></el-option>
				</el-select>
			</el-col>
			<el-col :span="12" style="margin-left: -120px;">
				材料名称：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入材料名称" v-model="m_nm"></el-input>
				<span style="margin-left: 20px;color: red;">*必填项</span>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12" style="margin-left: 30px;">
				材料份数：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入材料份数" v-model="group_num"></el-input>
				<span style="margin-left: 20px;color: red;">*只能输入数字</span>
			</el-col>
			<el-col :span="12" style="margin-left: -120px;">
				<!-- 材料时间：
				<el-date-picker style='width: 300px; margin-top: 20px;' v-model="modified" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
				 value-format="yyyy-MM-dd">
				</el-date-picker> -->
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12" style="margin-left: 30px;">
				材料页数：
				<el-input style="width:300px;margin-top: 20px;" placeholder="请输入材料页数" v-model="page_num"></el-input>
			</el-col>
			<el-col :span="12" style="margin-left: -120px;margin-top: 20px;">
				附件上传：
				<!-- 通过file来选择需要上传的文件 -->
				<input type="file" class="file" />
				<input type="button" value="上传" @click="upload_files" />
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="12" style="margin-left: 30px;">
				材料备注：
				<el-input style="width:450px;margin-top: 20px;" placeholder="请输入材料备注" v-model="remark"></el-input>
			</el-col>
		</el-row>

		<el-row style="margin-top: -20px;text-align: center;">
			<el-col :span="24">
				<el-button type="primary" @click="add">确认增加</el-button>
				<el-button @click="cancel">返回</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			file:'',
			id: '',
			nm: '',
			nmarr: [],
			// 档案类别
			type: '',
			options: [{
				type: '1',
				label: '履历材料'
			}, {
				type: '2',
				label: '自传与思想'
			}, {
				type: '3',
				label: '考核鉴定类'
			}, {
				type: '4',
				label: '学历学位'
			}, {
				type: '5',
				label: '政审、审计类'
			}, {
				type: '6',
				label: '党团类'
			}, {
				type: '7',
				label: '表彰类'
			}, {
				type: '8',
				label: '处分类'
			}, {
				type: '9',
				label: '工资类'
			}, {
				type: '10',
				label: '其他类'
			}],

			material_id:'',
			// 材料名称
			m_nm: '',
			// 材料份数
			group_num: '',
			// 材料页数
			page_num: '',
			// 材料备注
			remark: '',
			// 身份证号
			idcard: ''
		};
	},
	methods: {
		//返回
		cancel() {
			this.$router.go(-1);
		},
		// 姓名联动身份证号码
		currentSel() {
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
				var arr = res.data.data.empl_list;
				this.idcard = '';
				for (var obj of arr) {
					if (this.id == obj.id) {
						this.idcard = obj.idcard
						console.log(this.idcard)
					}
				}

			})
			// 姓名id联动材料序号
		   var url = "/material/list"
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
			var arra = res.data.data.material_list;
			this.material_id = '';
			for (var obj of arra) {
			 if (this.id == obj.empl_id) {
			  this.material_id = obj.id
			  console.log(this.material_id)
			 }
			}
		   }).catch(function(err) {

		   })
	
		},
		// 新增
		add() {
			// 档案
			var url = "/material/add"
			// 传递给后端的数据
			var data = {
				empl_id: this.id,
				// modified: this.modified,S
				nm: this.m_nm,
				type: this.type,
				group_num: this.group_num,
				page_num: this.page_num,
				remark: this.remark,
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
					this.$router.push({
						path: '/two'
					});
				} else {
					this.$message("添加失败");
				}

			}).catch(function(err) {

			})
		},
		// 上传
		upload_files() {
			let file = document.querySelector('input[type=file]').files[0]

			var url = "/material_affix/upload_files"

			let formData = new FormData();
			formData.append('upload_files', file);
			formData.append('empl_id', this.id);
			formData.append('material_id', this.material_id);
			formData.append('key', sessionStorage.getItem("key"));
			formData.append('token', sessionStorage.getItem("token"));
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				}
			}
			this.$axios.post(url, formData).then(res => {
				console.log(res)
				if(res.data.code == 200){
					this.$message("上传成功");
				}else{
					this.$message("上传失败");
				}
			}).catch(function(err) {

			})
		}
	},
	mounted: function() {
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

// 		var url = "/material/list"
// 		// 传递给后端的数据
// 		var data = {
// 			key: sessionStorage.getItem("key"),
// 			token: sessionStorage.getItem("token")
// 		};
// 		this.$axios.get(url, {
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// 				'X-Requested-With': 'XMLHttpRequest'
// 			},
// 			params: data
// 		}).then(res => {
// 			console.log(res.data.data.material_list)
// 		}).catch(function(err) {
// 
// 		})
	}
};
</script>

<style scoped>
.text {
	position: absolute;
	margin-top: 20px;
	margin-left: 0px;
}

textarea {
	border-radius: 10px;
	width: 300px;
	height: 150px;
	margin-top: 20px;
	vertical-align: top;
	margin-left: 80px;
}
</style>
