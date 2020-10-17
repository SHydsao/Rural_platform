<style scoped>
  .tableHeader{
      width:100%;
      height:40px;
      line-height:40px;
      border:1px solid #d2d2d2;
      border-bottom:0;
      font-size:14px;
      font-weight:bold;
      background:#eeeeee;
    }
    .tableHeader span{
      display:inline-block;
    }
    .roleTree{
      border:1px solid #d2d2d2;
      font-size:14px;
      overflow:auto;
    }
    .roleTree >>> .el-tree-node__expand-icon{
      display:none;
    }
    .roleTree >>> .el-tree-node__content{
      border-bottom:1px solid #d2d2d2;
      min-height:40px;
    }
    .roleTree >>> .module{
      border-right: 1px solid #d2d2d2;
      display: inline-block;
      float: left;
    }
    .roleTree >>> .checboxGroup{
      display:inline-block;
    }
    .roleTree >>> .checboxGroup .el-checkbox-group{
      float:left;
    }
    .roleTree >>> .el-tree-node__content{
      display:table;
      width: 100%;
    }
    .roleTree >>> label.el-checkbox{
      display:inline-block;float:left;
    }
    .roleTree >>> .el-tree-node__content .el-checkbox{
      margin-left:10px;
    }
    .roleTree >>> .elTreeSlot{
      width:calc(100% - 32px)
    }
</style>
<template>
  <div class="win-wrap">
    <div class="content-wrap">
        <div class="tableHeader">
          <span class="header-module">
            <el-checkbox style="margin:0 10px;" size="small" v-model="checkAll" :indeterminate="isIndeterminate" @change="checkAllFuc"></el-checkbox>模块
          </span>
          <span class="header-auth">权限</span></div>
        <tree ref="roleTree" class="roleTree" :opt="roleOpt" :data="mydata" style="height:calc(100% - 50px)" @check-change="checkChange" @check="checkTree">
          <span slot-scope="{node, data}" :style="{float:'left',width:'calc(100% - '+(node.level-1)*18+'px)'}">
            <span class="module" :ref="'module'" :style="{width:200-node.level*18+'px','padding-left':'5px'}">{{data.name}}</span>
            <div class="checboxGroup" :style="{width:'calc(100% - '+(200-node.level*18+6)+'px)'}">
              <el-checkbox-group v-for="item in data.children" :key="item.operationId" ref="actionArr" v-if="item.operationId?true:false" v-model="checkedArr[item.operationId]" style="display:inline-block;">
                <el-checkbox :key="item.operationId" :label="item.operationId" @change="val=>actionChange(val,item.id)">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </span>
        </tree>
    </div>
    <div class="action">
      <el-button class="fant-btn-primary" size="small" @click="saveAuth">授权</el-button>
      <el-button class="fant-btn-weak" size="small" @click="myclose">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name:"staffAuthManage",
    props:{
      parent:Object,
      staffId_:[String,Number]
    },
    watch:{
      parent(val){
        this.parentVm = val;
      },
      staffId_(val){
        this.staffId = val;
        this.load();
      }
    },
    data () {
      return {
        roleOpt:{
          width:"100%",
          height:"100%",
          nodeKey:"id",
          dataProp:{data:"data"},
          props:{children: 'children', label: 'name'},
          showCheckbox:true,expandbyclicknode:false,
          actionBar:false,
        },
        parentVm:this.parent?this.parent:{},
        staffId:this.staffId_?this.staffId_:"",
        checkAll:false,
        isIndeterminate:false,
        checkedArr:{},
        mydata:[],
        columns:[
            {prop:"name",label:"模块",minWidth:"80",align:"left"},
            {prop:"action",label:"操作",minWidth:"150",align:"left"},
        ],
      }
    },
    methods:{
      checkAllFuc(val){
        //当点击表头checkbox的时候，全选
        this.mydata.forEach((item,index)=>{
            this.$refs.roleTree.$refs.elTree.setChecked(item,val,true);
        });
        this.isIndeterminate = false;
      },
      checkChange(nodeData,checked,leafChecked){
          //当选择树checkbox的时候，根据operationId选择右侧操作权限复选框
          if(nodeData.operationId){
              this.$set(this.checkedArr,nodeData.operationId,checked?[nodeData.operationId]:[]);
          }
      },
      checkTree(data,{checkedKeys,checkedNodes}){
          let all = true; //是否全中
          let empty = true; //是否全空
          this.mydata.forEach((item,index)=>{
              all = all&&(checkedKeys.indexOf(item.id)!=-1);
              empty = empty&&(checkedKeys.indexOf(item.id)==-1);
          });
          this.checkAll = all;
          //非全中非全空的时候显示半选状态
          this.isIndeterminate = !all&&!empty;
      },
      actionChange(val,id){
          //当点击右侧操作权限复选框的时候，自动选择左边对应operationId隐藏了的复选框
        this.$refs.roleTree.$refs.elTree.setChecked(id,val);
      },
      myclose:function(){
        this.parentVm.serviceWinShow=false;
      },
      saveAuth(){
          let node = this.$refs.roleTree.$refs.elTree.getCheckedNodes();
          let ids = [];
          node.forEach(item =>{
              item.operationId?ids.push(item.operationId):null;
          });
          this.showLoading()
          this.$http.put("/web/staffoperation?staffid="+this.staffId,ids).then((re)=>{
              if(re.ok == 1){
                  this.$message({msg:"成功授权！",type:"success"});
              }else{
                  this.$message({msg:re.message,type:"error"});
              }
          }).catch((err)=>{
              this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
          });
      },
      load(){
        var nothing = [];
        this.$refs.roleTree.$refs.elTree.setCheckedKeys(nothing);
        this.showLoading()
        this.$http.get("/web/roleauth").then(re=>{
          if(re.ok){
            this.mydata = re.data;
            this.$refs.roleTree.$nextTick(()=>{
              this.$refs.actionArr.forEach((item,index)=>{
                let key = item.$vnode.data.key;
                let node = this.$refs.roleTree.$refs.elTree.getNode(key);
                node.visible = false;
              });
              this.showLoading()
              this.$http.get("/web/staffoperation/staff/"+this.staffId).then((re)=>{
                if(re) {
                  var keys = [];
                  re.forEach((item, index)=>{
                    keys.push(item.operationId);
                  });
                  this.selectedIds=this.$refs.roleTree.$refs.elTree.setCheckedKeys(keys);
                  this.$refs.roleTree.$nextTick(()=>{
                      this.afterTreeLoad();
                  });
                }
              }).catch((err)=>{
                this.$message({msg:"权限加载超时，请稍后再试！",type:"error"});
              });
            })
          }else{
            this.$message({msg:re.message,type:"error"});
          }
        }).catch(err=>{
          this.$message({msg:"列表加载超时，请稍后再试！",type:"error"});
        });
      },
      afterTreeLoad(){
          let checkDom = this.$fromArray(this.$getEl(".checboxGroup"));
          checkDom.forEach(item=>{
              let height = item.parentNode.offsetHeight;
              if(height<40){
                  item.style.marginTop = (40-height)/2+"px";
                  height = 40;
              }
              item.previousSibling.previousSibling.style.height= height+"px";
              item.previousSibling.previousSibling.style.lineHeight= height+"px";
              item.parentNode.parentNode.previousSibling.previousSibling.style.marginTop=(height-19)/2 + "px";
          })
      }
    },
    mounted(){
      this.load();
    },
  }
</script>
