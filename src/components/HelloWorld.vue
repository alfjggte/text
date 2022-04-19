<template>
  <el-container>
    <el-aside width="200px"><Home /></el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>.....</el-main>
    </el-container>
  </el-container>
</template>

<script>
import Home from "../views/Home.vue";
export default {
  name: "HelloWorld",
  components: {
    Home,
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
