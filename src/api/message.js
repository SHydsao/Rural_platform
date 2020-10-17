import SockJS from 'sockjs-client'
import msgAction from '@/components/msgAction';
import Vue from 'vue'
const debug = process.env.NODE_ENV !== "production"

let msg = {
    webSocket: null,
    disconnect () {
        if (this.webSocket && this.webSocket.readyState == 1) {
            this.webSocket.close()
            this.webSocket = null
        }
    },
    subscribe(cb) {
		console.log(Vue.prototype.$MSG_URL);
        let url = Vue.prototype.$MSG_URL+'/sockjs/message'
        try {
            this.webSocket = new SockJS(url) //webSocket对应地址
        } catch(err) {
            this.errorCallback()
            return false;
        }
        this.webSocket.onopen = () =>{
            this.connectCallback(cb)
        }
    },
    connectCallback(cb) {
        if (cb && typeof cb === 'function') {
            cb(true)
        }
    },
    errorCallback(cb) {
        if (cb && typeof cb === 'function') {
            cb(false)
        }
    },
    onClose(){

    },
    onMessage(message) {
        let data = JSON.parse(message.data)
        if (debug) {
            // console.log('websocket接收: ', data)
        }
        if(data.action == '__READ__'){
            window.$vueEl.$store.dispatch('ChangeMsgRefresh',true);
        }
        if(data.action == 'view' && data.businessId){
            //消息按钮的徽标+1
            window.$vueEl.$store.dispatch('ComputeUnreadMsgCount',true);
            window.$vueEl.$store.dispatch('ChangeMsgRefresh',true);
            window.$vueEl.$gobalMsg({
                title:data.title,
                htmlUse:true,
                iconClass:'el-icon-info color-primary',
                msg:(createElement,vm)=>{
                    return createElement(
                        'div',
                        {
                            'class':{
                                'fant-globalmsg':true
                            }
                        },
                        [
                            createElement(
                                msgAction,
                                {
                                    props:{
                                        data:data
                                    }
                                }
                            )
                        ]
                    );
                },
                position: 'bottom-right',
                timeout: 5000
            });
        }
    }
}

window.onbeforeunload = function() {
    msg.disconnect()
}

export default msg
