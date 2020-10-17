<style scoped>
.el-header {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    background: #2f3952;
}
.logo_text {
    font-size: 0;
}
.logo_img {
    display: inline-block;
    vertical-align: middle;
    max-height: 45px;
    padding-right:10px;
}
.logo_text span {
    font-size: 18px;
    color: #fff;
    line-height: 60px;
    display: inline-block;
    vertical-align: middle;
}
.icon {
    margin: 0 10px;
    font-size: 24px;
    color: #fff;
    line-height: 60px;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
}
.arrow img {
    width: 22px;
    display: block;
}
.user-msg {
    display: inline-block;
    vertical-align: middle;
    font-size: 0;
    margin-right: 10px;
}
.user-msg .pic {
    width: 36px;
    height: 36px;
    border: 1px solid #6d5c5c;
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    display: inline-block;
    vertical-align: middle;
}
.user-msg .pic img {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
}
.user-msg span {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
}
.li {
    margin: 5px 0;
    cursor: pointer;
}
.icon {
    font-size: 16px;
}

.userli {
    font-size: 14px;
    font-style: normal;
    margin-left: 10px;
}
.header_right >>> .el-badge__content.is-fixed {
    top: 15px;
}
</style>

<template>
    <el-header>
        <div class="header_box f-cb" style="height:60px;line-height:60px;">
            <div class="logo_text fl">
                <span>蠢材科技单体架构</span>
            </div>
            <div class="header_right fr">
                <el-popover placement="bottom" trigger="hover">
                    <ul>
                        <li class="li" @click="routeChange(1)">
                            <i class="el-icon-fant-person"></i>
                            <i class="userli">个人信息</i>
                        </li>
                        <li class="li" @click="$emit('changePassword')">
                            <i class="el-icon-fant-unlock"></i>
                            <i class="userli">修改密码</i>
                        </li>
                    </ul>

                    <div class="user-msg" slot="reference">
                        <div class="pic">
                            <img v-if="!current.headerImgId" :src="require('@/assets/images/defaultHeader.png')" alt >
                            <img v-else :src="imgPrefix + current.headerImgId" alt >
                        </div>
                        <span class="text-ellipsis" style="max-width:100px;">{{current.name}}</span>
                    </div>
                </el-popover>
                <el-badge
                    class="msg-count"
                    :value="messageCount"
                    :max="999"
                    @click.native="tabOpen('/index/msgcenter');"
                >
                    <i class="el-icon-fant1-xiaoxi icon" style="font-size:18px;"></i>
                </el-badge>

                <i class="icon arrow" @click="signOut" title="退出">
                    <img src="@/assets/images/arrow.svg" alt>
                </i>
            </div>
        </div>
    </el-header>
</template>

<script>
export default {
    name: "fant-header",
    props: {
        // current: {
        //     type: Object,
        //     default: () => {
        //         return {};
        //     }
        // }
    },
    computed: {
        getUnRead() {
            return this.$store.state.message.unreadMsgCount;
        },
        current(){
            // // console.log(this.$store)
            // let user = JSON.parse(sessionStorage.getItem('current')) ;
            return this.$store.state.user.user;
        }
    },
    data() {
        return {
            messageCount: 0,            
            imgPrefix: "/api/web/user/file/"
        };
    },
    methods: {
        routeChange(type) {
            type === 1
                ? this.$router.push("/setting/message")
                : this.$router.push("/setting/password");
        },
        signOut() {
            this.$confirm({
                msg: "确认退出？",
                title: "提示",
                fn: bool => {
                    if (bool) {
                        this.showLoading()
                        this.$http.post("/logout").then(result => {
                            this.$store.dispatch("logout");
                        });
                    }
                }
            });
        },
        getMessage() {
            this.showLoading()
            this.$http.post("message/recent", {}).then(re => {
                if (re.ok) {
                    let total = 0;
    
                    for (let data of re.data) {
                        if(!(data.groupId =='personalChat' || data.groupId == 'access')){
                            total += data.unreadCount;
                        }                    
                    }
                    this.$store.commit("SET_UNREADMSGCOUNT", total);
                } else
                    this.$message({
                        msg: re.message,
                        type: "error",
                        timeout: 2000
                    });
                    
            });
        },
        tabOpen: function(url) {
            this.$router.push({ path: url });
        }
    },
    watch: {
        //加载的时候先加载一次未读消息
        getUnRead: {
            handler: function(val, oldVal) {
                if (val < 1) {
                    this.messageCount = "";
                } else {
                    this.messageCount = val;
                }
            },
            immediate: true,
            deep:true
        },
        
    },
    mounted() {
        // this.getMessage();
        let user = JSON.parse(sessionStorage.getItem('current')) ;
        this.$store.dispatch("setUser",user);
        // if (window.sessionStorage.getItem("userId")) {
        //     this.$store.dispatch("Subscribe").then(() => {
        //         this.$store.dispatch("OnMessage");
        //     });
        // }
    }
};
</script>
