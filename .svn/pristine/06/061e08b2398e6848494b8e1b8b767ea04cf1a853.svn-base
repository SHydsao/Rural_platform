<style>
	#authorityTree {
		width: 100%!important;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-moz-box-sizing: border-box;
	}
	
	#authorityTree>div {
		width: 100%!important;
	}
	
	#authorityAct {
		padding-bottom: 10px;
		text-align: right;
	}
</style>

<template>
	<div class="page-home" v-cloak>
		<el-row class="action-header">
			<fant-form :model="tableOpt.extendParams" :opt="{inline:true}" @submit="()=>{return false}" @submit.native.prevent>
				<fant-form-item>
					<el-input prefix-icon="el-icon-search" class="input-item" v-enter="{btn:'#btn'}" clearable type="text" v-model="tableOpt.extendParams.key" placeholder="请输入参数名称">
					</el-input>
				</fant-form-item>
				<el-button id="btn" size="small" class="fant-btn-primary" @click="search">查询</el-button>
			</fant-form>
		</el-row>
		<el-row class="action-header-more">
		<el-button v-auth="'sysman.web.firmParamsConfig.state'" class="fant-btn-secondary2" @click="changeState" :disabled="!($refs.configTable&&$refs.configTable.selected&&$refs.configTable.selected.state=='OFF')">启用</el-button>
		<el-button v-auth="'sysman.web.firmParamsConfig.state'" class="fant-btn-secondary2" @click="changeState" :disabled="!($refs.configTable&&$refs.configTable.selected&&$refs.configTable.selected.state=='ON')">停用</el-button>
		</el-row>		
		<el-row class="main-table">
			<fant-table ref="configTable" v-model="tableData" :opt="tableOpt" :page="pageOpt" :columns="columns">
				<template slot="id" slot-scope="scope">
					<el-button v-auth="'sysman.web.firmParamsConfig.edit'" v-show="!scope.row.editKey" type="text" class="actionBtn" icon="el-icon-edit" @click="editRow(scope.row)" title="编辑"></el-button>
				</template>
			</fant-table>
		</el-row>
		<win ref="editWin" :opt="win.opt" :show.sync="win.show">
			<component ref="editPage" :is="require('./editConfig').default" :parent="parent"></component>
		</win>
	</div>
</template>

<script>
import valid from '@/lib/fant-validate';
	export default {
		name: "userManager",
		data() {
			return {			
				tableData:[],
				tableOpt: {
					height: "100%",
					size: "small",
					page: true,
					url: "/web/firmconfig/page",
					emulateJSON: true,
					extendParams:{}
				},
                enableState:true,
				disableState:true,
				pageOpt: {
					currentPage: 1,
					pageSize: 10,
					total: 50,
				},
				columns: [
					{prop: "id", label: "操作", minWidth: "1"},
					{prop: "type", label: "参数类型", minWidth: "5",rules:[
					     { required: true,validator:valid.notEmpty, trigger: 'change' },
					]},
					{prop: "key", label: "参数名称", minWidth: "5",rules:[
						{ required: true,validator:valid.notEmpty, trigger: 'change' },
					]},
					{prop: "value", label: "参数值", minWidth: "5",rules:[
						{ required: true,validator:valid.notEmpty, trigger: 'change' },
					]},
					{prop: "remark", label: "备注", minWidth: "6",rules:[
						{ required: true,validator:valid.notEmpty, trigger: 'change' },
					]},
					{prop:"_state",label:"状态",minWidth:"1",formatter:(row, column, cellValue)=>{
						return row.state == "ON"?'有效':'无效';
					}}							
				],
				win:{
					show:false,
					opt:{
						title:'编辑配置',
						width:'620px',
						height:'280px'
					}
				},
				parent:this
			}
		},
		methods: {	
			changeState(type) {
				let row = this.$refs.configTable.selected;
                let url="/web/firmconfig/enable/"+row.id;
				if(row.state=='ON') url="/web/firmconfig/disable/"+row.id;
                this.$http({method: "put",url:url}).then((re) => {
                    if(re.ok) {
                        this.$message({msg:row.state=='ON'?"停用成功！":'启用成功！',type: "success",duration:1000});
                        row.state=row.state=='ON'?'OFF':'ON';
                    } else this.$message({msg: re.message,type: "error"});
                })
			},
			search() {
				delete this.tableOpt.extendParams.type;
				this.$refs.configTable.reload();	
			},
			editRow(row){
				this.win.show=true;
				this.$refs.editWin.$nextTick(()=>{
					this.$refs.editPage.init(this.$deepCopy(row));
				})
			}
		}
	}
</script>