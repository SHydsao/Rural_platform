<style scoped>
.el-range-editor--small.el-input__inner{width:100%}
.table-text>>> td{padding:8px 0 !important;}
.table-text{font-size: 12px}
.el-form-item{width:100%}
.el-button{padding: 0px}
.basetable >>> .el-date-editor .el-range__icon{display: none;}
.basetable>>>.el-form-item--small.el-form-item{margin: 0px}
.basetable >>> .el-table .cell{overflow:none !important;}
/* .table-list2 >>> .el-input__icon{display: none} */
.basetable >>> .is-scrolling-none{overflow-y:auto!important}
.buttom>>>.el-radio-button__inner{padding: 10px;font-size: 14px;}
.buttom{margin-bottom: 15px;float: right;}
/* .timeBox{width:100%} */
.timeBox >>> .el-form-item__content{width:100%}
.text-box{line-height:36px;padding-left: 15px;position: relative;color: black}
.text-box::before{content: '';height: 20px;width:4px;background-color: #2a82db;display: block;position: absolute;top: 0px;border-radius:2px}
</style>
<template>
    <div style="height:470px;padding-bottom:10px">
        <span class="text-box">{{text}}</span>
        <el-radio-group v-model="activeName" size="mini" class="buttom">
            <el-radio-button label="first">切换工作日</el-radio-button>
            <el-radio-button label="second">切换每天</el-radio-button>
        </el-radio-group>
        <!-- 出现滚动条会导致表格闪烁 所以此处用v-show -->
        <div  v-show="activeName=='first'">
            <el-table class="table-list table-text basetable" :data="table.data" row-key="key" ref="table" border :height="height">
                <el-table-column prop="edit" label="操作" width="120" v-if="isRead==false">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-fant-add" title="新增" class="action_text" @click="addCell(scope.row)"></el-button>
                        <el-button type="text" icon="el-icon-delete" title="删除" class="action_text" @click="removeCol(scope.row,scope.$index)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column :prop="col.prop" :label="col.label" v-for="col in timeTable" :key="col.prop">
                    <template slot-scope="scope">
                        <fant-form :ref="col.refname+scope.$index" :opt="FormOpt" :model="scope.row" class="timeBox"  v-show="!scope.row[col.$prop]">
                            <fant-form-item :opt="{prop:col.prop+'.time'}">
                                <fant-time-picker v-model="scope.row[col.prop].time" :isRead="isRead" @open="changeIndex(scope)" @change="saveCell(scope.row,scope.$index,col.prop,'time',col.refname)">
                                </fant-time-picker>
                            </fant-form-item>
                        </fant-form>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="activeName=='second'">
            <el-table :data="table.data" class="table-list2 table-text basetable" row-key="key" border :height="height">
                <el-table-column prop="edit" label="操作" width="120"  v-if="isRead==false">						  
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-fant-add" title="新增" class="action_text" @click="addCell(scope.row)"></el-button>
                        <el-button type="text" icon="el-icon-delete" title="删除" class="action_text" @click="removeCol(scope.row,scope.$index)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column :prop="col.prop" :label="col.label" v-for="col in timeTable2" :key="col.prop" width="150">
                    <template slot-scope="scope">
                        <fant-form :ref="col.refname+scope.$index" :opt="FormOpt" :model="scope.row" class="timeBox"  v-show="!scope.row[col.$prop]">
                            <fant-form-item :opt="{prop:col.prop+'.time'}">
                                <fant-time-picker v-model="scope.row[col.prop].time" :isRead="isRead" @open="changeIndex(scope)" @change="saveCell(scope.row,scope.$index,col.prop,'time',col.refname)">
                                </fant-time-picker>
                            </fant-form-item>
                        </fant-form>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import Sortable from "sortablejs"
export default {
    props:{
        text:{default:'时间表'},
        isRead:{type:Boolean,default:false},
    },
    computed:{
        height(){
            return 420;
        },
        // time(){
        //     return this.activeName=='first'?this.timeTable:this.timeTable2;
        // }
    },
    data(){
        let judgement=(rules,value,callback)=>{
            if(this.table.data.length == 1 || this.clickIndex == null){
                callback();
                return;
            }
            let switchData = ['monday','saturday','sunday','tuesday','wednesday','thursday','friday']
            let isError;
            let {type}=rules;
            let start='',end='';
            if(value){
                start=value[0];end=value[1];
            }
            // 当前编辑的时间
            let current=this.table.data[this.clickIndex];
            let cloneData=this.$deepCopy(this.table.data);
            cloneData.splice(this.clickIndex,1);
            // console.log(current,cloneData)
            var len=Object.keys(cloneData).length;
            let valid=false,attr='',val='';
            val = 'time';
            attr = switchData[type - 1];
            let j=0;
            if(len>0){					
                for(let item of cloneData){		
                        
                    // 8:00-9:00  删除当前的时间跟其他时间比较
                        // 1. 8:00-9:00  2. 7:00-8:15  3.  8:20-8:40 4. 8:40-9:50	
                        // // console.log(type,item[attr][val])
                    // debugger;
                    if(item[attr][val][0] !== ''){	
                        // console.log(cloneData)
                        if(start == item[attr][val][0]){
                            valid=true;
                            // console.log(1,start +'=>'+ item[attr][val][0])							
                            break;
                        }else if(end > item[attr][val][0] && start < item[attr][val][0]){
                            valid=true;
                            // console.log(2)
                            break;
                        }else if((start > item[attr][val][0] && start < item[attr][val][1]) && end < item[attr][val][1]){
                            valid=true;
                            // console.log(3)
                            break;
                        }else if((start > item[attr][val][0] && start < item[attr][val][1]) && end >= item[attr][val][1]){
                            valid=true;
                            // console.log(4)
                            break;
                        }
                    }						
                }
            }
            
            if(valid){
                callback(new Error('该时间段已有活动'));
                // console.log('失败')
            }else{
                callback();
                // console.log('成功')
            }
        }
        return{
            clickIndex:'',
            activeName:'first',
            baseTime:{
                friday: {startTime: null, endTime: null,time:['','']},
                monday: {startTime: null, endTime: null,time:['','']},
                saturday: {startTime: null, endTime: null,time:['','']},
                sunday: {startTime: null, endTime: null,time:['','']},
                thursday: {startTime: null, endTime: null,time:['','']},
                tuesday: {startTime: null, endTime: null,time:['','']},
                wednesday: {startTime: null, endTime: null,time:['','']}
            },
            table:{
                data:[
                ],
            },
            timeTable:{
                monday:{prop:'monday',$prop:'$monday',label:'星期一到星期五',refname:'monday1'},
                saturday:{prop:'saturday',$prop:'$saturday',label:'星期六',refname:'saturday1'},
                sunday:{prop:'sunday',$prop:'$sunday',label:'星期日',refname:'sunday1'},
            },
            timeTable2:{
                monday:{prop:'monday',$prop:'$monday',label:'星期一',refname:'monday2'},
                tuesday:{prop:'tuesday',$prop:'$tuesday',label:'星期二',refname:'tuesday2'},
                wednesday:{prop:'wednesday',$prop:'$wednesday',label:'星期三',refname:'wednesday2'},
                thursday:{prop:'thursday',$prop:'$thursday',label:'星期四',refname:'thursday2'},
                friday:{prop:'friday',$prop:'$friday',label:'星期五',refname:'friday2'},
                saturday:{prop:'saturday',$prop:'$saturday',label:'星期六',refname:'saturday2'},
                sunday:{prop:'sunday',$prop:'$sunday',label:'星期日',refname:'sunday2'},
            },
            FormOpt:{
                inline:true,
                labelWidth:0,
                rules:{
                    'monday.time':[{required:true,validator:judgement,type:1,trigger:'change'}],
                    'saturday.time':[{required:true,validator:judgement,type:2,trigger:'change'}],
                    'sunday.time':[{required:true,validator:judgement,type:3,trigger:'change'}],
                    'tuesday.time':[{required:true,validator:judgement,type:4,trigger:'change'}],
                    'wednesday.time':[{required:true,validator:judgement,type:5,trigger:'change'}],
                    'thursday.time':[{required:true,validator:judgement,type:6,trigger:'change'}],
                    'friday.time':[{required:true,validator:judgement,type:7,trigger:'change'}]
                }
            },
        }
    },
    methods:{
        init(data){
            this.clickIndex=null;
            this.activeName='first';
            this.loading=true;
            if(data){
                this.loading=true;
                this.table.data=data;
                this.loading=false;
            }else{
                this.loading=false;
                this.table.data = [];
            }
            
            if(this.table.data.length==0){
                this.addCell();
            }		
        },
        oninit(){
            this.$nextTick(() => {
		        this.initSort()
		      })
            if(this.table.data.length==0){
                this.addCell();
            }
        },
        initSort() {
            const el = document.querySelectorAll(".table-list .el-table__body-wrapper > table > tbody")[0] // 获取拖拽的容器 
            Sortable.create(el, {
                animation: 180,
                ghostClass: "sortable-ghost",
                onEnd: evt => {
                    let targetObj = this.table.data.splice(evt.oldIndex, 1)[0];			                    
                    this.table.data.splice(evt.newIndex, 0, targetObj);
                }
            })

            const el2 = document.querySelectorAll(".table-list2 .el-table__body-wrapper > table > tbody")[0] // 获取拖拽的容器 
            Sortable.create(el2, {
                animation: 180,
                ghostClass: "sortable-ghost",
                onEnd: evt => {
                    let targetObj = this.table.data.splice(evt.oldIndex, 1)[0];			                    
                    this.table.data.splice(evt.newIndex, 0, targetObj);
                }
            })
        },
        getTimeGroup(){
            if(this.activeName == 'first'){//如果选择切换工作日，则星期1到5都变为星期一的日程
                for(let i in this.table.data){
                    let row = this.table.data[i]
                    Object.keys(row).forEach(key=>{
                        if(typeof row[key] == 'object'){
                            if(key == 'saturday' || key == 'sunday'|| key == 'type'){
                                return;
                            }
                            row[key].startTime=row.monday.time[0];
                            row[key].endTime=row.monday.time[1];
                            row[key].time=[row.monday.time[0],row.monday.time[1]];
                        }
                    })
                }
            }
            // console.log(this.table.data);
            return this.table.data;
            
        },
        changeIndex(scope){
            this.clickIndex=scope.$index;
        },
        addCell(){
            this.table.data.push({
                key:Math.random(),
                ...this.$deepCopy(this.baseTime),
            })
        },
        removeCol(row,index){
            if(row){
                if(this.table.data.length == 1 && JSON.stringify(this.table.data[1]) == JSON.stringify(this.baseTime[1])){
                    return;
                }

                this.$confirm({
                    msg:'确定删除吗？',
                    fn:bool=>{
                        this.table.data.splice(index,1);
                        if(this.table.data.length == 0){
                            this.addCell();
                        }
                    }
                })
            }
        },
        saveCell(row,index,name,isTime,ref){
            this.clickIndex=index;
            if(isTime == 'time'){
                this.$set(row[name],'startTime',row[name].time[0]);
                this.$set(row[name],'endTime',row[name].time[1]);
            }
        },
    },
    mounted(){
        this.oninit()
        
    }
}
</script>