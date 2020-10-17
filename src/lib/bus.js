const install = function (Vue) {
  let $loading = null
  const Bus = new Vue({
    data(){
      return {
        loading:false
      }
    },
    methods: {
      showLoading(){
        if(document.querySelectorAll('.fant-is-show').length > 0){
          $loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }else{
          this.loading = true
        }
      },
      hideLoading(){
        if($loading){
          $loading.close()
          $loading = null
        }
        this.loading = false
      },
      //发送消息
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      //监听消息
      on(event, callback) {
        this.$on(event, callback);
      },
      //解绑消息
      off(event, callback) {
        this.$off(event, callback);
      }
    }
  });
  Vue.prototype.$bus=Bus;//放到Vue原型上
  window.$bus=Bus;//放到Vue原型上
};
export default install;
