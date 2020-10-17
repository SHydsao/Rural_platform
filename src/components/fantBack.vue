<template>
  <div class="ctr-bar">
    <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="pageBack()">
      后退
    </el-button>
  </div>
</template>

<script>
export default {
  name: "ctrBar",
  props: {
    onback: {
      type: Function
    }
  },
  methods: {
    pageBack: function() {
        if(this.onback){
            this.onback()
        }else{
            this.$router.back()
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ctr-bar {
  height: 40px;
  padding: 4px 10px 0;
  background-color: #efefef;
  text-align: left;
  font-size: 0;
  white-space: nowrap;
  z-index: 1;
}
.menuBtn {
  display: inline-block;
  padding: 0 7.5px;
  line-height: 26px;
  border: 1px solid rgb(41, 56, 70);
  background-color: rgb(46, 62, 74);
  border-radius: 5px;
  font-size: 14px;
  color: #eee;
  cursor: pointer;
}
.backBtn {
  display: inline-block;
  padding: 0 7.5px;
  line-height: 26px;
  border: 1px solid rgb(41, 56, 70);
  background-color: rgb(255, 255, 255);
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.backBtn .fa{
  font-size: 14px;
  vertical-align: middle;
}
</style>
