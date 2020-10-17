import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import message from './modules/message'

//导入日志插件
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
export function createStore () {
    const debug = process.env.NODE_ENV !== 'production'
    return new Vuex.Store({
        modules: {
            user, menu, message
        },
        state: {
            tabs: ['index'],
            currentTab:'',
        },
        mutations: {
            addTab(state, name) {
                if (state.tabs.indexOf(name) == -1) {
                    state.tabs.push(name);
                    let tabs = state.tabs.join(",");
                    if (typeof window !== 'undefined') {
                        localStorage.setItem("tabs", tabs)
                    }
                }
            },
            removeTab(state, name) {
                Vue.arrayRemove(state.tabs, name);
                let tabs = state.tabs.join(",");
                if (typeof window !== 'undefined') {
                    localStorage.setItem("tabs", tabs)
                }
            },
            setTab(state, arr) {
                state.tabs = arr;
                let tabs = state.tabs.join(",");
                if (typeof window !== 'undefined') {
                    localStorage.setItem("tabs", tabs)
                }
            },
            setCurrentTab(state, currentTab){
                state.currentTab = currentTab;
            }
        },
        strict: debug,//严格模式，发布的时候自动取消严格模式
        plugins: debug ? [createLogger()] : []
    })
}
