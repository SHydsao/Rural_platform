<template>
    <div class="win-wrap">
        <div class="content-wrap">
            <fant-form ref="editForm" class="fant-form-couple" :model="editData" :opt="{labelWidth:'80px',rules:rules}" >
                <fant-form-item :opt="{label:'参数类型：',prop:'type'}" >
                    <el-input clearable disabled v-model="editData.type" class="input-item"></el-input>
                </fant-form-item>
                <fant-form-item :opt="{label:'参数名称：',prop:'key'}" >
                    <el-input clearable disabled v-model="editData.key" class="input-item"></el-input>
                </fant-form-item>
                <fant-form-item :opt="{label:'参数值：',prop:'value'}">
                    <el-input clearable v-model="editData.value" placeHolder="请输入参数值" class="input-item"></el-input>
                </fant-form-item>
                <fant-form-item class="item-other" :opt="{label:'备注：',prop:'remark'}" >
                    <el-input rows="3" type="textarea" clearable v-model="editData.remark" placeHolder="请输入备注"></el-input>
                </fant-form-item>
            </fant-form>
        </div>
        <div class="action">
            <!-- <el-button type="text" size="small" class="reset-btn fant-btn-primary2" @click="reset">重置</el-button> -->
            <el-button size="small" class="fant-btn-primary" @click="save">保存</el-button>
            <el-button class="fant-btn-primary2" size="small" @click="parent.win.show=false">关闭</el-button>
        </div>
    </div>
</template>

<script>
import valid from '@/lib/fant-validate';
import { setTimeout } from 'timers';
export default {
    props:{parent:Object},
    data(){
        return {
            editData:{},
            rules: {
                value:[
                    {validator:valid.notEmpty,trigger:['blur','change'],required:true},
                    {min:1,max:50, message:'请限制50字以内',trigger:['blur','change']}
                ],
            },
        }
    },
    methods:{
        // reset(){
        //     this.editData=this.$assign(this.editData,{value:'',remark:''});
        //     setTimeout(()=>{
        //         this.$refs.editForm.clearValidate('value');
        //     },10);
        // },
        save(){
            this.$refs.editForm.validateField('value',errMsg=>{
                if(errMsg) return;
                this.$http({url:"/web/firmconfig/" + this.editData.id,method:"put",params:this.editData}).then((re) => {
						if(re.ok) {
							this.$message({msg: "保存成功！",type: "success",duration:1000});
                            this.parent.win.show=false;
                            this.parent.$refs.configTable.reload();
						} else this.$message({msg: re.message,type: "error"});
					}).catch((err) => {
						this.$message({msg: "服务器繁忙，请稍后再试！",type: "error"});
					});	
            })
        },
        init(data){
            this.editData=data;
        }
    }
}
</script>

<style>

</style>
