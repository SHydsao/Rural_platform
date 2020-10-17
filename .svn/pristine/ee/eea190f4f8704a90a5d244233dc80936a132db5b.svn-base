<style scoped>
  #registerBox{
    width:100%;
    height:100%;
    min-width:800px;
  }
  .header{
    background:url(~assets/images/register.jpeg) top center no-repeat;
    background-size:100%;
    height:100px !important;
  }
  .successInfo{
   font-size:26px;
    color:#228B22;
  }
</style>
<template>
  <div id="registerBox">
    <el-container>
      <el-header class="header"></el-header>
      <el-main>
        <div>
          <el-row style="margin-top:30px;">
            <el-steps :active="step" align-center>
              <el-step title="步骤1" description="填写注册信息"></el-step>
              <el-step title="步骤2" description="注册成功！"></el-step>
            </el-steps>
          </el-row>
          <el-row style="margin-top:30px;text-align:center;" v-show="step == 1">
            <el-col span="6">
              &nbsp;
            </el-col>
            <el-col span="12">
            <fant-form :model="fdata" :opt="formOpt" ref="registerForm" id="registerForm" v-enter style="width:90%;">
              <fant-form-item :opt="{prop:'orgName',label:'企业名称'}" class="inputItem">
                <el-input placeholder="请输入企业名称" id="orgName" v-model="fdata.orgName" name="orgName"></el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'orgCode',label:'组织机构代码'}" class="inputItem">
                <el-input placeholder="请输入组织机构代码" id="orgCode" v-model="fdata.orgCode" name="orgCode"></el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'contact',label:'联系人'}" class="inputItem">
                <el-input placeholder="请输入联系人" id="contact" v-model="fdata.contact" name="contact"></el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'username',label:'用户名'}" class="inputItem">
                <el-input placeholder="请输入用户账号" id="userCode" v-model="fdata.username" name="username"></el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'password',label:'密码'}" class="inputItem">
                <el-input placeholder="请输入密码" type="password" id="password"   show-password  v-model="fdata.password" name="password"></el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'confirmPassword',label:'确认密码'}" class="inputItem">
                <el-input placeholder="请重新输入密码" type="password" id="confirmPassword" v-model="fdata.confirmPassword" name="confirmPassword"></el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'email',label:'邮箱'}" class="inputItem">
                <el-input placeholder="请输入邮箱" id="email" name="email" v-model="fdata.email">
                </el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'address',label:'所在地'}" class="inputItem">
                <el-input placeholder="请输入所在地" id="address" name="address" v-model="fdata.address">
                </el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'businessType',label:'行业类型'}" class="inputItem">
                <el-input placeholder="请输入行业类型" id="businessType" name="businessType" v-model="fdata.businessType">
                </el-input>
              </fant-form-item>
              <fant-form-item :opt="{prop:'terms'}" class="inputItem">
                <el-checkbox id="terms" name="terms" v-model="fdata.terms" style="float:left;">
                  我已认真阅读《服务条款》
                </el-checkbox>
              </fant-form-item>
              <div class="btnBox">
                <el-button id="submitForm" type="primary" style="width:100%;margin-left:0;" @click="submit">注册</el-button>
              </div>
            </fant-form>
            </el-col>
            <el-col span="6">
              &nbsp;
            </el-col>
          </el-row>
          <el-row v-show="step == 2" style="margin:10% 0;text-align:center;">
            <i class="el-icon-fant-success_fill successInfo">恭喜你，{{fdata.username}}注册成功</i>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import valid from '@/lib/fant-validate';
  export default {
    data () {
      var confirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.fdata.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        step:1,
        fdata:{
          orgName:"",orgCode:"",contact:"",username:"",password:"",confirmPassword:"",email:"",address:"",bussinessType:""
        },
        formOpt: {
          rules: {
            orgName: [
              {required: true, message: '请输入企业名称', trigger: 'change'}
            ],
            orgCode: [
              {required: true, message: '请输入企业组织机构码', trigger: 'change'}
            ],
            contact: [
              {required: true, message: '请输入联系人', trigger: 'change'}
            ],
            username: [
              {required: true, message: '请输入账号名', trigger: 'change'}
            ],
            password: [
              {required: true, message: '请输入密码', trigger: 'change'}
            ],
            confirmPassword: [
              {required: true, message: '请重新输入密码', trigger: 'change'},
              {validator: confirmPass, trigger: 'change'},
            ],
            email: [
              {required: true, message: '请输入邮箱', trigger: 'change'},
              {validator: valid.email, trigger: 'change'},
            ],
          }
        }
      }
    },
    methods:{
      submit(e){
        var vm = this;
        this.$refs["registerForm"].$children[0].validate(function(valid){
          if (valid) {
            //Todo:ajax
//            this.step = 2;
          } else {
            return false;
          }
        });
      }
  },
  mounted:function(){
        // console.log(21321)
  }
  }
</script>
