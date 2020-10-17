<style scoped>
.row-wrap,
.row-wrap > div {
    height: 100%;
}
.right-header > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.right-header > div span:first-child {
    font-size: 1em;
}
.right-header > div span:last-child {
    font-size: 0.875em;
}

.main-table {
    margin-top: 0 !important;
    height: calc(100% - 50px);
}
.wrap {
    margin-bottom: 10px !important;
}
.main {
    height: calc(100% - 124px);
}
.form >>> .el-form-item--small.el-form-item {
    margin-bottom: 0 !important;
}
</style>
<template>
    <div class="page_box">
        <div class="el-top fff">
            <div class="top_tit">用户管理</div>
        </div>

        <div class="main fff main-admin">
            <el-row class="wrap f-cb">
                <el-button
                    v-auth="'admin.user.resetPassword'"
                    class="fant-btn-primary"
                    @click="resetPwd"
                    :disabled="selection.length!=1||selection[0].state=='OFF'"
                >重置密码</el-button>
                <el-button
                    v-auth="'admin.user.state'"
                    class="fant-btn-primary"
                    @click="enableUse"
                    :disabled="selection.length!=1||selection[0].state=='ON'"
                >启用</el-button>
                <el-button
                    v-auth="'admin.user.state'"
                    class="fant-btn-primary"
                    @click="disableUse"
                    :disabled="selection.length!=1||selection[0].state=='OFF'"
                >禁用</el-button>
                <el-button v-auth="'admin.user.log'" class="fant-btn-primary" @click="logWin.show=true">登录日志</el-button>
                <fant-form
                    :model="table.opt.extendParams"
                    :opt="{inline:true}"
                    class="fr form"
                    v-enter
                    @submit="()=>{return false}"
                    @submit.native.prevent
                >
                    <fant-form-item :opt="{prop:'state'}">
                        <fant-select
                            clearable
                            :opt="stateSelect.opt"
                            placeholder="请选择状态"
                            :data="stateSelect.data"
                            v-model="table.opt.extendParams.state"
                            style="width:130px"
                        ></fant-select>
                    </fant-form-item>
                    <fant-form-item :opt="{prop:'searchKey'}">
                        <el-input
                            clearable
                            prefix-icon="el-icon-search"
                            v-model="table.opt.extendParams.searchKey"
                            placeholder="请输入姓名/手机号码"
                            v-enter="{btn:'#btn'}"
                            class="input-item"
                        />
                    </fant-form-item>
                    <el-button id="btn" class="fant-btn-primary" @click="search">查询</el-button>
                    <!-- <el-button id="btn" class="fant-btn-secondary" @click="searchMore.show=true">高级搜索</el-button> -->
                </fant-form>
            </el-row>
            <el-row class="main-table">
                <fant-table
                    ref="userTable"
                    class="formBox none"
                    v-model="table.data"
                    :opt="table.opt"
                    :page="table.pageOpt"
                    :columns="table.columns"
                    @selection-change="tableRowChange"
                >
                    <template slot="id" slot-scope="scope">
                        <el-button
                            type="text"
                            class="actionBtn"
                            icon="el-icon-edit"
                            @click="editUser(scope.row)"
                            title="编辑"
                        ></el-button>
                        <el-button
                            type="text"
                            class="actionBtn"
                            icon="el-icon-delete"
                            @click="delUser(scope.row,scope.$index)"
                            title="删除"
                        ></el-button>
                    </template>
                    <template slot="empty">
                        <div class="empty_content">
                            <div class="noData-img"></div>
                            <!-- <img :src="require('@/assets/images/blank_bg2.png')" alt=""> -->
                            <div class="empty_text">暂无数据</div>
                        </div>
                    </template>
                </fant-table>
            </el-row>
        </div>

        <win :show.sync="searchMore.show" :opt="searchMore.opt">
            <div class="win-wrap">
                <div class="content-wrap">
                    <fant-form :opt="{labelWidth:'80px'}" v-model="table.opt.extendParams">
                        <fant-form-item :opt="{label:'手机号码：',prop:'phone'}">
                            <el-input
                                clearable
                                v-model="table.opt.extendParams.phone"
                                placeholder="请输入手机号码"
                                style="width:340px"
                            ></el-input>
                        </fant-form-item>
                        <fant-form-item :opt="{label:'姓名：',prop:'name'}">
                            <el-input
                                clearable
                                v-model="table.opt.extendParams.name"
                                placeholder="请输入姓名"
                                style="width:340px"
                            ></el-input>
                        </fant-form-item>
                        <fant-form-item :opt="{label:'状态：',prop:'state'}">
                            <fant-select
                                clearable
                                :opt="stateSelect.opt"
                                :data="stateSelect.data"
                                v-model="table.opt.extendParams.state"
                                style="width:340px"
                            ></fant-select>
                        </fant-form-item>
                        <fant-form-item class="item-other" :opt="{label:'创建时间：',prop:'createdAt'}">
                            <datebox
                                v-model="table.opt.extendParams.createdAt"
                                :opt="createdAtOpt"
                            />
                        </fant-form-item>
                    </fant-form>
                </div>
                <div class="action">
                    <!-- <el-button class="fant-btn-primary2 reset-btn" @click="searchReset">重置</el-button> -->
                    <el-button class="fant-btn-secondary" @click="search">查询</el-button>
                    <el-button class="fant-btn-third" @click="searchMore.show=false">关闭</el-button>
                </div>
            </div>
        </win>
		<win ref="logWin" :show.sync="logWin.show" :opt="logWin.opt">
			<component ref="logPage" :is="require('./logger').default"></component>
		</win>
        <win ref="editWin" :show.sync="editWin.show" :opt="editWin.opt">
            <component ref="editPage" :is="require('./edit').default" :parent="self"></component>
        </win>
        <win ref="resetPwdWin" :show.sync="resetPwdWin.show" :opt="resetPwdWin.opt">
            <div class="win-wrap">
                <div class="content-wrap" style="min-height:100px;">
                    <fant-form ref="resetPwdForm" :opt="resetPwdWin.formOpt" v-model="resetData">
                        <fant-form-item :opt="{label:'新密码：',prop:'password'}">
                            <el-input v-model="resetData.password"  :type="passwordType" placeholder="请输入新密码">
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
                </div>
                <div class="action">
                    <el-button
                        class="fant-btn-secondary"
                        :disabled="resetPwdWin.disableBtn"
                        @click="saveNewPwd"
                    >保存</el-button>
                    <el-button class="fant-btn-third" @click="resetPwdWin.show=false">关闭</el-button>
                </div>
            </div>
        </win>
    </div>
