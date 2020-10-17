const $sysman = "/sysman";
const sysmanRouteMap = {
 
    /* 属性值可以是对象或字符 
        value为string时，key作为route的path和name，value为vue文件路径
        value为object时，key作为route的path，value可以指定name属性，meta属性，path属性，value.path为vue文件路径
    */
    'web.dept': {name: 'web.dept', meta: {title:'部门管理'},path: $sysman+"/admin/department/department"},
    'admin.config': $sysman+"/admin/firmParamsConfig/webConfig",
    'admin.resource': $sysman+"/admin/resources/resources",
    'web.staff': $sysman+"/admin/firmStaff/firmStaff",
    'admin.platformLog': $sysman+"/admin/systemLog/systemLog",
    'admin.user': $sysman+"/admin/user/user",
    'web.role': $sysman+"/admin/firmRole/firmRole",
};
const routeMap = Object.assign({},sysmanRouteMap);
export default routeMap;
