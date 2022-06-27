<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :unique-opened="true"
    background-color="#001529"
    text-color="#FFFFFF"
    active-text-color="#6284FF"
    :router="true"
  >
    <h3 class="title">{{ isCollapse ? "管理" : "全球新闻发布管理系统" }}</h3>
    <template v-for="item in noChildren">
      <el-menu-item
        :key="item.id"
        :index="item.key"
        @click="SetActive(item.key)"
        v-if="item.pagepermisson === 1 && rights.includes(item.key)"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </template>

    <template v-for="item in haveChildren">
      <el-submenu
        :key="item.id"
        :index="item.key"
        v-if="item.pagepermisson === 1 && rights.includes(item.key)"
      >
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span slot="title">{{ item.title }}</span>
        </template>
        <template v-for="item in item.children">
          <el-menu-item
            :index="item.key"
            :key="item.id"
            v-if="item.pagepermisson === 1 && rights.includes(item.key)"
            @click="SetActive(item.key)"
          >
            <i class="el-icon-warning"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      menu: [],
      rights: JSON.parse(localStorage.getItem("token")).role.rights,
    };
  },
  watch: {},

  computed: {
    noChildren() {
      return this.menu.filter((item) => {
        return item.children.length == 0;
      });
    },
    haveChildren() {
      return this.menu.filter((item) => {
        return !item.children.length == 0;
      });
    },

    ...mapState(["isCollapse", "activePath"]),
  },
  methods: {
    ...mapMutations(["SetActive"]),
  },
  created() {
    this.$axios.get("/rights?_embed=children").then((response) => {
      this.menu = response.data;
    });
    // console.log(this.rights);
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
