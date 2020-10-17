<style>
.fant-switch {
  display: block;
  position: relative;
  width: 48px;
  height: 22px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #dfdfdf;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.fant-switch:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 22px;
  border-radius: 15px;
  background-color: #dcdfe6;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.fant-switch:after {
  content: " ";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 15px;
  background-color: #ffffff;
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.fant-switch-on {
  border-color: #6f6f6f;
}
.fant-switch-on:before {
  background-color: #409eff;
}
.fant-switch-on:after {
  transform: translateX(26px);
}
</style>
<template>
	<div style="width:51px;display:inline-flex;position: relative;">
	    <span class="fant-switch" :class="{'fant-switch-on' : isChecked}" :value="value" @click="toggle" style="position:relative">
			<div v-if="isChecked && state.length > 0" style="width:100%;height:100%;position:absolute;top:2px;left:4px;padding:0 5px;line-height:20px;color:#FFF;user-select:none;font-size:14px">
				{{state[0]}}
			</div>
			<div v-if="!isChecked && state.length > 0" style="width:100%;height:100%;position:absolute;top:1px;right:4px;padding:0 5px;right:3px;line-height:22px;color:#7A7A7A;text-align:right;user-select:none;font-size:14px">
				{{state[1]}}
			</div>
	    </span>
	</div>
</template>
<script>
export default {
  props: {
		value: {
       required:true,
       default:true,
    },
    text: {type:  String},
    activeValue: {
       required:true,
       default:true,
    },
    inactiveValue: {
       required:true,
       default:true,
    },
  },
  computed: {
    state() {
      if (this.text) {
        return this.text.split("|");
      } else {
        return [];
      }
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    value(val) {
			if(val==this.activeValue){
				this.isChecked = true;
				return
			}
			if(val==this.inactiveValue){
				this.isChecked = false;
				return
			}
    },
  },

  data() {
    return {
      isChecked: true
    };
  },
  methods: {
    toggle() {
			this.isChecked = !this.isChecked;
			this.$emit("change", this.isChecked?this.activeValue:this.inactiveValue);
    }
	},
	mounted(){
		if(this.value==this.activeValue){
				this.isChecked = true;
				return
			}
			if(this.value==this.inactiveValue){
				this.isChecked = false;
				return
			}
      this.isChecked = this.value;
	},
};
</script>
