import ElementUI from 'element-ui'
import base from "@/__fantbase/src";
import components from "./components.js";
import { mixinApp } from "./mixin.js";
import extend from './extend.js';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

const {fantBase, fantElement} = base;

export function installPlugin(Vue){
    Vue.use(ElementUI);
    Vue.use(fantBase);
    Vue.use(fantElement);
    Vue.use(components);
    mixinApp(Vue);
    Vue.use(preview)
    //扩展或重新集合
    Vue.use(extend);
}
