<template>
  <div>
    <h1>员工资料修改</h1>
    <el-row>
      <el-col :span="12">
        员工编号：
        <span>{{empl_no}}</span>
      </el-col>
      <el-col :span="12">
        身份证号：
        <span>{{idcard}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="margin-top: 20px;">
        性别：
        <span>{{gender}}</span>
      </el-col>
      <el-col :span="12">
        员工姓名：
        <el-input style="width:300px;margin-top: 10px;" v-model="nm" placeholder="请输入材料名称">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="margin-top: 20px;">
        出生年月：
        <span>{{birthday}}</span>
      </el-col>
      <el-col :span="12">
        入职部门：
        <el-select v-model="dept_id" style="width: 300px;margin-top: 20px;">
          <el-option v-for="item in deptList" :key="item.id" :label="item.nm" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        目前岗位：
        <el-select v-model="post_id" style="width: 300px;margin-top: 20px;">
          <el-option v-for="item in postList" :key="item.id" :label="item.nm" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        入职时间：
        <el-date-picker style='width: 300px; margin-top: 20px;' v-model="entry_date" type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        毕业院校：
        <el-input style="width:300px;margin-top: 20px;" v-model="graduate_school">
        </el-input>
      </el-col>
      <el-col :span="12">
        最高学历：
        <el-select v-model="education" placeholder="请选择档案类别" style="width: 300px;margin-top: 20px;">
          <el-option v-for="item in options" :key="item.education" :label="item.label" :value="item.education">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        档案编号：
        <el-input style="width:300px;margin-top: 20px;" v-model="issue">
        </el-input>
      </el-col>
      <el-col :span="12">
        档案位置：
        <el-input style="width:300px;margin-top: 20px;" v-model="location">
        </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px;text-align: center;">
      <el-col :span="24">
        <el-button type="primary" @click="edit">确认修改</el-button>
        <el-button @click="cancel">返回</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 回显内容
        empl_no: '',
        nm: '',			 	 //姓名
        gender: '',			 //性别
        birthday: '',		 //生日
        dept_id: '',			//当前部门
        post_id: '',			//当前职位
        graduate_school: '', //毕业学校
        education: '',		//学历
        issue: '',			//档案编号
        location: '',		//档案位置
        entry_date: '',		//入职日期
        idcard: '',			//身份证号
        sn: '',
        userInfo: {},
        deptList: [],
        postList: [],
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
        option: [
          {
            gender: '1',
            label: '男'
          }, {
            gender: '2',
            label: '女'
          }
        ]
      };
    },
    methods: {
      //返回
      cancel() {
        this.$router.go(-1);
      },
      edit() {
        // 档案
        var url = "/empl/put"
        // 传递给后端的数据
        var data = {
          id: this.id,
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
          sn: this.sn,
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

        }).catch(function (err) {

        })

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
    mounted: function () {
      this.getDept();
      this.getPost();


      //接受路由传递的数据
      var obj = this.$route.params.row;
      this.id = obj.id;
      this.empl_no = obj.empl_no;
      this.nm = obj.nm;
      this.gender = obj.gender;
      this.birthday = obj.birthday;
      this.dept_id = obj.dept_id;
      this.post_id = obj.post_id;
      this.graduate_school = obj.graduate_school;
      this.education = obj.education;
      this.issue = obj.issue;
      this.location = obj.location;
      this.entry_date = obj.entry_date;
      this.idcard = obj.idcard;
      this.sn = obj.sn;
    }
  };
</script>

<style>

</style>
