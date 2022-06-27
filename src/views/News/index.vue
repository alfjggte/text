<!-- 查看新闻 -->
<template>
  <div class="news">
    <div class="header">
      <h3>全球大新闻</h3>
      <span>查看新闻</span>
    </div>
    <el-row :gutter="32">
      <el-col :span="8" v-for="item in list" :key="item.id" class="box">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{ item[0] }}</span>
          </div>
          <a-list
            item-layout="vertical"
            size="large"
            :pagination="pagination"
            :data-source="item[1]"
          >
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
              <a-list-item-meta :description="item.description">
                <!-- <a slot="title" :href="`/detail/${item.id}`">{{
                  item.title
                }}</a> -->
                <router-link slot="title" :to="`/detail/${item.id}`">
                  {{ item.title }}</router-link
                >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "News",
  //import引入的组件需要注入到对象中才能使用

  components: {},
  data() {
    //这里存放数据
    return {
      list: [],
      pagination: {
        pageSize: 3,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$axios.get(`/news?publishState=2&_expand=category`).then((res) => {
      // console.log(res.data);

      const nList = Object.entries(
        this._.groupBy(res.data, (item) => item.category.title)
      );
      // console.log(nList);
      this.list = nList;
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
.news {
  width: 95%;
  margin: 0 auto;
}
.ant-list-item-meta-title > a {
  color: rgb(25 68 217 / 65%);
  transition: all 0.3s;
}
.el-col {
  border-radius: 4px;
  height: 320px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.header {
  margin-bottom: 50px;
  margin-top: 50px;
  overflow: hidden;
  line-height: 30px;
  padding: 0 30px;
}
.header h3,
.header span {
  float: left;
  font-size: 26px;
}
.header span {
  margin-left: 20px;
  font-size: 16px;
}
.box-card {
  margin-bottom: 20px;
}
.box {
  float: left;
}
.text {
  padding: 10px;
  border-bottom: 1px solid rgb(242, 234, 234);
}
.ant-list-item,
.ant-list-item-no-flex {
  margin: 0 !important;
  padding: 0 !important;
}
.ant-list-vertical .ant-list-item-meta {
  margin-bottom: 0px;
  /* margin: 10px 0 !important; */
  margin-top: 10px;
}
</style>
