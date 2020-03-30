/* 
  *判断是否在三角形内
 */
var pointInTriangle = (function(){
  function vec(a, b){
      return{
          x: a.x - b.x,
          y: a.y - b.y
      }
  }
  function vecProduct(v1, v2){
      return v1.x * v2.y - v2.x * v1.y;
  }
  function sameSymbols(a, b){
      return (a ^ b) <0;
  }
  return function(opt){
      // 如果当前点和最后一个点在一条直线上，则不是三角形
      if(opt.curPos.x <= opt.lastPos.x){
       return false;
      }
      var PA = vec(opt.curPos, opt.lastPos),
          PB = vec(opt.curPos, opt.topLeft),
          PC = vec(opt.curPos, opt.bottomLeft),
          R1 = vecProduct(PA, PB),
          R2 = vecProduct(PB, PC),
          R3 = vecProduct(PC, PA);
         //  console.log(sameSymbols(R1, R2) && sameSymbols(R2, R3));
      return sameSymbols(R1, R2) && sameSymbols(R2, R3);
  }
})();

// 浏览器滚动位置兼容性封装
function getScrollOffset(){
  if (window.pageXOffset) {   // 如果支持常规方法
      return {
          top: window.pageYOffset,
          left: window.pageXOffset
      }
  } else {
      return {    // 两个之和，仅有一个存在
          top: document.body.scrollTop + document.documentElement.scrollTop,
          left: document.body.scrollLeft + document.documentElement.scrollLeft
      }
  }
 }
// 当前文档的坐标pageX/Y,兼容性封装
/* 传入参数
 * e 点击元素事件
*/
function pagePos(e){
  // 获取滚动条左边的距离
  var sLeft = getScrollOffset().left,
    // 获取滚动条顶部的距离
    sTop = getScrollOffset().top,
    // 获取文档偏移，有可能在在IE8及以上可能不存在
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;
  return {
    // 可视区域宽度 + 滚动条左边距离 - 可视区域左边的偏移
    X: e.clientX + sLeft - cLeft,
    // 可视区域宽度 + 滚动条左边距离 - 可视区域左边的偏移
    Y: e.clientY + sTop - cTop
  }
}

/* 获取元素样式属性或者样式集合封装，兼容IE8
 * 传入参数
 * elem 获取属性元素
 * prop 获取元素属性
*/
function getStyles(elem, prop){
  if (window.getComputedStyle) {
      // 默认浏览器
      if (prop) {
          // 如果传入属性值，则返回当前属性值
          return parseInt(window.getComputedStyle(elem, null)[prop]);
      } else {
          // 不传属性，则返回元素样式属性的集合
          return window.getComputedStyle(elem, null);
      }
  } else {
      // IE8 浏览器
      if (prop) {
          return parseInt(elem.currentStyle[prop]);
      } else {
          return elem.currentStyle;
      }
  }
}

module.exports = {
  pointInTriangle,
  pagePos,
  getStyles
} 