import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI);
Vue.prototype.judgmentPhone = /^1[3456789]\d{9}$/;		//手机号正则
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
