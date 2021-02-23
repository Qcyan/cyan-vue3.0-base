<!--弹窗过渡类-->
<template>
  <transition :name="transitionName" mode="fade">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: 'CeTransition',
  props: {
    transitionName: {
      default: 'fade',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
