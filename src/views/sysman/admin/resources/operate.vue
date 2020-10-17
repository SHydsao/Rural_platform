<template>
    <div class="win-wrap">
        <div class="content-wrap">
            <fant-form ref="operateEditWin" class="fant-form-couple" :model="operateEditWin.data" :opt="operateEditWin.opt">
                <fant-form-item :opt="{label:'编码：' ,prop : 'code'}"> 
                    <el-input v-model="operateEditWin.data.code" class="input-item" placeholder="请输入编码"></el-input>
                </fant-form-item>
                 <fant-form-item :opt="{label:'名称：',prop :'name'}">
                    <el-input v-model="operateEditWin.data.name" class="input-item" placeholder="请输入名称"></el-input>
                </fant-form-item>       
             
                 <fant-form-item :opt="{label:'url：',prop:'url'}">
                    <el-input v-model="operateEditWin.data.url" class="input-item" placeholder="请输入url"></el-input>
                 </fant-form-item>
                 <fant-form-item :opt="{label:'方法：',prop:'method'}">
                    <el-select v-model="operateEditWin.data.method" placeholder="请选择" style="width:200px;">
                        <el-option key="GET" label="GET" value="GET"/>
                        <el-option key="POST" label="POST" value="POST"/>
                        <el-option key="PUT" label="PUT" value="PUT"/>
                        <el-option key="PATCH" label="PATCH" value="PATCH"/>
                        <el-option key="DELETE" label="DELETE" value="DELETE"/>
                        <el-option key="ALL" label="ALL" value="ALL"/>
                    </el-select>
                    
                 </fant-form-item>
            </fant-form>    
        </div>
        <el-row class="action">
            <el-button class="fant-btn-primary2 reset-btn" @click="reset">重置</el-button>
            <el-button :disabled="disableSave" class="fant-btn-primary" @click="winSave">保存</el-button>
            <el-button class="fant-btn-primary2" @click="close">关闭</el-button>
        </el-row>
    </div>

    
</template>




<script>
import valid from '@/lib/fant-validate';
export default {
    props:{parent:Object},
    data(){
        return {
            typeData:[
                {value:'web',text:'web'},
                {value:'wechat',text:'wechat'},
                {value:'app',text:'app'},
                {value:'api',text:'api'}
            ],
            operateEditWin:{
                oldData:{code:'',name:'',level:1},
                data:{code:'',name:'',level:1},
                opt:{
                    labelWidth:'80px',
                    rules:{
                        code:[{required:true,validator:valid.notEmpty, trigger:'change'},{max:50,message:"编码不能超过50个字符",trigger:'change'}],
                        name:[{required:true,validator:valid.notEmpty, trigger:'change'},{max:50,message:"资源名不能超过50个字符",trigger:'change'}],
                        ordered:{min:0,max:1000,type:'number',message:'请限制在0-1000以内', trigger:'change'}
                    }
                }
            },  
            disableSave:false
        }
    },
    methods:{
        init(data){
            this.disableSave=false;
            this.$refs.operateEditWin.resetFields();
            this.operateEditWin.data = data.id?data:this.$assign(data,{code:'',name:'',level:1,type:'web'});
            this.operateEditWin.oldData = this.$deepCopy(this.operateEditWin.data);
        },
        reset(){
            this.$refs.operateEditWin.resetFields();
            this.operateEditWin.data = this.$deepCopy(this.operateEditWin.oldData);
        },
        close(){
            this.parent.operateEditWin.show=false;
        },
        winSave(){
            let beValid=true;
            this.$refs.operateEditWin.validate((valid)=>{
                if(!valid) beValid=valid;
            });
            if(!beValid) return;
            this.disableSave=true;
            var id = this.operateEditWin.data.id;
            // var url='/admin/operation',method='post';
            var url = '/admin/operation/'+id,method='put';
            // if(id) url='/admin/operation/'+id,method='put';
            this.$http[method](url,this.operateEditWin.data).then((re)=>{
                if(re.ok){
                    this.$message({showClose:true,message:'保存成功',type:'success',duration:1000,onClose:()=>{
                            this.close();
                            this.parent.$refs.resTable.reload();
                        }});
                } else {
                    this.$message({showClose: true,message: re.message,duration:3000,type:"error"});
                    this.disableSave=false;
                }
            })
        }
    }
}
</script>

<style>

</style>
