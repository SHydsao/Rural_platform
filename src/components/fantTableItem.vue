<template>
<div ref="item" class="el-input el-input--small el-input--suffix" :class="!disable?'fant-table-item ':''"  @keydown.enter="submit">
    <p :class="`text-${textDirection}`" v-show="!value[`$${this.name}`]" @click.stop="editCell"><slot name="title" :node="value[`${this.name}`]">{{value[`${this.name}`]}}</slot></p>
    <slot></slot>
</div>
</template>
<script>
//封装table里的输入框
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props:{
        value:{default:null},
        name:'',
        disable:null,//禁用后 回车不会聚焦到此实例
        textDirection:{default:'left'}
    },
    watch:{
        value(){
            this.$emit('change',this.value)
        },
    },
    data () {
        return {
        }
    },
    methods:{
        editCell(e) {
            if(this.disable){
                return false;
            }
            this.$set(this.value, `$${this.name}`, true);
            this.$emit('show',this.name,this.value);
            let parent = e.currentTarget.parentNode;
            this.$nextTick(() => {
                if (parent.getElementsByTagName('input').length > 0) {
                    parent.getElementsByTagName('input')[0].click();
                    parent.getElementsByTagName('input')[0].focus();
                }
            })
        },
        getNowIndex(){
            let es = document.getElementsByClassName('fant-table-item');
            for(let i in es){
                if(es[i] == this.$refs.item){
                    if (es[i].getElementsByTagName('input').length > 0) {//保证先触发失焦
                        es[i].getElementsByTagName('input')[0].blur();
                    }
                    return new Number(i)
                }
            }
        },
        close(){
            this.$set(this.value, `$${this.name}`, false);
        },
        submit(e){
            let i = this.getNowIndex()+1;
            if(document.getElementsByClassName('fant-table-item')[i]){
                let es = document.getElementsByClassName('fant-table-item')[i].getElementsByTagName('p');
                this.$nextTick(() => {
                    if (es.length > 0) {
                        this.close();
                        es[0].click();
                    }
                })
            }else{
                this.$emit('submitLast');
            }
        }
    },
    mounted(){
    },
    created(){
    }
}
</script>
<style scoped>
.text-center{
    text-align: center;
}
.text-center{
    text-align: right;
}
.el-input p{
    height:22px;
    font-size:12px;
}

</style>