import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import 'default-passive-events'//违反：没有添加被动事件监听器来阻止'touchstart'事件，请考虑添加事件管理者'passive'，以使页面更加流畅。
Vue.prototype.$axios = axios
// 粒子
import VueParticles from 'vue-particles'
import * as echarts from "echarts"
// Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库
import _ from 'lodash'
import './util/http'
import { List, Avatar, Descriptions, PageHeader } from 'ant-design-vue'
Vue.use(List).use(Avatar).use(Descriptions).use(PageHeader)
// 格式化时间
import dayjs from 'dayjs'
Vue.prototype.$day = dayjs


Vue.prototype._ = _
Vue.prototype.$echarts = echarts
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
