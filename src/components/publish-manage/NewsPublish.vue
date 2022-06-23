<!-- 发布表格 -->
<template>
  <div class="NewsPublish">
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
          <el-button
            :type="color"
            :plain="type === 1 ? false : true"
            @click="operation(scope.row, type)"
            >{{ button }}</el-button
          >
          <slot></slot>
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
  props: { type: Number },
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
  computed: {
    button() {
      let button;
      if (this.type === 1) {
        button = "发布";
      } else if (this.type === 2) {
        button = "下线";
      } else {
        button = "删除";
      }
      return button;
    },
    color() {
      let color;
      if (this.type === 1) {
        color = "primary";
      } else if (this.type === 2) {
        color = "danger";
      } else {
        color = "danger";
      }
      return color;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 操作
    operation(row, type) {
      if (type === 1) {
        this.dataSource = this.dataSource.filter((item) => item.id !== row.id);
        this.$axios
          .patch(`/news/${row.id}`, {
            publishState: 2,
            publishTime: Date.now(),
          })
          .then(() => {
            this.$notify({
              title: "通知",
              message: `您可以到【发布管理/已经发布】中查看您的新闻`,
              position: "bottom-right",
              type: "success",
            });
          });
      } else if (type === 2) {
        this.dataSource = this.dataSource.filter((item) => item.id !== row.id);
        this.$axios
          .patch(`/news/${row.id}`, {
            publishState: 3,
          })
          .then(() => {
            this.$notify({
              title: "通知",
              message: `您可以到【发布管理/已下线】中查看您的新闻`,
              position: "bottom-right",
              type: "success",
            });
          });
      } else if (type === 3) {
        this.dataSource = this.dataSource.filter((item) => item.id !== row.id);
        this.$axios.delete(`/news/${row.id}`).then(() => {
          this.$notify({
            title: "通知",
            message: `您已经删除了已下线的新闻`,
            position: "bottom-right",
            type: "success",
          });
        });
      }
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const { username } = JSON.parse(localStorage.getItem("token"));
    this.$axios
      .get(
        `/news?author=${username}&publishState=${this.type}&_expand=category`
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
</style>