</template>
<script>
import valid from "@/lib/fant-validate";
export default {
    name: "firmUser",
    data() {
        return {
            passwordType:'password',
            stateSelect: {
                opt: {
                    textField: "text",
                    idField: "id",
                    clearable: true,
                    prompt: "请选择状态",
                    width: "130px"
                },
                data: [
                    // {id:null,text:'全部'},
                    { id: "ON", text: "有效" },
                    { id: "OFF", text: "无效" }
                ]
            },
            self: this,
            resetData: { password: "" },
            table: {
                data: [],
                opt: {
                    height: "100%",
                    size: "small",
                    page: true,
                    showSummary: false,
                    url: "/admin/user/page",
                    emulateJSON: true,
                    multiple: true,
                    checkOnSelect: true,
                    extendParams: { name: "", state: null }
                },
                pageOpt: {
                    
                },
                columns: [
                    {
                        prop: "id",
                        label: "操作",
                        align: "center",
                        minWidth: "1",
                        hidden: true
                    },
                    { prop: "name", label: "姓名", minWidth: 2 },
                    {
                        prop: "phone",
                        label: "手机号码",
                        minWidth: 3,
                        align: "center"
                    },
                    {
                        prop: "createdAt",
                        label: "创建时间",
                        minWidth: 2,
                        align: "center",
                        formatter: (row, col, val) => {
                            return this.formatDate(val, "yyyy-MM-dd hh:mm");
                        }
                    },
                    {
                        prop: "_state",
                        label: "状态",
                        minWidth: "1",
                        align: "center",
                        formatter: (row, col, val) => {
                            return row.state == "ON" ? "有效" : "无效";
                        }
                    }
                ]
            },
            selection: [],
            searchMore: {
                show: false,
                opt: {
                    title: "高级搜索",
                    width: "460px",
                    // height:'300px',
                    modalAppendToBody: false
                }
            },
            editWin: {
                show: false,
                opt: {
                    title: "用户新增/编辑",
                    width: "420px"
                }
			},
			logWin:{
				show: false,
                opt: {
                    title: "登录日志",
                    width: "850px"
                }
			},
            resetPwdWin: {
                show: false,
                opt: {
                    title: "重置密码",
                    width: "420px"
                },
                disableBtn: false,
                formOpt: {
                    labelWidth: "80px",
                    rules: {
                        password: {
                            required: true,
                            validator: valid.notEmpty,
                            trigger: "change"
                        }
                    }
                }
            },
            createdAtOpt: {
                prompt: "请选择创建日期范围",
                type: "daterange",
                width: "340px",
                format: "yyyy年MM月dd日",
                valueFormat: "yyyy-MM-dd HH:mm:ss"
            }
        };
    },
    methods: {
        tableRowChange(selection) {
            this.selection = selection;
            // console.log(selection)
        },
        loginAuth() {
            this.loginAuthWin.show = true;
        },
        resetPwd() {
            this.resetPwdWin.show = true;
            this.$refs.resetPwdWin.$nextTick(() => {
                this.resetData = { password: "" };
                this.$refs.resetPwdForm.resetFields();
            });
        },
        saveNewPwd() {
            this.$refs.resetPwdForm.validateField("password", error => {
                if (error) return;
                this.resetPwdWin.disableBtn = true;
                this.$http
                    .patch(
                        "/admin/user/" +
                            this.selection[0].id +
                            "/resetpassword",
                        { password: this.resetData.password },
                        { params: { password: this.resetData.password } }
                    )
                    .then(re => {
                        if (re.ok)
                            this.$message({
                                message: "保存成功！",
                                type: "success",
                                duration: 1000,
                                onClose: () => {
                                    this.resetPwdWin.show = false;
                                }
                            });
                        else
                            this.$message({
                                message: re.message,
                                type: "error"
                            });
                        this.resetPwdWin.disableBtn = false;
                    });
            });
        },
        enableUse() {
            this.$http
                .patch("/admin/user/" + this.selection[0].id + "/enabled")
                .then(re => {
                    if (re.ok)
                        this.$message({
                            message: "启用成功！",
                            type: "success",
                            duration: "1000",
                            onClose: () => {
                                this.selection[0].state = "ON";
                            }
                        });
                    else this.$message({ message: re.message, type: "error" });
                });
        },
        disableUse() {
            this.$http
                .patch("/admin/user/" + this.selection[0].id + "/disabled")
                .then(re => {
                    if (re.ok)
                        this.$message({
                            message: "禁用成功！",
                            type: "success",
                            duration: "1000",
                            onClose: () => {
                                this.selection[0].state = "OFF";
                            }
                        });
                    else this.$message({ message: re.message, type: "error" });
                });
        },
        search() {
            let arr = this.table.opt.extendParams.createdAt;
            if (arr) {
                this.table.opt.extendParams.startCreatedAt = arr[0];
                this.table.opt.extendParams.endCreatedAt =
                    arr[1].substring(0, 10) + " 23:59:59";
            }
            this.$refs.userTable.reload();
            this.searchMore.show = false;
        },
        searchReset() {
            this.table.opt.extendParams = { state: null };
        }
    }
};
</script>
