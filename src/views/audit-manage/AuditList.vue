<!--  -->
<template>
  <div class="AuditList">
    <el-table :data="dataSource" style="width: 100%">
      <el-table-column prop="title" label="新闻标题" width="180">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="180">
      </el-table-column>
      <el-table-column prop="category.title" label="新闻分类">
      </el-table-column>
      <el-table-column prop="auditState" label="审核状态">
        <template slot-scope="scope">
          <el-tag :type="colorList[scope.row.auditState]">{{
            auditList[scope.row.auditState]
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain v-show="scope.row.auditState == 1">撤销</el-button>
          <el-button
            type="success"
            plain
            v-show="scope.row.auditState == 2"
            @click="handleDelete(scope.row)"
            >发布</el-button
          >
          <el-button
            type="primary"
            plain
            v-show="scope.row.auditState == 3"
            @click="handleDelete(scope.row)"
            >更新</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      dataSource: [],
      colorList: ["", "warning", "success", "danger"],
      auditList: ["草稿箱", "审核中", "已通过", "未通过"],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const { username } = JSON.parse(localStorage.getItem("token"));
    this.$axios
      .get(
        `/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`
      )
      .then((res) => {
        this.dataSource = res.data;
      });
  },
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
.el-button + .el-button {
  margin-left: 0px;
}
</style>
