<template>
  <el-container style="height: 100vh">
    <el-aside width="auto"><Menu /></el-aside>
    <el-container>
      <el-header><TopHeader /></el-header>
      <el-main><NewsRouter /> </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "../components/sandbox/Menu.vue";
import TopHeader from "../components/sandbox/TopHeader.vue";
import NewsRouter from "../components/sandbox/NewsRouter.vue";
export default {
  name: "Main",
  components: {
    Menu,
    TopHeader,
    NewsRouter,
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.el-header {
  background-color: #fff;
}
.el-main {
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  overflow: auto;
  background: #fff;
}
.el-container {
  background: #f0f2f5;
}
</style>
