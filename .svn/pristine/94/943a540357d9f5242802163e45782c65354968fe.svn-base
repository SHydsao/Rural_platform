<style scoped>
#forgetPwdBox {
    width: 100%;
    height: 100%;
    min-width: 800px;
}
.header {
    background: url(~assets/images/register.jpeg) top center no-repeat;
    background-size: 100%;
    height: 100px !important;
}
.successInfo {
    font-size: 26px;
    color: #228b22;
}
</style>
<template>
    <div id="forgetPwdBox">
        <el-container>
            <el-header class="header"></el-header>
            <el-main>
                <div>
                    <el-row style="margin-top:30px;">
                        <el-steps :active="step" align-center>
                            <el-step title="步骤1" description="验证手机号码"></el-step>
                            <el-step title="步骤2" description="修改密码"></el-step>
                            <el-step title="步骤3" description="修改成功！"></el-step>
                        </el-steps>
                    </el-row>
                    <el-row style="margin-top:30px;text-align:center;" v-show="step == 1">
                        <el-col :span="8">&nbsp;</el-col>
                        <el-col :span="8">
                            <fant-form
                                :model="adata"
                                :opt="aformOpt"
                                ref="aForm"
                                id="aForm"
                                v-enter
                                style="width:90%;"
                            >
                                <fant-form-item
                                    :opt="{prop:'telephone',label:'手机号码：'}"
                                    class="inputItem"
                                >
                                    <el-input
                                        placeholder="请输入手机号码"
                                        name="telephone"
                                        v-model="adata.telephone"
                                        @change="clickState"
                                    ></el-input>
                                </fant-form-item>
                                <fant-form-item
                                    :opt="{prop:'validCode',label:'验证码：'}"
                                    class="inputItem"
                                    v-model="classA"
                                >
                                    <el-col :span="16">
                                        <el-input
                                            placeholder="请输入验证码"
                                            id="validCode"
                                            v-model="adata.validCode"
                                            name="validCode"
                                        ></el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button
                                            class="fant-btn-secondary"
                                            @click="getCode"
                                            :disabled="isDisabled"
                                        >{{statu}}</el-button>
                                    </el-col>
                                </fant-form-item>
                            </fant-form>
                        </el-col>

                        <el-col :span="8">&nbsp;</el-col>
                    </el-row>
                    <el-row style="margin-top:30px;text-align:center;" v-show="step == 2">
                        <el-col :span="8">&nbsp;</el-col>
                        <el-col :span="8">
                            <fant-form
                                :model="bdata"
                                :opt="bformOpt"
                                ref="bForm"
                                id="bForm"
                                v-enter
                                style="width:90%;"
                            >
                                <fant-form-item
                                    :opt="{prop:'password',label:'密码：'}"
                                    class="inputItem"
                                >
                                    <el-input
                                        placeholder="请输入密码"
                                        type="password"
                                        id="password"
                                        show-password 
                                        v-model="bdata.password"
                                        name="password"
                                    ></el-input>
                                </fant-form-item>
                                <fant-form-item
                                    :opt="{prop:'confirmPassword',label:'确认密码：'}"
                                    class="inputItem"
                                >
                                    <el-input
                                        placeholder="请重新输入密码"
                                        type="password"
                                        id="confirmPassword"
                                        v-model="bdata.confirmPassword"
                                        name="confirmPassword"
                                    ></el-input>
                                </fant-form-item>
                            </fant-form>
                        </el-col>
                        <el-col :span="8">&nbsp;</el-col>
                    </el-row>
                    <el-row v-show="step == 3" style="margin:10% 0;text-align:center;">
                        <el-col :span="24">
                            <i class="el-icon-fant-success_fill successInfo">恭喜你，密码修改成功</i>
                        </el-col>&nbsp;
                        <el-col :span="24">
                            <el-button
                                class="fant-btn-secondary"
                                @click="$router.push('/login')"
                            >返回登陆</el-button>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:30px;text-align:center;">
                        <el-col :span="10">&nbsp;</el-col>
                        <el-col :span="4">
                            <div class="btnBox">
                                <!-- <el-button id="submitForm" type="primary" style="width:100%;margin-left:0;" v-show="step == 2" @click="prevStep">上一步</el-button> -->
                                <el-button
                                    id="submitForm"
                                    type="primary"
                                    style="width:100%;margin-left:0; margin-top:10px;"
                                    v-show="step != 3"
                                    @click="nextStep"
                                >下一步</el-button>&nbsp;
                                <el-col :span="24">
                                    <el-button
                                        class="fant-btn-secondary"
                                        style="width:100%;margin-left:0;margin-top:10px;height:40px;padding:0 !important;line-height:40px;"
                                        @click="$router.push('/login')"
                                    >返回登陆</el-button>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col :span="10">&nbsp;</el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import valid from "@/lib/fant-validate";
