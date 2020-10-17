<style scoped>
.role>>>.fantTable .el-pagination{position:relative;margin: 5px}
</style>
<template>
 <div class="win-wrap role" style="height:calc(100%)">
  <!-- <el-row class="action-header" style="height:52px;">
      <div style="position: absolute;bottom:10px;right:20px">
        <el-button class="fant-btn-primary" @click="mysave">保存</el-button>
        <el-button class="fant-btn-primary2" @click="parent.staffAuthWin.show=false">关闭</el-button>
      </div>
  </el-row> -->
  <div class="content-wrap">
    <fant-table ref="roleTable" :dataProp="{data:null}" v-model="roles" :opt="tableOpt" :columns="columns" @refresh="init" class="formBox none" style="padding-bottom:10px">
    </fant-table>
  </div>
  <el-row class="action">
      <el-button class="fant-btn-secondary" @click="mysave">保存</el-button>
        <el-button class="fant-btn-third" @click="parent.staffAuthWin.show=false">关闭</el-button>
  </el-row>
</div>

</template>
<script>
 
  export default {
    name:"staffRoleAuth",
    props:{parent:Object},
    data () {
      return {
        roles:[],
        tableOpt:{
          height:"450px",
          size:"small",
          page:false,
          url:"/web/role/list",
          data:null,
          dataProp:{
            data:''
          },
          emulateJSON:true,
          multiple:true,
          checkOnSelect:true
        },
        // pageOpt:{
        //   currentPage:1,
        //   pageSize:10,
        //   total:50,
        // },
        columns:[
          {prop:"name",label:"角色名称",minWidth:"100"},
          {prop:"remark",label:"描述",minWidth:"150"},
        ]
      }
    },
    methods:{
      mysave(){//通过用户Id保存该用户的角色id
        let data = this.$refs.roleTable.selected;
        var ids = [];
        for (var i in data) {
          ids.push(data[i].id);
        }
        this.$http({method:"post",url:"/web/rolestaff?staffId="+this.staffId,data:ids}).then((re)=>{
          if(re.ok == 1){
            this.$message({msg:"保存成功！",type:"success"});
            this.parent.staffAuthWin.show=false;
          }else{
            this.$message({msg:re.message,type:"error"});
          }
        }).catch((err)=>{
          this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
        });
      },
      init(data) {
        data?this.staffId=data.id:null;
        this.$refs.roleTable.$refs.elTable.clearSelection();
        this.showLoading()
        this.$http.get("/web/rolestaff/staff/"+this.staffId).then((re)=>{
          if(re) {
            var keys = [];
            re.forEach((item, index)=>{
              keys.push(item.roleId);
            });
            this.$refs.roleTable.$nextTick(()=>{
              for(var i in keys){
                let a = this.roles.filter(item=>item.id == keys[i]);
                this.$refs["roleTable"].$refs.elTable.toggleRowSelection(a[0],true)
              }
            });
          }
        }).catch((err)=>{
          this.$message({msg:"权限加载超时，请稍后再试！",type:"error"});
        });
      }
    },
  }
</script>