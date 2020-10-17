<style scoped>
    .text{
        font-size:15px;
        color:#666;
        line-height:30px;
    }
    .text span{
        min-width:250px;
    }

</style>
<template>
    <div class="page_box" v-cloak>
        <div class="main fff h100">
            <el-row class="wrap clearfix">
                <fant-form :model="table.tableOpt.extendParams" :opt="{inline:true}" v-enter @submit="()=>{return false}" @submit.native.prevent>
                   <div class="form fr">
                        <fant-form-item :opt="{prop:'name'}">
                            <el-input clearable prefix-icon="el-icon-search" v-model="table.tableOpt.extendParams.name" placeholder="请输入部门名称" v-enter="{btn:'#btn'}" class="input-item"/>
                        </fant-form-item>
                        <el-button id="btn" class="fant-btn-primary" @click="search">查询</el-button>
                   </div>

                    <el-button class="fant-btn-primary" @click="edit()" v-auth="'web.dept.add'">新增</el-button>
                    <el-button class="fant-btn-primary" v-auth="'web.dept.staff'" :disabled="selection.length!=1" @click="setMember">设置成员</el-button>
                </fant-form>
            </el-row>

            <div class="main-table none">
                <fant-table 
                    ref="deptTable"
                    :opt="table.tableOpt"
                    :data="table.data"
                    :columns="table.columns"
                    :page="table.pageOpt"
                    class="table-text"
                    @selection-change="tbSelect"
                >
                    <template slot-scope="scope" slot="id">
                        <el-button type="text" icon="el-icon-edit"  title="编辑" @click="edit(scope.row)" v-disAuth="'web.dept.edit'"></el-button>
                        <el-button type="text" icon="el-icon-delete"  title="删除" @click.stop="remove(scope.row)" v-disAuth="'web.dept.delete'"></el-button>
                    </template>
                    <template slot="empty">
                        <div class="empty_content">
                            <div class="noData-img"></div>
                            <!-- <img :src="require('@/assets/images/blank_bg2.png')" alt=""> -->
                            <div class="empty_text">暂无数据</div>
                        </div>
                    </template>
                </fant-table>
            </div>
        </div>
        
        <!-- 编辑新增弹框 -->
        <win ref="editWin" :show.sync="editWin.show" :opt="editWin.opt">
            <component ref="editPage" :parent="parent" :is="require('./deptEdit').default" :department='departmentId' :name='name'></component>
        </win>
        
        <!-- 设置成员弹框 -->
        <win ref="memberWin" :show.sync="memberWin.show" :opt="memberWin.opt">
            <component ref="memberPage" :parent="parent" :is="require('./member').default" @callback="memberWin.show = false;search()"></component>
        </win>

    </div>
</template>

<script>
    import valid from '@/lib/fant-validate';
    export default{
        data(){
            return{
                departmentId:'',
                name:'',
                parent:this,
                selection:[],
                editWin:{
                    show:false,
                    opt:{
                        title:'部门编辑',
                        width:"420px"
                    }
                },
                memberWin:{
                    show:false,
                    opt:{
                        size:"small",
                        title:"设置成员"
                    }
                },
                table:{
                    tableOpt:{
                        height:"100%",
                        size:"small",
                        page:true,
                        multiple:true,
                        url:"/web/department/page",
                        emulateJSON:true,
                        checkOnSelect:true,
                        showSummary:false,
                        extendParams:{name:''}
                    },
                    data:[],
                    columns:[
                        { prop:"id",label:"操作",align:'center',width:"94"},
                        { prop:"name",label:"部门名称",minWidth:"110" },
                        { prop:"parentName",label:"上级部门",minWidth:"90" },
                        { prop:"peopleNumber",label:"部门人数",align:'right',minWidth:"50"}                        
                    ]
                }
            }
        },
        methods:{
            tbSelect(selection){
                this.selection=selection;
            },
            search(){
                this.$refs.deptTable.reload();
            },
            edit(data){
                // // console.log(data.parentId)
                this.editWin.opt.title=data?'修改部门':'新增部门';
                this.departmentId = data?data.id:'';
                // 部门名称传送至组件默认显示
                this.name = data?data.name:'';
                // this.$refs.editWin.$nextTick(()=>{
                //   this.$refs.editPage.init();
                // });
                this.editWin.show=true;
                let mydata = data?this.$deepCopy(data):null;
                let se = this.$refs.deptTable.selected;
                //当选择只有一行时，点击新增默认为选中行的上级部门
                // if(se.length == 1 && se[0].parentId){
                //     mydata = {parentId:se[0].parentId, parentName: "", name: ""};
                // }
                if(data != null || data !=undefined){
                    mydata = {parentId:data.parentId, parentName: "", name: "",id:data.id};
                }
                this.$refs.editWin.$nextTick(()=>{
                  this.$refs.editPage.pageInit(mydata);
                })
            },
            remove(row) {
                this.$confirm({msg:"确定删除该部门？",fn:(r)=>{
                  if(r){
                        this.showLoading()
                        this.$http.delete("/web/department/" + row.id).then((re) => {
                          if (re.ok == true) {
                            this.$message({ msg: "删除成功！", type: "success",duration:1000 });
                            // this.table.data.splice(index,1);
                            // this.$arrayRemove(this.table.data,row)

                            this.$refs.deptTable.reload();
                            this.$refs.editWin.$nextTick(()=>{
                              this.$refs.editPage.$refs.deptTree.reload();
                            })
                          } else {
                            this.$message({ msg: re.message, type: "error" });
                          }
                        }).catch((err) => {
                          this.$message({ msg: "服务器繁忙，请稍后再试！", type: "error" });
                        });
                      }
                }});

            },
            setMember(){
                this.memberWin.show=true;
                this.$refs.memberWin.$nextTick(()=>{
                    this.$refs.memberPage.pageInit(this.selection[0].id);
                })
            }
        }
    }
</script>  
