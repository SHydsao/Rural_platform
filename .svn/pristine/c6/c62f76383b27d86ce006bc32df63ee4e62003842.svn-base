<style scoped>
  .page-home{
    padding:10px 0 0;
  }
  .msg-box{
    height:100%;
    width:calc(100% - 40px);
    padding:0 20px;
    background:#fff;
  }
  .msg-content{
    /* height:calc(100% - 51px); */
    height:100%;
  }
  .msg-box-left{
    width:450px;
  }
  .msg-box-right{
    width:calc(100% - 451px);
  }
  .news_news{background:url(~assets/images/news_date.png) no-repeat center;}
  .news_notice{background:url(~assets/images/news_plan.png) no-repeat center;}
  .news_personalChat{background:url(~assets/images/news_sec.png) no-repeat center;}
  .news_update{background:url(~assets/images/news_update.png) no-repeat center;}
  .news_task{background:url(~assets/images/news_work.png) no-repeat center;}
  .msg-box-left li{
      padding:10px 0;width:100%;
      border-bottom:1px solid #e7e7e7;cursor:pointer;
      position:relative;
  }
  .msg-box-left li:hover{
    background: #e6f8ff;
  }
  .msg-box-left li.select:after {
      content:'';
      background-color: #1591ff;
      width:3px;
      height:100%;
      position:absolute;
      margin-top:-10px;
      right: 0px;
  }
  .msg-box-left li .title, .msg-box-left li .date, .msg-box-left li .detail{
      height:25px;line-height:25px;font-size:12px;width:100%;
  }
  .msg-list-content{
      padding:0 10px;
  }
  .msg-list-content .title{
      font-size:16px !important;
  }
  .msg-box-right li{
      padding:10px 10px;width:100%;
	  box-sizing:border-box;
      border-bottom:1px solid #e7e7e7;cursor:pointer;
  }
  .msg-box-right li:hover{
      background: #e6f8ff;
  }
  .msg-box-right li .datetime{
      width:100%;
      height:20px;line-height:20px;
      font-size:12px;
  }
  .msg-box-right li .title{
      width:100%;
      height:30px;line-height:30px;
      font-size:14px;
  }
  .select{
      background: #e6f8ff;
  }
  .fant-emptydata-news{
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content: center;
  }
    .none{
        display:none;
    }
  .access,.studentAccess,.staffAccess{
      color:#ffa826;
  }
  .documentApproval,.unifyTeacherApply,.teacherSignIn,.meeting_notify,.studentSignIn,.deviceApply,.printApply,.purchase,.carApply,.changingCourse,.deviceRepairApply,.placeApply,.leaveApply,.noticeApply,.parentApply{
      color:#1AADFA;
  }
  .personalChat{
      color:#53cc99;
  }
  .news,.notice,.helper,.programme,.upgrade,.document{
      color:#21ABF1;
  }
	.consumer{
		color:#f4bc1e;
	}
.studentLeaveApplyWarning{
    color:red
}

  /* 聊天：53cc99  审批：1aadfa  考勤：1296db   消费：f4bc1e   门禁：ffa826 */
