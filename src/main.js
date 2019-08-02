// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import store from './vuex/store'

// import axios from 'axios'
// Vue.prototype.$axios = axios    //把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求
// axios.defaults.withCredentials = true
// Vue.prototype.baseUrl = 'https://api.sanduosoft.com'    //设置后端的网址

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://api.sanduosoft.com'  //关键代码
Vue.config.productionTip = false

import qs from 'qs'
Vue.prototype.$qs = qs;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	//路由中设置的needLogin字段就在to当中 
    if (window.sessionStorage.token) {
    	console.log(window.sessionStorage.token)
		// console.log(to.path) //每次跳转的路径
		if(to.path === '/login'){
			//登录状态下 访问login.vue页面 会跳到welcome.vue
			next({path:'/Welcome'})
		}else{
			next();
		}
    }else{
		// 如果没有sessionStorage ,访问任何页面。都会进入到 登录页
		if (to.path === '/login') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
			next();
		} else{// 否则 跳转到登录页面
			next({path:'/login'})
		}
	}
})

// eslint-disable no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
