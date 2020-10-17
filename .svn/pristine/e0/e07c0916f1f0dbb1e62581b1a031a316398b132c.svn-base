<template>
    <div class="win-wrap">
        <!--<el-transfer style="width:496px;margin:auto;padding-top:10px;" v-model=" principalList" :props="{key:'id',label:'name'}" :data="departmentStaffList" :titles="['部门员工','负责人']" @change="changData">-->
        <!--</el-transfer>-->
        <div class="content-wrap">
            <transfer ref="transfer" style="padding:0 28px;" v-model="principalList" :opt="transferOpt" :data="departmentStaffList"></transfer>
        </div>
        <div class="action">
            <el-button class="fant-btn-primary2 reset-btn" @click="reset">重置</el-button>
            <el-button class="fant-btn-primary" @click="save">保存</el-button>
            <el-button class="fant-btn-primary2" @click="close">关闭</el-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "principal",
    props:{
      parent:Object,
    },
    data() {
      return {
        transferOpt:{
          listIcon:'el-icon-fant-person',width:'500px',height:'400px',filterable:true,
          titles:['部门员工：','负责人：']
        },
        departmentStaffList:[],
        principalList:[],
        oldPrincipalList:[],
        departId:'',
      };
    },
    methods:{
      reset(){
        this.principalList = this.$deepCopy(this.oldPrincipalList);
      },
      close(){
        this.parent.principleWin.show = false;
      },
      pageInit(id){
          this.departId = id;
          this.$ajax({
            url: '/web/staff/included/'+id,
            method: "get",
            success: re => {
              if (re) {
                this.departmentStaffList = re;
              }
            },
          });
          this.$http({method:"get",url:"/web/staff/departmenthead/"+id,}).then((re)=>{
            if(re){
              let data = [];
              for(let i = 0 ;i<re.length;i++){
                data.push(re[i].id)
              }
              this.principalList = data;
              this.oldPrincipalList = data;
            }else{
              this.$message({msg:re.message,type:"error"});
            }
          })
      },
      save(){
          let ids = this.$refs.transfer.getValue();
          let url = "/web/department/staff/batch/"+this.departId;
          this.showLoading()
          this.$http.put(url,ids).then(re=>{
                  if(!re.ok){
                      this.$message({ msg:re.message, type: "error" });
                  }else{
                      this.$message({ msg: "设置成功！", type: "success" , timeout:2000});
                      this.$emit('callback');
                  }
          });
      }
    },
  };
</script>