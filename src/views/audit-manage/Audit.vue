<!-- 审核新闻 -->
<template>
  <div class="Audit">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleAudit(scope.row, 2, 1)"
            >通过</el-button
          >
          <el-button type="danger" plain @click="handleAudit(scope.row, 3, 0)"
            >驳回</el-button
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
    // 通过/驳回
    handleAudit(row, auditState, publishState) {
      this.dataSource = this.dataSource.filter((item) => item.id !== row.id);
      this.$axios
        .patch(`/news/${row.id}`, { auditState, publishState })
        .then(() => {
          this.$notify({
            title: "通知",
            message: `您可以到[审核管理/审核列表]中查看您的新闻的审核状态`,
            position: "bottom-right",
            type: "success",
          });
        });
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const { roleId, region, username } = JSON.parse(
      localStorage.getItem("token")
    );
    const roleObj = {
      1: "superadmin",
      2: "admin",
      3: "editor",
    };
    this.$axios.get(`/news?auditState=1&_expand=category`).then((res) => {
      const list = res.data;
      this.dataSource =
        roleObj[roleId] === "superadmin"
          ? list
          : [
              ...list.filter((item) => item.author === username),
              ...list.filter(
                (item) =>
                  item.region === region && roleObj[item.roleId] === "editor"
              ),
            ];
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
</style>
