<template>
  <el-container style="height: 100%">
    <el-aside width="auto"><common-aside></common-aside></el-aside>
    <el-container>
      <el-header><TopHeader /></el-header>
      <el-main><NewsRouter /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/sandbox/Menu.vue";
import TopHeader from "../components/sandbox/TopHeader.vue";
import NewsRouter from "../components/sandbox/NewsRouter.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    TopHeader,
    NewsRouter,
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.el-header {
  background-color: #333;
}
.el.main {
  padding-top: 0;
}
</style>
