<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <ElButton @click="$emit('aboutValue')">点击传给父组件</ElButton>
  </div>
</template>

<script>
export default {
  emits: ['aboutValue']
}
</script>
