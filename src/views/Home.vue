<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <div class="home">
    x:{{ x }},doubleX:{{ doubleX }}
    <img alt="Vue logo" src="../assets/logo.png" class="cy-pd-lr-10px" />
    <HelloWorld @accepted="accepted" msg="Welcome to Your Vue.js App" />
  </div>

  <p>aboutValue:{{ isValue || "" }}</p>

  <div id="textClass"></div>
</template>

<script>
import {
  reactive,
  ref,
  toRefs,
  computed,
  onMounted,
  getCurrentInstance
} from 'vue'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import * as home from '@/api/home'
import { formatTime, createUniqueString } from '@/utils/filter/index.js'
import { addClass, removeClass } from '@/utils/util.js'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    const { ctx } = getCurrentInstance()

    let test = formatTime(1514060000000, '{y}--{m}--{d} 周{a}')
    //    let test2 = addClass(document.getElementById('textClass'),'imag')
    // let test3 = createUniqueString()
    // console.log(test, test2, test3)

    console.log(ctx)
    console.log(ctx.$axios)
    console.log(ctx.$store)

    ctx.$Axios.get('/mock/comment/getAction', {}).then((res) => {
      console.log(res.data)
    })

    let { x, double: doubleX } = init()
    let isValue = ref(null)

    let methods = {
      accepted: (value) => {
        console.log(value)
        isValue.value = value
      }
    }

    return {
      x,
      doubleX,
      isValue,
      ...methods
    }
  }
}

function init() {
  let x = ref(10)
  let double = computed(() => x.value * 2)

  onMounted(() => {
    getData()
  })

  function getData() {
    home.listPrinterConfigs({
      printerGUID: 554267806145843200
    }).then(res => {
      console.log(res)
    })

    home.user().then(res => {
      console.log(res)
    })
  }

  return { x, double }
}
</script>
