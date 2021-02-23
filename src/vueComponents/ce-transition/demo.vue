<template>
  <ElButton @click="show = !show">Toggle</ElButton>

  <ce-transition>
    <p v-if="show">hello</p>
  </ce-transition>

</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let show = ref(true)

    return {
      show
    }
  }
}
</script>
