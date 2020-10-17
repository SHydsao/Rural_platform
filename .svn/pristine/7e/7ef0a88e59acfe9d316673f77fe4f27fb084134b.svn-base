import '@/styles/index.scss'
import creatRequest from '@/utils/request'
import { installPlugin } from '@/lib/fant/plugin';
import busInstall from '@/lib/bus'

export default (Vue, store)=>{
	Vue.prototype.$prod = process.env.NODE_ENV === 'production'
	//定义快捷键的别名
	Vue.config.keyCodes = {
		enter: 13
	}
	Vue.prototype.$BASE_URL = Vue.prototype.$prod && window.serverConfig?window.serverConfig.API_URL:process.env.VUE_APP_API,
	Vue.prototype.$MSG_URL = window.serverConfig?window.serverConfig.MSG_URL:"",
	
	//初始化fant常用组件
	installPlugin(Vue)

	//初始化事件总线
	busInstall(Vue)
	
	//初始化请求组件
	const service = creatRequest(Vue, store)
	Vue.http = service
	Vue.prototype.$http = service
}