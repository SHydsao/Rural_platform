<style scoped>
	.el-left{
		padding-left:30px !important;
		box-sizing:border-box;
	}
	.box{
		margin-top:30px;
		padding-bottom:30px;
	}
</style>

<template>
	<div class="page_box">
		<div class="el-top fff">
			<div class="top_tit">修改密码</div>
		</div>
		<div class="main fff">
			<fant-form :model="form.data" :opt="form.opt" ref="form" v-enter>
				<fant-form-item :opt="{label:'原始密码：',prop:'oldPassword'}">
					<el-input type="password" placeholder="请输入密码" v-model="form.data.oldPassword" class="big"></el-input>
				</fant-form-item>
				<fant-form-item :opt="{label:'新密码：',prop:'password'}" >
					<el-input type="password"  placeholder="请输入新密码" v-model="form.data.password" class="big"></el-input>
				</fant-form-item>
				<fant-form-item :opt="{label:'确认密码：',prop:'validPassword'}"  >
					<el-input type="password" placeholder="请输入确认密码" v-model="form.data.validPassword" class="big"></el-input>
				</fant-form-item>
				<fant-form-item>
					<el-button class="fant-btn-primary" @click="savePwd">保存修改</el-button>
				</fant-form-item>	
			</fant-form>
		</div>
	</div>
</template>

<script>
	import validate from '@/lib/fant-validate';
	export default{
		data(){
			var validatePass = (rule, value, callback) => {
	            if (this.form.data.validPassword !== this.form.data.password) {
	                callback(new Error('两次输入密码不一致!'));
	            } else{
					callback();
				}
	        };
			return{
				form:{
					opt:{
						rules:{
		                    oldPassword:[
								{ required: true,message: '请输入原始密码',validator:validate.notEmpty,trigger: 'change' }
							],
		                    password:[
								{ required: true,message: '新密码不能为空',validator:validate.notEmpty,trigger: 'change' },
								{ validator: validatePass , trigger: 'change' }
							],
		                    validPassword: [
		                        { required: true, message: '请重新输入密码', trigger: 'change' },
		                        { validator: validatePass , trigger: 'change' }
		                    ]
		                }
					},
					data:{
						oldPassword:'',
						password:'',
						validPassword:''
					}
				}
				
			}
		},
		methods:{
			savePwd(){
				this.$refs.form.validate(valid=>{
					if(valid){
						this.$ajax({
							url:'/web/user/change/password?oldPassword='+this.form.data.oldPassword+'&password='+this.form.data.password+'&validPassword='+this.form.data.validPassword+'',
							method:'post',
							emulateJSON:false,
							success:(re)=>{
								if(re.ok){
									this.$message({msg:'保存成功！',type:'success',duration:1000});
									this.$refs.form.resetFields();
								}else this.$message({msg:re.message,type:'error'})
							}
						})
					}
				})
			}
		}
	}
</script>