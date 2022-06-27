<!-- 新闻详情 -->
<template>
  <div class="detail">
    <a-page-header
      style=""
      v-if="newsInfo.title && newsInfo.category.title"
      :title="newsInfo.title"
      :sub-title="newsInfo.category.title"
      @back="back"
    />
    <a-descriptions size="small" style="padding: 0 24px">
      <a-descriptions-item label="发布者"
        >{{ newsInfo.author }}
      </a-descriptions-item>
      <a-descriptions-item label="发布时间">
        {{ time }}
      </a-descriptions-item>
      <a-descriptions-item label="区域">
        {{ newsInfo.region }}
      </a-descriptions-item>
      <a-descriptions-item label="访问数量">
        {{ newsInfo.view }}
      </a-descriptions-item>
      <a-descriptions-item label="点赞数量">
        {{ newsInfo.star }}
        <i
          class="el-icon-thumb"
          style="color: red; margin-left: 20px"
          @click="handleStar"
        ></i>
      </a-descriptions-item>
      <a-descriptions-item label="评论数量"> 0 </a-descriptions-item>
    </a-descriptions>
    <div
      style="margin: 0 24px; border: 1px solid gray"
      v-html="newsInfo.content"
    ></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Detail",
  components: {},
  data() {
    //这里存放数据
    return {
      newsInfo: [],
    };
  },
  //监听属性 类似于data概念
  computed: {
    time() {
      return this.$day(this.newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss");
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleStar() {
      // this.newsInfo = {
      //   ...this.newsInfo,
      //   star: this.newsInfo.star + 1,
      // };
      this.newsInfo.star++;
      console.log(this.newsInfo.star);
      this.$axios.patch(`/news/${this.$route.params.id}`, {
        star: this.newsInfo.star,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$axios
      .get(`/news/${this.$route.params.id}?_expand=category&_expand=role`)
      .then((res) => {
        this.newsInfo = { ...res.data, view: res.data.view + 1 };
        return res.data;
      })
      .then((res) => {
        this.$axios.patch(`/news/${this.$route.params.id}`, {
          view: res.view + 1,
        });
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
