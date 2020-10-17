<style scoped>
</style>
<template>
  <el-popover
      :placement="placement"
      width="160"
      :popper-class="popperClass"
      v-model="visible">
    <p>{{msg}}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="callBack();">确定</el-button>
    </div>
    <slot slot="reference"></slot>
  </el-popover>
</template>

<script>
  export default {
    data () {
      return {
          visible:false,
      }
    },
    props:{
      msg:{
        type:String,
        required:true
      },
      placement:{
          type:String,
          default:"top"
      },
      popperClass:{
          type:String,
          default:""
      }
    },
    methods:{
        callBack(){
            this.visible = false;
            this.$emit('call-back');
        }
    },
  }
</script>
