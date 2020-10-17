import methods from './extend/methods';
import directives from './extend/directives';

let extend = {};
extend.install = function (Vue, options) {
    //载入方法
    for (let [key, fuc] of Object.entries(methods)) {
        Vue[key] = fuc;
        Vue.prototype[`$${key}`] = fuc;
    }

    //载入指令
    Vue.use(directives);
}

export default extend;