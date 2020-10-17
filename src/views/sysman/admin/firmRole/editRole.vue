<template>
    <div class="win-wrap">
        <div class="content-wrap">
            <fant-form ref="editForm" :model="editData" :opt="formOpt" >
                <fant-form-item :opt="{label:'角色名称：',prop:'name'}" >
                    <el-input v-model="editData.name" placeHolder="请输入角色名称"></el-input>
                </fant-form-item>
                 <!-- v-if="parent.editWinOpt.title!='企业角色复制'" -->
                <!-- <fant-form-item :opt="{label:'排序号：',prop:'ordered'}" >
                    <el-input v-model="editData.ordered" placeHolder="请输入排序号"></el-input>
                </fant-form-item> -->
                <fant-form-item class="inputItem" :opt="{label:'描述：',prop:'remark'}" >
                    <el-input type="textarea" rows="4" v-model="editData.remark" placeHolder="请输入描述内容" style="width:100%;"></el-input>
                </fant-form-item>
            </fant-form>
        </div>
        <div class="action">
            <el-button class="fant-btn-primary2 reset-btn" @click="reset">重置</el-button>
            <el-button size="small" class="fant-btn-secondary" @click="submit">保存</el-button>
            <el-button size="small" class="fant-btn-third" @click="close">关闭</el-button>
        </div>
    </div>
</template>

<script>
import valid from '@/lib/fant-validate';
export default {
    props:{
        parent:{type:Object}
    },
    data(){
        return{
            initData:{name:'',remark:'',ordered:''},
            editData:{name:'',remark:'',ordered:''},
            formOpt:{
                labelWidth:"80px",
                rules:{
                    name:[{required: true,validator:valid.notEmpty, message: '角色名称不能为空', trigger: 'change'},{max:50,trigger:'change',message:'请限制在50个字符以内'}],
                    // ordered:[{required: true,message: '排序号不能为空', trigger: 'change'},{validator:this.roundNumber,trigger:'change'}],
                    remark:[{max:500,message:'请限制在500个字符以内', trigger:'change'}]
                }
            },
            isCopy:false
        }
    },
    methods:{
        roundNumber:function(rule, value, callback){
				value = value || '';
				var valid = (/^\d*$/).test(value);
				if (!valid || !(value>=0&&value<1000)) {
					callback(new Error('请输入0-1000整数。'));
				} else {
					callback();
				}
			},
        pageInit(data,isCopy){
            this.$refs.editForm.resetFields();
            this.isCopy=isCopy;
            this.editData=data.id?data:{name:'',remark:'',id:'',ordered:''};
            this.initData = this.$deepCopy(this.editData);
        },
        reset(){
            this.editData = this.$deepCopy(this.initData);
            this.$refs.editForm.resetFields();            
        },
        submit(){
            let beValid=true;
            this.$refs.editForm.validate(vaild=>{
                if(!vaild) beValid=false;
            });
            if(!beValid) return;
            if(this.isCopy&&typeof this.parent.copySave=='function'){
                this.parent.copySave(this.editData);
                return;   
            }else{
                let method = this.editData.id?'put':'post';

                let url = this.editData.id?'/web/role/'+this.editData.id:'/web/role';
                console.log(this.editData)
                this.$http[method](url,this.editData).then((re)=>{
                    if(re.ok){
                        this.$message({msg:"保存成功！",type:"success"});
                        this.parent.editShow = false;
                        this.parent.$refs.roleTable.reload();
                    }else{
                        this.$message({msg:re.message,type:"error"});
                    }
                }).catch((err)=>{
                    this.$message({msg:err.response.data.message,type:"error"});
                });
            }
        },
        close(){
            this.parent.editShow = false;
        },
    }
}
</script>

<style>

</style>
