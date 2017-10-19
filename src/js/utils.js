export default {
  getStyle: function (obj, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(obj, null)[attr];
    } else {
      return obj.currentStyle[attr];
    }
  },
  animate: function (obj, json, fn) {
    if (obj.isAnimating) {
      clearInterval(obj.timer);
      obj.isAnimating = false;
    }

    obj.isAnimating = true;
    obj.timer = setInterval(function () {
      var flag = true;
      var leader;
      var target;
      var step;
      for (var k in json) {
        if (k === "opacity") {//opacity要特殊处理
          //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
          //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
          leader = this.getStyle(obj, k) * 100;
          target = json[k] * 100;
          step = (target - leader) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          obj.style[k] = leader / 100;//opacity没有单位
        } else if (k === "zIndex") {
          obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
        } else {
          leader = parseInt(this.getStyle(obj, k)) || 0;
          target = json[k];
          step = (target - leader) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          obj.style[k] = leader + "px";
        }
        if (leader != target) {
          flag = false;
        }
      }
      if (flag) {
        clearInterval(obj.timer);

        obj.isAnimating = false;
        obj.isAnimated = true;
        if (fn) {
          fn();
        }
      }
    }, 15);
  }
}
