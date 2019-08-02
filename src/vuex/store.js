import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
Vue.use(Vuex)
// state对象用来存储数据
var state = {
	// loginFlag: sessionStorage.getItem('loginState'),
	// loginFlag:false
	
}
// mutations对象用来存储方法

// 创建一个store对象,并暴露出去 store对象有两个属性,state和mutations
export default new Vuex.Store({
	state
})
