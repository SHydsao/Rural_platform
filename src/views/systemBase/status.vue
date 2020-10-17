<style scoped>
  .statusBox{
    width:100%;height:100%;
    background:#fff;
  }
  .statusImg{
    width:800px;
    height:600px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -300px;
  }
  .img404{
    background:url(~assets/images/status/404.jpg) no-repeat;
  }
  .img401{
    background:url(~assets/images/status/401.jpg) no-repeat;
  }
  .img500{
    background:url(~assets/images/status/500.jpg) no-repeat;
  }
  .img504{
    background:url(~assets/images/status/timeout.jpg) no-repeat;
  }
</style>
<template>
  <div class="statusBox">
    <div :class="'statusImg'+' img'+code" v-show="show"></div>
  </div>
</template>
<script>
  export default {
    name:"status",
    data () {
      return {
        code:this.$route.params.code,
        show:false,
      }
    },
    methods:{
    },
    mounted(){
        //等渲染完毕后再显示图片，优化生产环境刷新内页时出现404图标的问题
        this.show = true;
    }
  }
</script>

