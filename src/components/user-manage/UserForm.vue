<!-- 用户表单 -->
<template>
  <div class="UserForm">
    <el-form
      :model="ruleForm"
      :rules="rules"
      size="small"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="region">
        <el-select v-model="ruleForm.region" :disabled="isDisabled">
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.title"
            :value="item.value"
            :disabled="checkRegionDisabled(item)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="ruleForm.roleId" @change="refresh">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleType"
            :disabled="checkRoleDisabled(item)"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["roleList", "regionList", "ruleForm"],
  data() {
    //这里存放数据
    return {
      // disabled: this.isDisabled, //禁选
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        region: this.disabled
          ? []
          : [{ required: true, message: "请选择区域", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      roleObj: {
        1: "superadmin",
        2: "admin",
        3: "editor",
      },
      isDisabled: false, //禁选
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 区域
    checkRegionDisabled(item) {
      const { roleId, region } = JSON.parse(localStorage.getItem("token"));
      if (this.roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return item.value !== region;
      }
    },
    // 角色
    checkRoleDisabled(item) {
      const { roleId } = JSON.parse(localStorage.getItem("token"));
      if (this.roleObj[roleId] === "superadmin") {
        return false;
      } else {
        return this.roleObj[item.id] !== "editor";
      }
    },
    refresh() {
      if (this.ruleForm.roleId === 1) {
        this.isDisabled = true;
        this.ruleForm.region = "";
      } else {
        this.isDisabled = false;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.refresh();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    this.refresh();
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.el-select {
  width: 100%;
}
</style>
