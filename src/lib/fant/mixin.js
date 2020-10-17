import message from '../message'
//注入组件
export function mixinApp (Vue) {
    /**
   * 混入组件
   */
  Vue.mixin({
    data(){
      return{
        MSG__:message
      }
    },
    methods:{
        showLoading(){
            window.$bus.showLoading()
        },
        hideLoading(){
            window.$bus.hideLoading()
        },
        formatDate(val,format){//全局统一formatDate
            if(val){
              val =(val+'').replace(/\-/g, "/");
            }
            if(format){
              return new Date(val).format(format);
            }else{
              return new Date(val).format("yyyy年MM月dd日 hh:mm");
            }
      
        },
        uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
        
            var uuid = s.join("");
            return uuid;
        },
        exportExcel(url,data){
            this.$http({
            url:url,
            method:'post',
            responseType:'blob',
            data
            }).then(re=>{
            let blob=new Blob([re], { type: "application/vnd.ms-excel" })
            let url = window.URL.createObjectURL(blob);
            window.location.href = url;
            }).catch(err=>{this.$message({type:'error',message:this.error__msg})})
        },
    }
  })
}