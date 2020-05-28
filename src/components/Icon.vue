<template>
  <i
    :class="`data-collection icon${type}`"
    :style="{
      color: color,
    }"
    @click="$emit('click')"
  ></i>
</template>
<script>
export default {
  name: 'icon',
  props: {
    color: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'loading',
    },
  },
};
</script>
<style lang="stylus" scoped>
.data-collection {
  cursor: pointer;
}
</style>
