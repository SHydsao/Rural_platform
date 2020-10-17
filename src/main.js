import Vue from 'vue'
import App from '@/App.vue'
import { createStore } from '@/store'
import { createRouter } from '@/router'
import entryInstall from '@/boot/entry'
import { sync } from 'vuex-router-sync'
import {initialization} from '@/lib/login.js';
//滚动条美化插件
import Scrollbar from 'smooth-scrollbar';

function beforeLoad(store, router) {
  if (typeof window != "undefined") {
    /**
     * 登陆后刷新直接获取本地记录的菜单和权限数据
     */
    if (window.sessionStorage.getItem("userId")) {
        //权限
        initialization(Vue,store,router)
    }
  } 

}
//消息提示的环境配置
Vue.config.productionTip = true;

/* 私库插件vue-fant-base配置 */
Vue.config.fant = {};
Vue.config.fant = {};
  /*
    * 记录模块打开窗口的数量，以便在切换模块的时候判断是否进行提示
    * */
  Vue.config.fant.beforeOpenWin = (vm) => {
      //多窗口弹出的时候，其他后置窗口以定位方式隐藏
      if (vm.$el.closest('.el-dialog')) {
          if (!vm.$el.closest('.el-dialog').hasClass('is-fullscreen') && !vm.$el.closest('.el-dialog').parentNode.hasClass('fant-win-visible')) {
              vm.$el.closest('.el-dialog').parentNode.addClass('fant-win-visible')
          } else {
              let arr = vm.$fromArray(vm.$el.closest('.el-dialog').getElementsByClassName('fant-is-show'));
              if (arr.length > 0) {
                  let targetWin = null;
                  let compIndex = 0;
                  arr.forEach(item => {
                      let zIndex = item.style.zIndex ? item.style.zIndex : 0;
                      if (parseInt(zIndex) > compIndex && item !== vm.$el) {
                          compIndex = parseInt(zIndex);
                          targetWin = item;
                      }
                  });
                  if (targetWin) {
                      targetWin.getElementsByClassName('el-dialog')[0].parentNode.addClass('fant-win-visible');
                  }
              }
          }

      }
      // 解决弹窗内再弹窗时由于父窗口初始化了滚动条而导致子窗口样式异常的问题
      // 返回 class名为 content-wrap的那个元素
      if (vm.$el.closest('.content-wrap') && Scrollbar.has(vm.$el.closest('.content-wrap'))) {
          Scrollbar.destroy(vm.$el.closest('.content-wrap'));
      }
  }
  Vue.config.fant.winOnClose = (vm) => {
      //弹窗关闭后，删除当前tab页的链路导航的最后一级导航
      let $cp = vm.$children[0].$children[0];
      //直接引入包含弹窗组件win的组件特例，如taskView等组件
      if (vm.$parent.$el.hasClass("el-dialog__wrapper")) {
          $cp = vm.$parent;
      }
      let name = store.state.currentTab;
      if ($cp&&$cp.$vnode.componentOptions.Ctor.options.meta && $cp.$vnode.componentOptions.Ctor.options.meta.name && name) {
          let arr = store.state.navPath[name];
          arr.splice(arr.length - 1, 1);
          store.commit('setNavPath', {
              name: name,
              value: arr
          });
          $cp.nav__ = [$cp.$vnode.componentOptions.Ctor.options.meta.name];
      }
      //多窗口弹出后关闭，显示原来的父窗口
      if (vm.$el.closest('.el-dialog')) {
          let arr = vm.$fromArray(vm.$el.closest('.el-dialog').getElementsByClassName('fant-is-show'));
          if (arr.length > 0) {
              let targetWin = null;
              let compIndex = 0;
              arr.forEach(item => {
                  let zIndex = item.style.zIndex ? item.style.zIndex : 0;
                  if (parseInt(zIndex) > compIndex) {
                      compIndex = parseInt(zIndex);
                      targetWin = item;
                  }
              });
              if (targetWin) {
                  targetWin.getElementsByClassName('el-dialog')[0].parentNode.removeClass('fant-win-visible');
              }
          } else {
              vm.$el.closest('.el-dialog').parentNode.removeClass('fant-win-visible');
          }
      }
  }
  Vue.config.fant.beforeCloseWin = (vm) => {
      setTimeout(() => {
          // 解决弹窗内再弹窗时由于父窗口初始化了滚动条而导致子窗口样式异常的问题
          if (vm.$el.closest('.content-wrap')) {
              let arr = vm.$el.closest('.content-wrap').getElementsByClassName('fant-is-show');
              if (arr.length == 0 && !Scrollbar.has(vm.$el.closest('.content-wrap'))) {
                  Scrollbar.init(vm.$el.closest('.content-wrap'), {
                      alwaysShowTracks: true
                  });
              }
          }
      }, 300);
  }
  Vue.config.fant.winOnRender = (vm) => {
      //根据组件的meta.name属性记录当前tab页的链路导航
      let $cp = vm.$children[0].$children[0];
      //直接引入包含弹窗组件win的组件特例，如taskView等组件
      if (vm.$parent.$el.hasClass("el-dialog__wrapper")) {
          $cp = vm.$parent;
      }
      let name = store.state.currentTab;
      if ($cp&&$cp.$vnode.componentOptions.Ctor.options.meta && $cp.$vnode.componentOptions.Ctor.options.meta.name && name) {
          let arr = store.state.navPath[name].concat($cp.nav__);
          store.commit('setNavPath', {
              name: name,
              value: arr
          });
          $cp.nav__ = arr;
      }
  }
  Vue.config.fant.tableOnRender = (vm) => {
      //初始化表格的滚动条
      if (vm.$el.getElementsByClassName('el-table__body-wrapper')[0] && !Scrollbar.has(vm.$el.getElementsByClassName('el-table__body-wrapper')[0])) {
          vm.$scrollbar = Scrollbar.init(vm.$el.getElementsByClassName('el-table__body-wrapper')[0], {
              alwaysShowTracks: true
          });
      }
  }
  Vue.config.fant.tableBeforeUpdate = (vm) => {
      //初始化表格的滚动条
      if (vm.$scrollbar) {
          vm.$scrollbar.destroy();
          vm.$scrollbar=null;
      }
  }
  Vue.config.fant.tableOnUpdated = (vm) => {
      //滚动条的更新
      if (vm.$scrollbar) {
          vm.$scrollbar.update();
      }
  }


const store = createStore();
const router = createRouter(store)
/* 自定义入口文件 */
entryInstall(Vue,store);
sync(store, router)
beforeLoad(store, router);

if(typeof window !== "undefined") {
    /**
     * 新建窗口共用sessionStorage
     */
    let href = '';
    if (!sessionStorage.getItem('userId')) {
        href = location.pathname;
        // 这个调用能触发目标事件，从而达到共享数据的目的
        localStorage.setItem('getSessionStorage', Date.now());
    }
    // 该事件是核心
    window.addEventListener('storage', function (event) {
        if (event.key == 'getSessionStorage') {
            // 已存在的标签页会收到这个事件
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');

        } else if (event.key == 'sessionStorage') {
            // 新开启的标签页会收到这个事件
            var data = JSON.parse(event.newValue),
                value;

            for (let key in data) {
                sessionStorage.setItem(key, data[key]);
            }
            router.push(href);
        }
    });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

