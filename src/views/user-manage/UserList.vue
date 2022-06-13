<!--  -->
<template>
  <div class="">
    <el-button
      type="primary"
      @click="
        () => {
          isAddvisible = true;
        }
      "
      >添加用户</el-button
    >
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column prop="region" label="区域" width="180">
      </el-table-column>
      <el-table-column prop="role.roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.default"
            :value="scope.row.roleState"
            @change="roleState(scope.row)"
          ></el-switch>
        </template>
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
            icon="el-icon-edit"
            :disabled="scope.row.default"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5]"
      :page-size="pageSize"
      layout=" prev, pager, next"
      :total="tableData.length"
    >
    </el-pagination>

    <el-dialog title="添加用户" :visible.sync="isAddvisible" width="30%">
      <span
        ><UserForm ref="addFrom" :roleList="roleList" :regionList="regionList"
      /></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddvisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import UserForm from "@/components/user-manage/UserForm";
export default {
  name: "UserList",
  //import引入的组件需要注入到对象中才能使用

  components: {
    UserForm,
  },
  data() {
    //这里存放数据
    return {
      radioModel: true,
      region: {},
      username: [],
      regionList: [],
      roleList: {},
      isAddvisible: false,
      ruleForm: [],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
    };
  },
  //监听属性 类似于data概念
  computed: {
    tableData() {
      const newlist = this.username;
      for (let i = 0; i < newlist.length; i++) {
        if (newlist[i].region === "") {
          newlist[i].region = "全球";
        }
      }
      return newlist;
    },
    // tableData: {
    //   handler() {
    //     const newlist = this.username;
    //     for (let i = 0; i < newlist.length; i++) {
    //       if (newlist[i].region === "") {
    //         newlist[i].region = "全球";
    //       }
    //     }
    //     return newlist;
    //   },
    //   deep: true, //开启深度监听
    // },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //添加用户
    addFormOk() {
      // this.$refs.addFrom.submitForm();
      this.$refs.addFrom.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.isAddvisible = false;
          // const newform = this.$refs.addFrom.ruleForm;
          this.ruleForm = { ...this.$refs.addFrom.ruleForm };
          console.log(this.ruleForm);
          if (this.ruleForm.roleId === "超级管理员") {
            this.ruleForm.roleId = 1;
          } else if (this.ruleForm.roleId === "区域管理员") {
            this.ruleForm.roleId = 2;
          } else {
            this.ruleForm.roleId = 3;
          }
          this.$axios
            .post(`/users`, {
              ...this.ruleForm,
              roleState: true,
              default: false,
            })
            .then((res) => {
              console.log(res.data);
              this.username = [
                ...this.username,
                {
                  ...res.data,
                  role: this.roleList.filter(
                    (item) => item.id === this.ruleForm.roleId
                  )[0],
                },
              ];
              console.log(this.username);
            });
          // this.$refs.addFrom.$refs.ruleForm.ruleForm = null;
        } else {
          console.log("error submit!!");
          return false;
        }
        this.clean();
      });

      // console.log(this.$refs.addFrom);
      // this.isAddvisible = false;
    },

    clean() {
      setImmediate(() => {
        this.$refs.addFrom.$refs.ruleForm.resetFields();
        this.$refs.addFrom.$refs.disabled = false;
      }, 0);
      // this.$refs.addFrom.$refs.ruleForm.resetFields();
    },
    // 状态
    roleState(row) {
      row.roleState = !row.roleState;
      this.$axios.patch(`/users/${row.id}`, {
        roleState: row.roleState,
      });
      // console.log(row);
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除
    handleDelete(row) {
      this.$confirm("将删除该用户, 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.username = this.username.filter((data) => data.id !== row.id);
          this.$axios.delete(`/users/${row.id}`);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const roleObj = {
      1: "superadmin",
      2: "admin",
      3: "editor",
    };
    const { roleId, region, username } = JSON.parse(
      localStorage.getItem("token")
    );
    this.$axios.get("/regions").then((res) => {
      this.regionList = res.data;
      // console.log(this.regionList);
    });
    this.$axios.get("/roles").then((res) => {
      // console.log(res.data);
      this.roleList = res.data;
      // console.log(this.roleList);
    });
    this.$axios.get("/users?_expand=role").then((res) => {
      const list = res.data;
      this.username =
        roleObj[roleId] === "superadmin"
          ? list
          : [
              ...list.filter((item) => item.username === username),
              ...list.filter(
                (item) =>
                  item.region === region &&
                  this.roleObj[item.roleId] === "editor"
              ),
            ];
      console.log(this.username);
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    console.log(this.username);
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
</style>
