<template>
    <div class="win-wrap">
        <div class="content-wrap">
            <fant-form ref="editform" :model="editData" :opt="formOpt" v-enter>
                <fant-form-item :opt="{label:'部门：',prop:'departmentIds'}" >
                    <treebox ref="deptTree" v-model="editData.departmentIds" :opt="treeOpt" >
                        <div slot="action">
                            <el-button type="text" size="mini" class="el-icon-fant-close" @click="closeTree">关闭</el-button>
                        </div>
                    </treebox>
                </fant-form-item>
                <fant-form-item v-if="!editData.id" :opt="{label:'手机号码：',prop:'phone'}" >
                    <el-input v-model="editData.phone" placeHolder="请输入手机号码"></el-input>
                </fant-form-item>
                <fant-form-item :opt="{label:'姓名：',prop:'name'}" >
                    <el-input v-model="editData.name" placeHolder="请输入姓名"></el-input>
                </fant-form-item>
                <fant-form-item :opt="{label:'职位：',prop:'position'}" >
                    <el-input v-model="editData.position" placeHolder="请输入职位"></el-input>
                </fant-form-item>
            </fant-form>
        </div>  
        <div class="action">
            <!-- <el-button class="reset-btn fant-btn-primary2" @click="reset">重置</el-button> -->
            <el-button size="small" class="fant-btn-secondary" @click="submitForm">保存</el-button>
            <el-button size="small" class="fant-btn-third" @click="parent.editWin.show=false">关闭</el-button>
        </div>
    </div>
</template>
 
<script>
import valid from '@/lib/fant-validate';
export default {
    props:{
        parent:{type:Object},
        transmit:{type:Object}
    },
    data(){
        return {
            editData:{code:'',name:'',phone:'',state: "OFF",allowLogin:false,departmentIds:[]},
            formData:{},
            treeOpt:{
                placeholder:"请选择部门",
                url:"/web/department/getTree",
                defaultExpandAll:true,
                multiple:true,
                nodeKey:"id",
                panelWidth:300,
                width:'300px',
                dataProp:{data:"data"},
                props:{children: 'children', label: 'name'}
            },
            formOpt: {
                labelWidth: "80px",
                rules:{
                    code:[{required: true,validator:valid.notEmpty,trigger:['change']},{max:50,message:'请限制在50个字符以内',trigger:'change'}],
                    name:[{required: true,validator:valid.notEmpty,trigger:'change'},{max:50,message:'请限制在50个字符以内',trigger:'change'}],
                    position:{max:50,message:'请限制在50个字符以内',trigger:'change'},
                    phone:[{required: true,validator:valid.phone,trigger:'change'}]
                }
            },
            selectData:[
                {value:'true',label:'是'},
                {value:'false',label:'否'}
            ],
            selectOpt:{
                textField:'label',
                idField:'value',
                width:'200px'    
            },
            copyData:{},
        }
    },
    methods:{
        reset(){
            this.editData=this.$deepCopy(this.copyData);
            this.$refs.editform.resetFields();
        },
        init(data){
            this.$refs.editform.resetFields();
            if(!data){
                this.editData={name:'',phone:'',position:'',departmentIds:this.parent.table.opt.extendParams.departmentId};
                this.copyData = this.$deepCopy(this.editData);
            }else {
                let mydata = this.$deepCopy(data);
                mydata.departmentIds=[];
               
                for(let i = 0 ; i < data.departmentVos.length ; i++){
                    mydata.departmentIds.push(data.departmentVos[i].id);
                }
                mydata.departmentIds = mydata.departmentIds.join(',');
                this.editData = mydata;
                this.copyData = this.$deepCopy(this.editData);
            }
        },
        submitForm(){
            var beValid=true;
            this.$refs.editform.validate(valid=>{
                if(!valid) beValid=valid;
            });
            if(!beValid) return;
            let params = this.$deepCopy(this.editData);
            params.departmentIds=this.editData.departmentIds?this.editData.departmentIds.split(','):[];
            if(params.departmentIds.length>0&&params.departmentIds[0]=='') params.departmentIds.splice(0,1);
            var method=params.id?'put':'post';
            var url=params.id?'/web/staff/'+params.id:'/web/staff';
            this.$http[method](url,params).then(re=>{
                if(re.ok){
                    this.$message({msg:"保存成功！",type:"success"});
                    this.parent.editWin.show = false;
                    this.parent.$refs.userTable.reload();
                }else{
                this.$message({msg:re.message,type:"error"});
                }
            }).catch((err)=>{
                this.$message({msg:"服务器繁忙，请稍后再试！",type:"error"});
            });
        },
        closeTree(){
            this.$refs.deptTree.hide();
        }
    }
}
</script>

<style>

</style>
