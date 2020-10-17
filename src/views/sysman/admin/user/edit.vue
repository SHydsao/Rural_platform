<template>
    <div class="win-wrap">
        <div class="content-wrap">
            <fant-form v-model="editData" :opt="{labelWidth:'80px'}">
                <fant-form-item :opt="{label:'手机号码：',prop:'phone'}">
                    <el-input clearable v-model="editData.phone" placeholder="请输入手机号码" />
                </fant-form-item>
                <fant-form-item :opt="{label:'密码：',prop:'passsword'}">
                    <el-input clearable v-model="editData.passsword"  type="password" placeholder="请输入密码" />
                </fant-form-item>
                <fant-form-item :opt="{label:'姓名：',prop:'name'}">
                    <el-input clearable v-model="editData.name" placeholder="请输入姓名" />
                </fant-form-item>
                <fant-form-item :opt="{label:'登录模式：',prop:'loginMode'}">
                    <el-input clearable v-model="editData.loginMode" placeholder="请输入登录模式" />
                </fant-form-item>
            </fant-form>
        </div>
        <div class="action">
            <el-button class="fant-btn-secondary">保存</el-button>
            <el-button class="fant-btn-third">关闭</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{parent:Object},
    data(){
        return {
            editData:{}
        }
    },
    methods:{
        pageInit(data){
            
        }
    }
}
</script>

<style>

</style>
