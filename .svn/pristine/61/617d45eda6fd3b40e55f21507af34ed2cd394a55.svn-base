<style scoped>
  .fant-msg-action{
    width:calc(100% - 20px);
    padding:10px;
  }
  .fant-msg-content{
    word-wrap: break-word;
    word-break: break-all;
    max-height: 150px;
    overflow: hidden;
    padding-right:10px;
  }
</style>
<template>
    <div class="fant-msg-action">
        <div v-html="data.content" class="fant-msg-content" ref="msgContent"></div>
        <el-button class='fant-btn-primary' v-if="data.businessId && (data.groupId=='task' || data.groupId=='plan' || data.groupId=='calendar')" @click="view">查看</el-button>
    </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
  export default {
    props:{
        data:{type:Object,required:true}
    },
    data () {
      return {}
    },
    methods:{
        view(){
            if(self == top) {
                window.$vueEl.$children[0].tabOpen('消息', 'message', {msgData: this.data},null,true);
                this.$el.closest('.el-notification').hide();
            }
        }
    },
    created(){
        //省略过长的待办内容或者预约内容
        let name = this.data.groupId=='calendar'?'预约':'待办';
        if(this.data.content.indexOf(name+'内容：') != -1) {
            let str = this.data.content.split(name + '内容：');
            let str_ = str[1].split(name + '时间：');
            if (str_[0].length > 15) {
                str_[0] = str_[0].substring(0, 10) + '...<br/>';
            }
            this.$set(this.data, 'content', str[0] + name + '内容：' + str_[0] + name + '时间：' + str_[1]);
        }
    },
    mounted(){
        this.$nextTick(()=>{
            Scrollbar.init(this.$refs.msgContent,{alwaysShowTracks:true});
        });
    }
  }
</script>
