<!--  -->
<template>
  <div class="roleList">
    <el-table
      :data="
        dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="300">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="scope.row.default"
            @click="handleDelete(scope.row)"
            circle
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-more"
            :disabled="scope.row.default"
            circle
            @click="handleEdit(scope.row, rightList)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="权限分配" :visible.sync="dialogVisible" width="30%">
      <el-tree
        :props="props"
        :data="rightList"
        show-checkbox
        accordion
        check-strictly
        node-key="key"
        ref="tree"
        :default-checked-keys="currentRights"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      dataSource: [],
      rightList: [],
      props: {
        label: "title",
        children: "children",
      },
      currentRights: [],
      currentId: 0,
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
    };
  },
  //监听属性 类似于data概念
  computed: {
    tableData() {
      return this.dataSource;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 删除
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.$axios.delete(`/roles/${row.id}`);
        this.dataSource = this.dataSource.filter((item) => {
          return item.id !== row.id;
        });
      });
    },
    // 操作
    handleEdit(row) {
      this.dialogVisible = true;
      this.currentId = row.id;
      this.currentRights = row.rights;
      // console.log(row.rights);
    },
    // handleCheckChange(data, checked, indeterminate) {
    //   console.log(data, checked, indeterminate);
    // },
    // 确认
    handleOk() {
      this.dialogVisible = false;
      this.resetChecked();
    },
    // 取消
    handleCancel() {
      this.dialogVisible = false;
    },
    // 清空
    resetChecked() {
      // 获取所有选中的key
      this.currentRights = this.$refs.tree.getCheckedKeys(false);

      this.$axios.patch(`/roles/${this.currentId}`, {
        rights: this.currentRights,
      });
      // 清空上一次的key
      this.currentRights = [];
      // 取消勾选的key
      this.$refs.tree.setCheckedKeys([]);
      // 更新key
      setTimeout(() => {
        this.getDataSource();
      }, 10);
    },
    getDataSource() {
      this.$axios.get("/roles").then((res) => {
        this.dataSource = res.data;
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
    this.getDataSource();
    this.$axios.get("/rights?_embed=children").then((res) => {
      this.rightList = res.data;
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
