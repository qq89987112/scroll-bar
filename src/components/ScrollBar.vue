<template>
  <div class="scroll-bar-component" :style="scrollStyle" ref="scrollBar">
    <div class="thumb" :style="thumbStyle"></div>
  </div>
</template>

<script>
  import utils from "../js/utils";

  export default {
    name: 'HelloWorld',
//  同时只能有一个方向
    props: ["color", "thumb-color", "top", "bottom", "right", "left", "thickness"],
    data() {
      let thickness = {
        [
        (this.top !== undefined || this.bottom !== undefined) && "height" ||
        (this.right !== undefined || this.left !== undefined) && "width" ||
        "width"
          ]: `${this.thickness || 2}px`
      };

      return {
        scrollStyle: {
          'background-color': this.color || "#7a7a7a",
          ...thickness
        },
        thumbStyle: {
          'background-color': this.thumbColor || '#999',
          'border-radius': '2px',
          ...thickness
        }
      }
    },
    methods:{
      getParent(){
        return this.$parent.$el;
      },
    },
    mounted() {
      let
        el = this.getParent(),
        scrollBarEl = this.$refs.scrollBar,
        elRect = el.getBoundingClientRect(),
        scrollBarElRect  = scrollBarEl.getBoundingClientRect(),
        right = this.right,
        direction = (this.top !== undefined || this.bottom !== undefined) && "width" ||
          (this.right !== undefined || this.left !== undefined) && "height" ||
          ((right=true)&&false||"height"),
        elDirectionLong = direction === 'width' ? el.clientWidth : el.clientHeight,
        elDirectionScrollLong = direction === 'width' ? el.scrollWidth : el.scrollHeight,
        scrollStyle = {
          [direction]: `${elDirectionLong}px`,
          "top":`${elRect.top-scrollBarElRect.top}px`,
//          left
//            `${elRect.left-scrollBarElRect.left}px`
          "left":`${elRect.left-scrollBarElRect.left + ((right!==undefined)&&(el.clientWidth-2)||0)}px`
        },
        thumbStyle = {
          [direction]: `${elDirectionLong / elDirectionScrollLong * elDirectionLong}px`
        };
      this.scrollStyle = Object.assign({}, this.scrollStyle, scrollStyle);
      this.thumbStyle = Object.assign({}, this.thumbStyle, thumbStyle);
      console.log(elRect,
        scrollBarElRect,elRect.left-scrollBarElRect.left + ((this.right!==undefined)&&el.clientWidth||0));

      this.__wheel_handle__ = function () {

      };

      el.addEventListener("wheel",this.__wheel_handle__);

//      switch (true) {
//        case this.top !== undefined:
//          break;
//        case this.bottom !== undefined:
//          break;
//        case this.right !== undefined:
//          break;
//        case this.left !== undefined:
//          break;
//      }

    },
    destroyed(){
      let el = this.getParent();
      el.removeEventListener("wheel",this.__wheel_handle__);

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-bar-component, .thumb {
    display: inline-block;
  }

  .scroll-bar-component {
    position: relative;
  }
</style>
