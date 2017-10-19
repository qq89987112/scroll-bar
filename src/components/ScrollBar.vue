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
//    在data中初始化数据,return 中的有响应式,函数中的没有。
    data() {
      this.directions = {
        top:this.top !== undefined,
        left:this.left !== undefined,
        bottom:this.bottom !== undefined,
        right:this.right !== undefined,
        isDefault:
                  this.top === undefined &&
                  this.left === undefined &&
                  this.bottom === undefined&&
                  this.right === undefined
      };


      let {top,left,bottom,right} = this.directions;

      let thickness = {
        [
        (top || bottom) && "height" ||
        (right || left) && "width" ||
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
          {top,left,bottom,right,isDefault} = this.directions,
//          判断是要 自动设置宽度还是高度
          direction = (top || bottom) && "width" ||
            (right || left) && "height" ||
            "height",
          elDirectionLong = (top || bottom) ? el.clientWidth : el.clientHeight,
          elDirectionScrollLong = (top || bottom) ? el.scrollWidth : el.scrollHeight;


        let
          scrollStyle = {
            [direction]: `${elDirectionLong}px`,
//            相对于可视区域的绝对位置,缺多少补多少。
//           默认靠上边,如果bottom不为undefined则加上 clientHeight
            "top":`${elRect.top-scrollBarElRect.top+(parseInt(utils.getStyle(scrollBarEl,"top"))||0)+ (bottom&&(el.clientHeight-2)||0)}px`,
//          left
//           默认靠左边,如果right不为undefined则加上 clientWidth
            "left":`${
              elRect.left-scrollBarElRect.left + (parseInt(utils.getStyle(scrollBarEl,"left"))||0) + ((right||isDefault)&&(el.clientWidth-2)||2)
            }px`
          },
          thumbStyle = {
            [direction]: `${elDirectionLong / elDirectionScrollLong * elDirectionLong}px`,
//           默认为0,如果left || right不为undefined则 纵轴滚动
            ["top"]:`${(right||left||isDefault)&&el.scrollTop/el.scrollHeight*elDirectionLong||0}px`,

//           默认为0,如果top || bottom不为undefined则 横轴滚动
            ["left"]:`${(top||bottom)&&el.scrollLeft/el.scrollWidth*elDirectionLong||0}px`
          };
        console.log(elRect.left - scrollBarElRect.left);

        this.scrollStyle = Object.assign({}, this.scrollStyle, scrollStyle);
        this.thumbStyle = Object.assign({}, this.thumbStyle, thumbStyle);

      }
    },
    mounted() {
      let
        el = this.getParent(),
        that = this;
      let
        {top,left,bottom,right,isDefault} = this.directions;
      this.computedStyle();
//      bug 如果是上下边,则再计算一次
      if(top || bottom){
        this.$nextTick(()=>{
          this.computedStyle();
        });

      }



      this.__wheel_handle__ = function (e) {
        e.stopPropagation();
        e.preventDefault();
        if(e.shiftKey){
          el.scrollLeft = el.scrollLeft+e.deltaY;
        }else{
          el.scrollTop = el.scrollTop+e.deltaY;
        }

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
