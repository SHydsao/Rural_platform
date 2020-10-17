<style scoped>
  
</style>
<template>
    <div class="page_box" v-cloak>
        <div class="el-top fff">
          <div class="top_tit">角色管理</div>
          <el-row class="action-header pl30 mt">
            <fant-form 
                class="search_form" 
                :model="tableOpt.extendParams" 
                :opt="{inline:true}" 
                v-enter 
                @submit="()=>{return false}" @submit.native.prevent
            >
                <fant-form-item :opt="{prop:'name'}">
                    <el-input clearable prefix-icon="el-icon-search" v-model="tableOpt.extendParams.name" placeholder="请输入角色名称" v-enter="{btn:'#bdn'}" class="input-item"/>
                </fant-form-item>
                <el-button id="bdn" class="fant-btn-primary" @click="search">查询</el-button>
            </fant-form>
          </el-row>
        </div>
        
        <div class="main fff main-admin">
          <el-row class="action-header-more">
            <el-button  class="fant-btn-primary" @click="editRole('新增角色',{})">新增</el-button>
            <el-button  class="fant-btn-primary" @click="copy()">复制</el-button>
            <el-button  :disabled="selection.length!=1" class="fant-btn-primary" @click="authorizeFn">功能授权</el-button>
            <!-- <el-button v-auth="'sysman.web.role.add'" class="fant-btn-secondary" @click="editRole('新增角色',{})">新增</el-button>
            <el-button v-auth="'sysman.web.role.generalRoleCopy'||'sysman.web.role.firmRoleCopy'"  class="fant-btn-secondary2" @click="copy()">复制</el-button>
            <el-button v-auth="'sysman.web.role.roleAuth'" :disabled="selection.length!=1" class="fant-btn-secondary2" @click="authorizeFn">功能授权</el-button> -->
          </el-row>
          <el-row class="main-table">
            <fant-table ref="roleTable" class="formBox none" v-model="roles" :opt="tableOpt" :page="pageOpt" :columns="columns" @selection-change="tableRowChange">
                <template slot="id" slot-scope="scope">
                    <el-button v-auth="'sysman.web.role.edit'"  type="text" class="actionBtn" icon="el-icon-edit" @click="editRole('编辑角色',scope.row)" title="编辑"></el-button>
                    <el-button v-auth="'sysman.web.role.delete'" type="text" v-show="!scope.row.enabled" class="actionBtn" icon="el-icon-delete" @click="delRow(scope.row)" title="删除"></el-button>
                </template>
            </fant-table>
          </el-row>
        </div>
        

       
        <win ref="copyWin" :show.sync="copyWin.show" :opt="copyWin.opt">
            <component ref="copyPage" :is="require('./copyList').default" :parent="parent" :roles="roles"></component>
        </win>
        <!--功能授权弹窗-->
        <win ref="roleAuthWin" :show.sync="roleAuthWinShow" :opt="roleAuthWinOpt">
            <component ref="roleAuthPage" :is="require('./roleResourceAuth').default" :roleId_="cccid" :parent="parent"></component>
        </win>
        <!--新增编辑弹窗-->
        <win ref="editBar" :show.sync="editShow" :opt="editWinOpt">
            <component ref="editPage" :is="require('./editRole').default" :parent="parent"></component>
        </win>
      </div>
</template>

<script>
  import valid from '@/lib/fant-validate';
  export default {
    name:"firmRoleList",
    data () {
      return {
        cccid:"",
        parent:this,
        roles:[],
        tableOpt:{
          height:"100%",
          size:"small",
          page:true,
          showSummary:false,
          url:"/web/role/page",
          emulateJSON:true,
          multiple:true,
          checkOnSelect:true,
          extendParams:{name:''}
        },
        pageOpt:{},
        columns:[
          {prop:"id",label:"操作",minWidth:1},
          {prop:"name",label:"角色名称",minWidth:6}, 
          {prop:"remark",label:"描述",minWidth:6},
          // {prop:"ordered",label:"排序号",minWidth:1,align:'right'},
        ],
        // winOpt:{
        //   title:"通用角色模版",
        //   width:"620px",
        //   height:'420px'
        // },
        roleAuthWinOpt:{
          title:"功能授权",
          width:"800px",
          height:'600px'
        },
        editWinOpt:{
          title:"",
          height:'262px',
          width:'420px'
        },
        winShow:false,
        editShow:false,
        roleAuthWinShow:false,
        selection:[],
        copyWin:{
          show:false,
          opt:{
            title:'复制',
            width:'800px',
            height:'600px'
          }
        }
      }
    },
    methods:{
      copy(){
        this.copyWin.show=true;
        this.$refs.copyWin.$nextTick(()=>{
          this.$refs.copyPage.$refs.roleTables.reload();
        })
      },
      tableRowChange(selection){
        this.selection=selection;
      },
      editRole(title,data){
        let isCopy=title.indexOf('复制')!=-1?true:false;
        if(isCopy)
          data = this.selection[0];
        this.editShow = true;
        this.$set(this.editWinOpt,"title",title);
        
        this.$refs.editBar.$nextTick(()=>{
          this.$refs.editPage.pageInit(this.$deepCopy(data),isCopy);
        })
      },
      copySave(copyData){
        let data = {id: copyData.id,ordered:copyData.ordered,name:copyData.name,remak:copyData.remark,ordered:copyData.ordered};
        this.$http({method:"post",url:"/web/role/copyrole",params:data}).then((re)=>{
          if(re.ok == 1){
            this.$message({msg:"保存成功！",type:"success"});
            this.editShow = false;
            this.$refs.roleTable.reload();
          }else{
            this.$message({msg:re.message,type:"error"});
          }
        }).catch((err)=>{
          this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
        });
      },
      authorizeFn(){
        let data = this.$deepCopy(this.selection[0]);
        this.roleAuthWinShow= true;
        this.$refs.roleAuthWin.$nextTick(()=>{
          this.cccid = data.id;
          // this.$refs.roleAuthPage.load();
        })
      },
      delRow(row) {
        this.$confirm({msg:"是否删除该角色？",fn:(r)=>{
          if(r){
                this.showLoading()
                this.$http.delete("/web/role/" + row.id).then((re) => {
                  if (re.ok == true) {
                    this.$message({ msg: "删除成功！", type: "success",duration:1000 });
                    this.$refs.roleTable.reload();
                  } else {
                    this.$message({ msg: re.message, type: "error" });
                  }
                }).catch((err) => {
                  this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
                });
              }
          }});
      },
      search(){
        this.pageOpt.currentPage=1;
        this.$refs.roleTable.reload();
      },
      copyWinShow(){
        this.copyWin.show=true;
        this.$refs.copyWin.$nextTick(()=>{
          this.$refs.copyPage.init();
        })
      }
    },
  }
</script>