import { setTimeout, clearTimeout } from "timers";
export default {
    data() {
        var confirmPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.bdata.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            isDisabled: false,
            classA: false,
            isCheck: false,
            valid: true,
            validMsg: "",
            token: "",
            step: 1,
            statu: "获取验证码",
            adata: {
                telephone: "",
                validCode: ""
            },
            bdata: {
                password: "",
                confirmPassword: ""
            },
            aformOpt: {
                rules: {
                    telephone: [
                        {
                            required: true,
                            message: "请输入手机号码",
                            trigger: "change"
                        },
                        { validator: valid.phone, trigger: "change" }
                    ],
                    validCode: [
                        {
                            required: true,
                            message: "请输入验证码",
                            trigger: "change"
                        }
                    ]
                }
            },
            bformOpt: {
                rules: {
                    password: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "change"
                        }
                    ],
                    confirmPassword: [
                        {
                            required: true,
                            message: "请重新输入密码",
                            trigger: "change"
                        },
                        { validator: confirmPass, trigger: "change" }
                    ]
                }
            }
        };
    },
    methods: {
        clickState(value) {
            var valid = /^(?:1(3|5|7|8)\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
            if (valid) {
                this.isCheck = true;
            } else {
                this.isCheck = false;
            }
        },
        getCode() {
            this.$refs.aForm.validateField("telephone", error => {
                if (error) return;
                this.time = 60;
                this.timer();
                this.classA = true;
                this.$http
                    .post("/user/send/verification", this.adata.telephon)
                    .then(result => {
                        if (!re.ok) {
                            this.$message({
                                msg: re.message,
                                type: "error",
                                timeout: 2000
                            });
                        }
                    });
            });
        },
        checkCode() {
            this.$http
                .post("/user/check/verification/code", this.adata.telephon)
                .then(result => {
                    if (re.ok) {
                        this.valid = true;
                        this.token = re.data;
                        this.step++;
                    } else {
                        this.valid = false;
                        this.validMsg = re.message;
                        this.$message({
                            msg: re.message,
                            type: "error",
                            timeout: 2000
                        });
                    }
                });
        },
        savePassword() {
            this.$http
                .post("/user/forgot/password", {
                    phone: this.adata.telephone,
                    password: this.bdata.password,
                    confirmPassword: this.bdata.confirmPassword,
                    token: this.token
                })
                .then(result => {
                    if (re.ok) {
                        this.valid = true;
                        this.token = re.data;
                        this.step++;
                    } else {
                        this.valid = false;
                        this.validMsg = re.message;
                        this.$message({
                            msg: re.message,
                            type: "error",
                            timeout: 2000
                        });
                    }
                });
        },

        timer() {
            if (this.time > 1) {
                this.statu = this.time + "s后重新获取";
                this.isDisabled = true;
                var timer = setTimeout(this.timer, 1000);
                this.time--;
            } else if (this.time == 1) {
                this.statu = "获取验证码";
                clearTimeout(timer);
                this.isDisabled = false;
                this.classA = false;
            }
        },
        nextStep(e) {
            var vm = this;
            var formRef = this.step == 1 ? "aForm" : "bForm";
            this.$refs[formRef].validate(valid => {
                if (valid) {
                    //Todo:ajax
                    if (vm.step == 1) {
                        vm.checkCode();
                    }
                    if (vm.step == 2) {
                        vm.savePassword();
                    }
                } else {
                    return false;
                }
            });
        },
        prevStep(e) {
            this.step--;
        }
    }
};
</script>
