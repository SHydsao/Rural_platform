import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
   /* 
        业务页面路由添加位置：src/router/business/routeMap
        routeMap的key必须与资源的code对上
        业务页面编写位置：src/views/business
     */

//懒加载 ES6方法  const Login = () =>import('@/views/systemBase/login.vue')
export function createRouter (store) {
    const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    const router =  new Router({
        // mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/login',
                name: 'login',
                component: resolve => require(['../views/systemBase/login.vue'], resolve)

                
            },
            {
                path: '/register',
                name: 'register',
                component: resolve => require(['../views/systemBase/register.vue'], resolve)
            },
            {
                path: '/retrievePassword',
                name: 'retrievePassword',
                component: resolve => require(['../views/systemBase/retrievePassword.vue'], resolve)
            },
            {
                path: '/setting',
                name: 'setting',
                component: resolve => require(['@/views/systemBase/index.vue'], resolve),
                children: [{
                        path: 'message',
                        name: 'message',
                        component: resolve => require(['../views/systemBase/setting/message.vue'], resolve)
                    },
                    {
                        path: 'password',
                        name: 'password',
                        component: resolve => require(['../views/systemBase/setting/password.vue'], resolve)
                    }
                ]
            },
            {
                path: '/',
                redirect: '/login'
            },
        ]
    });

    /**
       * 路由跳转的拦截事件
       */
    //   看看脚本是否在Web浏览器内的网页中运行
      if (typeof window !== "undefined") {
        router.beforeEach((to, from, next) => {
            if(to.path == '/login' ){
                
            }
            if (to.name || to.path) {
                let userId = window.sessionStorage.getItem("userId");
                if (!userId) {
                    if (to.path == '/login' || to.path == '/register' || to.path == '/retrievePassword') {
                        next();
                    } else {
                        next({
                            path: '/login'
                        });
                    }
                } else {
                    next();
                }
            } else {
                next({
                    path: '/index/status/404'
                })
            }
        })
    }

    return router;
}

export function replaceRoutes(that,routerList) {//重置路由
    that.matcher = createRouter().matcher;
    that.addRoutes(routerList);
}