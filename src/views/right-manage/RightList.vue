<!--  -->
<template>
  <div class="rightList">
    <el-table
      :data="dataSource"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      indent.num="20"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="title" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="key" label="权限路径"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="scope.row.default"
            @click="handleDelete(scope.row)"
            circle
          ></el-button>
          <el-popover placement="top" width="80" trigger="click">
            <div style="text-align: center; margin: 0">
              <p>页面配置项</p>
              <el-switch
                :value="scope.row.pagepermisson === 1 ? true : false"
                @change="handleEdit(scope.row, scope.row.pagepermisson)"
              >
              </el-switch>
            </div>
            <el-button
              type="primary"
              icon="el-icon-s-operation"
              :disabled="scope.row.pagepermisson === undefined"
              circle
              slot="reference"
            ></el-button>
          </el-popover>
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 删除
    handleDelete(row) {
      this.$confirm("你确定要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // console.log(row);
        if (row.grade === 1) {
          this.dataSource = this.dataSource.filter(
            (item) => item.id !== row.id
          );
          this.$axios.delete(`/rights/${row.id}`);
        } else {
          let list = this.dataSource.filter((item) => item.id === row.rightId);
          list[0].children = list[0].children.filter(
            (item) => item.id !== row.id
          );
          this.dataSource = [...this.dataSource];
          this.$axios.delete(`/children/${row.id}`);
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    handleEdit(row) {
      row.pagepermisson = row.pagepermisson === 1 ? 0 : 1;
      // console.log(this.dataSource);
      this.dataSource = [...this.dataSource];
      if (row.grade === 1) {
        this.$axios.patch(`/rights/${row.id}`, {
          pagepermisson: row.pagepermisson,
        });
      } else {
        this.$axios.patch(`/children/${row.id}`, {
          pagepermisson: row.pagepermisson,
        });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$axios.get("/rights?_embed=children").then((res) => {
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
