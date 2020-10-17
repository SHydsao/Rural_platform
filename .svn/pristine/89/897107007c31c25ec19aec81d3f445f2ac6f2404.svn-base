<style scoped>
.page_box >>> .el-form-item--small.el-form-item {
    margin-bottom: 0 !important;
}
</style>
<template>
    <div class="page_box" v-cloak>
        <div class="el-top fff">
            <div class="top_tit">监控管理</div>
        </div>
        <div class="main fff main-admin">
            <div class="wrap clearfix">
                <fant-form
                    :model="tableOpt.extendParams"
                    :opt="formOpt1"
                    @submit="()=>{return false}"
                    ref="form"
                    v-enter
                    class="f-cb cx form fr"
                >
                    <fant-form-item class="inputItem">
                        <el-input
                            v-enter="{btn:'.btn'}"
                            v-model="tableOpt.extendParams.searchKey"
                            name
                            placeholder="请输入关键词搜索"
                            prefix-icon="el-icon-search"
                            clearable
                            style="width:200px;"
                        ></el-input>
                    </fant-form-item>
                    <el-button class="fant-btn-primary btn" @click="search">查询</el-button>
                </fant-form>
            </div>
            <el-row class="main-table" style="height:calc(100% - 50px);margin-top:10px;">
                <fant-table
                    ref="systemLogTable"
                    :data="[]"
                    :opt="tableOpt"
                    :page="pageOpt"
                    class="formBox none"
                    :columns="columns"
                >
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
    </div>
</template>

<script>
export default {
    name: "systemLog",
    data() {
        var vm = this;
        return {
            formOpt1: {
                labelPosition: "right",
                labelWidth: "0px",
                inline: true
            },
            selectFid: "",
            userSelectOpt: {
                width: 300,
                idField: "id",
                textField: "name",
                prompt: "请选择操作用户",
                url: "/admin/firmStaff/listAll",
                emulateJSON: true,
                columns: [
                    { name: "用户名称", width: 20, key: "name" },
                    { name: "真实姓名", width: 20, key: "realName" },
                    { name: "电话号码", width: 20, key: "phone" }
                ]
            },
            tableOpt: {
                height: "100%",
                size: "small",
                page: true,
                url: "/admin/systemLog/page",
                emulateJSON: true,
                extendParams: {},
                multiple: true,
                checkOnSelect: true
            },
            pageOpt: {},
            columns: [
                { prop: "resourceCode", label: "资源名称", minWidth: 3 },
                { prop: "operationCode", label: "操作名称", minWidth: 2 },
                { prop: "content", label: "日志内容", minWidth: 4 },
                { prop: "firmName", label: "企业名称", minWidth: 3 },
                { prop: "userName", label: "操作用户", minWidth: 2 },
                { prop: "ip", label: "用户IP", minWidth: 2 },
                { prop: "browser", label: "浏览器", minWidth: 2 },
                { prop: "app", label: "应用端", minWidth: 2 },
                { prop: "os", label: "操作系统", minWidth: 2 },
                {
                    prop: "createdAt",
                    label: "创建时间",
                    minWidth: 4,
                    align: "center"
                },
                {
                    prop: "executionTime",
                    label: "操作时长(ms)",
                    minWidth: 3,
                    align: "right"
                }
            ]
        };
    },
    methods: {
        search() {
            this.$refs.systemLogTable.reload();
        }
    }
};
</script>
