<template>
    <div class="win-wrap">
        <div class="content-wrap">
            <fant-form ref="resourceForm" class="fant-form-couple" :model="resource.data" :opt="resource.opt">
                <el-form-item label="编码：" prop="code">
                    <el-input v-model="resource.data.code" class="input-item" placeholder="请输入编码"></el-input>
                </el-form-item>
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="resource.data.name" class="input-item" placeholder="请输入名称"></el-input>
                </el-form-item>                
                <el-form-item label="类型：">
                    <fant-select :data="typeData" :opt="{textField:'text',width:'100%',idField:'value',prompt:'请输入类型'}" v-model="resource.data.type"></fant-select>
                </el-form-item>
                <el-form-item label="链接：" prop="url">
                    <el-input v-model="resource.data.url" class="input-item" placeholder="请输入链接"></el-input>
                </el-form-item>
                <el-form-item label="图标：">
                    <el-input v-model="resource.data.icon" class="input-item" placeholder="请输入图标名称"></el-input>
                </el-form-item>
                <el-form-item label="排序号：" prop="ordered">
                    <el-input v-model="resource.data.ordered" class="input-item" placeholder="请输入排序号"></el-input>
                </el-form-item>
            </fant-form>    
        </div>
        <el-row class="action">
            <!-- <el-button class="fant-btn-primary2 reset-btn" @click="reset">重置</el-button> -->
            <el-button :disabled="disableSave" class="fant-btn-secondary" @click="winSave">保存</el-button>
            <el-button class="fant-btn-third" @click="close">关闭</el-button>
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
                {value:'web',text:'网页'},
                {value:'wechat',text:'微信'},
                {value:'app',text:'app'},
                {value:'api',text:'api'},
                {value:'widget',text:'小组件'}
            ],
            resource:{
                oldData:{code:'',name:'',level:1},
                data:{code:'',name:'',level:1},
                opt:{
                    labelWidth:'80px',
                    rules:{
                        code:[{required:true,validator:valid.notEmpty,message: "编码不能为空",trigger:'change'},{required:true,max:50,message:"编码不能超过50个字符",trigger:'change'}],
                        name:[{required:true,validator:valid.notEmpty,message: "名称不能为空",trigger:'change'},{required:true,max:50,message:"资源名不能超过50个字符",trigger:'change'}],
                        ordered:[
                        {required: true,validator: valid.notEmpty,message: "排序号不能为空",trigger: "change"},
                        {validator:this.roundNumber,trigger:'change'},
                        // {validator:this.nonentity,trigger:'change'}
                        ]
                      
                    }
                }
            },  
            disableSave:false,
            parentList:[],
        }
    },
    methods:{
        nonentity:function(rule, value, callback){
            // debugger
            if (this.parentList.indexOf(Number(value))!=-1) {
                callback(new Error('同一级下排序号不能重复'));
            } else {
                callback();
            }
        },
        roundNumber:function(rule, value, callback){
            value = value || '';
            var valid = (/^\d*$/).test(value);
            if (!valid || !(value>=0&&value<1000)) {
                callback(new Error('请输入0-1000整数'));
            } else {
                callback();
            }
        },
        init(data){
            this.disableSave=false;
            this.$refs.resourceForm.resetFields();
            this.resource.data = data.id?data:this.$assign(data,{code:'',name:'',level:1,type:'web',ordered:''});
            this.resource.oldData = this.$deepCopy(this.resource.data);
        },
        reset(){
            this.$refs.resourceForm.resetFields();
            this.resource.data = this.$deepCopy(this.resource.oldData);
        },
        close(){
            this.parent.resourceWin.show=false;
        },
        winSave(){
            let beValid=true;
            this.$refs.resourceForm.validate((valid)=>{
                if(!valid) beValid=valid;
            });
            if(!beValid) return;
            this.disableSave=true;
            var id = this.resource.data.id;
            var url='/admin/resource',method='post';
            if(id) url='/admin/resource/'+id,method='put';
            // // console.log(url,this.resource.data)
            this.$http[method](url,this.resource.data).then((re)=>{
                // // console.log(re)
                if(re.ok){
                    this.$message({showClose:true,message:'保存成功',type:'success',duration:1000,onClose:()=>{
                            this.close();
                            this.parent.$refs.aaa.reload();
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
