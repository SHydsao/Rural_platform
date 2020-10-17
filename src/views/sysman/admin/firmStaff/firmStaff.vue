<style scoped>
  .row-wrap,.row-wrap>div{height:100%;}
  .right-header>div{white-space: nowrap;overflow: hidden;text-overflow:ellipsis;padding-right:10px;box-sizing:border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;}
  .right-header>div span:first-child{font-size:1em;}
  .right-header>div span:last-child{font-size: .875em;}
  .tree-wrap{padding:0 10px;height:100%;background:#fff;margin-right:10px;box-sizing:border-box;}
  .top_tit{margin-left:-10px;}
  .tree-wrap >>> .elTreeSlot{width:100%;white-space:nowrap!important;
 overflow:hidden!important;
 text-overflow:ellipsis!important;}
 /*.el-form-item--small.el-form-item{margin-bottom:6px !important;}*/

 .tab >>> .el-form-item--small.el-form-item{
 	margin-bottom:6px !important;
 }
.tree-wrap >>> .el-tree{height:calc(100% - 85px) !important;}
  /* .elTreeSlot>>>.el-tree-node__content{white-space: nowrap!important;
 overflow: hidden!important;
 text-overflow: ellipsis!important;
} */
</style>
<template>
  <div class="page-home page-tree" v-cloak>
	<el-row class="row-wrap">
	  <el-col :span="5">
		<div class="tree-wrap">
			<div class="top_tit" style="margin-bottom:10px;">员工管理</div>
		  	<tree ref="deptTree" :opt="treeOpt" @node-click="treeClick" style="height:calc(100% - 55px)">
				<div slot="action">
				  <el-button type="text" class="treeBtn" size="mini" icon="el-icon-fant-refresh" @click="refreshTree">刷新</el-button>
				</div>
		 	</tree>
		</div>
	  </el-col>
	  <el-col :span="19" class="fff" style="padding:10px;box-sizing:border-box;">
		<div class="page-home" v-cloak>
		  <el-row class="action-header">
			<fant-form :model="table.opt.extendParams" class="tab" :opt="{inline:true}" @submit="()=>{return false}" @submit.native.prevent>
				<fant-form-item :opt="{prop:'searchKey'}">
					<el-input clearable prefix-icon="el-icon-search" type="text" v-model="table.opt.extendParams.searchKey" placeholder="请输入手机号码/姓名" v-enter="{btn:'#btn'}" class="input-item"/>
				</fant-form-item>
				<el-button id="btn" class="fant-btn-primary" @click="searchTable">查询</el-button>
				<el-button class="fant-btn-secondary" @click="searchWin.show = 1;">高级搜索</el-button>
			</fant-form>
		  </el-row>
		  <el-row class="action-header-more">
			<!-- <el-button v-auth="'sysman.web.staff.add'" class="fant-btn-secondary" @click="editUser()">新增</el-button>
			<el-button v-auth="'sysman.web.staff.roleAuth'" :disabled="selection.length!=1||forbidden" class="fant-btn-secondary2" @click="authorize">角色授权</el-button>
			<el-button v-auth="'sysman.web.staff.admins'" :disabled="!setAdmin||forbidden" class="fant-btn-secondary2" @click="admins">设置管理员</el-button>
			<el-button v-auth="'sysman.web.staff.cancelAdmins'" :disabled="!cancelAdmin||forbidden" class="fant-btn-secondary2" @click="cancelAdmins">取消管理员</el-button>
			<el-button v-auth="'sysman.web.staff.state'" :disabled="startUsing" class="fant-btn-secondary2" @click="enable">启用</el-button>
			<el-button v-auth="'sysman.web.staff.state'" :disabled="forbidden" class="fant-btn-secondary2" @click="disable">禁用</el-button> -->
			<el-button class="fant-btn-primary" @click="editUser()">新增</el-button>
			<el-button  :disabled="selection.length!=1||forbidden" class="fant-btn-primary" @click="authorize">角色授权</el-button>
			<el-button  :disabled="!setAdmin||forbidden" class="fant-btn-primary" @click="admins">设置管理员</el-button>
			<el-button  :disabled="!cancelAdmin||forbidden" class="fant-btn-primary" @click="cancelAdmins">取消管理员</el-button>
			<el-button  :disabled="startUsing" class="fant-btn-primary" @click="enable">启用</el-button>
			<el-button  :disabled="forbidden" class="fant-btn-primary" @click="disable">禁用</el-button>
		  </el-row>
		  <el-row class="main-table">
			<fant-table ref="userTable" v-model="table.data" :opt="table.opt" :page="table.pageOpt" :columns="table.columns" @selection-change="tableRowChange" class="formBox none table-text">
				<template slot="id" slot-scope="scope">
					<!-- <el-button v-auth="'sysman.web.staff.edit'"  type="text" class="actionBtn" icon="el-icon-edit" @click.stop="e=>editUser(scope.row)" title="编辑"></el-button>
					<el-button v-auth="'sysman.web.staff.delete'"  :disabled="scope.row.state=='ON'" type="text" class="actionBtn" icon="el-icon-delete" @click.stop="delUser(scope.row)" title="删除"></el-button> -->
					<el-button  type="text" class="actionBtn"  @click.stop="e=>editUser(scope.row)" title="编辑" >修改</el-button>
					<el-button :disabled="scope.row.state=='ON'" type="text" class="actionBtn"  @click.stop="delUser(scope.row)" title="删除" >删除</el-button>
				</template>
				<template slot="isAdmin" slot-scope="scope">
					{{scope.row.isAdmin?'是':'否'}}
				</template>
			</fant-table>



			
		  </el-row>
		</div>
	  </el-col>
	</el-row>
	 
	<win :show.sync="searchWin.show" :opt="searchWin.opt">
	  <div class="win-wrap">
		<div class="content-wrap">
			<fant-form ref="searchForm" class="fant-form-couple" :model="table.opt.extendParams" :opt="{labelWidth:'80px'}" >
			  <fant-form-item :opt="{label:'手机号码：',prop:'phone'}" >
				  <el-input clearable v-model="table.opt.extendParams.phone" placeHolder="请输入手机号码" class="input-item"></el-input>
			  </fant-form-item>
			  <fant-form-item :opt="{label:'姓名：',prop:'name'}" >
				  <el-input clearable v-model="table.opt.extendParams.name" placeHolder="请输入姓名" class="input-item"></el-input>
			  </fant-form-item>
			  <fant-form-item :opt="{label:'职位：',prop:'position'}" >
				  <el-input clearable v-model="table.opt.extendParams.position" placeHolder="请输入职位" class="input-item"></el-input>
			  </fant-form-item>
			  <fant-form-item :opt="{label:'状态：',prop:'state'}">
				<fant-select :opt="stateSelect.opt" :data="stateSelect.data" v-model="table.opt.extendParams.state"></fant-select>
			  </fant-form-item>
			  <!-- <fant-form-item :opt="{label:'状态：',prop:'state'}">
				<fant-select v-model="table.opt.extendParams.state" :data="[{id:null,name:'全部'},{id:'ON',name:'有效'},{id:'OFF',name:'无效'}]"
				:opt="{textField:'name',idField:'id',width:'200px'}"></fant-select>
			  </fant-form-item> -->
			  <fant-form-item class="item-other" :opt="{label:'创建时间：',prop:'createdAt'}" >
				  <datebox v-model="table.opt.extendParams.createdAt" :opt="createdAtOpt"/>
			  </fant-form-item>
		  </fant-form>  
		</div>
	   
		<div class="action">
		  <el-button type="text" size="small" class="reset-btn fant-btn-primary2" @click="searchReset">重置</el-button>
		  <el-button size="small" class="fant-btn-secondary" @click="searchTable">查询</el-button>
		  <el-button class="fant-btn-third" size="small" @click="searchWin.show=false">关闭</el-button>
		</div>
	  </div>
	</win>
	<win ref="editBar" class="editBar" :show.sync="editWin.show" :opt="editWin.opt">
		<component ref="editPage" :is="require('./staffEdit').default" :parent="self"></component>
	</win>
	<win :show.sync="staffAuthWin.show" :opt="staffAuthWin.opt" ref="staffRoleAuth">
		<component ref="roleAuthPage" :is="require('./staffRoleAuth').default" :parent="self"></component>
	</win>
  </div>
</template>

<script>
export default {
	data () {
		return {
			stateSelect:{
				opt:{
					textField:'text',
					idField:'id',
					prompt:'状态'
				},
				data:[
					{id:null,text:'全部'},
					{id:'ON',text:'有效'},
					{id:'OFF',text:'无效'}
				]
			},
			self:this,
			treeOpt:{
			  	url:"/web/department/getTree",
			  	height:"100%",
			  	width:"100%",
			  	dataProp:{data:"data"},
			  	props:{children: 'children', label: 'name'},
			  	inputPlaceholder:'请输入部门名称',
			  	expandbyclicknode:false,
			},
			selection:[],
			setAdmin:false,
			cancelAdmin:false,
			startUsing:true,
			forbidden:true,
			table:{
				data:[],
				opt:{
					height: "100%",
					page:true,
					url: "/web/staff/page",
					emulateJSON: true,
					extendParams:{state:null},
					checkOnSelect:true,
					multiple:true
				},
				pageOpt:{pageSize: 10,currentPage:1},
				columns:[
					{ prop: "id", label: "操作", minWidth:3},
					{ prop: "name", label: "姓名", minWidth: 3},
					{ prop: "phone", label: "手机号码", minWidth:3,align:'center'},
					{ prop: "departmentVos", label: "部门", minWidth: 3,formatter:(row,col,val)=>{
					  	if(row.departmentVos == null || row.departmentVos.length==0) return "";
					  	let datas = [];
					  	for(let i = 0 ; i < row.departmentVos.length ; i++){
							datas.push(row.departmentVos[i].name);
					  	}
					  	return datas.join(',');
					}},
					{ prop: "position", label: "职位", minWidth: 3},
					{ prop: "isAdmin", label: "管理员",align:'center', minWidth:2},
					{ prop: "_createdAt", label: "创建时间", minWidth:3,align:'center',formatter:(row,col,val)=>{
						return new Date(row.createdAt).format('yyyy-MM-dd');
					}},
					{ prop: "_state", label: "状态", minWidth:2,align:'center',formatter:(row, column, cellValue)=>{
						return row.state=='ON'?"有效":"无效";
					}}
				]
			},            
			enabledOptions:[
			  	{value: null,label: '全部'},
			  	{value: 'ON',label: '有效'},
			  	{value: 'OFF',label: '无效'}
			],
			searchWin:{
			  	show:false,
			  	opt:{
					title:'高级搜索',
					height:'300px',
					width:'620px',
			  	}
			},
			editWin:{
			  	show:false,
			  	opt:{
					title: "新增员工",
					width:'420px'
			  	},
			},
			staffAuthWin: {
			  	show:false,
			  	opt:{
					title: "角色授权",
			  	}
			},
			createdAtOpt: {
			  	width:'300px',
				prompt: "请选择创建日期范围",
				type: "daterange",
				format: 'yyyy年MM月dd日',
				valueFormat: 'yyyy-MM-dd HH:mm:ss'
			},
		}
	},
	methods:{
	  	refreshTree(){
		  	this.$refs.deptTree.reload();
		  	this.$refs.deptTree.$nextTick(()=>{
			  	this.$refs.deptTree.$refs.elTree.setCurrentKey(null);
			  	this.table.opt.extendParams.departmentId = null;
			  	this.$refs.userTable.reload();
		  	});
	  	},
	  	treeClick(data,node,tree){
			if(data.id){
			  this.table.opt.extendParams.departmentId = data.id;
			  this.$refs.userTable.reload();
			} else {
			  this.table.opt.extendParams.departmentId = null;
			  this.$refs.userTable.reload();
			}
	  	},
		getCharger(){//获取部门负责人
			this.$ajax({
				url: '/web/staff/departmenthead/' + this.did,
				method: "get",
				emulateJSON:false,
				success: re => {
					if (re) {
						let data =[];
						for(let i=0;i<re.length;i++){
						  data.push(re[i].name)
						}
						  this.charger = data;
					}
				},
			});
		},
	  	getDeptPeople(){//获取部门负责人
			this.$ajax({
				url: '/web/department/' + this.did,
				method: "get",
				emulateJSON:false,
				success: re => {
					if (re) {
						this.peopleNumber = re.peopleNumber;
					}
				},
			});
	  	},
		tableRowChange(selection){
			this.selection=selection;

			if(selection.length == 1){
				selection[0].state == 'ON' ? (this.startUsing = true):(this.startUsing = false);
				selection[0].state == 'OFF'? (this.forbidden = true):(this.forbidden = false);
			}else if(selection.length > 1){
			  this.startUsing = true;
			  this.forbidden = true;
			}else{
			  this.startUsing = true;
			  this.forbidden = true;
			}
		   
			if(selection.length == 0){
				this.setAdmin = false;
				this.cancelAdmin = false;
			   
				return;
			}
			let isAdmin = null;
			for(let i = 0 ; i < selection.length ; i++){
				if(isAdmin == null){
					isAdmin = selection[i].isAdmin;
					continue;
				}
				if(isAdmin != selection[i].isAdmin){
					this.setAdmin = false;
					this.cancelAdmin = false;
					return;
				}
			}
			if(isAdmin){
				this.cancelAdmin = true;
				this.setAdmin = false;
			} else {
				this.cancelAdmin = false;
				this.setAdmin = true;
			}
		},
		authorize(){
			this.staffAuthWin.show = true;
			this.$refs.staffRoleAuth.$nextTick(()=>{
			  this.$refs.roleAuthPage.init(this.$deepCopy(this.selection[0]));
			})
		},
		admins(){
			this.$confirm({msg:"确认设置所选人员为管理员？",fn:(r)=>{
				if(r){
					let ids = [];
					for(let i = 0 ; i < this.selection.length; i++){
					  let data = this.selection[i];
					  ids.push(data.id);
					}
					this.showLoading()
					this.$http.patch("/web/staff/admins",ids).then((re) => {
					  if (re.ok) {
						this.$message({ msg: "操作成功！", type: "success" });
						for(let i in this.selection){
						  this.selection[i].isAdmin = true;
						}
						if(this.selection[0].isAdmin == true){
						  this.setAdmin = false;
						  this.cancelAdmin = true;
						}
						// this.$refs.userTable.reload();
					  } else {
						this.$message({ msg: re.message, type: "error" });
					  }
					}).catch((err) => {
					  this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
					});
				}
			}});
		},
		cancelAdmins(){
			this.$confirm({msg:"确认取消所选人员的管理员资格？",fn:(r)=>{
				if(r){
					let ids = [];
					for(let i = 0 ; i < this.selection.length; i++){
					  let data = this.selection[i];
					  ids.push(data.id);
					}
					this.showLoading()
					this.$http.patch("/web/staff/canceladmins",ids).then((re) => {
					  if (re.ok) {
						this.$message({ msg: "操作成功！", type: "success" });
						for(let i in this.selection){
						  this.selection[i].isAdmin = false;
						}
						if(this.selection[0].isAdmin == false){
							this.setAdmin = true;
							this.cancelAdmin = false;
						}
						// this.$refs.userTable.reload();
					  } else {
						this.$message({ msg: re.message, type: "error" });
					  }
					}).catch((err) => {
					  this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
					});
				}
			}});
		},
		enable(){
			// this.$confirm({msg:"确认启用所选员工？",fn:(r)=>{
				// if(r){
					let id = this.selection[0].id;
					this.showLoading()
					this.$http.patch("/web/staff/"+id+"/enable").then((re) => {
					  if (re.ok) {
						this.$message({ msg: "启用成功！", type: "success" });
						this.selection[0].state = 'ON';
						if(this.selection[0].state == 'ON'){
							this.startUsing = true;
							this.forbidden = false;
						}
						// this.$refs.userTable.reload();
					  } else {
						this.$message({ msg: re.message, type: "error" });
					  }
					}).catch((err) => {
					  this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
					});
				// }
			// }});
		},
	    disable(){
		// this.$confirm({msg:"确认禁用所选员工？",fn:(r)=>{
			// if(r){
				let id = this.selection[0].id;
				this.showLoading()
				this.$http.patch("/web/staff/"+id+"/disable").then((re) => {
				  if (re.ok) {
					this.$message({ msg: "禁用成功！", type: "success" });
					this.selection[0].state='OFF';
					if(this.selection[0].state == 'OFF'){
					  this.startUsing = false;
					  this.forbidden = true;
					}
				  } else {
					this.$message({ msg: re.message, type: "error" });
				  }
				}).catch((err) => {
				  this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
				});
			// }
		// }});
	    },
		searchReset(){
			this.table.opt.extendParams={state:null}
		},
		searchTable(){
			if(this.table.opt.extendParams.createdAt != null){
			  var dataTime=this.table.opt.extendParams.createdAt[1].split(" ");
			  dataTime[1]="23:59:59";
			  this.table.opt.extendParams.createdAt[1] = dataTime[0]+" "+dataTime[1]
			}
			this.$refs.userTable.reload();
			this.searchWin.show = false;
		},
		editUser(data){
			this.editWin.opt.title=data?'编辑员工':'新增员工'
			this.editWin.show = true;
			this.$refs.editBar.$nextTick(()=>{
			  this.$refs.editPage.init(data);
			})
		},
		delUser(row){
			this.$confirm({msg:"是否删除该人员？",fn:(r)=>{
				if(r){
					this.showLoading()
					this.$http.delete("/web/staff/" + row.id).then((re) => {
						if (re.ok) {
						  this.$message({ msg: "删除成功！", type: "success" });
						  this.$refs.userTable.reload();
						} else {
						  this.$message({ msg: re.message, type: "error" });
						}
					}).catch((err) => {
						this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
					});
				}
			}});
		}
	}
}
</script>
