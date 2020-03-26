<template>
  <div class="m-menu">
    <dl class="nav"
        @mouseleave="handleLeave">
      <dt>全部分类</dt>
      <dd 
        v-for="(item, index) in menu" 
        :key="index"
        @mouseenter="handleEnter">
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
export default {
  name: '',
  data () {
    return {
      kind: '',
    }
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
      this.kind = e.target.getElementsByTagName('i')[0].className;
    },
    // 鼠标移出
    handleLeave () {
      let _self = this;
      _self._time = setTimeout(function() {
        _self.kind = '';
      },200);
    },
    handleDetailEnter () {
      clearTimeout(this._time);
    },
    handleDetailLeave () {
      this.kind = '';
    }
  }
}
</script>