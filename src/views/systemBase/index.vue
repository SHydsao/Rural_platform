<style scoped>
.loading-win>>>.el-dialog__header{display: none}
.loading-win>>>.el-dialog__footer{display: none}
.loading-win>>>.el-dialog__body{height:100px;}
.loading-win>>>.el-dialog--center .el-dialog__body{border-radius: 10px!important;}
.loading-win>>>.el-dialog{border-radius: 10px!important;}
</style>


<template>
    <div
        class="layout"
        id="indexBox"
        element-loading-text="拼命加载中"  v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="height:100%;"
    >
        <el-container class="top_box" style="height:100%;">
            <fant-header :current="current" @changePassword="changePassword"></fant-header>
            <el-container style="min-height:540px;height:calc(100% - 60px);background:#EBEEF3">
                <fant-menu :menu="menu"></fant-menu>
                <el-main style="padding:0" v-loading="innerloading" element-loading-text="加载中...">
					<!-- <keep-alive> -->
						<router-view class="router" ref="router"></router-view>
					<!-- </keep-alive>                    -->
                </el-main>
            </el-container>
        </el-container>
		<win :show.sync="winShow" :opt="winOpt" ref="passWin">
            <div class="win-wrap">
                <div class="content-wrap">
                    <fant-form :model="form.data" :opt="form.opt" ref="passwordForm" v-enter>
                        <fant-form-item :opt="{label:'原始密码：',prop:'oldPassword'}" class="w100">
                            <el-input :type="passwordType" placeholder="请输入密码" v-model="form.data.oldPassword">
                                <span slot="suffix">
                                    <el-button
                                        type="text"
                                        :class="{'el-icon-fant-browse':passwordType=='password', 'el-icon-fant-browse_fill':passwordType=='text'}"
                                        @click="passwordType=passwordType=='password'?'text':'password'"
                                        style="font-size:18px;"
                                    ></el-button>
                                </span>
                            </el-input>
                        </fant-form-item>
                        <fant-form-item :opt="{label:'新密码：',prop:'password'}" class="w100">
                            <el-input :type="passwordType2"  placeholder="请输入新密码"   v-model="form.data.password" @input="valid">
                                <span slot="suffix">
                                    <el-button
                                        type="text"
                                        :class="{'el-icon-fant-browse':passwordType2=='password', 'el-icon-fant-browse_fill':passwordType2=='text'}"
                                        @click="passwordType2=passwordType2=='password'?'text':'password'"
                                        style="font-size:18px;"
                                    ></el-button>
                                </span>
                            </el-input>
                        </fant-form-item>
                        <fant-form-item :opt="{label:'确认密码：',prop:'validPassword'}" class="w100" >
                            <el-input :type="passwordType3" placeholder="请输入确认密码"  v-model="form.data.validPassword">
                                <span slot="suffix">
                                    <el-button
                                        type="text"
                                        :class="{'el-icon-fant-browse':passwordType3=='password', 'el-icon-fant-browse_fill':passwordType3=='text'}"
                                        @click="passwordType3=passwordType3=='password'?'text':'password'"
                                        style="font-size:18px;"
                                    ></el-button>
                                </span>
                            </el-input>
                        </fant-form-item>
                    </fant-form>
                </div>
				<div class="action">
					<el-button class="fant-btn-secondary" @click="savePwd">保存</el-button>
					<el-button class="fant-btn-third" @click="winShow=false">关闭</el-button>
				</div>
            </div>
        </win>
    </div>
</template>
<script>
import Vue from "vue";
import validate from '@/lib/fant-validate';
import fantMenu from "@/views/layout/menu";
import fantHeader from "@/views/layout/header";
export default {
    name:'index',
    components: {
        fantMenu,
        fantHeader
    },
    data() {
		var validatePass = (rule, value, callback) => {
            if (value !== this.form.data.password) {
                callback(new Error('两次输入密码不一致!'));
            } else{
                callback();
            }
        };
        return {
            passwordType:'password',
            passwordType2:'password',
            passwordType3:'password',
			winShow:false,
            winOpt:{
                title:'修改密码',
                width:'460px'
            },
            loading: false,
            current: {
                name: "admin",
                headerImgId: "b9e14aab-045e-4a00-a98b-31f97c035e12"
			},
			form:{
                opt:{
					labelWidth:'80px',
                    rules:{
                        oldPassword:[
                            { required: true,message: '请输入原始密码',validator:validate.notEmpty,trigger: 'change' }
                        ],
                        password:[
                            { required: true,message: '新密码不能为空',validator:validate.notEmpty,trigger: 'change' }
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
        };
    },
    computed: {
        innerloading(){
            return this.$bus.loading
        },
        menu() {
            let menu = this.$deepCopy(this.$store.state.menu.menuTree);
            return menu;
        }
    },
    mounted() {
        // this.loading =false;
        this.$bus.$on('changeCurrentMsg',msg=>{
            this.current=msg;
        });
        if (window.sessionStorage.getItem("current")) {
            this.current = JSON.parse(window.sessionStorage.getItem("current"));
        } 
        // else {
        //     
        // this.showLoading()
        // this.$http.get("/web/user/current").then(result => {
        //         if (result.ok) {
        //             this.current = result.data;
        //             if (!result.data.headerImgId) {
        //                 result.data.headerImgId ="b9e14aab-045e-4a00-a98b-31f97c035e12";
        //             }
        //             window.sessionStorage.setItem("current",JSON.stringify(result.data));
        //         } else {
        //             this.$message({ msg: result.message, type: "error" });
        //         }
        //     });
		// }
		// this.loading =true;
    },
    methods: {
        valid(){
            this.$refs.passwordForm.validate(valid=>{

            })
        },
		changePassword(){
			this.winShow=true;
			this.$nextTick(()=>{
				this.$refs.passwordForm.resetFields();
			})			
		},
        tabOpen: function(title, url, param, parentTitle, otherTab) {
            this.$router.push({ path: url, query: param });
		},
		savePwd(){
			this.$refs.passwordForm.validate(valid=>{
				if(valid){
					this.$ajax({
						url:'/web/user/change/password?oldPassword='+this.form.data.oldPassword+'&password='+this.form.data.password+'&validPassword='+this.form.data.validPassword+'',
						method:'post',
						emulateJSON:false,
						success:(re)=>{
							if(re.ok){
                                this.winShow=false;
								this.$message({msg:'保存成功！',type:'success',duration:1000});
                                this.$refs.form.resetFields();                                
							}else this.$message({msg:re.message,type:'error'})
						}
					})
				}
			})
		}
    }
};
</script>

<style scoped>
.layout {
    min-width: 1280px;
}
.top_box {
    flex-wrap: wrap;
}
</style>
