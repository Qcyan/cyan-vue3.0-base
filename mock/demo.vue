<template>
  <div id="test"></div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import useGlobal from '@/hooks/useGlobal'

export default {
  name: 'Home',
  setup() {
    const { $request } = useGlobal()
    const { ctx } = getCurrentInstance()
    console.log($request)

    ctx.$Axios.get('/mock/comment/getAction', {}).then((res) => {
      console.log(res.data)
    })

    const requestSifou = async() => {
      console.log($request.get.mock)
      const { result } = await $request.get.mock('/comment/getAction')
      // const { result } = await $request.get('/comment/get.action')

      console.log(result)
    }
    requestSifou()
  }
}
</script>
