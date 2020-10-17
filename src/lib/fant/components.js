import nav from "@/components/nav";
import fantBack from "@/components/fantBack";
import fantSwitch from "@/components/publicPage/fant-switch";

let plugin = {};

plugin.install = (Vue,options)=>{
    Vue.component("fantNav",nav);
    Vue.component("fantBack",fantBack);
    Vue.component("fant-switch",fantSwitch);
}

export default plugin;