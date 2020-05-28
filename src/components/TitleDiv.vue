<template>
  <div class="title-div-wrapper">
    <span>{{ name }} ( {{ num }} )</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'title-div-wrapper',
  props: {
    name: {
      type: String,
      default: '名称',
    },
    num: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="stylus" scoped>
.title-div-wrapper {
  width: 100%;
  height: 50px;
  line-height: 50px;
  transition: 0.5s 0.35s ease-in-out;
  border-radius: 8px;
  position: relative;
  background-color: #1c2139;
  font-size: 1.6rem;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
</style>
