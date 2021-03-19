<template>
  <div id="test"></div>
</template>
<script>
import { getCurrentInstance } from 'vue'

export default {
  name: 'Home',
  setup() {
    const { ctx } = getCurrentInstance()
    console.log(ctx)

    ctx.$Axios.get('/mock/comment/get.action', {}).then((res) => {
      console.log(res.data)
    })

    const requestSifou = async() => {
      const { result } = await ctx.$request.get('/comment/get.action')
      console.log(result)
    }
    requestSifou()
  }
}
</script>
