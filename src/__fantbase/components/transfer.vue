<style scoped>
  .fant-transfer-left{
    width: calc(50% - 10px);
    display:inline-block;
    min-height:300px;
    float:left;
  }
  .fant-transfer-right{
    width: calc(50% - 10px);
    display:inline-block;
    min-height:300px;
    float:left;
    margin-left:20px;
  }
  .fant-transfer-title{
    height:30px;
    line-height:30px;
    width:100%;
    text-align:center;
    font-size:14px;
    font-weight:bold;
    color:#000;
  }
  .fant-transfer-main{
    background:#f5f5f5;
    border:1px solid #ccc;
    border-radius:3px;
    min-height:270px;
    height:calc(100% - 62px);
    padding:15px;
  }
  .fant-transfer-main ul li{
    color:#000;
    height:26px;
    line-height:26px;
    overflow:hidden;
  }
  .fant-transfer-main ul li >>>  .el-checkbox__label{
    color:#000;
    max-width:calc(100% - 30px);
  }
  .fant-transfer-main ul li >>> .is-checked .el-checkbox__label{
    color:#409EFF;
  }
  .fant-transfer-item-icon{
    width:16px;
    height:16px;
    font-size:16px;
    margin-top:5px;
    margin-right:5px;
  }
  .fant-transfer-del-btn{
    width:14px;
    height:14px;
    font-size:14px;
    margin-top:6px;
    margin-left:10px;
    cursor:pointer;
    color:#666;
  }
  .fant-transfer-del-btn:hover {
    color:#409EFF;
  }
  .fant-transfer-text-ellipsis{
    white-space:nowrap;overflow: hidden;text-overflow: ellipsis;
  }
  .fant-transfer-checkbox{
    width:100%;
  }
  .fant-transfer{
    min-width:500px;
    min-height:300px;
  }
  .fant-transfer-item-disabled{
    cursor:not-allowed;
  }
  .fant-transfer-item-disabled span,.fant-transfer-item-disabled i{
    color:#c0c4cc;
  }
