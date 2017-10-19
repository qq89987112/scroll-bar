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
      computedStyle(){
//        基本文档变量
        let
          el = this.getParent(),
          scrollBarEl = this.$refs.scrollBar,
          elRect = el.getBoundingClientRect(),
          scrollBarElRect  = scrollBarEl.getBoundingClientRect();

//        准备计算style
        let
          right = this.right,
//          判断是要 自动设置宽度还是高度
          direction = (this.top !== undefined || this.bottom !== undefined) && "width" ||
            (this.right !== undefined || this.left !== undefined) && "height" ||
            ((right=true)&&false||"height"),
          elDirectionLong = direction === 'width' ? el.clientWidth : el.clientHeight,
          elDirectionScrollLong = direction === 'width' ? el.scrollWidth : el.scrollHeight;


        let
          scrollStyle = {
            [direction]: `${elDirectionLong}px`,
//            相对于可视区域的绝对位置,缺多少补多少。
//           默认靠上边,如果bottom不为undefined则加上 clientHeight
            "top":`${elRect.top-scrollBarElRect.top+(parseInt(utils.getStyle(scrollBarEl,"top"))||0)+ ((this.bottom!==undefined)&&(el.clientHeight-2)||0)}px`,
//          left
//           默认靠左边,如果right不为undefined则加上 clientWidth
            "left":`${elRect.left-scrollBarElRect.left + (parseInt(utils.getStyle(scrollBarEl,"left"))||0) + ((right!==undefined)&&(el.clientWidth-2)||0)}px`
          },
          thumbStyle = {
            [direction]: `${elDirectionLong / elDirectionScrollLong * elDirectionLong}px`,
//           默认为0,如果left || right不为undefined则 纵轴滚动
            ["top"]:`${((right!==undefined)||(this.left!==undefined))&&el.scrollTop/el.scrollHeight*elDirectionLong||0}px`,

//           默认为0,如果top || bottom不为undefined则 横轴滚动
            ["left"]:`${((this.top!==undefined)||(this.bottom!==undefined))&&el.scrollLeft/el.scrollWidth*elDirectionLong||0}px`
          };


        this.scrollStyle = Object.assign({}, this.scrollStyle, scrollStyle);
        this.thumbStyle = Object.assign({}, this.thumbStyle, thumbStyle);
      }
    },
    mounted() {
      let
        el = this.getParent(),
        that = this;
      this.computedStyle();
      this.__wheel_handle__ = function (e) {
        e.stopPropagation();
        e.preventDefault();
        el.scrollTop = el.scrollTop+=e.deltaY;
        that.computedStyle();
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
  .thumb{
    position: absolute;
    left: 0;
  }
</style>
