let msg = {}
if(typeof window !== "undefined"){
    msg = require('@/api/message').default
}
const message = {
    state: {
        connected: false,
        messages: {},
        unreadMsgCount: 0,
        msgRefresh:false
    },
    mutations: {
        SET_CONNECTED (state, connected) {
            state.connected = connected
        },
        SET_MESSAGES (state, messages) {
            state.messages = messages
        },
        SET_UNREADMSGCOUNT (state, unreadMsgCount) {
            state.unreadMsgCount = unreadMsgCount
        },
        SET_MSGREFRESH(state, msgRefresh) {
            state.msgRefresh = msgRefresh;
        },
    },
    actions: {
        Subscribe ({commit, state}) {
            return new Promise((resolve, reject) => {
                msg.subscribe((connected) => {
                    if (connected) {
                        commit('SET_CONNECTED', true);
                        resolve()
                    } else {
                        commit('SET_CONNECTED', false);
                        reject()
                    }
                })
            })
        },
        OnMessage({commit}){
            return new Promise((resolve, reject) => {
                msg.webSocket.onmessage = (message) =>{
                    commit('SET_MESSAGES',JSON.parse(message.data));
                    msg.onMessage(message);
                }
            })
        },
        ComputeUnreadMsgCount({commit, state}, add){
            let num = state.unreadMsgCount;
            if(add){
                num++;
            }else{
                num--;
            }
            commit('SET_UNREADMSGCOUNT',num);
        },
        ChangeMsgRefresh({commit, state}, bool){
            commit('SET_MSGREFRESH',bool);
        },
    }
}
export default message;
