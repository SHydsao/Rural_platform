<template>
  <img :src="dataUrl" @load.stop="createCropper" alt ref="img" />
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  props: {
    dataUrl: String, //图片地址
    cropperOptions: {
      type: Object,
      default() {
        return {
          background:false,
          viewMode: 0, //视图模式，0-无限制，1-限制裁剪框不超过画布的大小，2-限制最小画布大小以适合容器，3-限制最小画布大小以填充容器
          movable: true, //是否可以拖动
          autoCropArea: 0.9, //自动裁剪区域大小，介于0-1
          dragMode: "move" //拖拽模式，crop-创建一个新的裁剪框，move-移动画布，none-不设置
        };
      }
    },
    //输出质量，0-1
    outputQuality: {
      type: Number,
      default: 0.8
    }
  },
  data() {
    return {
      cropper: undefined
    };
  },
  methods: {
    //旋转图片，deg是角度
    rotateImg(deg) {
      this.cropper.rotate(deg);
    },
    //重置图片
    reset() {
      this.cropper.reset();
    },
    //销毁cropper实例
    destroy() {
      this.cropper.destroy();
    },
    crop() {
      return this.cropper.getCroppedCanvas({fillColor:"white"}).toDataURL("image/jpeg", this.outputQuality);
    },
    //初始化cropper实例
    createCropper() {
      this.cropper = new Cropper(this.$refs.img, this.cropperOptions);
    }
  }
};
</script>