</style>
<template>
  <div class="fant-transfer" :style="{width:opt.width,height:opt.height}">
    <div class="fant-transfer-left" :style="{height:opt.height}">
      <div class="fant-transfer-title">{{title1?title1:'选择：'}}</div>
      <div class="fant-transfer-main">
        <div class="fant-transfer-search">
          <el-input v-if="opt.filterable" v-model="searchKey" prefix-icon="el-icon-search" clearable size="small" :placeholder="opt.searchTips"></el-input>
        </div>
          <el-checkbox style="margin:5px 0 0 0;" class="fant-transfer-checkbox fant-transfer-text-ellipsis" :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
        <ul :style="opt.filterable?'height:calc(100% - 56px);overflow:auto;':'height:calc(100% - 26px);overflow:auto;'">
          <el-checkbox-group v-model="leftValue" @change="checkedChange">
          <li v-for="item in mydata" :key="item[opt.props.value]" :title="item[opt.props.label]" :class="{'fant-transfer-item-disabled':item[opt.props.disabled]}">
            <el-checkbox class="fant-transfer-checkbox fant-transfer-text-ellipsis" :disabled="item[opt.props.disabled]" :label="item"><i class="fant-transfer-item-icon" :class="opt.listIcon" v-if="opt.listIcon"></i>{{item[opt.props.label]}}</el-checkbox>
          </li>
          </el-checkbox-group>
        </ul>
      </div>
    </div>
    <div class="fant-transfer-right" :style="{height:opt.height}">
      <div class="fant-transfer-title">{{title2?title2:'已选：'}}</div>
      <div class="fant-transfer-main">
        <ul style="height:100%;overflow:auto;">
          <li v-for="(item,index) in leftValue" :key="item[opt.props.value]" :title="item[opt.props.label]" :class="{'fant-transfer-item-disabled':item[opt.props.disabled]}">
            <i class="fant-transfer-item-icon" style="float:left;" :class="opt.listIcon" v-if="opt.listIcon"></i>
              <span class="fant-transfer-text-ellipsis" style="width:calc(100% - 50px);float:left;">{{item[opt.props.label]}}</span>
              <i class="el-icon-circle-close fant-transfer-del-btn" v-if="!item[opt.props.disabled]" style="float:left;" @click="delRightData(item,index)"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          mydata:[],
          myvalue:this.value,
          leftValue:[],
          title1:null,
          title2:null,
          checkAll:false,
          isIndeterminate:false,
          //根据id获取index速查表
          indexTable:{},
          //过滤关键字
          searchKey:'',
          //非disabled的数据
          allData:[],
          //初始右边选中数据的disabled数据集合
          rightDisabledData:[]
      }
    },
    watch:{
      data(val){
          this.initOpt();
      },
      value(val){
          if(this.myvalue != val){
              this.myvalue = val;
          }
      },
      myvalue(val){
          this.initOpt();
      },
      searchKey(val){
          if(val != ''){
              this.mydata = this.data.filter(item=>item[this.opt.props.label].indexOf(val) !== -1);
          }else{
              this.mydata = this.data;
          }
      }
    },
    model:{
      prop:'value',
      event:'change'
    },
    props:{
        opt:{type:Object,default:()=>{return {};}},
        value:{type:Array,required:true},
        data:{type:Array,default:()=>{return [];}}
    },
    methods:{
        checkAllChange(val){
            this.searchKey = '';
            let selData = this.allData.concat(this.rightDisabledData);
            this.$nextTick(()=>{
                this.leftValue = val ? selData : this.rightDisabledData;
                this.isIndeterminate = false;
            });
            let value = this.getValue();
            this.myvalue = value;
            this.$emit('change', value, this.leftValue);
        },
        checkedChange(value){
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.mydata.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.mydata.length;
            let val = this.getValue();
            this.myvalue = val;
            this.$emit('change', val, this.leftValue);
        },
        getValue(){
            let arr = [];
            this.leftValue.forEach(item=>{
                arr.push(item[this.opt.props.value]);
            });
            return arr;
        },
        delRightData(val,index){
          this.leftValue.splice(index,1);
          let value = this.getValue();
            this.myvalue = value;
          this.$emit('change', value, this.leftValue);
        },
        initData(data){
            this.allData = [];
            data.forEach((item,index)=>{
                this.indexTable[item[this.opt.props.value]] = index;
                if(!item[this.opt.props.disabled]){
                    this.allData.push(item);
                }
            });
            return data;
        },
        getDataByValue(value){
            let val = value;
            let arr = [];
            this.rightDisabledData = [];
            val.forEach(item=>{
               arr.push(this.mydata[this.indexTable[item]]);
               if(this.mydata[this.indexTable[item]][this.opt.props.disabled]){
                   this.rightDisabledData.push(this.mydata[this.indexTable[item]]);
               }
            });
            return arr;
        },
        initOpt(){
            this.opt.props = this.opt.props || {};
            this.opt.searchTips = this.opt.searchTips || '请输入进行过滤';
            if(typeof this.opt.props === 'object'){
                this.opt.props.value = this.opt.props.value?this.opt.props.value:'id';
                this.opt.props.label = this.opt.props.label?this.opt.props.label:'name';
                this.opt.props.disabled = this.opt.props.disabled?this.opt.props.disabled:'disabled';
            }
            this.opt.width = typeof this.opt.width === 'number'?this.opt.width+'px':this.opt.width;
            this.opt.height = typeof this.opt.height === 'number'?this.opt.height+'px':this.opt.height;
            this.title1 = this.opt.titles instanceof Array && this.opt.titles[0]?this.opt.titles[0]:null;
            this.title2 = this.opt.titles instanceof Array && this.opt.titles[1]?this.opt.titles[1]:null;
            this.mydata = this.initData(this.data);
            this.leftValue = this.getDataByValue(this.myvalue) || [];
            this.$nextTick(()=>{
                this.checkAll = false;
                this.isIndeterminate = false;
                if(this.leftValue.length > 0 && this.leftValue.length != this.mydata.length){
                    this.isIndeterminate = true;
                }else{
                    this.isIndeterminate = false;
                    if(this.leftValue.length == this.mydata.length){
                        this.checkAll = true;
                    }
                }
            })

        }
    },
  }
</script>
