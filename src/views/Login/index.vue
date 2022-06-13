<!--  -->
<template>
  <div class="login">
    <vue-particles color="#dedede"></vue-particles>
    <div class="formContainer">
      <h3 class="lpogintitle">用户登录</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Login",
  components: {},
  data() {
    //这里存放数据
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
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
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .get(
              `/users?username=${this.ruleForm.name}&password=${this.ruleForm.password}&roleState=true&_expand=role`
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.length === 0) {
                this.$message.error("用户名或密码不匹配");
              } else {
                localStorage.setItem("token", JSON.stringify(res.data[0]));
                this.$router.push("/");
              }
            });
        } else {
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
#particles-js {
  width: 100%;
  background: rgb(35, 39, 65);
  height: calc(100% - 4px);
  position: absolute;
}
.formContainer {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.lpogintitle {
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  color: white;
}
</style>
