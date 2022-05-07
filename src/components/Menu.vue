<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :unique-opened="true"
  >
    <el-menu-item v-for="item in noChildren" :key="item.key" :index="item.key">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
    <el-submenu v-for="item in haveChildren" :key="item.key" :index="item.key">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <template v-for="item in item.children">
        <el-menu-item-group
          :key="item.key"
          v-if="item.pagepermisson === 1"
          :index="item.key"
        >
          <el-menu-item>{{ item.title }}</el-menu-item>
        </el-menu-item-group>
      </template>
    </el-submenu>
  </el-menu>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
</style>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: false,
      rights: [],
      // noChildren: undefined,
    };
  },
  computed: {
    noChildren() {
      return this.rights.filter((item) => {
        return item.children.length == 0;
      });
    },
    haveChildren() {
      return this.rights.filter((item) => {
        return !item.children.length == 0;
      });
    },
  },
  // filters: {
  //   noChildren() {
  //     return this.rights.filter((item) => {
  //       item.children.length === 0;
  //     });
  //   },
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    this.$axios
      .get("http://localhost:2246/rights?_embed=children")
      .then((response) => {
        this.rights = response.data;
        // console.log(response.data[1].children.length);
      });
  },
};
</script>
