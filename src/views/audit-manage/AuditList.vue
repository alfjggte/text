<!-- 审核列表 -->
<template>
  <div class="AuditList">
    <el-table
      :data="
        dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column prop="title" label="新闻标题" width="180">
        <template slot-scope="scope">
          <router-link :to="`/news-manage/preview/${scope.row.id}`">{{
            scope.row.title
          }}</router-link>
        </template>
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
          <el-button
            plain
            v-show="scope.row.auditState == 1"
            @click="handleRervert(scope.row)"
            >撤销</el-button
          >
          <el-button
            type="success"
            plain
            v-show="scope.row.auditState == 2"
            @click="handlePublish(scope.row)"
            >发布</el-button
          >
          <el-button
            type="primary"
            plain
            v-show="scope.row.auditState == 3"
            @click="handleUpdate(scope.row)"
            >更新</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="right"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout=" prev, pager, next"
      :total="dataSource.length"
    >
    </el-pagination>
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
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 撤销
    handleRervert(row) {
      this.dataSource = this.dataSource.filter((item) => item.id !== row.id);
      this.$axios
        .patch(`/news/${row.id}`, {
          auditState: 0,
        })
        .then(() => {
          this.$notify({
            title: "通知",
            message: `您可以到草稿箱中查看您的新闻`,
            position: "bottom-right",
            type: "success",
          });
        });
    },
    // 发布
    handlePublish(row) {
      this.$axios
        .patch(`/news/${row.id}`, {
          publishState: 2,
          publishTime: Date.now(),
        })
        .then(() => {
          this.$router.push("/publish-manage/published");
          this.$notify({
            title: "通知",
            message: `您可以到【发布管理/已经发布】中查看您的新闻`,
            position: "bottom-right",
            type: "success",
          });
          this.$store.commit("SetActive", "/publish-manage/published");
        });
    },
    // 更新
    handleUpdate(row) {
      this.$router.push(`/news-manage/update/${row.id}`);
      this.$store.commit("SetActive", `/news-manage/update/${row.id}`);
    },
  },
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
