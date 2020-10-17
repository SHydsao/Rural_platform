<template>
    <div class="win-wrap">
        <div class="content-box">
           <div class="pb10">
                <fant-table
                    :opt="ftable.opt"
                    :data="ftable.data"
                    :page="ftable.page"
                    :columns="ftable.columns"
                    class="table-text singleSelect"
                    ref="table">
                    <template slot="empty">
                        <div class="empty_content">
                            <div class="noData-img"></div>
                            <!-- <img :src="require('@/assets/images/blank_bg2.png')" alt=""> -->
                            <div class="empty_text">暂无数据</div>
                        </div>
                    </template>
                </fant-table>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                ftable: {
                    opt: {
                        stripe: true,
                        height: "482px",
                        align: "center",
                        page: true,
                        highlightCurrentRow: false,
                        url: "/admin/loginLog/page",
                        border: true,
                        emulateJSON: true,
                        extendParams: {
                            searchKey: ""
                        }
                    },
                    page:{
                        count:5
                    },
                    data: [],
                    columns: [
                        { prop: "staffName", label: "姓名",minWidth:'70' },
                        { prop: "createdAt", label: "登录时间",minWidth:'60',align:'center' }
                        
                     
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.pb10{
    padding-bottom:10px;
}
</style>