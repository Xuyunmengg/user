<template>
  <div id="app" style="height: 100%;">
    <el-container>
      <el-header>
        <top></top>
      </el-header>
      <el-container>
        <el-main>
          <corp></corp>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import top from './top'
  import Corp from './Corp'

  export default {
    components: {top, Corp},
    name: '',

    data() {
      return {};
    },
    methods: {}
  }
</script>

<style>
  .el-header {
    width: 100%;
    margin-top: 0px;
    background-color: #00284D;
    color: #333;
    position: relative;
  }

  .el-main {
    padding-left: 80px;
    background-color: white;
    color: #333;
    position: relative;
  }
</style>
