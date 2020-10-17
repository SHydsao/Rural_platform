<style scoped>
</style>
<template>
  <div :id="id"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "echart",
  props: {
    chart: {type: Object, default: function(){return {}}},
    id: {
      type: String,
      default: function(){return "echart_" + Math.floor(Math.random() * 9999999)}
    },
    option: { type: Object, default: function(){return {}} },
    height: { type: [String, Number], default: "100%" }
  },
  data: () => {
    return {
      chartEm: ""
    };
  },
  watch: {
    option: function(val) {
      if (this.chartEm) {
        this.updateChart();
      }
    }
  },
  methods: {
    updateChart() {
      this.chartEm.setOption(this.option);
    },
    resizeChart() {
      this.chartEm.resize();
    }
  },
  mounted() {
    const $this = this;
    let $em = document.getElementById(this.id);
    $em.style.height = this.height;
    this.chartEm = echarts.init($em);
    this.updateChart();
    window.addEventListener("resize", this.$debounce(() => {
      $this.resizeChart();
    }, 200))
  },
  created() {},
  beforeDestroy(){

  }
};
</script>
