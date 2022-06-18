<!--  -->
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
        <el-select v-model="ruleForm.region" :disabled="disabled">
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.title"
            :value="item.value"
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
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item> -->
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
      disabled: false, //禁选
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
        region: [
          { required: false, message: "请选择区域", trigger: "blur" },
          // {isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]
        ],
        roleId: [
          { required: true, message: "请选择角色", trigger: "blur" },
          // {isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    refresh() {
      if (this.ruleForm.roleId === 1) {
        this.disabled = true;
        this.ruleForm.region = "";
      } else {
        this.disabled = false;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    setInterval(() => {
      this.refresh();
    }, 0);
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
.el-select {
  width: 100%;
}
</style>
