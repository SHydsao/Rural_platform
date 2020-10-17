<style scoped>
.box{height: 32px;line-height: 32px;background-color: #FFFFFF;border-radius: 4px;border: 1px solid #C2C5CE;width: 100%;cursor:pointer;text-align: center }
.input{}
.timer>>>.el-form-item--small.el-form-item{margin: 0px}
.timer>>>.el-dialog__header{height: 30px;line-height: 30px;text-align: left;}
.timer>>>.content-wrap{height:calc(100% - 50px)!important;}
.timer>>>.dialog-title{position: relative;top:-5px}
.timer>>>.inputItem{display: block;margin-bottom: 18px!important;}
.timer>>>.el-date-editor.el-input, .el-date-editor.el-input__inner{width:calc(100% - 80px)!important}
.time-warp >>> .el-form-item__content{width:calc(100%)}
</style>
<template>
    <div style="width:100%" class="timer">
        <p v-show="isRead">{{text}}</p>
        <el-input v-show="!isRead" v-model="text"  class="input" @focus.stop="open" clearable @clear="clear" placeholder="请选择时间段"></el-input>
        <win :show="winshow" ref="win" :opt="winOpt" @close="close()"><!-- 这里win要用close回调进行关闭，否则会报错 -->
			<div class="win-wrap">
		        <div class="content-wrap time-warp" style="min-height:160px;">
                    <fant-form :model="windata" :opt="formOpt" ref="winForm" id="winForm" v-enter>
                        <!-- 这里不用content因为会被父组件样式影响 -->
                        <fant-form-item :opt="{prop:'start'}" class="inputItem">
                            <span>开始时间：</span>
                            <el-time-picker
                                v-model="windata.start"
                                value-format="HH:mm"
                                format='HH:mm' 
                            >
                            </el-time-picker>
                        </fant-form-item> 
                        <fant-form-item :opt="{prop:'end'}" class="inputItem">
                            <span>结束时间：</span>
                           <el-time-picker
                                v-model="windata.end"
                                value-format="HH:mm"
                                format='HH:mm' 
                            >
                            </el-time-picker>
                        </fant-form-item> 
                    </fant-form>
		        </div>
                <div class="action">
                    <el-button v-if="isCopy" class="fant-btn-third fl" style="margin-top:10px;" @click="copy">复制到其他天</el-button>
                    <el-button class="fant-btn-secondary" @click="save()">保存</el-button>
                    <el-button class="fant-btn-third" @click="winshow=false">关闭</el-button>
                </div>
			</div>
            
		</win>
    </div>
</template>
<script>
export default {
    props:{
        value:{},
        isRead:{type:Boolean,default:false},
        isCopy:{type:Boolean,default:false}
    },
    model:{
        prop: 'value',
        event: 'change'
    },
    watch:{
        value:{
            handler:function(val){
                this.change();
            },
            immediate:true
        }

    },
    data(){
        return{
            text:'',
            winshow:false,
            winOpt:{
                title:'设置时间',
                width:"420px"
            },
            windata:{
                start:'',
                end:'',
            },
            formOpt:{
                labelWidth:'0',
                inline:true,
                rules:{
                    start:[
                        { required:true,message:'请选择开始时间',trigger:'change'}
                    ],
                    end:[
                        { required:true,message:'请选择结束时间',trigger:'change'},
                        { validator:this.valid,message:'结束时间必须大于开始时间',trigger:'change'}
                    ],  
                }
            }
        }
    },
    methods:{
        open(){
            this.$emit('open');
            this.winshow = true;
            this.$nextTick(()=>{
                this.$refs.winForm.clearValidate();
            })
            
        },
        close(){
            this.$emit('close');
            this.winshow=false;
        },
        valid(rule, value, callback){//校验
            var oDate1 = new Date('2016/8/2 '+this.windata.start);
            var oDate2 = new Date('2016/8/2 '+this.windata.end);
            if(oDate1.getTime() < oDate2.getTime()){
                callback();
            } else {
                callback(new Error('结束时间不能大于开始时间'));
            }
        },
        copy(){
            this.$refs.winForm.validate(valid=>{
				if(valid){
                    this.$emit('change',[this.windata.start,this.windata.end]);
                    this.$emit('refresh',[this.windata.start,this.windata.end])
                    this.winshow = false;
                    
                }
            })
        },
        change(){
            this.windata.start = this.value[0];
            this.windata.end = this.value[1];
            let text1 = this.windata.start + ' - ' + this.windata.end;
            this.text = this.windata.start?text1:''
        },
        save(){
            this.$refs.winForm.validate(valid=>{
				if(valid){
                    // this.change();
                    this.$emit('change',[this.windata.start,this.windata.end]);
                    this.winshow = false;
                }
            })
        },
        clear(){
            this.$emit('change',[null,null]);
        }
    },
    mounted(){ 
    }
}
</script>