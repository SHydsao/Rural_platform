<style scoped>
#loginBox {
    height: 100%;
    background: url(~assets/images/login_bg.jpg) no-repeat center center;
    background-size: cover;
    min-height:600px;
}
.container {
    height: 100%;
    position: relative;
}
.container .support {
    position: absolute;
    text-align: center;
    color: #999;
    font-size: 14px;
    display: block;
    width: 100%;
    bottom: 15px;
    left: 0;
}
.container .support a {
    color: #999;
    font-size: 12px;
    text-decoration: none;
}
.top {
    padding-top: 20vh;
}
.top .text {
    font-size: 32px;
    color: #fff;
    text-align: center;
}
.top .text span {
    display: inline-block;
    vertical-align: middle;
}
.top .text img {
    /* max-height: 50px; */
    display: inline-block;
    vertical-align: middle;
}
.login_box {
    background: #fff;
    padding: 40px 50px 35px 50px;
    /* padding: 50px 50px 5px 50px;
   */
    border-radius: 5px;
    width: 470px;
    box-sizing: border-box;
    margin: 20px auto;
    box-shadow: 0 0 4px 4px rgba(152, 152, 152, 0.4);
}
.font {
    font-size: 22px;
    color: #828282;
    line-height: 40px;
}
.inputItem {
    display: block;
    /*margin-top:15px;*/
}
.btn_text {
    font-size: 14px;
    color: #c2c5ce;
    margin-bottom: 13px;
    position: relative;
    height: 20px;
}
.remember-mine {
    color: #c2c5ce;
    position: absolute;
    margin: auto;
    left: 0;
    bottom: 0;
    top: 0;
    padding: 0;
}
.forget-password {
    color: #c2c5ce;
    position: absolute;
    margin: auto;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0;
}
.btn_text >>> .el-button--text:hover {
    color: #2a82db;
}
.btn_text >>> .el-checkbox__inner {
    border: 1px solid #c2c5ce;
}
.btn_text >>> .is-checked .el-checkbox__inner {
    border: 1px solid #409eff;
}

#submitForm {
    font-size: 20px;
    color: #fff;
}
#submitForm sub {
    font-size: 14px;
    vertical-align: bottom;
}
.fant-btn-primary {
    height: 44px;
    background: #4e7add;
}
.tip {
    text-align: center;
    font-size: 12px;
    color: #747474;
    margin-top: 22px;
}
.login_box >>> .el-icon-fant-people,
.login_box >>> .el-icon-fant-unlock {
    font-size: 20px;
}
</style>
<template>
    <div id="loginBox">
        <div class="container">
            <div class="top">
                <div class="text">
                    <span>蠢材科技单体架构</span>
                </div>
                <div class="login_box">
                    <fant-form :model="fdata" ref="loginForm" v-enter :opt="formOpt">
                        <fant-form-item :opt="{prop:'code'}" class="inputItem">
                            <el-input
                                placeholder="请输入用户名"
                                clearable
                                size="medium"
                                id="userCode"
                                v-model="fdata.code"
                                name="code"
                                prefix-icon="el-icon-fant-people"
                            ></el-input>
                        </fant-form-item>
                        <fant-form-item :opt="{prop:'pwd'}" class="inputItem">
                            <el-input
                                placeholder="请输入密码"
                                size="medium"
                                :type="passwordType"
                                v-enter="{btn:'#submitForm'}"
                                v-model="fdata.pwd"
                                name="pwd"
                                prefix-icon="el-icon-fant-unlock"
                            >
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
                    </fant-form>
                    <div class="btn_box">
                        <div class="btn_text">
                            <el-checkbox class="remember-mine" v-model="rememberMe">记住我</el-checkbox>
                            <!-- <el-button class="forget-password" type="text" @click="forgetPw">忘记密码</el-button> -->
                        </div>
                        <el-button
                            id="submitForm"
                            class="fant-btn-primary"
                            size="large"
                            style="width:100%"
                            :loading="loading"
                            @click="submit"
                        >
                            登录
                        </el-button>
                        <!-- <div class="tip">还没有账号吗？请联系:400-123-456</div> -->
                    </div>
                </div>
            </div>
            <div class="support">
               <p>技术支持单位：佛山市蠢材科技有限公司</p>
            </div>
        </div>
    </div>
</template>

<script>
import {initialization} from '@/lib/login.js';
import { encrypt, decrypt } from "@/utils/crypto.js";
import qs from "qs";
export default {
    data() {
        return {
            activeName: "first",
            validImg: "",
            fdata: {
                code: "",
                pwd: ""
            },
            rememberMe: false,
            loading: false,
            formOpt: {
                labelWidth: "0px",
                rules: {
                    code: [
                        {
                            required: true,
                            message: "请输入账号名",
                            trigger: "change"
                        }
                    ],
                    pwd: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "change"
                        }
                    ]
                }
            },
            validCode: "",
            passwordType: "password"
        };
    },
    methods: {
        submit(e) {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$http
                        .post("login", qs.stringify(this.fdata))
                        .then(res => {
                            if (res.ok) {
                                //判断复选框是否被勾选
                                if (this.rememberMe) {
                                    //传入账号名，密码
                                    localStorage.setItem(
                                        "rememberMe",
                                        JSON.stringify({
                                            code: encrypt(this.fdata.code),
                                            pwd: encrypt(this.fdata.pwd)
                                        })
                                    );
                                } else {
                                    //清空Cookie
                                    localStorage.removeItem("rememberMe");
                                }
                                this.$http
                                    .get("/web/user/current")
                                    .then(result => {
                                        if (result.ok) {
                                            this.current = result.data;
                                            // if (!result.data.headerImgId) {
                                            //     result.data.headerImgId ="b9e14aab-045e-4a00-a98b-31f97c035e12";
                                            // }
                                            //存储current呢称和头像
                                            window.sessionStorage.setItem(
                                                "current",
                                                JSON.stringify(result.data)
                                            );
                                            
                                            //存储用户id
                                            this.$store.dispatch(
                                                "login",
                                                result.data.id
                                            );
                                            //跳转到首页
                                            initialization(this,this.$store,this.$router);
                                            this.$router.push("/index")
                                            // location.href =
                                            //     "/admin/index.html?now="+new Date().getTime()+"/#/index/web.dept";
                                            // //解决IE11无法跳转
                                            // window.event.returnValue = false;
                                        } else {
                                            this.loading = false;
                                            this.$message({
                                                msg: result.message,
                                                type: "error"
                                            });
                                        }
                                    });
                                    
                            } else {
                                this.loading = false;
                                this.$message({
                                    msg: res.message,
                                    type: "error"
                                });
                                this.$getEl("#userCode").focus();
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        forgetPw() {
            this.$router.push("/retrievePassword");
        },
        signUp() {
            this.$router.push("/register");
        }
    },
    created() {
        if (localStorage.getItem("rememberMe")) {
            try {
                let item = JSON.parse(localStorage.getItem("rememberMe"));
                this.fdata.code = decrypt(item.code);
                this.fdata.pwd = decrypt(item.pwd);
                this.rememberMe = true;
            } catch (err) {}
        }
        sessionStorage.clear();
        this.$store.commit("clear_all");
    }
};
</script>
