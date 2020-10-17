<style scoped>
  .content-wrap >>> .scroll-content{height:100%;}
</style>
<template>
    <div class="win-wrap" v-cloak>
        <div class="content-wrap">
          <fant-table ref="roleTable" v-model="roles" :opt="tableOpt" :page="pageOpt" :columns="columns">
          </fant-table>
        </div>
        <div class="action" >
          <el-button class="fant-btn-primary" size="small" :disabled="!($refs.roleTable&&$refs.roleTable.selected.id)" @click="copyForm">复制</el-button>
          <el-button class="fant-btn-primary2" size="small" @click="parentVm.winShow=false">关闭</el-button>
        </div>
        <win ref="copyWin" :show.sync="editShow" :opt="copyWinOpt">
          <component ref="editPage" :is="require('./editRole').default" :parent="current"></component>
        </win>
    </div>
</template>

<script>
  import valid from '@/lib/fant-validate';
  export default {
    name:"roleTemplate",
    props:{parent:Object},
    watch:{
      parent(val){
        this.parentVm = val;
      }
    },
    data () {
      return {
        // editWinOpt:{title:'企业角色复制'},
        current:this,
        roles:[],
        parentVm:this.parent?this.parent:{},
        tableOpt:{
          height:"100%",
          size:"small",
          page:true,
          showSummary:false,
          url:"/web/roletemplate/firm/page",
          emulateJSON:true
        },
        pageOpt:{currentPage:1,pageSize:10},
        columns:[
          {prop:"name",label:"角色名称",minWidth:"100"},
          {prop:"remark",label:"描述",minWidth:"150"},
          {prop:"businessVersionName",label:"商业版本",minWidth:"150"},
        ],
        copyWinOpt:{
          title:"复制角色",
          height:'262px',
          width:'420px',
          modalAppendToBody:false
        },
        editShow:false,
      }
    },
    methods:{
      copyForm:function(){
        let data = this.$deepCopy(this.$refs.roleTable.selected);
        if(!data||!data.id){
            this.$message({msg:"请选中角色再进行复制！",type:"warning"});
            return;
        } 
        this.editShow = true;
        this.$refs.copyWin.$nextTick(()=>{
          this.$refs.editPage.pageInit(this.$deepCopy(data),1);
        })
      },
      copySave(copyData){
        let data = {id:copyData.id,name:copyData.name,remak:copyData.remark};
        this.$http({method:"post",url:"/web/role/copyroletemplate", params:data}).then((re)=>{
          if(re.ok == 1){
            this.$message({msg:"保存成功！",type:"success"});
            this.editShow=false;
            this.parentVm.winShow = false;
            this.parentVm.$refs.roleTable.reload();
          }else{
            this.$message({msg:re.message,type:"error"});
          }
        }).catch((err)=>{
          this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
        });
      },
    }
  }
</script>