<style scoped>
    .aside{
        background:#2A82DB;
        overflow: hidden;
    }
	.aside >>> .el-scrollbar__wrap{
		overflow-x:hidden !important;
	}
    .aside >>> .el-icon-arrow-down:before{
       display:none;
    }
    .right{
        color:#0F569D;
        margin-left:8px;
        display:none;
    }
    
    .aside >>> .el-submenu.is-active .right{
        display:inline-block;
    }
    .aside >>> .el-menu{
        background:none;
    }
    .aside >>> .el-submenu__title:hover{
        background:none;
    }

    .white{
        color:#fff;
        font-size:16px;
        display:inline-block;
        vertical-align:-2px;
        margin-right: 5px;
    }
    .el-menu{
        border-right:none;
    }
    .el-menu-item-group{
        background:#0C58A4;
    }
    .el-menu-item:hover, .el-menu-item:focus{
        background:none;
    }
    .el-submenu__title span{
        color:#fff;
    }
    .el-submenu .el-menu-item{
        height:auto;
    }
    .small{
        font-size:12px;
        color:#267CD4 !important;
    }
    .aside >>> .el-menu-item{
        font-size:14px;
        color:#BABFCB;
        line-height:30px;
        min-width:inherit;
        position:relative;
        margin-left:2px;
    }
    .el-menu-item i{
        position:absolute;
        opacity:0;
        top:50%;
        right:10px;
        transition:color 0.3s ease,opacity 0.3s ease,transform 0.3s ease;
        transform:translate(-10px,-50%);

    }
    .el-menu-item:hover i{
        transform:translate(0px,-50%);
        opacity:1;
    }
    .el-menu-item.is-active{
        color:#fff;
    }
    .el-menu-item.is-active i{
        transform:translate(0px,-50%);
        opacity:1;

    }
    .aside >>> .el-menu--inline{
        background:#0C58A4;
    }
    .aside >>> .el-menu-item-group__title{
        display:none !important;
    }
    .el-menu-item-group{
        padding:15px 0;
    }

    .aside >>>.el-submenu__title{
        height:48px !important; 
        line-height:48px !important;
        background:url(~assets/images/line.png) no-repeat bottom center !important;
    }
	.aside ::-webkit-scrollbar-track{
		background:#2A82DB !important;
	}
</style>
<template>
    <el-aside class="aside" width="160px"  >
		<el-scrollbar
		  wrap-class="list"		  
		  view-class="view-box"
		  style="height:100% !important;overflow-x:hidden !important;margin:0 !important;padding:0 !important;"
		  :native="false">		 
			<el-menu :default-active="$route.path.substring(7)"  unique-opened>
				<el-submenu :index="item.id"  v-for="(item,index) in menu" :key="index" >   
					<template slot="title">
						<i :class="[item.icon ? item.icon : '']" class="white fanticon"></i>
						<span>{{ item.name }}</span>
						<i class="el-icon-caret-right right"></i>
					</template>
					

					<el-menu-item-group v-if="item.children.length>0" >
						<el-menu-item :index="subItem.code" v-for="subItem in item.children"  :key="subItem.id"  v-to="'/index/'+subItem.code">
							{{subItem.name}}
							<i class="el-icon-arrow-right small"></i>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-scrollbar>	
    </el-aside>
</template>

<script>
    export default {
        name:'fant-menu',
        props:{
            menu:{type:Array,default:()=>{return []}}
        }
    }
</script>
