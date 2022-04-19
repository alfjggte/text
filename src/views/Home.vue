<template>
  <el-col :span="12" class="box">
    <h5>全球新闻发布管理系统</h5>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {},
  mounted() {
    this.$axios.get("http://localhost:2246/users").then((response) => {
      // this.users = response.data;
      console.log(response.data);
    });
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
