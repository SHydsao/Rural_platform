<style lang="scss">
  .red{
		background: red !important;
  }
</style>
<template>
  <div id="app" class="page-main" v-cloak style="height:100%;">
	<router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
          tabEvent:{}
      }
    },
    methods:{
    },
    mounted(){
      window.$router = this.$router
      window.onpopstate = () => {
          history.go(1)
      }
    }
  }
</script>

