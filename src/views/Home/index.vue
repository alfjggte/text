<!-- 首页 -->
<template>
  <div class="">
    <el-row type="flex" class="row-bg" :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>用户最常浏览</span>
          </div>
          <div v-for="item in viewList" :key="item.id" class="text">
            <router-link :to="`/news-manage/preview/${item.id}`">{{
              item.title
            }}</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>用户点赞最多</span>
          </div>
          <div v-for="item in starList" :key="item.id" class="text">
            <router-link :to="`/news-manage/preview/${item.id}`">{{
              item.title
            }}</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <el-image
              style="width: 100%"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              fit="contain"
            ></el-image>
          </div>
          <div class="box">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              class="img"
            ></el-avatar>
            <div class="text">
              <h4>admin</h4>
              <p>全球<span>超级管理员</span></p>
            </div>
          </div>
          <el-divider></el-divider>
          <el-row :gutter="20" type="flex" class="row-bg row-margin-t">
            <el-col :span="8"
              ><div class="t-icon">
                <i
                  class="el-icon-s-tools icon-style"
                  @click="rightbox"
                ></i></div
            ></el-col>
            <el-col :span="8"
              ><div class="t-icon">
                <i class="el-icon-edit icon-style"></i></div
            ></el-col>
            <el-col :span="8"
              ><div class="t-icon">
                <i class="el-icon-share icon-style"></i></div
            ></el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <div id="main" style="width: 100%; height: 400px"></div>
    <el-drawer
      title="个人新闻分类"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div id="main-pre" style="width: 100%; height: 400px"></div>
    </el-drawer>
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
      viewList: [],
      starList: [],
      drawer: false,
      direction: "rtl",
      allList: [],
      pieChart: null,
      // timer: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    rightbox() {
      setTimeout(() => {
        this.renderPieView();
      }, 0);
      this.drawer = true;
      //
    },
    renderPieView() {
      const { username } = JSON.parse(localStorage.getItem("token"));
      var currentList = this.allList.filter((item) => item.author === username);
      var groupObj = this._.groupBy(currentList, (item) => item.category.title);
      var list = [];
      for (var i in groupObj) {
        list.push({
          name: i,
          value: groupObj[i].length,
        });
      }
      var myChart;
      if (!this.pieChart) {
        myChart = this.$echarts.init(document.getElementById("main-pre"));
        this.pieChart = myChart;
      } else {
        myChart = this.pieChart;
      }
      var option;

      option = {
        title: {
          text: "当前用户新闻分类图示",
          // subtext: '纯属虚构',
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "发布数量",
            type: "pie",
            radius: "50%",
            data: list,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },

    drawLine(obj) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: { text: "新闻分类图示" },
        tooltip: {},
        legend: {
          data: ["数量"],
        },
        xAxis: {
          data: Object.keys(obj),
          axisLabel: {
            rotate: "45",
            interval: 0,
          },
        },
        yAxis: {
          minInterval: 1,
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: Object.values(obj).map((item) => item.length),
          },
        ],
      });
    },
    // handleClose(done) {

    //   this.$confirm("确认关闭？")
    //     .then(() => {
    //       done();
    //     })
    //     .catch(() => {});
    // },
    handleClose() {
      this.drawer = false;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$axios
      .get(
        "/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6"
      )
      .then((res) => {
        this.viewList = res.data;
      });

    this.$axios
      .get(
        "/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6"
      )
      .then((res) => {
        this.starList = res.data;
      });
    this.$axios.get("/news?publishState=2&_expand=category").then((res) => {
      this.drawLine(this._.groupBy(res.data, (item) => item.category.title));
      this.allList = res.data;
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.timer = setTimeout(() => {
    //   this.renderPieView();
    // }, 0);
    // this.drawLine();
  },
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
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.row-margin-t {
  margin-bottom: 0px !important;
}
.text {
  font-size: 14px;
  text-align: left;
  text-indent: 20px;
  line-height: 44px;
  border-bottom: 1px solid rgb(199, 192, 192);
}
.text:last-child {
  border: none;
}
.text a {
  color: #1890ff;
  text-decoration: none;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.box {
  overflow: hidden;
}
.box .img,
.box .text {
  float: left;
  line-height: 26px;
  font-weight: 800;
}
.text h4 {
  color: rgb(10, 0, 0);
}
.text p {
  color: rgb(143, 139, 139);
}
.text p span {
  font-weight: 400;
  color: rgb(143, 139, 139);
  margin-left: 30px;
}
.t-icon {
  width: 100%;
  /* height: 25px; */
  text-align: center;
}
.icon-style {
  cursor: pointer;
}
.icon-style:hover {
  color: #1890ff;
}
</style>
