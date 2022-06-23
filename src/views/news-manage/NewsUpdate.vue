<!--  -->
<template>
  <div class="newsAdd">
    <a-page-header style="" title="撰写新闻" subTitle="This is a subtitle" />
    <el-steps :active="current" finish-status="success" align-center>
      <el-step title="基本信息" description="新闻标题，新闻分类"></el-step>
      <el-step title="新闻内容" description="新闻主体内容"></el-step>
      <el-step title="新闻提交" description="保存草稿或者提交审核"></el-step>
    </el-steps>
    <div style="margin-top: 40px" v-show="current === 0">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="新闻标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入新闻标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻分类" prop="categoryId">
          <el-select
            v-model="ruleForm.categoryId"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 40px" v-show="current === 1">
      <NewsEditor :formInline="formInline" />
    </div>

    <div>
      <span v-show="current === 2">
        <el-button
          style="margin-top: 12px"
          type="primary"
          @click="handleSave(0)"
          >保存草稿箱</el-button
        >
        <el-button
          style="margin-top: 12px"
          type="success"
          plain
          @click="handleSave(1)"
          >提交审核</el-button
        >
      </span>
      <el-button
        style="margin-top: 12px"
        @click="handleNext"
        type="primary"
        v-show="current < 2"
        >下一步
      </el-button>
      <el-button
        style="margin-top: 12px"
        @click="handlePrevious"
        v-show="current > 0"
        >上一步</el-button
      >
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NewsEditor from "../../components/news-manage/NewsEditor";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { NewsEditor },
  data() {
    //这里存放数据
    return {
      current: 0,
      categoryList: [], //分类
      ruleForm: {
        title: "",
        categoryId: 0,
      },
      rules: {
        title: [{ required: true, message: "请输入新闻标题", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
      },
      // content: "", //内容
      formInline: {
        contentFileList: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 上一步
    handlePrevious() {
      this.current = this.current - 1;
      console.log(this.current);
    },
    // 下一步
    handleNext() {
      if (this.current === 0) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            this.current = this.current + 1;
          }
        });
      } else {
        // 内容不能为空
        if (
          this.formInline.contentFileList === "" ||
          this.formInline.contentFileList.trim() === "<p></p>"
        ) {
          this.$message.error("新闻内容不能为空");
        } else {
          console.log(this.formInline.contentFileList);
          this.current = this.current + 1;
        }
      }
    },
    // 提交
    handleSave(auditState) {
      this.$axios
        .patch(`/news/${this.$route.params.id}`, {
          ...this.ruleForm,
          content: this.formInline.contentFileList,
          auditState: auditState,
        })
        .then(() => {
          this.$router.push(
            auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
          );
          this.$notify({
            title: "通知",
            message: `您可以到${
              auditState === 0 ? "草稿箱" : "审核列表"
            }中查看您的新闻`,
            position: "bottom-right",
            type: "success",
          });
          this.$store.commit(
            "SetActive",
            auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
          );
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$axios.get("/categories").then((res) => {
      this.categoryList = res.data;
    });
    this.$axios
      .get(`/news/${this.$route.params.id}?_expand=category&_expand=role`)
      .then((res) => {
        let { title, categoryId, content } = res.data;
        this.ruleForm.title = title;
        this.ruleForm.categoryId = categoryId;
        this.formInline.contentFileList = content;
        console.log(res.data);
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
.el-select {
  width: 100%;
}
</style>
