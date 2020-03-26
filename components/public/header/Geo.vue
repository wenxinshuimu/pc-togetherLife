<template>
  <div class="m-geo">
    <i class="el-icon-location">{{city}}</i>
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    [廊坊 河北 固安]
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Geo',
  computed: {
    city() {
      return this.$store.state.geo.position.city;
    }
  },
}
</script>