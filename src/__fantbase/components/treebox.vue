<style scoped>
.elInput.el-input--prefix >>> .el-input__inner {
    padding-left: 85px;
}
</style>
<template>
    <div>
        <el-popover
            placement="bottom"
            @show="panelShow"
            @hide="panelHide"
            :width="opt.panelWidth"
            v-model="showPanel"
            popper-class="treebox"
            :trigger="opt.trigger || 'click'"
        >
            <el-tree
                ref="elTree"
                :check-strictly="opt.checkStrictly"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                :style="{width:'100%','max-height':'268px','overflow-y':'auto','padding-bottom':'32px'}"
                :data="mydata"
                :empty-text="opt.emptyText"
                :node-key="opt.nodeKey"
                :props="opt.props"
                :load="opt.load"
                :highlight-current="opt.highlightCurrent"
                :show-checkbox="opt.showCheckbox"
                :default-expand-all="opt.defaultExpandAll"
                :default-expanded-keys="opt.defaultExpandedKeys"
                :default-checked-keys="opt.defaultCheckedKeys"
                :filter-node-method="opt.filterNodeMethod?opt.filterNodeMethod:filterNode"
                :accordion="opt.accordion"
                :indent="opt.indent"
                :render-content="opt.renderContent"
                @check-change="checkChange"
                @node-contextmenu="nodeContextmenu"
                @check="check"
                @current-change="currentChange"
                @node-collapse="nodeCollapse"
                @node-expand="nodeExpand"
                @node-click="nodeClick"
            ></el-tree>
            <div
                class="fant-select-toolsBar"
                style="top:calc(100% - 33px);left:0;"
                v-if="actionBar"
            >
                <slot name="action">
                    <el-button
                        v-if="add"
                        v-auth="auth.add"
                        type="text"
                        class="el-icon-fant-addition"
                        @click="actionAdd"
                    >新增</el-button>
                    <el-button
                        type="text"
                        v-if="ref"
                        class="el-icon-fant-refresh"
                        @click="actionRef"
                    >刷新</el-button>
                </slot>
            </div>
            <el-input
                class="elInput"
                slot="reference"
                @change="change"
                @blur="blur"
                @focus="focus"
                @clear="clear"
                ref="elInput"
                v-model="text"
                :style="{width:opt.width}"
                :size="opt.size"
                :disabled="disabled"
                :suffix-icon="suffixIcon || opt.suffixIcon"
                :readonly="opt.readonly"
                :clearable="opt.clearable"
                :placeholder="opt.placeholder"
            ></el-input>
        </el-popover>
    </div>
</template>

