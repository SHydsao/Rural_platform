// import Map from "@/router/routeMap"

const menu = {
    state: {
        items: [],
        menuTree: [],
        isLoadRoutes: false,
        radio:0
    },
    mutations: {
        add_menu(state, menuItems) {
            if (menuItems.length === 0) {
                state.items = [];
                state.menuTree = [];
            } else {
                generateMenuItems(state.menuTree, menuItems)
            }
        },
        add_route(state) {
            generateRouteItems(state.items, 'business');
            generateRouteItems(state.items,'sysman');
        },
        load_routes(state) {
            state.isLoadRoutes = !state.isLoadRoutes
        },
        clear_all(state){
            state.items = [];
            state.menuTree = [];
            state.isLoadRoutes = false;
        },
        setRadio(state, count) {
            state.radio = count
        },
    },
    actions: {
        addMenu: ({ commit }, menuItems) => {
            commit("add_menu", menuItems)
        },
        addRoute: ({ commit }) => {
            commit("add_route");
        },
        loadRoutes: ({ commit }) => {
            commit("load_routes")
        },
        clearAll:({ commit })=>{
            commit("clear_all")
        }
    },
    getters: {
        items: state => state.items,
        menuTree: state => state.menuTree,
        isLoadRoutes: state => state.isLoadRoutes
    },
}
function generateMenuItems(menuTree, menuItems) {
    menuItems.forEach(item => {
        menuTree.push(item)
    });
}
function generateRouteItems(items, module) {
    let Map = {}
    try {
        Map = require("@/router/" + module + "/routeMap").default
    } catch (e) {
        Map = {}
    }
    for (let [key, value] of Object.entries(Map)) {
        let path,meta,name;
        if(typeof value == 'string'){
            path = value;
            name = value.name || key
            meta = {};
        }else if(typeof value == 'object'){
            path = value.path;
            name = key
            meta = typeof value.meta == 'object'?value.meta:{};
        }else{
            throw new Error('routeMap的格式异常')
        }
        let route = {
            path: key,
            name,
            meta,
            component: (resolve) => require(["@/views" + path], resolve)
        };
        items.push(route);
    }

}
export default menu;
