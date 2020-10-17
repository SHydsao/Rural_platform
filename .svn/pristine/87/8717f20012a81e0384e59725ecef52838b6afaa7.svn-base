import './fant-common.js'
import fantVueCommon from './fant-base.js';
import fantVueElement from './fant-element.js'
import fantVueSQL from './fant-sql.js'
const fantBase = fantVueCommon;
const fantElement = fantVueElement;
const {Condition,Exp,Logic,Order} = fantVueSQL;
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(fantBase);
  window.Vue.use(fantElement);
}
// 导出模块
export default {fantBase,fantElement,Condition,Exp,Logic,Order};

