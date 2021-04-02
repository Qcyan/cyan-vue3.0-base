<template>
  <div class="main flex-box-column">
    <Header></Header>

    123

    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@components/public/header'
export default {
  name: 'Layout',
  components: { Header }
}
</script>

<style scoped>
  .main {
    height: 100%;
  }
</style>
