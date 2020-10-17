<template>
    <div class="win-wrap">
        <div class="content-wrap" style="min-height:160px;">
            <fant-form ref="editForm" :model="data" :opt="formOpt">
                <el-form-item label="上级部门：" prop="parentId">
                    <treebox
                        ref="deptTree"
                        v-model="data.parentId"
                        :opt="treeOpt"
                        @click.native="reload"
                        @node-click="treeClick"
                        @clear="clearInput"
                        :data="treeData"
                        suffix-icon="el-icon-arrow-down"
                    />
                    
                        <!-- suffix-icon="el-icon-arrow-down" -->
                </el-form-item>
                <el-form-item label="部门名称：" prop="name">
                    <el-input v-model="data.name" placeholder="请输入部门名称"/>
                </el-form-item>
            </fant-form>
        </div>
        <div class="action">
            <el-button :disabled="disableSave" class="fant-btn-secondary" @click="save">保存</el-button>
            <el-button class="fant-btn-third" @click="close">关闭</el-button>
        </div>
    </div>
</template>

<script>
import valid from "@/lib/fant-validate";
export default {
    props: {
        parent: { type: Object },
        department: "",
        name: ""
    },
    data() {
        return {
            copyData: {},
            data: { name: "", parentId: null },
            formOpt: {
                labelWidth: "80px",
                rules: {
                    name: [
                        {
                            required: true,
                            validator: valid.notEmpty,
                            trigger: ["change"]
                        },
                        {
                            required: true,
                            min: 1,
                            max: 50,
                            message: "名称不能超过50个字符",
                            trigger: "change"
                        }
                    ]
                }
            },
            disableSave: false,
            treeData:[],
            treeOpt: {
                url: "/web/department/getTree",
                panelWidth: "300px",
                width: "300px",
                dataProp: { data: "data" },
                props: { children: "children", label: "name" }
            },
            resetValue: {}
        };
    },
    methods: {
        roundNumber: function(rule, value, callback) {
            value = value == 0 ? 0 : value || "";
            var valid = /^[1-9]\d*$/.test(value);
            if (!valid || !(value >= 0 && value < 1000)) {
                callback(new Error("请输入1-1000整数。"));
            } else {
                callback();
            }
        },
        reload(){
            this.$refs.deptTree.reload();
           
        },
        close() {            
            this.parent.editWin.show = false;
        },
        pageInit(data) {
            // // console.log(data,this.$refs.deptTree);
            this.copyData = this.$deepCopy(data);
            this.$refs.editForm.resetFields();
            this.$refs.editForm.$nextTick(() => {
                // debugger
                this.disableSave = false;
                this.data = data
                    ? data
                    : { parentName: "", parentId: "", name: "" };
                // 部门名称默认显示
                this.data.name = this.data.name ? this.data.name : this.name;
                //根节点的id为空字符
                this.data.parentId = this.data.parentId
                    ? this.data.parentId
                    : "";
                this.resetValue = this.$deepCopy(this.data);
                this.treeOpt.url = "/web/department/getTree/" + this.department;
                this.$refs.deptTree.reload();
            });

            // for(let i of this.$refs.deptTree.$refs.elTree.data[0].children){
            //   if(i == this.department){
            //     this.$refs.deptTree.$refs.elTree.data[0].children.splice(i.index);
            //   }
            // }
            // // console.log("data",data.name);
        },
        // loadFilter(data){
        //   for(let i of data){

        //   }
        // },
        reset() {
            //      if (this.data.id == undefined) {
            //        this.data.parentId = null;
            //        this.$refs.editForm.resetFields();
            //      } else {
            // this.data = this.$deepCopy(this.resetValue);
            this.pageInit(this.copyData);
        },
        save() {
            let beValid = true;
            this.$refs.editForm.validate(valid => {
                if (!valid) beValid = valid;
            });
            if (!beValid) return;
            // this.$refs.editForm.validateField( error => {
            //   if (error) return;
            let url =
                "/web/department" + (this.data.id ? "/" + this.data.id : "");
            let method = this.data.id ? "put" : "post";
            // // console.log(url,method)
            // console.log(this.data.id);
            let form = this.$deepCopy(this.data);
            if (form.parentId == "") {
                form.parentId = null;
            }
            this.$http[method](url, form).then(re => {
                if (re.ok) {
                    this.$message({
                        message: "保存成功！",
                        duration: 1000,
                        type: "success"
                    });
                    this.parent.editWin.show = false;
                    // this.$refs.deptTree.reload();
                    this.parent.$refs.deptTable.reload();
                } else
                    this.$message({
                        message: re.message,
                        type: "error",
                        showClose: true
                    });
            });
            // });
        },
        treeClick(data, node, tree) {
            this.data.parentId = data.id;
            // // console.log(this.$refs.deptTree)
        },
        clearInput() {
            this.data.parentId = null;
        }
    }
};
</script>

<style scoped>
.el-tree-node.is-expanded{
	display: block !important;
}
.el-tree{
	padding-bottom:15px !important;
}
</style>
