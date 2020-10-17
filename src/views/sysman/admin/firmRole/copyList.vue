<style scoped>
    .content-wrap{height:calc(100% - 65px)!important;}
    .content-wrap >>> .scroll-content,.content-wrap >>> .el-tabs,.content-wrap >>> .el-tab-pane{height:100%;}
    .content-wrap >>> .el-tabs__content{height:calc(100% - 60px);}
</style>
<template>
    <div class="win-wrap">
        <!-- <el-row class="action-header" style="height:52px;">
            <div style="position: absolute;bottom:10px;right:20px">
                <el-button class="fant-btn-primary" @click="copyForm" :disabled="!(selection.length==1&&activeTab=='first'||selection2.length==1&&activeTab=='second')">复制</el-button>
                <el-button class="fant-btn-primary2" @click="parent.copyWin.show=false">关闭</el-button>
            </div>
		</el-row> -->
        <div class="content-wrap">
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane label="通用角色" name="first">
                    <fant-table ref="roleTables" v-model="table.data" class="formBox none" :opt="table.opt" :page="table.pageOpt" :columns="columns" @selection-change="tableRowChange"></fant-table>
                </el-tab-pane>
                <el-tab-pane label="企业角色" name="second">
                    <fant-table ref="roleTable" v-model="table2.data" class="formBox none" :opt="table2.opt" :page="table2.pageOpt" :columns="columns" @selection-change="tableRowChange"></fant-table>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-row class="action">
            <el-button class="fant-btn-secondary" @click="copyForm" :disabled="!(selection.length==1&&activeTab=='first'||selection2.length==1&&activeTab=='second')">复制</el-button>
            <el-button class="fant-btn-third" @click="parent.copyWin.show=false">关闭</el-button>
        </el-row> 
        <win ref="copyWin" :show.sync="editShow" :opt="copyWin.opt">
            <component ref="editPage" :is="require('./editRole').default" :parent="self"></component>
        </win>
    </div>
</template>

<script>
export default {
    props:{
        parent:Object,
        roles:Array,
    },
    data(){
        return {
            self:this,
            activeTab:'first',
            table:{
                data:[],
                opt:{
                    height:"100%",
                    size:"small",
                    page:true,
                    showSummary:false,
                    url:"/web/roletemplate/firm/page",
                    emulateJSON:true,
                    multiple:true,
                    checkOnSelect:true,
                    extendParams:{overt:true},
                },
                pageOpt:{currentPage:1,pageSize:10},
            },
            table2:{
                data:[],
                opt:{
                    height:"100%",
                    size:"small",
                    page:true,
                    showSummary:false,
                    url:"/web/role/page",
                    emulateJSON:true,
                    multiple:true,
                    checkOnSelect:true
                },
                pageOpt:{currentPage:1,pageSize:10},
            },
            columns:[
                {prop:"name",label:"角色名称",minWidth:3},
                // {prop:"ordered",label:"排序号",minWidth:1,align:'right'},
                {prop:"remark",label:"描述",minWidth:3}
            ],
            editShow:false,
            copyWin:{
                opt:{
                    title:"复制角色",
                    height:'262px',
                    width:'420px'
                }
            },
            selection:[],
            selection2:[]
        }
    },
    methods:{
        init(){
            this.activeTab='first';
        },
        tableRowChange(selection){
            if(this.activeTab=='first')
                this.selection=selection;
            else this.selection2=selection;
        },
        copyForm(){
            this.editShow = true;
            let data = this.activeTab=='first'?this.selection[0]:this.selection2[0];
            this.$refs.copyWin.$nextTick(()=>{
                this.$refs.editPage.pageInit(this.$deepCopy(data),1);
            })
        },
        copySave(copyData){
            console.log("copyData",copyData);
            if(this.activeTab=='first'){
                let data = {id:copyData.id,name:copyData.name,remak:copyData.remark?copyData.remark:'',ordered:this.roles.length+1};
                this.$http({method:"post",url:"/web/role/copyroletemplate",params:data}).then((re)=>{
                if(re.ok == 1){
                    this.$message({msg:"保存成功！",type:"success"});
                    this.editShow = false;
                    this.parent.$refs.roleTable.reload();
                }else{
                    this.$message({msg:re.message,type:"error"});
                }
                }).catch((err)=>{
                this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
                });
            }else {
                let data = {id: copyData.id,ordered:copyData.ordered,name:copyData.name,remak:copyData.remark,ordered:this.roles.length+1};
               
                this.$http({method:"post",url:"/web/role/copyrole",params:data}).then((re)=>{
                if(re.ok == 1){
                    this.$message({msg:"保存成功！",type:"success",duration:1000});
                    this.editShow = false;
                    this.parent.$refs.roleTable.reload();
                }else{
                    this.$message({msg:re.message,type:"error"});
                }
                }).catch((err)=>{
                this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
                });
            }
        }
    }
}
</script>