</style>
<template>
  <div class="page_box">
        <div class="el-top fff">
          <div class="top_tit">消息提醒</div>
        </div>
        <div class="main fff" style="padding:0 !important">
            <div class="msg-content">
                <div class="pull-left msg-box-left" style="border-right:1px solid #e7e7e7;height:100%;position:relative;">
                    <div v-if="moduleData.length == 0" class="fant-emptydata-news">
                        <!-- <span>暂时没有提醒</span> -->
                        <div class="empty_content">
                            <div class="noData-img"></div>
                            <!-- <img :src="require('@/assets/images/blank_bg2.png')" alt=""> -->
                            <div class="empty_text">暂无数据</div>
                        </div>
                    </div>
                    <ul v-else ref="moduleList" style="height:100%;" element-loading-text="拼命加载中"  v-loading="moduleLoading">
                        <li v-for="data in moduleData" :key="data.id" class="pull-left" :class="{'select':activeMsg.id?activeMsg.groupId == data.groupId&&activeMsg.firmId==data.firmId:data.id==activeModule.id,'none':data.groupId=='personalChat' || data.groupId == 'access'}" @click="getMsg(data)">
                            <!-- <div class="pull-left news_date el-icon-fant1-xiaoxi1"  style="padding:5px;color:#2A82DB;font-size:40px;"></div> -->
							<div class="pull-left news_date" :class="[type[data.groupId],data.groupId]"  style="padding:5px;font-size:40px;"></div>
                            <div class="pull-left msg-list-content" style="width:calc(100% - 150px);">
                                <span class="pull-left title text-ellipsis" :title="data.groupName+'：'+data.firmName">
                                    {{data.groupName}}：{{data.firmName}}
                                </span>
                                <span class="pull-left detail color-auxiliary3 text-ellipsis" :title="getContent(data)" v-html="getContent(data)">
                                </span>
                            </div>
                            <div class="pull-left" style="width:70px;">
                                <span class="pull-left" style="text-align: right;width: 100%;padding-right:10px;height: 25px;">
                                    <el-badge class="msg-count" v-show="data.unreadCount > 0" :value="data.unreadCount" :max="999" style="padding-top:5px;float:right;">
                                    </el-badge>
                                </span>
                                <span class="pull-left date color-auxiliary3" style="text-align: right;width:70px !important;">
                                    {{formatDate(data.createAt,'MM月dd日')}}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div> 
                
                <div class="pull-left msg-box-right" style="height:100%;position:relative;" ref="msgList">
					<fant-form :opt="{labelWidth:'90px',inline:true}" :model="page" style="margin-left:10px;padding-top:10px;">
						<fant-form-item>
							<fant-select 
								:opt="{idField:'id',textField:'text',prompt:'请选择查看状态',clearable:true,width:'140px'}" 
								v-model="page.state" 
								:data="[
									{id:'READ',text:'已读'},
									{id:'UNREAD',text:'未读'}
								]">								
							</fant-select>							
						</fant-form-item>
						<el-button class="fant-btn-primary" @click.native="searchMessage">查询</el-button>
					</fant-form>
					<ul v-show="messageData.length > 0" element-loading-text="拼命加载中"  v-loading="msgLoading" style="margin-left:10px;margin-right:10px;border-top:1px solid #e7e7e7;margin-top:-10px;width:calc(100% - 20px);box-sizing:border-box;height:calc(100% - 90px);overflow-y:auto;overflow-x:hidden;"  ref="msgListUl">
                        <li class="pull-left" :class="{'color-auxiliary4':msg.readState !== 'UNREAD','select':activeMsg.id === msg.id}" v-for="msg in messageData" :key="msg.id" @click="readMsg(msg)">
                            <div class="pull-left msg-detail-list-content" style="width:calc(100% - 40px);">
                                <span class="pull-left datetime text-ellipsis" :title="formatDate(msg.createAt)">
                                    {{formatDate(msg.createAt)}}
                                </span>
                                <span class="pull-left title text-ellipsis" :title="getContent(msg)" v-html="getContent(msg)">
                                </span>
                            </div>
                            <div class="pull-left" style="width:20px;">
                                <el-badge v-show="msg.readState === 'UNREAD'" is-dot style="margin-top: 20px;"></el-badge>
                            </div>
                        </li>
                    </ul>
					<div v-show="messageData.length == 0" class="msg-box-right" style="height:calc(100% - 100px) !important;position:relative;width:calc(100% - 20px) !important;">
					    <div class="fant-emptydata-news">
					        <!-- <span>暂时没有消息</span> -->
					        <div class="empty_content">
					            <div class="noData-img"></div>
					            <!-- <img :src="require('@/assets/images/blank_bg2.png')" alt=""> -->
					            <div class="empty_text">暂无数据</div>
					        </div>
					    </div>
					</div>
					<el-pagination
						ref="elPagination" 
						background 
						layout="total, sizes, prev, pager, next, jumper, slot" 
						@size-change="sizeChange" 
						:current-page="page.currentPage" 
						:page-sizes="[10, 20, 30, 40]" 
						:page-size="page.pageSize" 
						:total="page.total" 
						style="margin-top:5px;margin-left:10px;"
						@current-change="pageChange">
						<div slot style="display:inline-block;">
							<el-button v-if="page.ref" type="primary" @click="refresh" plain icon="el-icon-fant-refresh">
								<slot name="pageSlot"></slot>
							</el-button>
						</div>
					</el-pagination>
                </div>
            </div>
        </div>
		
  </div>
