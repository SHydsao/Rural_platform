<template>
    <div class="win-wrap">
        <!--<el-transfer style="width:496px;margin:auto;padding-top:10px;" v-model="departmentList" :props="{key:'id',label:'name'}" :data="staffList" :titles="['其他员工','部门员工']" @change="changData">-->
        <!--</el-transfer>-->
        <div class="content-wrap" v-loading="loading">
            <transfer
                ref="transfer"
                style="padding:0 28px;"
                v-model="departmentList"
                :opt="transferOpt"
                :data="staffList"
            ></transfer>
        </div>
        <div class="action">
            <!--  <el-button class="fant-btn-primary2 reset-btn" @click="reset">重置</el-button> -->
            <el-button class="fant-btn-secondary" @click="save">保存</el-button>
            <el-button class="fant-btn-third" @click="close">关闭</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "member",
    props: {
        parent: Object
    },
    data() {
        return {
			loading:true,
            transferOpt: {
                listIcon: "el-icon-fant-person",
                width: "500px",
                height: "400px",
                filterable: true,
                titles: ["其他员工：", "部门员工："]
            },
            parentVm: this.parent ? this.parent : {},
            departmentList: [],
            oldDepartmentList: [],
            staffList: [],
            departmentStaffList: [],
            departmentId: ""
        };
    },
    methods: {
        reset() {
            this.departmentList = this.$deepCopy(this.oldDepartmentList);
        },
        close() {
            this.parentVm.memberWin.show = false;
        },
        pageInit(id) {
			this.departmentId = id;
			let firmId=JSON.parse(sessionStorage.getItem('current')).firmId;
			
			axios.all([
				this.$http({ method: "get", url: `/web/staff/firm/${firmId}/enabled` }),
				this.$http({method: "get",url: "/web/staff/included/" + id})
			]).then(axios.spread((asst,asst2)=>{
				if (asst){
					this.staffList = asst;
					this.loading=false;
				}else {
					this.loading=false;
					this.$message({ msg: asst.message, type: "error" })
				};
				
				if (asst2) {
				    let data = [];
				    this.departmentStaffList = asst2;
				    for (let i = 0; i < asst2.length; i++) {
				        data.push(asst2[i].id);
				    }
				    this.departmentList = data;
				    this.oldDepartmentList = data;
				} else {
				    this.$message({ msg: asst2.message, type: "error" });
				}
				
			}))
        },
        save() {
            let ids = this.$refs.transfer.getValue();
            let url = "/web/departmentstaff/batchSave/" + this.departmentId;
            this.showLoading()
            this.$http.post(url, ids).then(re => {
                if (!re.ok) {
                    this.$message({ msg: re.message, type: "error" });
                    this.parent.$refs.deptTable.reload();
                } else {
                    this.$message({
                        msg: "设置成功！",
                        type: "success",
                        timeout: 2000
                    });
                    this.$emit("callback");
                }
            });
        }
    }
};
</script>
