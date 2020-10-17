import { Message } from 'element-ui'
import axios from 'axios'
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
let isErrShow = false;
let lastConfig = {};
let lastTime = '';
let lastMethods = '';
let lastData = {};

function checkRes(status) {
    if (status != 200 && !isErrShow) {
        isErrShow = true;
        let msg = "网络异常，请稍后重试";
        if (status == 401) {
            msg = "用户长时间没有操作，请重新登录！"
        } else if (status == 403) {
            msg = "你没有权限进行此操作！";
        }
        Message({
            message: msg,
            type: 'error',
            duration: 5 * 1000
        });

        if (status == 401) {
            setTimeout(function () {
                window.location.href = process.env.BASE_URL + "index.html";
            }, 1500);
        }
    } else if (status == 200) {
        isErrShow = false;
    }
}


export default function creatRequest(Vue, store){
    const service = axios.create({
        baseURL: Vue.prototype.$BASE_URL, // api的base_url
        timeout: 15000,                  // 请求超时时间
    });
// request拦截器
    service.interceptors.request.use(function (config) {
        let configData = config.data?Vue.deepCopy(config.data):''
        let dataTrue = configData=={}?false:true;

        //3秒内无法重复提交参数地址一样的请求
        let isObject=config.data instanceof Object;
        isObject && Object.keys(config.data).forEach(key=>{
            if(typeof config.data[key] == 'string'){
                config.data[key]=config.data[key].trim();
            }
        })
        
        if(lastTime && !(lastConfig.includes('recipes') || lastConfig.includes('webStatics') || lastConfig.includes('openLesson'))){				
            let time = ((new Date()).valueOf() - lastTime.valueOf())/1000;
            let disTime=lastConfig.includes('business/execute') ? 20 : 1.5;
            if(time<disTime && config.url==lastConfig && config.method==lastMethods){					
                if(lastData){
                    for(let i in configData){
                        if(!lastData[i]||lastData[i]!=configData[i]){
                            dataTrue = true;
                        }
                    }
                }else{
                    dataTrue = true;
                }
                if(!dataTrue){
                    let CancelToken = axios.CancelToken;
                    let source = CancelToken.source();
                    config.cancelToken = source.token;
                    source.cancel('取消重复请求');
                }
                
                return config; 
            }
        }
        lastTime = new Date();
        lastConfig = config.url;
        lastMethods = config.method;
        lastData = Vue.deepCopy(configData)
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
// respone拦截器
    service.interceptors.response.use(
        response => {
            setTimeout(()=>{window.$bus.hideLoading()},300)
            return response.data
        },
        error => {
            setTimeout(()=>{window.$bus.hideLoading()},300)
            if (error.response) {
                checkRes(error.response.status);
            }
            return Promise.reject(error);
        }
    )
    const ajax_ = Vue.ajax;
    const ajax = (obj) => {
        let opt = Object.assign(obj, {
            beforeRequest: (request) => {
                window.$bus.showLoading()
                let url = Vue.prototype.$BASE_URL + obj.url;
                request.open(obj.method, url, false) // 第三个参数 false 代表设置同步请求
                return request;
            },
            beforeResponse: (res) => {
                setTimeout(()=>{window.$bus.hideLoading()},400)
                checkRes(res.status);
                return true;
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        });
        ajax_(opt);
    }
    Vue.ajax = ajax;
    Vue.prototype.$ajax = ajax;

    Vue.downloadFile = (url)=>{
        url = baseUrl + '/api' + url;
        window.open(url)
    }
    Vue.prototype.$downloadFile = Vue.downloadFile;

    return service
}
