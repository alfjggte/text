<!--  -->
<template>
  <div class="topHeader">
    <i
      class="el-icon-s-unfold fold"
      v-show="isCollapse == true"
      @click="OPEN"
    ></i>
    <i
      class="el-icon-s-fold fold"
      v-show="isCollapse == false"
      @click="OPEN"
    ></i>
    <div class="right">
      <span
        >欢迎 <span style="color: #1890ff">{{ username }}</span> 回来</span
      >
      <div class="headPortrait">
        <el-dropdown :hide-on-click="false" placement="bottom">
          <el-avatar :size="size" :src="circleUrl"></el-avatar>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ roleName }}</el-dropdown-item>
            <el-dropdown-item @click.native="withdraw">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapMutations, mapState } from "vuex";
// const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'))
export default {
  name: "TopHeader",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      circleUrl: "https://s1.ax1x.com/2022/06/13/XfE6xI.jpg",
      size: 30,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState(["isCollapse"]),
    username() {
      return JSON.parse(localStorage.getItem("token")).username;
    },
    roleName() {
      return JSON.parse(localStorage.getItem("token")).role.roleName;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    withdraw() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    ...mapMutations(["OPEN"]),
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.topHeader {
  padding: 0 16px;
}
.fold {
  margin-top: 20px;
}
.right {
  float: right;
  line-height: 60px;
}
.el-dropdown {
  height: 30px;
}
.headPortrait {
  float: right;
  padding-top: 10px;
  height: 30px;
}
</style>
