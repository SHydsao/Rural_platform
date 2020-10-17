const methods = {
    /**
     * 防抖函数
     * @param method 事件触发的操作
     * @param delay 多少毫秒内连续触发事件，不会执行
     * @returns {Function}
     */
    debounce: function (method, delay) {
        let timer = null;
        return function () {
            let self = this,
                args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            }, delay);
        }
    },
    /**
     * 节流函数
     * @param method 事件触发的操作
     * @param mustRunDelay 间隔多少毫秒需要触发一次事件
     */
    throttle: function (method, mustRunDelay) {
        let timer,
            args = arguments,
            start;
        return function loop() {
            let self = this;
            let now = Date.now();
            if (!start) {
                start = now;
            }
            if (timer) {
                clearTimeout(timer);
            }
            if (now - start >= mustRunDelay) {
                method.apply(self, args);
                start = now;
            } else {
                timer = setTimeout(function () {
                    loop.apply(self, args);
                }, 50);
            }
        }
    },
    /**
     * Obj 转参数String
     * @param param 参数对象
     */
    urlEncode: function (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
                paramStr += tool.urlEncode(param[i], k, encode)
            }
        }
        return paramStr.slice(1);

    },
    linkto:(path)=>{
        if(typeof path === 'string'){
            this.$router.push({path: path});
        }else if(typeof path === 'object'){
            this.$router.push(path);
        }
    },
    toDate:(str,format)=>{
        if(typeof format === 'string'){
            return new Date(str).format(format);
        }else{
            return new Date(str);
        }
    },
}

export default methods;