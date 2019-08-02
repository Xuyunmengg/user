<template>
  <div id="aaa">
    <img src="../../img/u844.jpg"/>
    <span id="A">人事档案管理系统</span>
    <div class="line">

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#00284D"
               text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item v-for="obj in arr" :v-show='!obj.children'
                      :index="obj.index" @click='fn(obj)'>
          {{obj.text}}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: "",
        activeIndex2: '1',
        arr: [{
          text: '档案查询',
          index: '1',
          url: '/one'
        },
          {
            text: '新增档案',
            index: '2',
            url: '/two'
          },
          {
            text: '目录管理',
            index: '3',
            url: '/three'
          },
          {
            text: '员工管理',
            index: '4',
            url: '/four'
          },
          {
            text: '统计数据',
            index: '5',
            url: '/Welcome'
          },
          {
            text: '系统设置',
            index: '6',
            url: '/six'
          },
          {
            text: '退出系统',
            index: '7',
            url: ''
          }
        ]

      }
    },

    activated() {
      if (this.$route.name + '' === 'Welcome') {
        this.activeIndex = "5";
        let param = {
          text: '统计数据',
          index: '5',
          url: '/Welcome'
        };
        this.fn(param)
      } else {
        this.activeIndex = this.$route.meta.pathIndex
      }
    },

    methods: {
      fn(obj) {
        this.activeIndex = obj.index;
        //路由跳转
        this.$router.replace({
          path: obj.url
        });
        // 退出系统
        if (obj.index+'' === '7') {
          var url = "/admin/logout"
          var data = {
            key: sessionStorage.getItem("key"),
            token: sessionStorage.getItem("token")
          };
          // 员工
          this.$axios.post(url, this.$qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }).then(res => {
            sessionStorage.clear();
            this.$router.replace({path: '/login'});
          })
        }
      }
    }
  }
</script>

<style>
  img {
    width: 160px;
    height: 60px;
    float: left;
    position: relative;
    margin-left: 50px;
  }

  #A {
    width: 200px;
    height: 50px;
    line-height: 50px;
    float: left;
    margin-left: 30px;
    font-size: 23px;
    color: #FFFFFF;
    position: relative;
  }

  .line {
    height: 60px;
    display: inline-block;
    margin-left: 100px;
    position: absolute;
  }

  element.style {
    background-color: rgb(0, 40, 77);
    height: 60px;
  }

  .el-menu--horizontal {
    margin-left: 100px;
    border-right: none;
  }
</style>
