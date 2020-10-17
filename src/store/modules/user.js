import Vue from 'vue'
const user = {
	state: {
		userId: '',
		sessionId: '',
		user:{},
		animalHeat:'',
	},
	mutations: {
		set_userId: (state, userId) => {
			state.userId = userId;
		},
		set_sessionId: (state, sessionId) => {
			state.sessionId = sessionId;
		},
		set_user: (state, user) => {
			state.user = user;
		},
		set_animalHeat: (state, animalHeat) => {
			state.animalHeat = animalHeat;
		},
	},
	actions: {
		setUserId: ({
			commit
		}, userId) => {
			commit('set_userId', userId);
		},
		setSessionid: ({
			commit
		}, sessionid) => {
			commit('set_sessionId', sessionid);
		},
		setUser: ({
			commit
		}, user) => {
			commit('set_user', user);
		},
		// 登录
		login({
			commit
		}, userId) {
			commit('set_userId', userId);
			window.sessionStorage.setItem('userId', userId);
		},
		// 退出
		logout({
			dispatch
		}) {
			dispatch('clearLogOut');
			location.href = "/";
		},
		//清空数据
		clearLogOut({
			commit
		}) {
			commit('set_userId', '');
			commit('set_sessionId', '');
			window.sessionStorage.removeItem('userId');
			window.sessionStorage.removeItem('sessionId');
			window.sessionStorage.removeItem('current');
			window.sessionStorage.removeItem('auth');
			window.sessionStorage.removeItem('menu');
		}
	},
	getters: {
		userId: state => state.userId,
		sessionId: state => state.sessionId,
		user: state => state.user
	},
}
export default user;