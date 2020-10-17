<style scoped lang="scss">
.tableHeader {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #2a82db;
    border-bottom: 0;
    font-size: 14px;
    font-weight: bold;
    background: #2a82db;
    color: #fff;
}

.tableHeader span {
    display: inline-block;
}

.roleTree {
    border: 1px solid #d2d2d2;
    font-size: 14px;
    overflow: auto;
}

.roleTree>>>.el-tree-node__expand-icon {
    display: none;
}

.roleTree>>>.el-tree-node__content {
    border-bottom: 1px solid #d2d2d2;
    min-height: 40px;
}

.roleTree>>>.module {
    border-right: 1px solid #d2d2d2;
    display: inline-block;
    float: left;
}

.roleTree>>>.checboxGroup {
    display: inline-block;
}

.roleTree>>>.checboxGroup .el-checkbox-group {
    float: left;
}

.roleTree>>>.el-tree-node__content {
    display: table;
    width: 100%;
}

.roleTree>>>label.el-checkbox {
    display: inline-block;
    float: left;
}

.roleTree>>>.el-tree-node__content .el-checkbox {
    margin-left: 10px;
}

.roleTree>>>.elTreeSlot {
    width: calc(100% - 32px);
}

.roleTree[data-v-cbea285e] .checboxGroup {
    margin-top: 0px !important;
}

.content-wrap>>>.scroll-content {
    padding-bottom: 20px;
}

