<template>
  <div :id="id" :style="{width: width + 'px', height: height + 'px', margin: '34px auto'}"></div>
</template>
<script>
export default {
  name: 'Map',
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default () {
        return [116.39,39.6]
      }
    }
  },
  data () {
    return {
      id: 'map',
      key: 'fbd084f8a2e0fd8dff75d2f02a378b58'
    }
    
  },
  mounted () {
    let _self = this;
    this.id = `map${Math.random().toString().slice(2,4)}`;
    window.onMapLoad  = function(){
      var map = new AMap.Map(_self.id, {
        zoom: 10,
        center: _self.point,
        resizeEnable: true
      });
      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin([
          'AMap.ToolBar',
      ], function(){
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar());

          // 创建一个 Marker 实例：
          var marker = new AMap.Marker({
              position: _self.point,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              // title: '北京'
          });

          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
      });
    };
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${_self.id}&callback=onMapLoad`;
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
}
</script>