<style scoped>
.actionHeader {
  margin: 0;
}

.btn-type-text {
  padding: 5px;
}

.inputItem {
  width: 300px;
}

.el-menu-item {
  padding-right: 0;
  margin-top: 0px;
  margin-bottom: 10px;
  height: 45px;
  line-height: 45px;
}
.el-menu-item :hover {
  background-color: white;
}
.el-menu-item.is-active {
  background-color: #e6f7ff;
  border-right: 3px solid #1591ff;
  color: #1591ff;
}
p {
  padding: 0;
  margin: 0;
}
.form1 >>> .el-form-item__content {
  margin-left: 0px !important;
  width: 100%;
}
.form1 >>> .el-form-item--small .el-form-item__label {
  text-align: left !important;
  width: 100% !important;
}

.input-item {
  width: 100% !important;
}
.box1 {
  height:calc( 100% - 20px); background-color:white ;padding-left:40px; padding-top:5px;
}
.el-menu {
  border-right: 0px;
}
.photo {
  width: 150px;
  height: 200px;
}
.image1 {
  margin-top: 10px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
}
.el-button {
  display: block;
}
.el-button--small {
  padding: 9px 25px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-menu-demo >>>.el-menu-item{
  color: #797979;
}
.el-menu-demo >>>.el-menu-item.is-active{
  color: #409EFF
}
.page-box, .page-box>div{width:auto!important}

.absolute_right{position: absolute;top: 32px;right: 10px;color: #c0c4cc;}
.interestRate>>>.input__inner{background:rgba(255,255,255,0)!important}
</style>

<template>
	<div v-cloak  style="margin:10px;background-color:white ;padding-top:20px;height:calc( 100% - 40px)" >
		<el-row style="height:100%">
            <!-- 企业信息 -->
            <el-col :span=24 class="box1">
                <p style="font-size:20px">企业配置</p>
                <el-row style="overflow:auto;height: calc( 100% - 20px)">
                <el-col :span="6">
                <fant-form class="form1" :opt="formOpt"  :model="firmBaseForm" >
                    <el-form-item label='资金日损率' style="margin-top:20px" prop="interestRate">
                      <el-input class="input-item interestRate"  placeholder="请输入资金日损率" v-model="firmBaseForm.interestRate"></el-input>
                      <span class="pull-right absolute_right">资金日损率(%)</span>
                    </el-form-item>
                    <el-button type="primary"  size="medium" style="margin-top:30px" @click="editFirmForm">更新企业配置</el-button>
                </fant-form>
                </el-col>
                </el-row>
            </el-col>
		</el-row>
	</div>
</template>
<script>
export default {
  name:'webSetting',
  data() {
    return {
      firmBaseArr:[],
      uploadBaseArr:[],
      firmBaseForm:{
        interestRate:''
      },
      formOpt: {
        rules: {
          // interestRate: [
          //   { required: true, validator: valid.notEmpty, trigger: ["change"] },
          //   {
          //     required: true,
          //     min: 0,
          //     max: 100,
          //     message: "请输入0~100资金日损率",
          //     trigger: "change"
          //   }
          // ],
        }
      },
    };
  },

  methods: {
    editFirmForm(){
      if(this.firmBaseForm.value == ""){
        this.$message({ message: "资金日损率不能为空", type: "error" });
        return;
      }
      this.uploadBaseArr.forEach(item=>{
        if(item.key=='interestRate'){
          item.value = ((this.firmBaseForm.interestRate)/100).toFixed(6);
        }
      })
      // console.log(this.firmBaseForm);
      this.showLoading()
      this.$http.patch('/web/firmconfig/batch', this.uploadBaseArr).then(re=>{
        if(re.ok){
          this.firmBaseForm.interestRate = Number(this.firmBaseForm.interestRate).toFixed(6);
          this.$message({ message: "更新成功", type: "success" });
        }else{
          this.$message({ message: re.message, type: "error" });
        }
      })
    },
    selectProvince(value,opt){
      this.baseForm.provinceName = opt.name;
      this.getId();
    },
    selectCity(value,opt){
      this.baseForm.cityName = opt.name
    },
  },
  mounted() {
    this.showLoading()
    this.$http.get( '/web/firmconfig').then(re => {
      this.firmBaseArr = re.data;
      // console.log(this.firmBaseArr);
      this.firmBaseArr.forEach((item,index)=>{
        if(item.key=='interestRate'){
          this.uploadBaseArr.push(item);
          this.firmBaseForm.interestRate = ((item.value)*100).toFixed(6);
        }
      })
      // console.log(this.firmBaseForm);
    })
  }
};
</script>