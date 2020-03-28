<template>
  <div>退出</div>
</template>
<script>
import { URL } from '@/config/config'
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    let {status, data} = await ctx.$axios.get(URL.API_BASE_URL + '/users/exit');
    if (status === 200 && data && data.code === 0) {
      location.href = '/'
    }
  } 
}
</script>