<template>
  <div class="m-menu">
    <dl class="nav"
        @mouseleave="handleLeave">
      <dt>全部分类</dt>
      <dd 
        v-for="(item, index) in menu" 
        :key="index"
        class="menu-list"
        @mouseenter="handleEnter"
        @mousemove="handleMove">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind"
    @mouseenter="handleDetailEnter"
    @mouseleave="handleDetailLeave">
      <template v-for="(item, index) in curDetail.child">
        <h4  :key="index">{{item.title}}</h4>
        <span v-for="(childitem) in item.child" :key="childitem">{{childitem}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import tools  from '../../utils/tools'
export default {
  name: '',
  data () {
    return {
      kind: '',
      mousePoses: [],
      isFirst: true,
      oMenu: '',
      oMenuItems: '',
      oSubItems: '',
      isInSub: false,
      t: null
    }
  },
  mounted () {
    this.oMenu = document.getElementsByClassName('m-menu')[0]
    this.oMenuItems = document.getElementsByClassName('menu-list')
    this.oSubItems = document.getElementsByClassName('detail')
  },
  computed: {
    menu() {
      return this.$store.state.home.menu;
    },
    curDetail () {
      return (this.menu.filter((item) => item.type === this.kind))[0];
    }
  },
  methods: {
    // 鼠标移入
    handleEnter (e) {
      let tar = e.target,
          posLen = this.mousePoses.length,
          mouseIndex = Array.prototype.indexOf.call(this.oMenuItems, tar),
          curPos = this.mousePoses[posLen - 1] || {x: 0, y: 0},
          lastPos = this.mousePoses[posLen - 2] || {x: 0, y: 0},
          doDelay = this.doTimeOut(JSON.parse(JSON.stringify(lastPos)), JSON.parse(JSON.stringify(curPos)));	// 返回布尔值;
      if (this.t) {
        clearTimeout();
      }
      if (!this.isFirst) {
        // 是否需要延时
        let _self = this;
        if (doDelay) {
          _self.t = setTimeout(function(){
            if (_self.isInSub) {
              _self.t = null;
              return;
            }
            _self.addActive(mouseIndex, e);
            _self.t = null;
          }, 200);
          
        }else{
          this.addActive(mouseIndex, e);
        }
      } else {
        this.addActive(mouseIndex, e);
        this.isFirst = false;
      }
    },
    removeAllActive(){
      for (var i = 0; i < this.oMenuItems.length; i++) {
        let mainItem = this.oMenuItems[i];
        mainItem.className = 'menu-list';
        //subItem.className = 'detail';
      }
    },
    addActive(index, e){
      this.removeAllActive();
      this.oMenuItems[index].className += ' active'; 
      this.kind = e.target.getElementsByTagName('i')[0].className;
      // this.oSubItems[index].className += ' active'; 
    },
    // 获取鼠标移动的最后两个点，最后一个点为P点，倒数第一个点为a点，
    handleMove (e) {
      //dconsole.log(e)
      var e = e || window.event;
      this.mousePoses.push({
        x: tools.pagePos(e).X,
        y: tools.pagePos(e).Y
      });
      if (this.mousePoses.length >=3) {
        this.mousePoses.shift();
      }
      //console.log(this.mousePoses);
    },
    // 鼠标移出
    handleLeave () {
      let _self = this;
      _self._time = setTimeout(function() {
        _self.kind = '';
        _self.removeAllActive();
      },200);
    },
    handleDetailEnter () {
      this.isInSub = true;
      clearTimeout(this._time);
    },
    handleDetailLeave () {
      this.kind = '';
      this.isInSub = false;
      this.removeAllActive();
    },
    // 根据获得的点，判断p点是否存在三角形内，由此来判断是否需要延时
    doTimeOut (lastPos, curPos) {
      // 三角形b点
      var topLeft = {
        x: tools.getStyles(this.oMenu, 'margin-left') + tools.getStyles(this.oMenu, 'width'),
        y: tools.getStyles(this.oMenu, 'margin-top')
      },
        bottomLeft = {
          x: tools.getStyles(this.oMenu, 'margin-left') + tools.getStyles(this.oMenu, 'width'),
          y: tools.getStyles(this.oMenu, 'margin-top') + tools.getStyles(this.oMenu, 'height')
        }
      return tools.pointInTriangle({
        curPos: curPos,
        lastPos: lastPos,
        topLeft: topLeft,
        bottomLeft: bottomLeft
      });
    }
  }
}
</script>