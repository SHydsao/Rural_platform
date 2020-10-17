<style scoped>
  .fant-drawer {
    position: absolute;
    /*position: fixed;*/
    top: 0;
    width: 0;
    height: 100%;
    z-index: 1000;
    overflow:hidden;
  }
  .fant-drawer-left, .fant-drawer-right {
    width: 0;
    height: 100%;
  }
  .fant-drawer-bottom, .fant-drawer-top {
    width: 100%;
    height: 0;
  }
  .fant-drawer .fant-drawer-content {
    width: 100%;
    height: 100%;
  }
  .fant-drawer-content {
    position: relative;
    background-color: #fff;
    border: 0;
    background-clip: padding-box;
    z-index: 1;
  }
  .fant-drawer-header {
    padding: 16px 24px;
    border-radius: 4px 4px 0 0;
    background: #fff;
    color: rgba(0,0,0,.65);
    border-bottom: 1px solid #e8e8e8;
  }
  .fant-drawer-title {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    color: rgba(0,0,0,.85);
  }
  .fant-drawer-body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .fant-drawer-left.fant-drawer-open, .fant-drawer-right.fant-drawer-open {
    width: 100%;
  }
  .fant-drawer-bottom.fant-drawer-open, .fant-drawer-top.fant-drawer-open {
    height: 100%;
  }
  .fant-drawer-open {
    transition: -webkit-transform .3s cubic-bezier(.7,.3,.1,1);
    transition: transform .3s cubic-bezier(.7,.3,.1,1);
    transition: transform .3s cubic-bezier(.7,.3,.1,1),-webkit-transform .3s cubic-bezier(.7,.3,.1,1);
  }
  .fant-drawer-left.fant-drawer-open .fant-drawer-content-wrapper {
    box-shadow: 2px 0 8px rgba(0,0,0,.15);
  }
  .fant-drawer-right.fant-drawer-open .fant-drawer-content-wrapper {
    box-shadow: -2px 0 8px rgba(0,0,0,.15);
  }
  .fant-drawer-top.fant-drawer-open .fant-drawer-content-wrapper {
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
  }
  .fant-drawer-bottom.fant-drawer-open .fant-drawer-content-wrapper {
    box-shadow: 0 -2px 8px rgba(0,0,0,.15);
  }
  .fant-drawer-right .fant-drawer-content-wrapper {
    right: 0;
  }
  .fant-drawer-bottom .fant-drawer-content-wrapper {
    bottom: 0;
  }
  .fant-drawer-left .fant-drawer-content-wrapper, .fant-drawer-right .fant-drawer-content-wrapper {
    height: 100%;
  }
  .fant-drawer-bottom .fant-drawer-content-wrapper, .fant-drawer-top .fant-drawer-content-wrapper {
    width: 100%;
  }
  .fant-drawer-content-wrapper {
    position: absolute;
    /*position: fixed;*/
  }
  .fant-drawer > * {
    transition: -webkit-transform .3s cubic-bezier(.9,0,.3,.7);
    transition: transform .3s cubic-bezier(.9,0,.3,.7);
    transition: transform .3s cubic-bezier(.9,0,.3,.7),-webkit-transform .3s cubic-bezier(.9,0,.3,.7);
  }
  .fant-drawer-mask {
    position: absolute;
    /*position: fixed;*/
    width: 100%;
    height: 0;
    opacity: 0;
    background-color: rgba(0,0,0,.65);
    filter: alpha(opacity=50);
    transition: opacity .3s linear,height 0s ease .3s;
  }
  .fant-drawer.fant-drawer-open .fant-drawer-mask {
    opacity: .3;
    height: 100%;
    -webkit-animation: antdDrawerFadeIn .3s cubic-bezier(.7,.3,.1,1);
    animation: antdDrawerFadeIn .3s cubic-bezier(.7,.3,.1,1);
    transition: none;
  }
  .fant-drawer-close{
    position: absolute;
    right: 5px;
    margin-top: -22px;
  }
  .fant-drawer-close-btn:hover{
    color:#333;
    cursor:pointer;
  }
</style>
<template>
  <div class="fant-drawer" :class="{'fant-drawer-open':visible_,'fant-drawer-right':opt_.placement=='right','fant-drawer-left':opt_.placement=='left','fant-drawer-top':opt_.placement=='top','fant-drawer-bottom':opt_.placement=='bottom'}" :style="{'z-index':opt_.zIndex}">
    <div v-if="opt_.mask" class="fant-drawer-mask" @click="opt_.maskClosable?closeDrawer():null"></div>
    <div v-show="wrapperShow" class="fant-drawer-content-wrapper" :class="opt_.wrapClassName" ref="drawerContent" :style="{width: opt_.placement=='right'||opt_.placement=='left'?opt_.width:'',height: opt_.placement=='top'||opt_.placement=='bottom'?opt_.height:'',transform:transform[opt_.placement]}">
      <div class="fant-drawer-content">
        <div class="fant-drawer-wrapper-body" style="overflow: auto; height: 100%;">
          <div class="fant-drawer-header">
            <div class="fant-drawer-title"><slot name="title">{{opt_.title || '&nbsp;'}}</slot></div>
            <div v-if="opt_.closable" class="fant-drawer-close"><a class="el-icon-fant-close fant-drawer-close-btn" @click="closeDrawer"></a></div>
          </div>
          <div class="fant-drawer-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name:'fantDrawer',
      data () {
        return {
            visible:this.value?true:false,
            visible_:this.value?true:false,
            transform:{
                left:'translateX(-100%)',
                right:'translateX(100%)',
                top:'translateY(-100%)',
                bottom:'translateY(100%)',
            },
            opt_:{},
            wrapperShow:false,
            defaultOpt:{
                width:'256px',
                height:'256px',
                closable:true,
                maskClosable:true,
                mask:true,
                title:'',
                wrapClassName:'',
                zIndex:1000,
                placement:'right'
            }
        }
      },
      watch:{
          value(val){
              this.visible = val?true:false;
          },
          visible(val){
              if(!val){
                  this.$refs.drawerContent.style.transform = this.transform[this.opt_.placement];
                  setTimeout(()=>{
                      this.visible_ = false;
                      this.wrapperShow = false;
                  },400)
                  this.$emit('onclose');
              }else{
                  this.$refs.drawerContent.style.position = 'absolute';
                  this.wrapperShow = true;
                  this.visible_ = true;
                  setTimeout(()=>{
                      this.$refs.drawerContent.style.transform = 'none';
                  },100);
                  this.$emit('onopen');
              }
              this.$emit('visible-change',val);
          },
          opt:{
              handler:function(val, oldVal){
                  this.getOpt(val);
              },
              deep: true
          }
      },
      model:{
          prop:'value',
          event:'visible-change'
      },
      props:{
          opt:{type:Object,default:()=>{return {
              width:256,
              height:256,
              closable:true,
              maskClosable:true,
              mask:true,
              title:'',
              wrapClassName:'',
              zIndex:1000,
              placement:'right'
          };}},
          value:{type:[Boolean,Number],required:true},
      },
      methods:{
          closeDrawer(){
             this.visible = false;
          },
          close(){
             this.closeDrawer();
          },
          getOpt(val){
              Object.assign(this.opt_,this.defaultOpt,val);
              this.opt_.width = typeof this.opt_.width == 'number'?this.opt_.width+'px':this.opt_.width;
              this.opt_.height = typeof this.opt_.height == 'number'?this.opt_.height+'px':this.opt_.height;
          }
      },
      created(){
          this.getOpt(this.opt);
      }
  }
</script>