<script>
function getIndex(i, arr, prev, hidden) {
    if (prev) {
        if (i < 0) {
            return 0;
        }
        var parent = arr[i].closest(".el-tree-node");
        if (parent.hasClass("is-hidden")) {
            return getIndex(i - 1, arr, true);
        } else {
            return i;
        }
    } else {
        if (i >= arr.length && !hidden) {
            return arr.length - 1;
        } else if (i >= arr.length && hidden) {
            return -1;
        }
        var parent = arr[i].closest(".el-tree-node");
        if (parent.hasClass("is-hidden")) {
            if (hidden) {
                return getIndex(i + 1, arr, false, true);
            } else {
                return getIndex(i + 1, arr);
            }
        } else {
            return i;
        }
    }
}
export default {
    data() {
        return {
            text: "",
            node: [],
            mydata: this.data,
            myvalue: null,
            multiple:
                typeof this.opt.multiple === "boolean" && this.opt.multiple,
            //定义url接口的返回数据参数名
            dataProp: this.opt.dataProp ? this.opt.dataProp : { data: "data" },
            ref: false,
            add: false,
            actionBar: false,
            noFilter: true,
            showPanel: false
        };
    },
    watch: {
        data(val) {
            this.mydata = val;
        },
        node(val) {
            if (this.multiple) {
                var arr = [];
                val.map(item => arr.push(item[this.opt.props.label]));
                this.text = arr.join(",");
                this.text = val === "" ? this.value : this.text;
            } else {                
                this.text = val[0] ? val[0][this.opt.props.label] : this.value;
            }
        },
        value: function(val) {
            this.myvalue = this.value;
        },
        myvalue(val) {
            if (this.multiple) {
                if (val === "" || val.length === 0) {
                    this.$refs.elTree.setCheckedNodes([]);
                    this.node = [];
                } else {
                    let arr = typeof val === "string" ? val.split(",") : val;
                    this.$refs.elTree.setCheckedKeys(arr);
                    this.node = this.$refs.elTree.getCheckedNodes();
                }
            } else {
                if (!val && val !== "") {
                    this.$refs.elTree.setCurrentKey(null);
                    this.node = [];
                } else {
                    this.$refs.elTree.$nextTick(() => {
                        this.$refs.elTree.setCurrentKey(val);
                        this.node = [this.$refs.elTree.getCurrentNode()];
                    });
                }
            }
        },
        text(val) {
            if (!this.multiple) {
				let selectedNode = this.$refs.elTree.getCurrentNode();
				// // console.log(selectedNode)
                if (this.noFilter) {
                    this.$refs.elTree.filter("");
                    this.noFilter = false;
                    return false;
                }
                this.$refs.elTree.filter(val);
            }
        }
    },
    model: {
        prop: "value",
        event: "current-change"
    },
    props: {
        value: {
            default: ""
        },
        opt: {
            type: Object,
            default: function() {
                return {};
            }
        },
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        auth: {
            type: Object,
            default() {
                return {};
            }
        },
        suffixIcon: {
            type: String
        }
    },
    methods: {
        panelShow() {
            var treePanel = this.$refs.elTree.$el;
            var options = treePanel.getElementsByClassName(
                "el-tree-node__content"
            );
			var arr = this.$fromArray(options);
			// // console.log('arr:'+arr)
            if (options.length > 0) {
                var s = treePanel.getElementsByClassName("treebox-selected");
                if (s.length > 0) {
                    s[0].removeClass("treebox-selected");
                }
                var i = getIndex(0, arr, false, true);
                if (i != -1) {
                    options[i].addClass("treebox-selected");
                }
            }
            this.$emit("show");
        },
        panelHide() {
            this.$emit("hide");
        },
        show() {
            this.showPanel = true;
        },
        hide() {
            this.showPanel = false;
        },
        change(value) {
			this.$emit("change", value);
        },
        focus(e) {
            this.$emit("focus", e);
        },
        blur(e) {
            this.showPanel = false;
            this.$emit("blur", e);
        },
        clear() {
            if (this.multiple) {
                this.$refs.elTree.setCheckedKeys([]);
            }
            this.currentChange({}, null);
            this.$emit("clear");
        },
        nodeClick(value, node, component) {
            this.$emit("node-click", value, node, component);
        },
        nodeContextmenu(e, value, node, component) {
            this.$emit("node-contextmenu", e, value, node, component);
        },
        checkChange(value, selected, subSelected) {
            if (this.multiple) {
                var arr = this.$refs.elTree.getCheckedKeys();
                this.myvalue = arr.join(",");
            }
            this.$emit(
                "current-change",
                this.myvalue,
                value,
                this.$refs.elTree.getNode(value[this.opt.nodeKey])
            );
            this.$emit("check-change", value, selected, subSelected);
        },
        check(value, selectedStatus) {
			this.$emit("check", value, selectedStatus);
			// console.dir(value)
        },
        currentChange(value, node) {
            if (this.multiple) {
                var arr = this.$refs.elTree.getCheckedKeys();
                arr.push(value[this.opt.nodeKey]);
                this.myvalue = arr.join(",");
            } else {
                // 选中的时候不作过滤
                this.noFilter = true;
                this.myvalue = value[this.opt.nodeKey];
                if (this.text === value[this.opt.props.label]) {
                    // 如果选中的名称和过滤值相同则直接置为初始状态
                    this.$refs.elTree.filter("");
                } else {
                    // 如果选中的名称和原过滤值不同则直接将input值置为选中的名称，触发text的watch监听
                    this.text = value[this.opt.props.label];
                }
            }
            if (!this.multiple) {
                this.hide();
            }
            var val = this.myvalue;
            this.$emit("current-change", val, value, node);
        },
        nodeExpand(value, node, component) {
            this.$emit("node-expand", value, node, component);
        },
        nodeCollapse(value, node, component) {
            this.$emit("node-collapse", value, node, component);
        },
        filterNode(value, data) {
            if (!value || this.opt.trigger == 'manual') return true;
            return data[this.opt.props.label].indexOf(value) !== -1;
        },
        findIndex(arr, obj) {
            for (var i in arr) {
                if (arr[i] === obj) {
                    return parseInt(i);
                }
            }
        },
        reload: function(data) {
            if (!this.opt.url) {
                return false;
            }
            data = data || {};
            if (this.opt.extendParams)
                data = this.$assign(data, this.opt.extendParams);
            var vm = this;
            this.$ajax({
                url: this.opt.url,
                method: this.opt.method ? this.opt.method : "post",
                data: data,
                success: function(re) {
                    if (vm.dataProp.data == "") {
                        vm.$set(vm, "mydata", re ? re : []);
                    } else {
                        vm.$set(
                            vm,
                            "mydata",
                            re[vm.dataProp.data] ? re[vm.dataProp.data] : []
                        );
                    }
                }
            });
        },
        actionAdd() {
            if (this.opt.toolsBar.addFunc) {
                eval(this.opt.toolsBar.addFunc());
            } else if (self !== top && this.opt.toolsBar.addUrl) {
                var $root = window.parent.$vueEl.$children[0];
                $root.tabOpen(
                    this.opt.toolsBar.title,
                    this.opt.toolsBar.addUrl
                );
            }
        },
        actionRef() {
            this.reload();
		}
    },
    created() {
        this.actionBar = this.opt.toolsBar || this.$slots.action;
        if (this.opt.toolsBar) {
            this.ref = this.opt.toolsBar.ref;
            this.add =
                this.opt.toolsBar.addUrl ||
                typeof this.opt.toolsBar.addFunc === "function"
                    ? true
                    : false;
        }
        this.opt.checkStrictly =
            typeof this.opt.checkStrictly === "boolean"
                ? this.opt.checkStrictly
                : true;
        this.opt.size = this.opt.size ? this.opt.size : "small";
        this.opt.clearable =
            typeof this.opt.clearable === "boolean" ? this.opt.clearable : true;
        this.opt.emptyText = this.opt.emptyText
            ? this.opt.emptyText
            : "没有数据";
        this.opt.props = this.opt.props
            ? this.opt.props
            : { children: "children", label: "name" };
        this.opt.nodeKey = this.opt.nodeKey ? this.opt.nodeKey : "id";
        this.opt.defaultExpandAll =
            typeof this.opt.defaultExpandAll === "boolean"
                ? this.opt.defaultExpandAll
                : true;

        this.opt.width =
            typeof this.opt.width === "string"
                ? this.opt.width
                : typeof this.opt.width === "number"
                ? this.opt.width + "px"
                : "200px";
        let defaultWidth =
            typeof this.opt.width === "string" && this.opt.width.indexOf("px")
                ? parseFloat(this.opt.width.replace("px", ""))
                : typeof this.opt.width === "number"
                ? this.opt.width
                : 200;
        this.opt.panelWidth =
            typeof this.opt.panelWidth === "string" &&
            this.opt.panelWidth.indexOf("px")
                ? parseFloat(this.opt.panelWidth.replace("px", ""))
                : typeof this.opt.panelWidth === "number"
                ? this.opt.panelWidth
                : defaultWidth;
        //减去padding
        this.opt.panelWidth -= 26;
        this.opt.highlightCurrent = true;
        if (this.multiple) {
            this.opt.highlightCurrent = false;
            this.opt.showCheckbox = true;
            this.opt.readonly = true;
        }
    },
    updated() {
        if (!this.multiple) {
            var treePanel = this.$refs.elTree.$el;
            var options = treePanel.getElementsByClassName(
                "el-tree-node__content"
            );
            var arr = this.$fromArray(options);
            if (options.length > 0) {
                var s = treePanel.getElementsByClassName("treebox-selected");
                if (s.length > 0) {
                    s[0].removeClass("treebox-selected");
                }
                var i = getIndex(0, arr, false, true);
                if (i != -1) {
                    options[i].addClass("treebox-selected");
                }
            }
        }
    },
    mounted() {
        //根据初始值选中节点
        if (this.multiple) {
            let arr =
                typeof this.value === "string"
                    ? this.value.split(",")
                    : this.value;
            this.$refs.elTree.setCheckedKeys(arr);
            this.node = this.$refs.elTree.getCheckedNodes();
        } else {
            // setTimeout(()=>{
            //     // console.log(this.value)
                this.$refs.elTree.setCurrentKey(this.value);
                this.$nextTick(()=>{
                    this.node = [this.$refs.elTree.getCurrentNode()];
                })
            // },0)
        }
        //由于控件原生的快捷键功能有缺陷，所以自定义了上下快捷键功能
        var vm = this;
        var $input = this.$refs.elInput.$el;
        var treePanel = this.$refs.elTree.$el;
        var options = treePanel.getElementsByClassName("el-tree-node__content");
        var arr = this.$fromArray(options);
        $input.addEventListener("keydown", function(e) {
            var s = treePanel.getElementsByClassName("treebox-selected");
            if (s.length == 0) {
                return false;
            }
            var $current = s[0];
            var index = vm.findIndex(arr, $current);
            if (e.keyCode == 38) {
                if (index > 0) {
                    var i = getIndex(index - 1, arr, true);
                    arr[i].addClass("treebox-selected");
                    $current.removeClass("treebox-selected");
                }
            } else if (e.keyCode == 40) {
                if (index < options.length - 1) {
                    var i = getIndex(index + 1, arr);
                    arr[i].addClass("treebox-selected");
                    $current.removeClass("treebox-selected");
                }
            } else if (e.keyCode == 13) {
                $current.click();
            } else if (e.keyCode == 8) {
                if (vm.text === "") {
                    vm.value = "";
                }
            }
        });
        //设置url后，data会失效
        if (this.opt.url && typeof this.opt.url === "string") {
            this.reload();
        }
        //等树加载后再赋值
        this.$refs.elTree.$nextTick(() => {
			this.myvalue = this.value;
			
        });
        //将vue对象绑定在tree控件的最外层div
        this.$el.$vueEl = this;
    }
};
</script>
