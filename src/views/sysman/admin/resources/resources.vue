
<style scoped>
.row_wrap,
.row_wrap > .el-col {
  height: 100%;
}
.tree_wrap {
  /* height: 100%; */
  padding: 10px;
  /* background: #fff; */
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.tree_wrap > .tree,
.tree_wrap > .tree >>> .el-input,
.tree_wrap > .tree >>> .el-tree {
  width: 100% !important;
}
.content-wrap >>> .fantTable .el-pagination {
  position: relative;
}
.resource >>> .content-wrap {
  height: calc(100% - 11px) !important;
}
.fant-tdd{
	width: 100%;
	height: 40px;
	line-height: 40px;
}
.main{
	height:calc(100% - 52px);
}
</style>
<template>
	<div class="page-home page-tree" v-cloak>
		<win :show.sync="win.resourceType.show" :opt="win.opt">
			<div class="win-wrap">
				<div class="content-wrap">
					<fant-form ref="resourceType" :model="win.resourceType.data" :opt="win.resourceType.opt" v-enter>
						<el-form-item label="父级名称：">
							<span v-text="win.resourceType.data.parentName"></span>
						</el-form-item>
						<el-form-item label="名称：" prop="name">
							<el-input v-model="win.resourceType.data.name" placeholder="请输入名称"></el-input>
						</el-form-item>
						<el-form-item label="图标：" prop="icon">
							<el-input v-model="win.resourceType.data.icon" placeholder="请输入图标"></el-input>
						</el-form-item>
						<el-form-item label="排序号：" prop="ordered">
							<el-input :controls="false" class="fant-number-input" v-model="win.resourceType.data.ordered" style="width:300px" placeholder="请输入排序号"></el-input>
						</el-form-item>
					</fant-form>
				</div>
				<div class="action">
					<el-button class="fant-btn-primary2 reset-btn" @click="resetResourceType">重置</el-button>
					<el-button :disabled="win.disableSave" class="fant-btn-secondary" @click="winSave">保存</el-button>
					<el-button class="fant-btn-third" @click="win.resourceType.show=false">关闭</el-button>
				</div>
			</div>
		</win>
		 <win ref="resourceWin" :show.sync="resourceWin.show" :opt="resourceWin.opt">
			<component ref="resourceEdit" :is="require('./edit').default" :parent="parent"></component>
		</win>

		 <win ref="operateEditWin" :show.sync="operateEditWin.show" :opt="operateEditWin.opt">
			<component ref="operateEdit" :is="require('./operate').default" :parent="parent"></component>
		</win>
		<win :show.sync="operateWin.show" :opt="operateWin.winOpt" ref="resWin">
			<div class="win-wrap resource" v-cloak>
				<div>
					 <el-row class="content-wrap" style="">
					<fant-table @selection-change="tableRowChange" ref="resTable" v-model="operateWin.data" :opt="operateWin.tableOpt" :page="operateWin.pageOpt" :columns="operateWin.columns" style="padding-bottom: 10px;" class="formBox none move-list">
						<template slot-scope="scope" slot="id">
							<el-button type="text" class="el-icon-fant-add" title="新增" @click="addRow(scope.$index)"></el-button>
							<el-button type="text" class="el-icon-delete" title="删除" @click="delRowrs(scope.$index,scope.row)"></el-button>
						</template>
						<template slot-scope="scope" slot="code">
							 <div class="fant-tdd" v-if="!scope.row['$code']" @click="e=>editCell(e,scope.row,'code',scope.$index)" v-text="scope.row.code" ></div>
							<table-form :ref="'code'+scope.$index" v-else :scope="scope" prop="code">
								<el-input v-if="scope.row['$code']" v-model="scope.row.code" @blur="saveCell(scope.row,'code',scope.$index)"></el-input>
							</table-form>
						</template>

						<template slot-scope="scope" slot="name">
							<div class="fant-tdd" v-if="!scope.row['$name']" @click="e=>editCell(e,scope.row,'name',scope.$index)" v-text="scope.row.name" ></div>
							<table-form :ref="'name'+scope.$index" v-else :scope="scope" prop="name">
								 <el-input v-if="scope.row['$name']" v-model="scope.row.name" @blur="saveCell(scope.row,'name',scope.$index)" ></el-input>
							</table-form>
						</template>
						<template slot-scope="scope" slot="url">
							<div class="fant-tdd" v-if="!scope.row['$url']" @click="e=>editCell(e,scope.row,'url',scope.$index)" v-text="scope.row.url" ></div>
							<table-form :ref="'url'+scope.$index" v-else :scope="scope" prop="url">
								<el-input v-if="scope.row['$url']" v-model="scope.row.url" @blur="saveCell(scope.row,'url',scope.$index)"></el-input>
							</table-form>
						</template>
						<template slot-scope="scope" slot="method">
							<div class="fant-tdd" v-if="!scope.row['$method']" @click="e=>editCell(e,scope.row,'method',scope.$index)" v-text="scope.row.method" ></div>
							<table-form :ref="'method'+scope.$index" v-else :scope="scope" prop="method">
								<el-select :ref="'method-select'+scope.$index" v-if="scope.row['$method']" v-model="scope.row.method" @blur="delaySaveCell(scope.row,'method',scope.$index)" placeholder="请选择">
									<el-option key="GET" label="GET" value="GET"/>
									<el-option key="POST" label="POST" value="POST"/>
									<el-option key="PUT" label="PUT" value="PUT"/>
									<el-option key="PATCH" label="PATCH" value="PATCH"/>
									<el-option key="DELETE" label="DELETE" value="DELETE"/>
									<el-option key="ALL" label="ALL" value="ALL"/>  
								</el-select>
							</table-form>
						</template>
						<!-- <div v-auth="'sysman.admin.resource.addOperation'" slot="append" style="padding:0 20px;border-bottom:1px solid #ddd;">
							<el-button type="text" icon="el-icon-fant-add" @click="addRow"></el-button>
						</div> -->
					</fant-table>
					</el-row>
					<div class="action">
					  <el-button class="fant-btn-secondary" @click="saveRows">保存</el-button>
					 <el-button class="fant-btn-third" @click="operateWin.show=false">关闭</el-button>
				  </div>
				</div>
			</div>         
		</win>
		
		<div class="page h100">
			<div class="el-top fff">
				<div class="top_tit">资源管理</div>
			</div>
			<div class="main" style="padding:0 !important;">
				<el-row class="h100">
					<el-col :span="5" style="padding-right:10px;" class="h100" >

						<div class="tree_wrap fff h100" >
							<tree ref="treebox" class="tree w100 h100" v-model="tree.data" style="height:calc(100% - 55px)" :opt="tree.opt" @node-click="nodeClick">
								<div slot="action">
								<!--  <el-button v-auth="'sysman.admin.resource.addResourceType'" :disabled="tree.index==''" type="text" class="treeBtn" size="mini" icon="el-icon-fant-add" @click="openWin('resourceType')">新增</el-button>
									<el-button v-auth="'sysman.admin.resource.editResourceType'" :disabled="!tree.enableRemove" type="text" class="treeBtn" size="mini" icon="el-icon-fant-editor" @click="openWin('resourceType',1)">编辑</el-button>
									<el-button v-auth="'sysman.admin.resource.delResourceType'" :disabled="!tree.enableRemove" type="text" class="treeBtn" size="mini" icon="el-icon-fant-delete" @click.stop="remove">删除</el-button>
									<el-button type="text" class="treeBtn" size="mini" icon="el-icon-fant-refresh" @click="refresh">刷新</el-button> -->
									<el-button  :disabled="tree.index==''" type="text" class="treeBtn" size="mini" icon="el-icon-fant-add" @click="openWin('resourceType')" v-auth="'admin.resource.addResourceType'">新增</el-button>
									<el-button  :disabled="!tree.enableRemove" type="text" class="treeBtn" size="mini" icon="el-icon-fant-editor" @click="openWin('resourceType',1)" v-auth="'admin.resource.editResourceType'">编辑</el-button>
									<el-button  :disabled="!tree.enableRemove" type="text" class="treeBtn" size="mini" icon="el-icon-fant-delete" @click.stop="remove" v-auth="'admin.resource.delResourceType'" >删除</el-button>
									<el-button type="text" class="treeBtn" size="mini" icon="el-icon-fant-refresh" @click="refresh">刷新</el-button>
								</div>
							</tree>
						</div>
					</el-col>
					<el-col :span="19" class="fff h100" style="padding:10px;box-sizing:border-box;">
						<el-row class="wrap">
							<el-button class="fant-btn-primary" @click="editResource({})" v-auth="'admin.resource.add'" :disabled="tree.index == 1">新增</el-button>
							<el-button v-auth="'admin.resource.openOperate'" class="fant-btn-primary" @click="openOperate" :disabled="tree.index==''||tree.index==-1||table.selection.length!=1||table.selection[0].state=='OFF'">操作</el-button>
							<el-button v-auth="'admin.resource.state'" class="fant-btn-primary" @click="toggleState" :disabled="tree.index==''||tree.index==-1||table.selection.length!=1||table.selection[0].state=='ON'">启用</el-button>
							<el-button v-auth="'admin.resource.state'" class="fant-btn-primary" @click="toggleState" :disabled="tree.index==''||tree.index==-1||table.selection.length!=1||table.selection[0].state=='OFF'">禁用</el-button>

							<!-- <el-button class="fant-btn-primary" @click="editResource({})" :disabled="tree.index==''||tree.index==-1" >新增</el-button>
							<el-button  class="fant-btn-primary" @click="openOperate" :disabled="tree.index==''||tree.index==-1||table.selection.length!=1||table.selection[0].state=='OFF'">操作</el-button>
							<el-button class="fant-btn-primary" @click="toggleState" :disabled="tree.index==''||tree.index==-1||table.selection.length!=1||table.selection[0].state=='ON'">启用</el-button>
							<el-button  class="fant-btn-primary" @click="toggleState" :disabled="tree.index==''||tree.index==-1||table.selection.length!=1||table.selection[0].state=='OFF'">禁用</el-button> -->
						</el-row>
						<el-row class="main-table table-right" style="height:calc(100% - 45px);">
							<fant-table ref="aaa" v-model="table.data" :opt="table.opt" :page="table.pageOpt" :columns="table.columns" @selection-change="selectChange" class="formBox none">
								<template slot="empty">
									<div class="empty_content">
										<div class="noData-img"></div>
										<!-- <img :src="require('@/assets/images/blank_bg2.png')" alt=""> -->
										<div class="empty_text">暂无数据</div>
									</div>
								</template>
							
								<template slot-scope="scope" slot="id">
								<!--  -->
									<el-button v-disAuth="'admin.resource.edit'"  type="text" class="actionBtn" icon="el-icon-edit" title="编辑" @click.stop="editResource(scope.row)"></el-button>
									<el-button v-disAuth="'admin.resource.del'" :disabled="scope.row.state == 'ON'" type="text" class="actionBtn" icon="el-icon-delete" title="删除" @click.stop="delRows(scope.row)"></el-button>
								</template>
							</fant-table>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import Sortable from "sortablejs";
import valid from "@/lib/fant-validate";
import qs from 'qs';
export default {
  name: "resources",
  data() {
	return {
	  parent: this,
	  saveData:{},
	  isTop:false,
	  tree: {
		enableRemove: false,
		index: 1,
		data: [],
		opt: {
		  nodeKey: "id",
		  url:"/admin/resourcetype/tree/",
		  // url: "/admin/module",
		  method: "get",
		  defaultExpandAll:false,
		  dataProp: { data: "data" },
		  props: { children: "children", label: "name" },
		  expandbyclicknode: false /*,renderContent:this.renderContent*/,
		  inputPlaceholder: "服务名称/类别名称"
		},
		currnode: {}
	  },
	  table: {
		index: "",
		data: [],
		opt: {
		  height: "100%",
		  size: "small",
		  readyLoad: false,
		  page: true,
		  url:"/admin/resource/page",
		  emulateJSON: true,
		  extendParams: {},
		  multiple: true,
		  checkOnSelect: true,
		  rowKey:'id',
		},
		pageOpt: { pageSize: 10, total: 0, currPage: 1 },
		columns: [
		  { prop: "id", label: "操作", width: '94px',align:'center' },
		  { prop: "moduleId", label: "moduleId", hidden: true },
		  { prop: "code", label: "编码", minWidth: 2 },
		  { prop: "name", label: "名称", minWidth: 2 },
		  { prop: "type", label: "类型", minWidth: 1 },
		  { prop: "url", label: "链接", minWidth: 3 },
		  { prop: "icon", label: "图标", minWidth: 2 },
		  { prop: "ordered", label: "排序号", minWidth: 1, align: "right" },
		  {
			prop: "_state",
			label: "状态",
			minWidth: 1,
			align: "center",
			formatter: (row, col, val) => {
			  return row.state == "ON" ? "有效" : "无效";
			}
		  }
		],
		oldData: [],
		selection: []
	  },
	  resourceWin: {
		show: false,
		opt: {
		  title: "资源窗口",
		  width: "620px"
		}
	  },
	  operateEditWin: {
		show: false,
		opt: {
		  title: "操作窗口",
		  width: "620px"
		}
	  },
	  win: {
		resourceType: {
		  oldData: {},
		  show: false,
		  data: {},
		  opt: {
			labelWidth: "80px",
			width: "420px",
			height: "300px",
			rules: {
			  name: [
				{
				  required: true,
				  validator: valid.notEmpty,
				  trigger: "change"
				},
				{
				  min: 0,
				  max: 20,
				  type: "string",
				  message: "请限制名称在1-20字符内",
				  trigger: "change"
				}
			  ],
			  ordered: [
				{
				  trigger: "change",
				   validator:this.roundNumber
				},
			   
				{ required: true, message: "排序号不能为空", trigger: "change" }
			  ]
			}
		  },
		  winSize: "small"
		},
		target: "",
		disableSave: false,
		opt: {
		  title: "弹窗标题",
		  width: "420px",
		  height: "300px"
		}
	  },
	  operateWin: {
		show: false,
		index: "",
		source: {},
		data: [],
		tableOpt: {
		  height: "450px",
		  url:  "/admin/operation/page",
		  emulateJSON: true,
		  dataProp:{data:""},
		  extendParams: {},
		  rowKey:'id',
		},
		pageOpt: {},
		columns: [
		  { prop: "id", label: "操作", minWidth: 3 ,align:'center'},
		  {
			prop: "code",
			label: "编码",
			minWidth: 5,
			rules: [
			  {
				required: true,
				validator: valid.notEmpty,
				message: "编码不能为空",
				trigger: "change"
			  },
			  { max: 50, message: "不超过50个字符", trigger: "change" }
			]
		  },
		  {
			prop: "name",
			label: "名称",
			minWidth: 5,
			rules: [
			  {
				required: true,
				validator: valid.notEmpty,
				message: "名称不能为空",
				trigger: "change"
			  },
			  { max: 10, message: "不超过10个字符", trigger: "change" }
			]
		  },
		  {
			prop: "url",
			label: "url",
			minWidth: 8,
			rules: [
			  { max: 50, message: "不超过50个字符", trigger: "change" }
			]
		  },
		  {
			prop: "method",
			label: "方法",
			minWidth: 3,
			// rules: [
			//   {
			//     required: true,
			//     validator: valid.notEmpty,
			//     message: "方法不能为空",
			//     trigger: "change"
			//   },
			//   { max: 100, message: "不超过100个字符", trigger: "change" }
			// ]
		  }
		],
		oldData: [],
		winOpt: {
		  title: "操作列表",
		  width: "650px"
		}
	  },
	  selection:[]
	};
  },
  methods: {
	roundNumber:function(rule, value, callback){
		value = value || '';
		var valid = (/^\d*$/).test(value);
		if (!valid || !(value>=0&&value<1000)) {
			callback(new Error('请输入0-1000整数。'));
		} else {
			callback();
		}
	},
	tableRowChange(selection){
		this.selection=selection;
	},
	//   addRow(index) {
	//   var row = { state: "ON" };
	//   this.operateWin.data.splice(index + 1, 0, row);
	// },
	saveRows(){
	  let beValid = true;
	 this.operateWin.data.forEach((item, ind) => {
		this.$refs["resTable"].validate(ind, valid => {
		  beValid = beValid && valid;
		});
	  });
	  if(!beValid) return;
	  let orderSort = 0;
	  for(var i in this.operateWin.data){
		if(this.operateWin.data[i].code == ""||this.operateWin.data[i].name == ""){
		  this.operateWin.data.splice(i)
		  // this.operateWin.data[i].ordered = orderSort;
		  // orderSort++;
		}
		
		  if(this.operateWin.data[i]!=undefined){
		   
			// this.operateWin.data[i].resource.ordered = orderSort;
			// orderSort++;
			delete this.operateWin.data[i].resource
		  }
	  }
	  let ids = [];
		
	  // this.operateWin.data.resource = this.operateWin.data;
	  let method = 'put';
	  let url=  "/admin/operation/batchUpdate";

	  // // console.log(url,method,this.operateWin.data)
	  // // console.log(this.operateWin.data)
	  this.$http[method](url,this.operateWin.data).then(re =>{
		 if (re.ok) {
			// for(let i in this.operateWin.data){
			// 	ids.push(this.operateWin.data[i].id)
			// }
			// this.showLoading()
			// this.$http.put('/admin/operation/ordered',ids).then(re=>{

			// })
		    this.$message({showClose: true, message: '保存成功',type: "success",duration: 1000});
		    this.operateWin.show = false;
		  } else {
		    this.$message({showClose: true,message: re.message,duration: 1000, type: "error"});
		  }
	  })
		 
	},
	delRowrs(index) {
	  if (!this.operateWin.data[index].name) {
		if (this.operateWin.data.length > 1) {
		  this.operateWin.data.splice(index, 1);
		}
	  } else {
		this.$confirm({
		  msg: "是否删除该操作？",
		  fn: r => {
			if (r) {
			  if (this.operateWin.data.length == 1) {
				this.operateWin.data[index].code = "";
				this.operateWin.data[index].name = "";
				this.operateWin.data[index].url = "";
				this.operateWin.data[index].method = "";
				return;
			  } else if (this.operateWin.data.length > 1) {
				this.operateWin.data.splice(index, 1);
			  }
			}
		  }
		});
	  }
	},
	editCell(e, row, name, index) {
	  this.$set(row, "$" + name, true);
	  var parent = e.target.parentNode;
	  this.$nextTick(() => {
		this.$keyHandler(parent,true);
		let el = this.$refs[name + index].$el;
		if (el.getElementsByTagName("input").length > 0) {
		  el.getElementsByTagName("input")[0].click();
			el.getElementsByTagName("input")[0].focus();
		}
	  });
	},
	delaySaveCell(row, name, index){
		setTimeout(()=>{
			this.saveCell(row, name, index);
		},300)
	},
	saveCell(row, name, index) {
	  let form = this.$refs[name + index].$refs.fantForm;
	  form.validate(valid => {
		if (valid) {
		  this.$set(row, "$" + name, false);
		} else {
		  return false;
		}
	  });
	}, 
	openWin(key, data) {
		let id;
		// // console.log(this.$refs.treebox.$refs["elTree"].getCheckedKeys())
	  var node = this.getCurNode();

	  // // console.log(node)
	  if(node){
	  	id = node.parentId ? node.parentId : node.id;
	  }
	  // let id=node.id;
	  // // console.log(id)
	  if (key == "resourceType") {
		if (data) {
			this.win.opt.title = "编辑资源类别";
			this.win.resourceType.data = this.$deepCopy(node);
			this.win.resourceType.data.parentName = this.$refs.treebox.$refs["elTree"].getNode(id).data.name;
			if(this.isTop){
				this.win.resourceType.data.parentName='';
			}
		}else if(!this.isTop && !data){
			this.win.opt.title = "新增资源类别";
		  	this.win.resourceType.data = {
				id: "",
				parentName:"",
				parent: "",
				name: "",
				ordered: ''
		  	};
		}else {
		  	this.win.opt.title = "新增资源类别";
		  	this.win.resourceType.data = {
				id: "",
				parentName: node.name,
				parent:  node.id? node.id : "",
				name: "",
				ordered: ''
		  	};
		}
		this.win.resourceType.oldData = this.$deepCopy(
		  this.win.resourceType.data
		);
	  }
	  this.win.target = key;
	  this.win[key].show = true;
	  data ? null : this.$refs[key] ? this.$refs[key].resetFields() : null;
	},
	operateEdit(row) {
	  this.operateEditWin.opt.title = !row.id ? "新增操作" : "编辑操作";
	  if (!row.id) {
		let node = this.getCurNode();
		row = this.$assign(row, {
		  moduleId: node.moduleId,
		  resourceType: node
		});
	  }
	  this.operateEditWin.show = true;
	  this.$refs.operateEditWin.$nextTick(() => {
		this.$refs.operateEdit.init(this.$deepCopy(row));
	  });
	},
	editResource(row) {
	  this.resourceWin.opt.title = !row.id ? "新增资源" : "编辑资源";
	  if (!row.id) {
		let node = this.getCurNode();
		row = this.$assign(row, {
		  moduleId: node.moduleId,
		  resourceType: node
		});
	  }
	  this.resourceWin.show = true;
	  this.$refs.resourceWin.$nextTick(() => {
		this.$refs.resourceEdit.init(this.$deepCopy(row));
	  });
	},
	winBeforeClose() {
	  this.win[this.win.target].show = false;
	  this.win.disableSave = false;
	},
	winSave: function() {
	  	this.$refs[this.win.target].validate(valid => {
			if (valid) {
				this.win.disableSave = true;
				var id = this.win[this.win.target].data.id;
				if (this.win.target == "resourceType") {
					var node = this.getCurNode();
					if(!node){
						var url =  "/admin/resourcetype",method = "post";
						this.$http[method](url, this.win[this.win.target].data).then(res=>{
							// // console.log(res)
							this.$refs.treebox.reload();
							this.winBeforeClose();
						})
						return;
					}
					var url =  "/admin/resourcetype",method = "post";
					if (id)(url =  "/admin/resourcetype/" + id),(method = "put");
						this.$http[method](url, this.win[this.win.target].data).then(re => {
							// // console.log(re)
							if (re.ok) {
								this.$message({ msg: "保存成功！", type: "success" });
								this.winBeforeClose();

								if(this.isTop){
									this.$refs.treebox.reload();
									this.isTop=!this.isTop;
									return;
								}
								var $moduleId = this.$refs.treebox.$refs.elTree.getNode(node.id).data.parentId || node.id;
							
			
								this.showLoading()
								this.$http.get( "/admin/resourcetype/tree/" + $moduleId )
								  	.then(re => {
										var mydata = this.$refs["treebox"].mydata;
											// // console.log(mydata)
										// console.log(re.data)
										this.$refs.treebox.$refs.elTree.updateKeyChildren($moduleId, re.data);
											

										let key = this.$refs["treebox"].$refs.elTree.getCurrentKey();
										  	
										this.$refs["treebox"].$refs.elTree.setCurrentKey(key);
								});
							
						  	} else {
								this.$message({
								  showClose: true,
								  message: re.message,
								  duration: 3000,
								  type: "error"
								});
								this.win.disableSave = false;
							}
						});
				} else {
					var url =  "/admin/resource",method = "post";
					if (id)(url =  "/admin/resource/" + id),(method = "put");
					this.$http[method](url, this.win[this.win.target].data).then(re => {
					  if (re.ok) {
						this.$message({
						  showClose: true,
						  message: "保存成功",
						  type: "success",
						  duration: 1000,
						  onClose: () => {
							this.winBeforeClose();
							this.$refs["aaa"].reload();
						  }
						});
					} else {
						this.$message({
						  showClose: true,
						  message: re.message,
						  duration: 3000,
						  type: "error"
						});
						this.win.disableSave = false;
					  }
					});
				}
			}
		});
	},
	openOperate() {
	  let row = this.$refs.aaa.selected[0];
	  this.operateWin.show = true;
	  this.operateWin.source = row;
	  this.operateWin.tableOpt.extendParams = {
		resourceId: this.$deepCopy(row).id
	  };
	  this.$refs.resWin.$nextTick(() => {
		this.$refs["resTable"].reload();
		  this.$refs.resTable.$nextTick(() => {
			if(this.operateWin.data.length==0){
		  this.operateWin.data.push(
			  { id: null,code: "", moduleId: row.moduleId, name: "", resource: row,resourceAccess: false,resourceId:row.id,method:'ALL'}, 
			  {id: null,code: "", moduleId: row.moduleId, name: "", resource: row,resourceAccess: false,resourceId:row.id,method:'ALL'}, 
			  {id: null,code: "", moduleId: row.moduleId, name: "", resource: row,resourceAccess: false,resourceId:row.id,method:'ALL'}, 
			  {id: null,code: "", moduleId: row.moduleId, name: "", resource: row,resourceAccess: false,resourceId:row.id,method:'ALL'}
			);
			}
			this.initSort(".move-list .el-table__body-wrapper > table > tbody",
			this.operationMore
			);
		  });
		
		
	  });
	},
	addRow: function(index) {
	  var source = this.operateWin.source;
	  var row = {
		id: null,
		code: "",
		moduleId: source.moduleId,
		name: "",
		resource: source,
		resourceAccess: false,
		resourceId:source.id,
		method:'ALL'
	  };
	   this.operateWin.data.splice(index + 1, 0, row);
	  // this.operateWin.data.push(row);
	  var index = this.operateWin.data.length - 1;
	  this.$rowSet(index, { newKey: 1 });
	  this.editRow(index, row);
	},
	editRow: function(index, row) {
	  this.operateWin.oldData[index] = this.$deepCopy(row);
	  this.$rowSet(index, { editKey: 1 });
	},
	saveRow: function(index, row) {
	  var beValid = true;
	  this.$refs["resTable"].validate(index, valid => {
		if (!valid) beValid = false;
	  });
	  var msg = "保存成功";
	  if (beValid) {
		row.resourceId = row.resource.id;
		var url =  "/admin/operation",
		  method = "post";
		if (row.id) {
		  msg = "修改成功";
		  (url =  "/admin/operation/" + row.id),
			(method = "put");
		}
		this.$http[method](url, row).then(re => {
		  if (re.ok) {
			this.$message({
			  showClose: true,
			  message: msg,
			  type: "success",
			  duration: 1000
			});
			this.$refs["resTable"].reload();
		  } else {
			this.$message({
			  showClose: true,
			  message: re.message,
			  duration: 1000,
			  type: "error"
			});
		  }
		});
	  }
	},
	cancelRow: function(index, row) {
	  if (row.newKey) this.operateWin.data.splice(index, 1);
	  else {
		this.$set(
		  this.operateWin.data,
		  index,
		  this.$deepCopy(this.operateWin.oldData[index])
		);
		this.$rowSet(index, { editKey: 0 });
	  }
	},
	selectChange: function(selected) {
	  this.table.selection = selected;
	},
	delRow(index, row) {
	  this.$confirm({
		msg: "确定删除吗？",
		fn: r => {
		  if (r) {
			this.$http
			  .delete( "/admin/operation/" + row.id)
			  .then(re => {
				if (re.ok) {
				  this.$message({ msg: "删除成功！", type: "success" });
				  this.$refs["resTable"].reload();
				} else {
				  this.$message({
					showClose: true,
					message: re.message,
					duration: 3000,
					type: "error"
				  });
				}
			  });
		  }
		}
	  });
	},
	loadTree(data, toload) {
	  if (!data.children || toload) {
		this.$http
		// /api{firmId}
		  // .get( "/admin/resourcetype/tree/" + data.id)
		  .get( "/admin/resourcetype/tree/")
		  .then(re => {
				var mydata = this.$refs["treebox"].mydata;
				// // console.log(mydata)
				this.$refs.treebox.$refs.elTree.updateKeyChildren(data.id, re.data);
				// this.$refs.treebox.reload();

			  	let key = this.$refs["treebox"].$refs.elTree.getCurrentKey();
			  	// // console.log(mydata)
			  	// // console.log(re)
			  	this.$refs["treebox"].$refs.elTree.setCurrentKey(key);
		  	});
	  }
	},
	nodeClick: function(value, node, component) {
	  // // console.log(this.table.pageOpt)
	  // this.table.pageOpt.currentPage = 1
	  // // console.log(value,node,component)
	  this.tree.currnode = value;
	  this.loadTree(value);
	  // // console.log(node.level)
	  
	  // // console.log(this.tree.enableRemove)
	  // } else {
	    this.table.opt.readyLoad = true;
	    this.table.opt.url= "/admin/resource/page";
	    this.table.opt.extendParams = { resourceType: value.id };
	    this.$refs["aaa"].reload();
	    this.tree.index = value.id;
	    this.tree.enableRemove = true;

	    // // console.log(this.isTop)
	    if(node.level == 1){
	    	this.isTop=true;
	    }

	  // }
		// if (node.level == 1) {
		//     // this.table.pageOpt= { pageSize: 10, total: 1, currPage: 1 },
		//     this.table.pageOpt.total=1;
		//     this.isTop=true;
		//     // this.table.opt.url='';
		//     // this.$refs["aaa"].mydata = [];
		//     // this.$refs["aaa"].reload();
		//     this.tree.enableRemove = true;
		//     this.tree.index = -1;
		// }
		// // console.log(this.tree.index)
	},
	remove: function() {
	  if (!this.tree.enableRemove) return;
	  this.$confirm({
		msg: "确定删除吗？",
		fn: r => {
		  if (r) {
			var node = this.getCurNode();
			this.$http
			  .delete( "/admin/resourcetype/" + node.id)
			  .then(re => {
				if (re.ok) {
				  this.$message({ msg: "删除成功！", type: "success" });
				  this.$refs["treebox"].removeC(node);
				  this.tree.index = "";
				  this.tree.enableRemove = false;
				} else {
				  this.$message({
					showClose: true,
					message: re.message,
					duration: 3000,
					type: "error"
				  });
				}
			  });
		  }
		}
	  });
	},
	refresh() {
	  this.tree.index = "";
	  this.tree.enableRemove = false;
	  this.$refs.treebox.hideActionBar();
	  this.$refs.treebox.reload();
	},

	delRows: function(row) {
	  this.$confirm({
		msg: "确定删除吗？",
		fn: r => {
		  if (r) {
			this.$http
			  .delete( "/admin/resource/" + row.id)
			  .then(re => {
				if (re.ok) {
				  this.$message({ msg: "删除成功！", type: "success" });
				  this.$refs["aaa"].reload({
					pageNo: this.table.pageOpt.currPage,
					pageSize: this.table.pageOpt.pageSize
				  });
				} else
				  this.$message({
					showClose: true,
					message: re.message,
					duration: 3000,
					type: "error"
				  });
			  });
		  }
		}
	  });
	},
	getCurNode: function() {
	  return this.$refs.treebox.$refs["elTree"].getCurrentNode();
	},
	toggleState(state) {
	  let row = this.$refs.aaa.selected[0];
	  var act = row.state == "OFF" ? "enable" : "disable";
	  var msg = row.state == "OFF" ? "启用" : "禁用";
	  this.$http
		.put( "/admin/resource/" + row.id + "/" + act)
		.then(re => {
		  if (re.ok) {
			row.state = row.state == "ON" ? "OFF" : "ON";
			this.$message({
			  showClose: true,
			  message: msg + "成功",
			  duration: 1000,
			  type: "success"
			});
		  }
		});
	},
	$rowSet: function(index, obj) {
	  for (var i in obj) {
		this.$set(this.operateWin.data[index], i, obj[i]);
	  }
	},
	resetResourceType: function() {
	  this.$refs.resourceType.resetFields();
	  this.win.resourceType.data = this.$deepCopy(
		this.win.resourceType.oldData
	  );
	},
	initSort(dom,fun) {
		const el = document.querySelectorAll(dom)[0] // 获取拖拽的容器 
		Sortable.create(el, {
			animation: 180,
			ghostClass: "sortable-ghost",
			onEnd: evt => fun(evt)
			// {
			// 	// console.log(evt.oldIndex)
			// 	// console.log(evt.newIndex)
			// 	let targetObj = this.operateWin.data.splice(evt.oldIndex, 1)[0];			                    
			// 	this.operateWin.data.splice(evt.newIndex, 0, targetObj);
			// }
		})
	},
	operationMore(evt){
		let targetObj = this.operateWin.data.splice(evt.oldIndex, 1)[0];			                    
		this.operateWin.data.splice(evt.newIndex, 0, targetObj);
	},
	baseMore(evt){
		let targetObj = this.table.data.splice(evt.oldIndex, 1)[0];			                    
		this.table.data.splice(evt.newIndex, 0, targetObj);
	},
  },
  mounted: function() {
	window.$vueParentEl = this;
	// this.$nextTick(()=>{
	// 	this.initSort('.el-table__body-wrapper > table > tbody',this.baseMore)
	// })
	
  },
  updated() {}
};
</script>
