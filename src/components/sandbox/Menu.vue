<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :unique-opened="true"
    background-color="#001529"
    text-color="#FFFFFF"
    active-text-color="#6284FF"
    :router="true"
  >
    <h3 class="title">{{ isCollapse ? "管理" : "全球新闻发布管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.id"
      :index="item.key"
      @click="saveNavState(item.key)"
    >
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
    <el-submenu v-for="item in haveChildren" :key="item.id" :index="item.key">
      <template slot="title">
        <i class="el-icon-warning"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <template v-for="item in item.children">
        <el-menu-item
          :index="item.key"
          :key="item.id"
          v-if="item.pagepermisson === 1"
          @click="saveNavState(item.key)"
        >
          <i class="el-icon-warning"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      rights: [],
      activePath: "/home",
      // noChildren: undefined,
    };
  },
  watch: {
    // activePath() {
    //   window.localStorage.getItem("activePath");
    // },
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

    ...mapState(["isCollapse"]),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
  },
  created() {
    this.$axios.get("/rights?_embed=children").then((response) => {
      this.rights = response.data;
      // console.log(response.data[1].children.length);
    });
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  mounted() {},
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu {
  border: none;
}
.title {
  text-align: center;
  color: aliceblue;
  line-height: 60px;
}
/* el-menu--collapse el-menu */
</style>