.custom-table {
    table-layout: fixed;
    overflow: auto;
    border-collapse: collapse;
    min-width: 100%;
    margin-bottom: 20px;

    td,
    th {
        padding: 10px;
        border: 1px solid #d2d2d2;
        vertical-align: middle;
    }

    td.roles .el-checkbox {
        width: 20%;
        margin-right: 0;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
    }
}
</style>
<template>
    <div class="win-wrap" element-loading-text="拼命加载中" v-loading="loadShow">
        <div class="content-wrap">
            <!-- <div> -->
            <!-- <div class="tableHeader">
		  <span class="header-module">
			<div style="width:159px;border-right: 1px solid #d2d2d2;text-align:center">
			  <span class="header-auth">功能</span>
			</div>
		  </span>
		  <span class="header-module">
			<span style="width:550px;text-align:center">操作</span>
		  </span>
	  </div>-->
            <!-- <tree ref="roleTree" class="roleTree" :opt="roleOpt" :data="mydata" style="height:calc(100% - 50px)" @check-change="checkChange" @check="checkTree">
		  <span slot-scope="{node, data}" :style="{float:'left',width:'calc(100% - '+(node.level-1)*18+'px)'}">
			<span class="module" :ref="'module'" :style="{width:140-node.level*18+'px','padding-left':'5px'}">{{data.name}}</span>
			<div class="checboxGroup" :style="{width:'calc(100% - '+(140-node.level*18+6)+'px)'}">
			  <el-checkbox-group v-for="item in data.children" :key="item.operationId" ref="actionArr" v-if="item.operationId?true:false" v-model="checkedArr[item.operationId]" style="display:inline-block;width:110px;margin:7px 0">
				<el-checkbox :key="item.operationId" :label="item.operationId" @change="val=>actionChange(val,item.id)"><el-tooltip class="item" effect="dark" :content='item.name' placement="top"><span style="width:75px;text-overflow:ellipsis;display:inline-block;white-space: nowrap;overflow: hidden;position:relative;top:4px">{{item.name}}</span></el-tooltip></el-checkbox>
			  </el-checkbox-group>
			</div>
		  </span>
	  </tree>-->
            <!-- <div>
		  <div></div>
		  <div></div>

	  </div>-->
            <table class="custom-table">
                <thead>
                    <tr>
                        <th style="width:130px">功能</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="first in mydata">
                        <tr :key="first.id + 'first'">
                            <td>
                                <el-checkbox :indeterminate="first.isIndeterminate" :label="first.id" v-model="first.isChecked" @change="handleCheckAll(first, 1)" :title="first.name">{{ first.name }}</el-checkbox>
                            </td>
                            <td></td>
                        </tr>
                        <tr :key="second.id + 'second'" v-for="second in first.children">
                            <td style="padding-left:35px">
                                <el-checkbox :indeterminate="second.isIndeterminate" :label="second.id" v-model="second.isChecked" @change="handleCheckAll(second, 2)" :title="second.name">{{ second.name }}</el-checkbox>
                            </td>
                            <td class="roles">
                                <el-checkbox-group v-model="checkedRoles" :key="first.id + 'group'">
                                    <el-checkbox :key="third.id + 'third'" v-for="third in second.children" :label="third.id" @change="handleCheck(third.id)" :title="third.name">{{ third.name }}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <!-- </div> -->
        </div>
        <div class="action">
            <el-button class="reset-btn fant-btn-primary2" @click="load">重置</el-button>
            <el-button class="fant-btn-secondary" @click="saveAuth">授权</el-button>
            <el-button class="fant-btn-third" @click="myclose">关闭</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "roleAuthManage",
    props: {
        parent: Object,
        roleId_: [String, Number]
    },
    watch: {
        parent(val) {
            this.parentVm = val;
        },
        roleId_(val) {
            this.roleId = val;
            this.load();
        }
    },
    data() {
        return {
            checkedRoles: [],
            // roleOpt: {
            //   width: "100%",
            //   height: "100%",
            //   nodeKey: "id",
            //   dataProp: { data: "data" },
            //   props: { children: "children", label: "name" },
            //   showCheckbox: true,
            //   expandbyclicknode: false,
            //   actionBar: false
            // },
            parentVm: this.parent ? this.parent : {},
            roleId: this.roleId_ ? this.roleId_ : "",
            // checkAll: false,
            // isIndeterminate: false,
            // checkedArr: {},
            mydata: [],
            // columns: [
            //   { prop: "name", label: "模块", minWidth: "80", align: "left" },
            //   {
            //     prop: "action",
            //     label: "操作",
            //     align: "center",
            //     minWidth: "150",
            //     align: "left"
            //   }
            // ],
            loadShow: false
        };
    },
    methods: {
        contain(all, part) {
            if (part.every(val => all.includes(val))) {
                return 1;
            } else if (part.some(val => all.includes(val))) {
                return 2;
            } else {
                return 0;
            }
        },
        setState(item, checkState) {
            if (checkState == 1) {
                item.isChecked = true;
                item.isIndeterminate = false;
            } else if (checkState == 2) {
                item.isChecked = false;
                item.isIndeterminate = true;
            } else if (checkState == 0) {
                item.isChecked = false;
                item.isIndeterminate = false;
            }
        },
        toggleParentNode(data, id, checkedChilds) {
            let forFn = (arr, id, checkState, checkedChilds) => {
                if (id) {
                    for (let i = 0; i < arr.length; i++) {
                        let item = arr[i];
                        if (item.id === id) {
                            let nodeState = 0;
                            if (item.type == "operation") {
                                nodeState = this.contain(
                                    checkedChilds,
                                    arr.map(item => item.operationId)
                                );
                            } else {
                                this.setState(item, checkState);
                                if (arr.every(val => val.isChecked)) {
                                    nodeState = 1;
                                } else if (
                                    arr.some(val => val.isChecked) ||
                                    arr.some(val => val.isIndeterminate)
                                ) {
                                    nodeState = 2;
                                }
                            }
                            forFn(data, item.parentId, nodeState, checkedChilds);
                            break;
                        } else if (item.children && item.children.length) {
                            forFn(item.children, id, checkState, checkedChilds);
                        }
                    }
                }
            };
            forFn(data, id, null, checkedChilds);
        },
        handleCheck(id) {
            this.$nextTick(() => {
                this.toggleParentNode(this.mydata, id, this.checkedRoles);
            });
        },
        handleThirdLevel(item) {
            let childs = item.children.map(item => item.operationId);
            for (let child of childs) {
                if (item.isChecked) {
                    if (!this.checkedRoles.includes(child)) {
                        this.checkedRoles.push(child);
                    }
                } else {
                    for (let i = 0; i < this.checkedRoles.length; i++) {
                        if (this.checkedRoles[i] == child) {
                            this.checkedRoles.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        },
        handleCheckAll(item, level) {
            this.$nextTick(() => {
                if (level == 2) {
                    if (item.isIndeterminate == true) {
                        item.isChecked = true;
                        item.isIndeterminate = false;
                    }
                    this.handleThirdLevel(item);
                    this.toggleParentNode(this.mydata, item.id);
                } else {
                    let isChecked = false;
                    if (item.isIndeterminate == true) {
                        item.isChecked = true;
                        item.isIndeterminate = false;
                        isChecked = true;
                    } else {
                        isChecked = item.isChecked;
                    }
                    item.children.forEach(child => {
                        child.isChecked = isChecked;
                        child.isIndeterminate = false;
                        this.handleThirdLevel(child);
                    });
                }
            });
        },
        initCheckRole(roleData) {

            roleData.forEach(first => {
                let checkSecondIds = [];
                let seconds = first.children.map(item => item.id);
                first.children.forEach(second => {
                    let childs = second.children.map(third => third.operationId);
                    let secondResult = this.contain(this.checkedRoles, childs);

                    if (secondResult == 1) {
                        checkSecondIds.push(second.id);
                    }
                    this.setState(second, secondResult);
                });
                let firstResult = this.contain(checkSecondIds, seconds);
                this.setState(first, firstResult);
            });
        },
        // checkAllFuc(val) {
        //   //当点击表头checkbox的时候，全选
        //   this.mydata.forEach((item, index) => {
        //     this.$refs.roleTree.$refs.elTree.setChecked(item, val, true);
        //   });
        //   this.isIndeterminate = false;
        // },
        // checkChange(nodeData, checked, leafChecked) {
        //   //当选择树checkbox的时候，根据operationId选择右侧操作权限复选框
        //   if (nodeData.operationId) {
        //     this.$set(
        //       this.checkedArr,
        //       nodeData.operationId,
        //       checked ? [nodeData.operationId] : []
        //     );
        //   }
        // },
        // checkTree(data, { checkedKeys, checkedNodes }) {
        //   let all = true; //是否全中
        //   let empty = true; //是否全空
        //   this.mydata.forEach((item, index) => {
        //     all = all && checkedKeys.indexOf(item.id) != -1;
        //     empty = empty && checkedKeys.indexOf(item.id) == -1;
        //   });
        //   this.checkAll = all;
        //   //非全中非全空的时候显示半选状态
        //   this.isIndeterminate = !all && !empty;
        // },
        // actionChange(val, id) {
        //   //当点击右侧操作权限复选框的时候，自动选择左边对应operationId隐藏了的复选框
        //   this.$refs.roleTree.$refs.elTree.setChecked(id, val);
        // },
        myclose: function() {
            this.parentVm.roleAuthWinShow = false;
        },
        saveAuth() {
            // let node = this.$refs.roleTree.$refs.elTree.getCheckedNodes();
            // let ids = [];
            // node.forEach(item => {
            //   item.operationId ? ids.push(item.operationId) : null;
            // });
            this.$http
                .put("/web/roleauth?roleid=" + this.roleId, this.checkedRoles)
                .then(re => {
                    if (re.ok == 1) {
                        this.$message({ msg: "成功授权！", type: "success" });
                        this.parentVm.$refs.roleTable.reload();
                        this.parentVm.roleAuthWinShow = false;

                        this.parentVm.roleAuthWinShow = false;
                    } else {
                        this.$message({ msg: re.message, type: "error" });
                    }
                })
                .catch(err => {
                    this.$message({
                        msg: "服务器繁忙，请稍后再试！",
                        type: "error"
                    });
                });
        },
        load() {
            this.loadShow = true;
            this.mydata = [];
            // let nothing = [];
            // this.$refs.roleTree.$refs.elTree.setCheckedKeys(nothing);
            this.showLoading()
            this.$http.get("/web/roleauth").then(re => {
                if (re.ok) {
                    let roleData = re.data;
                    // this.$refs.roleTree.$nextTick(()=>{
                    //     this.$refs.actionArr.forEach((item,index)=>{
                    //         let key = item.$vnode.data.key;
                    //         let node = this.$refs.roleTree.$refs.elTree.getNode(key);
                    //         node.visible = false;
                    //     });
                    this.$http
                        .get("/web/roleauth/role/" + this.roleId)
                        .then(re => {
                            if (re) {
                                //             let keys = [];
                                //             re.forEach((item, index)=>{
                                //                 keys.push(item.operationId);
                                //             });
                                //             this.selectedIds=this.$refs.roleTree.$refs.elTree.setCheckedKeys(keys);
                                //             this.$refs.roleTree.$nextTick(()=>{
                                //                 this.afterTreeLoad();
                                //             });
                                this.checkedRoles = re.map(item => item.operationId);
                                if (this.checkedRoles.length) {
                                    this.initCheckRole(roleData);
                                }
                                this.mydata = roleData;
                                this.loadShow = false;
                            }
                        })
                        .catch(err => {
                            this.$message({
                                msg: "权限加载超时，请稍后再试！",
                                type: "error"
                            });
                        });
                    // })
                } else {
                    this.$message({ msg: re.message, type: "error" });
                }
            });
        }
        // afterTreeLoad() {
        //   let checkDom = this.$fromArray(this.$getEl(".checboxGroup"));
        //   checkDom.forEach(item => {
        //     let height = item.parentNode.offsetHeight;
        //     if (height < 40) {
        //       item.style.marginTop = (40 - height) / 2 + "px";
        //       height = 40;
        //     }
        //     item.previousSibling.previousSibling.style.height = height + "px";
        //     item.previousSibling.previousSibling.style.lineHeight = height + "px";
        //     item.parentNode.parentNode.previousSibling.previousSibling.style.marginTop =
        //       (height - 19) / 2 + "px";
        //   });
        // }
    }
    // mounted(){
    //   this.load();
    // }
};
</script>