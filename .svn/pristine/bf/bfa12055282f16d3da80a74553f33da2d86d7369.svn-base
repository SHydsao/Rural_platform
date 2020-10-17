<style scoped>
    .fant-nav-link{
        cursor:pointer;
    }
    .fant-nav-link:hover{
        color:#4ca1f9;
    }
    .fant-nav-box span{
        display:inline;
    }
    .fant-nav-path{
        font-size:14px;
        font-family:'微软雅黑';
    }
    .fant-nav-current{
        color:#4ca1f9;
        font-weight:bold;
    }
</style>
<template>
    <span class="fant-nav-box">
        <span v-for="(p,ind) in paths">
            <span :class="{'fant-nav-link':ind<paths.length-1 && p.route, 'fant-nav-current':ind==paths.length-1}" class="fant-nav-path" v-to="p.route">
                {{ p.name }}
            </span>
            <span>{{ ind < paths.length-1?'-':''}}</span>
        </span>
    </span>
</template>

<script>
  export default {
    props:{
        paths:{type:Array,required:true}
    },
    data () {
      return {
          i:0
      }
    },
    methods:{

    }
  }
</script>
