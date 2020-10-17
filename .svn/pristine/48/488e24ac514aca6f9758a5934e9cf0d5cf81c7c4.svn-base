<style scoped>
	.el-left{
		padding-left:30px !important;
		box-sizing:border-box;
	}
	.user_msg{
		text-align: center;
	}
	.user_msg .user_img{
		width:150px;
		height: 150px;
		overflow: hidden;
		border-radius:50%;
		margin:0 auto;
	}
	.user_msg .user_img img{
		width:100%;
	}
	.username{
		text-align: center;
		font-size:16px;
		line-height:30px;
		margin-top:10px;
		color:#333;
	}
	.box{
		margin-top:30px;
		padding-bottom:30px;
	}
	.btn{
		margin-top:10px;
	}
</style>

<template>
	<div class="page_box">
		<div class="el-top fff">
			<div class="top_tit">个人信息</div>
		</div>

		<div class="main fff">
			<el-row :gutter="20" class="box">
				<el-col :span="5" class="el-left">
					<div class="user_msg">
						<div class="user_img">
							<img v-if="form.data.headerImgId" :src="imgPrefix+form.data.headerImgId" alt="">
							<img v-else :src="require('@/assets/images/defaultHeader.png')" alt="">
						</div>
						<el-button class="fant-btn-secondary btn" @click="uploadShow=true">更换头像</el-button>
					</div>
				</el-col>
				<el-col :span="7">
					<fant-form :opt="form.opt" :model="form.data" ref="form" v-enter>
						<fant-form-item :opt="{label:'姓名：',prop:'name'}">
							<el-input v-model="form.data.name"></el-input>	
						</fant-form-item>
						<!-- <fant-form-item :opt="{label:'性别：'}">
							<el-radio-group v-model="form.data.sex">
								<el-radio label="MAN">男</el-radio>
								<el-radio label="LADY">女</el-radio>
							</el-radio-group>
						</fant-form-item> -->
						<fant-form-item :opt="{label:'手机号：'}">
							<el-input  disabled v-model="form.data.tel"></el-input>	
						</fant-form-item>
						
						<fant-form-item>
							<el-button class="fant-btn-primary" @click="changeMessage">更新信息</el-button>	
						</fant-form-item>	
					</fant-form>
				</el-col>
			</el-row>
		</div>
		
		<avatar-upload
            @crop-upload-success="cropUploadSuccess"
            v-model="uploadShow"
            :width="640"
            :height="640"
            :url="url"
            img-format="png">
        </avatar-upload>
	</div>
</template>

<script>
	import axios from 'axios';
	import valid from '@/lib/fant-validate.js';
	import avatarUpload from '@/components/ImageCropper';
	export default{
		components:{
            avatarUpload
        },
		data(){
			return{
				imgPrefix:'/api/web/user/file/',
				url:"/web/user/file/base64/img_"+new Date().format('yyyyMMddhhmmss')+'.png',
				uploadShow:false,
				current:{},
				form:{
					data:{
						name:"",
						id:"",
						headerImgId:'',
						idCard:'',
						tel:null
					},
					opt:{
						labelWidth:"80px",
						rules:{
							name:[
								{required:true,message:'姓名不能为空',trigger:'change'},
								{required:true,min:0,max:20,message:'姓名不能超过20个字符',trigger:'change'}
							]
						}
					}
				}
			}
		},
		mounted(){
			this.current=JSON.parse(sessionStorage.getItem('current'));
			this.getMsg();
		},
		methods:{
			getMsg(){
				this.showLoading()
				axios.all([
					this.$http.get('/web/user/current'),
					this.$http.get(`/web/user`)
				]).then(axios.spread((acct, perms)=>{
					let msg=Object.assign({},perms.data,acct.data);
					this.form.data=msg;
				}))
			},
			changeMessage(){
				this.$refs.form.validate(valid=>{
					if(valid){
						this.showLoading()
						axios.all([
							this.$http.put('/web/user',this.form.data)
						]).then(axios.spread((acct, perms)=>{
							this.getMsg();
							this.$message({
								msg:'更新成功',
								type:'success'
							})
							this.current.headerImgId=this.form.data.headerImgId;
							this.current.name=this.form.data.name;
							sessionStorage.setItem('current',JSON.stringify(this.current));
							// this.$bus.$emit('changeCurrentMsg',this.current);
							this.$store.dispatch("setUser",this.current)
						}))
					}
				})
				

				// this.customReq('put','/web/user',this.form.data,res=>{
				// 	this.getMsg();
				// 	this.$message({
				// 		msg:'更新成功',
				// 		type:'success'
				// 	})
				// 	this.current.headerImgId=this.form.data.headerImgId;
				// 	this.current.name=this.form.data.name;
				// 	sessionStorage.setItem('current',JSON.stringify(this.current));
				// 	this.$bus.$emit('changeCurrentMsg',this.current);
				// 	this.$store.dispatch("setUser",this.current)
				// })
			},
            cropUploadSuccess(res, field){
            	this.form.data.headerImgId=res;
            }
		}
	}
</script>