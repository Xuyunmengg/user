<!-- html部分 -->
<template>
  <div id="app">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="在职员工" name="first">
          <!-- 查询 -->
          <div id="search">
            <span>姓名：</span>
            <el-select v-model="searchName" filterable placeholder="请选择">
              <el-option v-for="item in empllist" :key="item.id" :label="item.nm" :value="item.nm">
              </el-option>
            </el-select>
            <!-- <el-input v-model="searchName" placeholder="请输入姓名" style="width: 160px;"></el-input> -->
            <span>部门：</span>
            <el-select v-model="searchDept" filterable placeholder="所在部门" style="width: 200px;">
              <el-option v-for="item in deptList" :key="item.id" :label="item.nm" :value="item.id">
              </el-option>
            </el-select>
            <span>职称：</span>
            <el-select v-model="searchPost" filterable placeholder="职称" style="width: 200px;margin-top: 20px;">
              <el-option v-for="item2 in postList" :key="item2.id" :label="item2.nm" :value="item2.id">
              </el-option>
            </el-select>
            <el-button class="buttons" type="primary" size="mini" @click="search">查询</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="empty">重置</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="">导入员工</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="">导入数据</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="add">员工入职</el-button>
          </div>

          <!-- 表格 1-->
          <template>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="empl_no" label="员工编号" width="90"></el-table-column>
              <el-table-column prop="nm" label="姓名" width="90"></el-table-column>
              <el-table-column prop="gender" label="性别" width="90"></el-table-column>
              <el-table-column prop="birthday" label="出生年月" width="130"></el-table-column>
              <el-table-column prop="dept_nm" label="部门" width="100"></el-table-column>
              <el-table-column prop="post_nm" label="岗位" width="100"></el-table-column>
              <el-table-column prop="mobile" label="联系电话" width="130"></el-table-column>
              <el-table-column prop="entry_date" label="入职时间" width="130"></el-table-column>
              <el-table-column prop="issue" label="档案号" width="130"></el-table-column>
              <el-table-column prop="location" label="档案位置" width="130"></el-table-column>

              <el-table-column prop="look" label="操作" width="160">
                <template slot-scope="scope">
                  <el-button @click="update(scope.row)" type="warning" size="mini">修改资料</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <!-- 表格2 -->
        <el-tab-pane label="岗位变动" name="second">
          <!-- 查询 -->
          <div id="search" style="margin-top: 20px;">
            <span>员工姓名：</span>
            <el-select v-model="empl_id" filterable placeholder="请选择">
              <el-option v-for="item in empllist" :key="item.id" :label="item.nm" :value="item.id">
              </el-option>
            </el-select>
            <!-- <el-input v-model="empl_id" placeholder="请输入员工姓名" style="width: 160px;"></el-input> -->
            <span>批准文电号：</span>
            <el-input v-model="nm" placeholder="请输入批准文电号" style="width: 160px;"></el-input>
            <el-button class="buttons" type="primary" size="mini" @click="getMaterial">查询</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="empty1">重置</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="addbiandong">新增变动</el-button>
          </div>

          <template>
            <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="empl_nm" label="员工姓名" width="80"></el-table-column>
              <el-table-column prop="graduate_major" label="文件名称" width="100"></el-table-column>
              <el-table-column prop="graduate_date" label="开始时间" width="130"></el-table-column>
              <el-table-column prop="graduate_start_date" label="结束时间" width="130"></el-table-column>
              <el-table-column prop="graduate_school" label="部门" width="110"></el-table-column>
              <el-table-column prop="graduate_education" label="岗位" width="110"></el-table-column>
              <el-table-column prop="nm" label="批准文电号" width="130"></el-table-column>
              <!-- <el-table-column prop="type" label="类别" width="130"></el-table-column> -->
              <el-table-column prop="remark" label="备注" width="100"></el-table-column>
              <el-table-column prop="look" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="update_biandong(scope.row)" type="warning" size="mini">修改变动</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="离职员工" name="third">
          <!-- 查询 -->
          <div id="search" style="margin-top: 20px;">
            <span>员工姓名：</span>
            <el-select v-model="empl_id1" filterable placeholder="请选择">
              <el-option v-for="item in empllist" :key="item.id" :label="item.nm" :value="item.id">
              </el-option>
            </el-select>
            <span>离职原因：</span>
            <el-select v-model="graduate_school" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.label">
              </el-option>
            </el-select>
            <el-button class="buttons" type="primary" size="mini" @click="getMaterial2">查询</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="empty2">重置</el-button>
            <el-button class="buttons" type="primary" size="mini" @click="add_lizhi">新增离职</el-button>
          </div>
          <!-- 表格3 -->
          <template>
            <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="文件编号" width="120"></el-table-column>
              <el-table-column prop="empl_nm" label="员工姓名" width="120"></el-table-column>
              <el-table-column prop="nm" label="文件名称" width="100"></el-table-column>
              <el-table-column prop="graduate_date" label="离职时间" width="130"></el-table-column>
              <el-table-column prop="graduate_school" label="离职原因" width="130"></el-table-column>
              <el-table-column prop="remark" label="备注" width="100"></el-table-column>
              <el-table-column prop="look" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button @click="update_lizhi(scope.row)" type="warning" size="mini">修改离职</el-button>
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
        deptList: [],
        postList: [],
        tableData: [],
        tableData1: [],
        tableData2: [],
        empllist: [],
        materialList: '',
        // 查询
        searchName: '',
        searchDept: '',
        searchPost: '',
        // 岗位变动查询
        nm: '',//批准文号
        empl_id: '',//员工id查询
        empl_id1: '',
        id: '',
        // 离职原因
        graduate_school: '',
        options: [{
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
      };
    },

    methods: {
      handleClick(tab, event) {
        // console.log("tab, event");
        // console.log(tab, event);
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
        this.searchDept = '';
        this.searchPost = '';
        this.query();
      },
      empty1() {
        this.empl_id = '';
        this.nm = '';
        this.getMaterial()
      },
      empty2() {
        this.empl_id1 = '';
        this.graduate_school = '';
        this.getMaterial2()
      },
      // 修改员工资料跳转
      update(row) {
        this.$router.push({name: 'Update', params: {row: row}});
      },
      // 添加员工跳转
      add() {
        this.$router.push({path: '/empl_add'});
      },
      // 添加变动跳转
      addbiandong() {
        this.$router.push({path: '/add_biandong'});
      },
      // 修改变动跳转
      update_biandong(row) {
        //this.$route.meta.keepAlive = true
        this.$router.push({name: 'update_biandong', params: {row: row}});
      },
      // 新增离职
      add_lizhi() {
        this.$router.push({path: '/add_lizhi'});
      },
      // 修改离职
      update_lizhi(row) {
        this.$router.push({name: 'update_lizhi', params: {row: row}});
      },
      // 部门
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
              console.log(res);
              if (res.data.code == 200) {
                this.deptList = res.data.data.dept_list;
                resolve(res);
              }
            });
        });
      },
      //岗位
      getPost() {
        console.log("岗位")
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
      // 岗位变动
      getMaterial() {
        // 后端网址  材料
        let material_url = '/material/list';
        // 传递给后端的数据
        var material_params = {
          empl_id: this.empl_id,
          nm: this.nm,
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
                let material_data = [];

                for (var obj of arr) {
                  //时间截取
                  this.d = obj.graduate_date;
                  this.d1 = this.d.substring(0, 11);
                  obj.graduate_date = this.d1;
                  material_data.push(obj);
                  //结束时间
                  this.d = obj.graduate_start_date;
                  this.d1 = this.d.substring(0, 11);
                  obj.graduate_start_date = this.d1;

                  let empl_info = res1.data.data.empl_list.filter(item => item.id == obj.empl_id);
                  if (empl_info.length > 0) {
                    obj.empl_nm = empl_info[0].nm;
                  }
                  let material_info = arr.filter(item1 => item1.id == obj.id);
                  if (material_info.type == 11) {
                    material_info.push(item1)
                  }
                }
                this.tableData1 = [...material_data]
                // 过滤类别
                if (this.tableData1 && this.tableData1.length > 0) {
                  this.tableData1 = this.tableData1.filter((f) => f.type === 11)
                }
              });
          }).catch(function (err) {

        });

      },
      // 离职变动
      getMaterial2() {
        // 后端网址  材料
        let material_url = '/material/list';
        // 传递给后端的数据
        var material_params = {
          empl_id: this.empl_id1,
          graduate_school: this.graduate_school,
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
                let material_data = [];
                console.log("material_data")
                console.log(material_data)

                for (var obj of arr) {
                  //时间截取
                  this.d = obj.graduate_date;
                  this.d1 = this.d.substring(0, 11);
                  obj.graduate_date = this.d1;
                  material_data.push(obj);
                  //结束时间
                  this.d = obj.graduate_start_date;
                  this.d1 = this.d.substring(0, 11);
                  obj.graduate_start_date = this.d1;

                  let empl_info = res1.data.data.empl_list.filter(item => item.id == obj.empl_id);
                  if (empl_info.length > 0) {
                    obj.empl_nm = empl_info[0].nm;
                  }
                  let material_info = arr.filter(item1 => item1.id == obj.id);
                  if (material_info.type == 11) {
                    material_info.push(item1)
                  }
                }
                this.tableData2 = [...material_data]
                // 过滤类别
                if (this.tableData2 && this.tableData2.length > 0) {
                  this.tableData2 = this.tableData2.filter((f) => f.type === 12)
                }
              });
          }).catch(function (err) {

        });

      },
      // 员工
      query() {
        let that = this;
        // 后端网址  员工
        var url = '/empl/list';
        // 传递给后端的数据
        var data = {
          nm: that.searchName,
          dept_id: this.searchDept,
          post_id: this.searchPost,
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
                //var arr = res.data.data.empl_list;
                let list = [];
                res.data.data.empl_list.forEach(item => {
                  item.gender = item.gender % 2 == 1 ? '男' : '女';
                  that.aa = item.birthday;
                  that.a = that.aa.substring(0, 11);
                  item.birthday = that.a;
                  //入职时间截取
                  that.bb = item.entry_date;
                  that.b = that.bb.substring(0, 11);
                  item.entry_date = that.b;
                  // 开始时间截取
                  that.bb = item.created;
                  that.b = that.bb.substring(0, 11);
                  item.created = that.b;
                  // 结束时间截取
                  that.bb = item.modified;
                  that.b = that.bb.substring(0, 11);
                  item.modified = that.b;
                  let dept_info = that.deptList.filter(item1 => item1.id == item.dept_id);
                  let post_info = that.postList.filter(item1 => item1.id == item.post_id);
                  if (dept_info.length > 0) {
                    item.dept_nm = dept_info[0].nm;
                  }
                  if (post_info.length > 0) {
                    item.post_nm = post_info[0].nm;
                  }
                  // 离职员工不显示
                  if (item.state < 3) {
                    list.push(item);
                  }
                });
                that.tableData = list;
                resolve(res)
              }
              console.log(that.tableData);
            })
            .catch(function (err) {
              // console.log(err)
            });
        });
      },
      getUserInfo() {
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
                this.empllist = res.data.data.empl_list;
                resolve(res);
              }
            });
        });
      },
      async search() {
        await this.getDept();
        await this.getPost();
        await this.getMaterial();
        await this.getMaterial2();
        await this.query();
      },
    },
    activated() {
      let that = this;
      if (this.activeName + '' === 'second') {
        //岗位管理
        that.getMaterial()
      } else if (this.activeName + '' === 'third') {
       // 离职员工
       that.getMaterial2()

      } else {
        //在职员工
				that.query()
      }
    },
    mounted: function () {
      this.search();
      this.getUserInfo()
    },


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
</style>