</template>

<script>
	 
    import Scrollbar from 'smooth-scrollbar';
    import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
    export default {
        name:"message",         
        meta:{
            name:'消息提醒',
        },
        beforeRouteEnter (to, from, next) {
            //如果本身不在消息页面，点击全局提示的查看时，会调用下面方法
            next(vm => {
                let msgData = vm.$route.query.msgData;
                if(msgData){
                    vm.$nextTick(() => {
                        vm.readMsg(msgData,true)
                    });
                }
            })
        },
        computed:{
            getRefreshKey() {
                return this.$store.state.message.msgRefresh;
            }
        },
        watch:{
            // '$route.query':{
            //     handler:function(val){
            //         let msgData = this.$route.query.msgData;
            //         if(msgData){
            //             this.$nextTick(() => {
            //                 // console.log(this.$refs.taskView)
            //                 this.readMsg(msgData,true)
            //             });
            //         }
            //     },
            //     immediate:true
            // },
            //如果本身在消息页面点击全局提示的查看时，会调用下面方法
            '$route.query'(to, from){
                let msgData = this.$route.query.msgData;
                if(msgData){
                    this.$nextTick(() => {
                        this.readMsg(msgData,true)
                    });
                }
            },
            getRefreshKey(val){
                if(val){
                    this.refreshData();
                }
            }
        },
        data () {
        return {
            moduleData:[],
			winShow:false,
			winOpt:{
				title:'审批',
				width:'800px'
			},
            messageSearch:{
                type:'task'
            },
            type:{
                'studentLeaveApplyWarning':'el-icon-fant1-xiaoxi1',
                'notice':'el-icon-fant1-xiaoxi1',
                'document':'el-icon-fant1-xiaoxi1',
                'helper':'el-icon-fant1-xiaoxi1',
                'upgrade':'el-icon-fant1-xiaoxi1',
                'programme':'el-icon-fant1-xiaoxi1',
                'news':'el-icon-fant1-xiaoxi1',
                'deviceRepairApply':'el-icon-fant1-shenpi1',
                'unifyTeacherApply':'el-icon-fant1-shenpi1',
                'noticeApply':'el-icon-fant1-shenpi1',
                'purchase':'el-icon-fant1-shenpi1',
                'parentApply':'el-icon-fant1-shenpi1',
                'consumer':'el-icon-fant1-xiaofei1',
                'personalChat':'el-icon-fant1-liaotian1',
                'leaveApply':'el-icon-fant1-shenpi1',
                'placeApply':'el-icon-fant1-shenpi1',
                'carApply':'el-icon-fant1-shenpi1',
                'documentApproval':'el-icon-fant1-shenpi1',
                'changingCourse':'el-icon-fant1-shenpi1',
                'printApply':'el-icon-fant1-shenpi1',
                'deviceApply':'el-icon-fant1-shenpi1',
                'studentAccess':'el-icon-fant1-menjin',
                'access':'el-icon-fant1-menjin',
                'studentSignIn':'el-icon-fant1-xiaoxi1',
				'meeting_notify':'el-icon-fant1-xiaoxi1',
                'teacherSignIn':'el-icon-fant1-xiaoxi1',
                'staffAccess':'el-icon-fant1-menjin'
            },
            activeModule:{},
            activeMsg:{},
            messageData:[],
            msgLoading:false,
            moduleLoading:false,
            busy:false,
            pageOpt:{
                pageNumber:0
            },
			page:{
				pageSize:10,
				total:10,
				currentPage:1,
				ref:true,
				state:null
			},
            //记录task和plan的工作通知模块的index速查表
            moduleIndexArr:{},
            scheduleWin:{
                show:false,
                opt:{
                    width:'600px',
                    height:'470px',
                    title:'日程'
                }
            },
            //为了解决大屏显示器开始不能滚动加载消息的问题
            msgListPb:0,
            msgIndexById:{}
        }
        },
        methods:{
			sizeChange(val){
				this.page.currentPage = 1;
				this.page.pageSize=val;
				this.getModuleMsg();
			},
			pageChange(val){
				this.page.currentPage = val;
				this.getModuleMsg();
			},
			refresh(){
				this.getModuleMsg();
			},
            //刷新分组信息，主要作用是为了根据websocket即时更新消息
            refreshData(){
                this.getModule();
                if(this.activeModule.id){
                    this.page.currentPage = 1;
                    this.messageData = [];
                    this.getModuleMsg();
                }
            },
            //获取分组里面的消息列表
            getMsg(data){
                this.activeModule = data;
                this.activeMsg = {};
                this.messageSearch.type = data.groupId;
                this.messageData = [];
                this.page.currentPage = 1;
				this.page.state=null;
                this.getModuleMsg();    
            },
            prevMsg(){
                if(this.msgIndexById[this.activeMsg.id] == 0){
                    return false;
                }
                if(this.messageSearch.type == 'task'){
                    this.roundReadMsg(this.msgIndexById[this.activeMsg.id] - 1);
                }
            },
            roundReadMsg(ind, next){
                if(ind < 0 || ind > (this.messageData.length - 1)){
                    return false;
                }
                let msg = this.messageData[ind];
                if(msg.businessId){
                    this.readMsg(msg);
                }else{
                    this.roundReadMsg(next?ind+1:ind-1,next);
                }
            },
            nextMsg(){
                if(this.msgIndexById[this.activeMsg.id] == (this.messageData.length - 1)){
                    return false;
                }
                if(this.messageSearch.type == 'task'){
                    this.roundReadMsg(this.msgIndexById[this.activeMsg.id] + 1);
                }
            },
            //读消息，如果是未读的，置为已读
            readMsg(msg, global){
				
                this.activeMsg = msg;
                if(msg.readState === 'UNREAD'){
                    this.showLoading()
                    this.$http.post('/message/read/'+msg.id).then(re=>{
                        if(re.ok){
                            msg.readState = 'READ';
                            this.activeModule.unreadCount --;
                            this.$store.dispatch('ComputeUnreadMsgCount',false);
                        }else{
                            this.$message({msg:re.message,type:'error',timeout:2000});
                        }
                    });
                }
                /**
                 * 根据消息内容弹出相应的内容
                 *  **/
                if(msg.groupId=="notice" || msg.groupId=="news"|| msg.moduleVersion== 9){
                    this.$refs.infoApproval.approval(msg.businessId)
                }else if(msg.moduleVersion == 10){
                    this.showLoading()
                    this.$http.get(`/web/student/leave/${msg.businessId}`).then(res=>{
                        if(res.ok){
                            // console.log(res.data)
                            if(res.data.status == 'SUBMIT'){
                                this.$refs.infoLeave.approval(msg.businessId,false,res.data);
                            }else{
                                this.$refs.infoLeave.approval(msg.businessId,true,res.data);
                            }                            
                        }else{
                            this.$message({
                                msg:res.message,
                                type:'error'
                            })
                        }
                    })
                }else if(msg.moduleVersion == 2){
                    this.showLoading()
                    this.$http.get(`/web/roomApply/detail/${msg.businessId}`).then(res=>{                        
                        if(res.ok){
                            if(res.data.status == 'APPROVE'){
                                this.$refs.infoField.approval(res.data,false);
                            }else{
                                this.$refs.infoField.approval(res.data,true);
                            }   
                            
                        }else{
                            this.$message({
                                msg:res.message,
                                type:'error'
                            })
                        }
                    })
                }else if(msg.moduleVersion == 7){
                   // console.log('设备维修')
                   this.$refs.infoGua.apply(msg.businessId);
                }else if(msg.moduleVersion == 6){
                    // console.log('设备使用')
                    this.$refs.infoEqu.apply(msg.businessId);
                }else if(msg.moduleVersion == 3){
                    // console.log('车辆申请')
                    this.$refs.infoVehicle.apply(msg.businessId);
                    
                }else if(msg.moduleVersion == 8){
                    // console.log('采购管理');
                    this.$refs.infoPurchase.apply(msg.businessId);

                }else if(msg.moduleVersion == 5){
                    // console.log('资料印刷')
                    this.$refs.infoPrint.apply(msg.businessId)
                }else if(msg.moduleVersion == 4 || msg.groupId == 'document'){
                    this.$refs.infoDoc.approval(msg.businessId);
                }else if(msg.moduleVersion == 11){
                    // console.log('调课申请');
                    this.$refs.infoAdj.approval(msg.businessId);
                }else if(msg.moduleVersion == 14 || msg.moduleVersion == 15){ // 拜访预约
					this.winShow=true;
					this.$refs.infoR.$nextTick(()=>{
						this.$refs.infoReservation.init({id:msg.businessId},true);
					})
				}else if(msg.moduleVersion == 16){
					this.$refs.infoMeeting.approval(msg.businessId);					
				}else if(msg.groupId == 'meeting_notify'){ // 会议通知
					this.$refs.infoMeeting.approval(msg.businessId);			
				}
            },
            //筛选消息类型：计划、任务
            filterMsg(){
                this.messageData = [];
                this.page.currentPage = 1;
                this.getModuleMsg();
            },
			searchMessage(){
				this.getModuleMsg();
			},
            getContent(msg){
                return msg.content.replace(msg.firmName+'：',"").replace(/<br\/>/g," ").replace(/\\n/g," ");
            },
            //获取分组
            getModule(){
                this.moduleLoading = true;
                this.showLoading()
                this.$http.post('/message/recent').then(re=>{
                    this.moduleLoading = false;
                    if(re.ok){
                        let data = {};
                        let modata = [];
                        re.data.forEach(item=>{
                            if(item.groupId == 'task'){
                                item.groupName = '工作通知';
                                if(data[item.firmId]){
                                    data[item.firmId].unreadCount+=item.unreadCount;
                                }else{
                                    data[item.firmId] = item;
                                }
                            }else if(item.groupId == 'plan'){
                                item.groupName = '工作通知';
                                if(data[item.firmId]){
                                    data[item.firmId].unreadCount+=item.unreadCount;
                                }else{
                                    data[item.firmId] = item;
                                    data[item.firmId].groupId = 'task';
                                }
                            }else{
                                if(!(item.groupId=='personalChat' || item.groupId == 'access')){
                                    modata.push(item)
                                }
                                
                            }
                        });
                        let ind = 0;
                        for(let i in data){
                            this.moduleIndexArr[i] = modata.length;
                            modata.splice(ind,0,data[i]);
                            ind++;
                        }
                        this.moduleData=modata;
                        //选中第一个消息分组
                        if(this.moduleData.length>0 && !this.activeModule.id){
                            this.getMsg(this.moduleData[0]);
                        }
                        if(Scrollbar.has(this.$refs.moduleList)){
                            Scrollbar.destroy(this.$refs.moduleList);
                        }
                        this.$nextTick(()=>{
                            if(this.moduleData.length > 0){
                                Scrollbar.init(this.$refs.moduleList);
                            }
                        });
                        this.$store.dispatch('ChangeMsgRefresh',false);
                    }
                    else{
                        this.$message({msg:re.message,type:'error',timeout:2000});
                    }
                },err=>{
                    this.moduleLoading = false;
                });
            },
            getModuleMsg(){
                let url = `/message/group/firm/page`;
                if(this.messageSearch.type == 'calendar'){
                    url = '/message/group/'+this.messageSearch.type+'/page/withoutfirm?pageNumber='+this.page.currentPage;
                }

                this.showLoading()
                this.$http.post(url,{
					groupId:this.messageSearch.type,
					firmId:this.activeModule.firmId,
					pageNumber:this.page.currentPage,
					pageSize:this.page.pageSize,
					state:this.page.state
				}).then(re=>{
                    if(re.ok){
						this.page.total=re.data.totalCount;
                        this.messageData = re.data.rows;
                        if(this.messageSearch.type == 'task' || this.messageSearch.type == 'plan'){
                            this.msgIndexById = {};
                            this.messageData.forEach((item,index)=>{
                                this.msgIndexById[item.id] = index;
                            });
                        }
                    }else{
                        this.$message({msg:re.message,type:'error',timeout:2000});
                    }
                },err=>{
                    this.busy=false;
                    this.msgLoading = false;
                });
            }
        },
        mounted(){
            this.getModule();
        }
    }
</script>

