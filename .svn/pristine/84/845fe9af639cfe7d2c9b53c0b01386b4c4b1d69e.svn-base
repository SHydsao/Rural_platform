<style>
  .elPop{
    min-width:50px !important;
  }
  .el-scrollbar{
    height:calc(100% - 32px);
  }
  .el-scrollbar__bar.is-horizontal{
    height:0px;
  }


</style>
<template>
  <div :style="{width:opt.width,height:opt.height}">
    <el-input v-if="opt.actionBar" ref="elInput" v-model="filterText"  :style="{width:opt.width}" :size="opt.inputSize" :disabled="opt.inputDisabled" :prefix-icon="opt.inputPrefixIcon" :suffix-icon="opt.inputSuffixIcon" :readonly="opt.inputReadonly" :clearable="opt.inputClearable" :placeholder="opt.inputPlaceholder">
        <el-popover slot="append" v-if="slotShow"
                placement="bottom" popper-class="elPop"
                trigger="click" v-model="popShow">
          <slot name="action">
          </slot>
          <el-button slot="reference" size="mini" class="el-icon-fant-other fant-action-btn"></el-button>
        </el-popover>
    </el-input>
    <el-scrollbar
      wrap-class="list"
      wrap-style="height:'calc(100% - 32px)';margin-right:0 !important;overflow-x:hidden;"
      view-class="view-box"
      :native="false">
        <el-tree  class="tree-bottom" ref="elTree" :style="{width:opt.width,height:'100%'}" :lazy="opt.lazy" :check-on-click-node="opt.checkOnClickNode" :data="mydata" :empty-text="opt.emptyText" :show-checkbox="opt.showCheckbox" :node-key="opt.nodeKey" :props="opt.props" :load="opt.lazyLoad?load:null" :highlight-current="true" :default-expand-all="opt.defaultExpandAll" :default-expanded-keys="opt.defaultExpandedKeys" :default-checked-keys="opt.defaultCheckedKeys" :filter-node-method="filterNode" :accordion="opt.accordion" :expand-on-click-node="opt.expandbyclicknode" :indent="opt.indent" :render-content="opt.renderContent" @check-change="checkChange" @node-contextmenu="nodeContextmenu" @check="check" @current-change="currentChange" @node-collapse="nodeCollapse" @node-expand="nodeExpand" @node-click="nodeClick">
          <span v-if="opt.bottomTree" slot-scope="{node, data}" class="elTreeSlot row" style="float:left;width: calc(100% - 24px);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            <div v-if="slotScopeShow" style="display:inline-block;padding-right:10px" class="el-tree-node__label text-ellipsis col" :title="data[opt.props.label]">{{data[opt.props.label]}}</div>
            <slot :node="node" :data="data"></slot>
            <div style="float:right;z-index:2000;padding-right:5px">
              <slot name="buttom" :node="node" :data="data"></slot>
            </div>
          </span>
          <span v-else slot-scope="{node, data}" class="elTreeSlot" style="float:left;max-width: calc(100% - 24px);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            <span v-if="slotScopeShow" class="el-tree-node__label" :title="data[opt.props.label]">{{data[opt.props.label]}}</span>
            <slot :node="node" :data="data"></slot>
          </span>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mydata:this.data,
        filterText: '',
        //定义url接口的返回数据参数名
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:"data"},
        slotShow:true,
        slotScopeShow:true,
        popShow:false,
      }
    },
    watch: {
      data(val){
        this.mydata = val;
        this.format();
      },
      filterText(val) {
        this.$refs.elTree.filter(val);
      },
      opt(val){
        this.opt.actionBar = typeof this.opt.actionBar === "boolean"?this.opt.actionBar:true;
        this.opt.inputSize = this.opt.inputSize?this.opt.inputSize:"mini";
        this.opt.inputPrefixIcon = this.opt.inputPrefixIcon?this.opt.inputPrefixIcon:"el-icon-search";
        this.opt.inputClearable = typeof this.opt.inputClearable === "boolean"?this.opt.inputClearable:true;
        this.opt.inputPlaceholder = this.opt.inputPlaceholder?this.opt.inputPlaceholder:"请输入进行过滤";
        this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
        this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
        this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
        this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

        this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
        this.opt.height = typeof this.opt.height === "string"?this.opt.height:typeof this.opt.height === "number"?this.opt.height+"px":null;
      }
    },
    props:{
      opt:{
        type:Object,
        default:function(){
          return {};
        }
      },
      data:{
        type:Array,
        default:function(){
          return [];
        }
      }
    },
    methods:{
      //添加root节点
        format(){
          if((typeof this.opt.root === 'boolean' && this.opt.root) || typeof this.opt.root === 'object'){
            let data = [{}];
            data[0][this.opt.props.label] = '全部';
            data[0][this.opt.nodeKey] = '';
            data[0][this.opt.props.children] = this.mydata;
            if(typeof this.opt.root === 'object'){
                this.$assign(data[0], this.opt.root)
            }
            this.mydata = data;
          }
        },
        extend:function(target,source){
            for (var obj in source) {
                target[obj] = source[obj];
            }
            return target;
        },
        showActionBar(){
          this.popShow = true
        },
        hideActionBar(){
          this.popShow = false
        },
        appendC:function(data,subNode){
          if (!data.children) {
              this.$set(data, 'children', []);
          }
          for(var i in subNode){
              const newChild = {id: subNode[i].id,moduleId:subNode[i].moduleId,parentId:subNode[i].parentId,label: subNode[i].name,name: subNode[i].name,children:subNode[i].children};
              data.children.push(newChild);
          }
        },
        removeC:function(data){
            return this.$refs['elTree'].remove(data);
        },
        load(node, resolve){
            this.$emit('load',node, resolve);
        },
      nodeClick(value,node,component){
        this.$emit('node-click',value,node,component);
      },
      getCurrentNode:function(){
        return this.$refs['elTree'].getCurrentNode();
      },
      nodeContextmenu(e,value,node,component){
        this.$emit('node-contextmenu',e,value,node,component);
      },
      checkChange(value,selected,subSelected){
        this.$emit('check-change',value,selected,subSelected);
      },
      check(value,selectedStatus){
        this.$emit('check',value,selectedStatus);
      },
      currentChange(value,node){
        this.$emit('current-change',value,node);
      },
      nodeExpand(value,node,component){
        this.$emit('node-expand',value,node,component);
      },
      nodeCollapse(value,node,component){
        this.$emit('node-collapse',value,node,component);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data[this.opt.props.label].indexOf(value) !== -1;
      },
      reload:function(data){
        if(!this.opt.url||(typeof this.opt.readyLoad!="undefined"&&!this.opt.readyLoad)){
          return false;
        }
        data = data || {};
        if(this.opt.extendParams) data = this.extend(data,this.opt.extendParams)
        var vm = this;
        vm.$ajax({
            url:vm.opt.url,
            method:vm.opt.method?vm.opt.method:"post",
            data:data,
            emulateJSON:this.opt.emulateJSON?vm.opt.emulateJSON:false,
            success:function(re){
              if(vm.dataProp.data == ""){
                vm.$set(vm,"mydata",re?re:[]);
              }else{
                vm.$set(vm,"mydata",re[vm.dataProp.data]?re[vm.dataProp.data]:[]);
              }
                vm.format();
            }
        });
      }
    },
    created(){
        this.opt.actionBar = typeof this.opt.actionBar === "boolean"?this.opt.actionBar:true;
      this.opt.inputSize = this.opt.inputSize?this.opt.inputSize:"small";
      this.opt.inputPrefixIcon = this.opt.inputPrefixIcon?this.opt.inputPrefixIcon:"el-icon-search";
      this.opt.inputClearable = typeof this.opt.inputClearable === "boolean"?this.opt.inputClearable:true;
      this.opt.inputPlaceholder = this.opt.inputPlaceholder?this.opt.inputPlaceholder:"请输入进行过滤";
      this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
      this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
      this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
      this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

      this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
      this.opt.height = typeof this.opt.height === "string"?this.opt.height:typeof this.opt.height === "number"?this.opt.height+"px":null;
    },
    mounted:function(){
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string") {
        this.reload();
      }
      //将vue对象绑定在tree控件的最外层div
      this.$el.$vueEl = this;
      this.slotScopeShow = this.$scopedSlots.default?false:true;
      this.slotShow = this.$slots.action?true:false;
    },
  }
</script>
