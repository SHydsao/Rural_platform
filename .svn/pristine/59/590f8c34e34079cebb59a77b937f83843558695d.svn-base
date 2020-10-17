import {replaceRoutes} from '@/router'
import Vue from 'vue'
export function initialization(that,store,routeBase){
    /**
     * 登陆后刷新直接获取本地记录的菜单和权限数据
     */
    // if (window.sessionStorage.getItem("userId")) {
        //权限
        const ajax = Vue.ajax
        if (!window.sessionStorage.getItem("auth")) {
            ajax({
                url: "/auth/permission",
                method: "get",
                success: async (res) => {
                    if (res.ok) {
                        let authArr = [];
                        res.data.forEach(item => {
                            const authCode = item.resourceCode + "." + item.code;
                            authArr.push(authCode);
                        });
                        let permissions = JSON.stringify(authArr);
                        window.sessionStorage.setItem("auth", permissions);
                        Vue.config.fant.authList = authArr;
                    }
                },
                error: () => {
                    window.sessionStorage.setItem("auth", "[]");
                    Vue.config.fant.authList = [];
                }
            });
        } else {
            Vue.config.fant.authList = JSON.parse(window.sessionStorage.getItem("auth"));
        }
        //菜单和路由
        if (!window.sessionStorage.getItem("menu")) {
            ajax({
                url: "/auth/menu",
                method: "get",
                success: (res) => {
                    let menus = res.data;
                    window.sessionStorage.setItem("menu", JSON.stringify(menus));
                },
                error: () => {
                    window.sessionStorage.setItem("menu", "[]");
                }                    
            });
            
        }
        let menu = JSON.parse(window.sessionStorage.getItem("menu"));
        let $store = store;
        $store.dispatch("addMenu", menu);
        $store.dispatch("addRoute");
        //重置路由
        let $route = routeBase
        replaceRoutes($route,[{
                path: '/index',
                name: 'index',
                component: resolve => require(['@/views/systemBase/index.vue'], resolve),
                children: [
                    ...$store.state.menu.items,
                    {
                        path: 'status/:code',
                        name: 'status',
                        component: resolve => require(['@/views/systemBase/status.vue'], resolve),
                        props: true
                    },
                    {
                        path: 'msgcenter',
                        name: 'msgcenter',
                        component: resolve => require(['@/views/systemBase/message.vue'], resolve),
                        props: true
                    }
                ],
                redirect: '/index/web.dept' //默认展示的子路由名字'
            },
            {
                path: '*',
                redirect: '/status/404'
            }
        ]);
    // }
}