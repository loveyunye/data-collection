<template>
  <div class="message">
    <div class="message-item">
      <span>类型:</span>
      <span class="name">{{ item.type }}</span>
    </div>
    <div class="message-item">
      <span>描述:</span>
      <span class="name">{{ item.description }}</span>
    </div>
    <div class="message-item">
      <span>key:</span>
      <span class="name">{{ item.key }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="stylus" scoped>
.message {
  padding-top: 2rem;
  .message-item {
    line-height: 2rem;
    span:nth-child(1) {
      display: inline-block;
      width: 90px;
      color: #737f8c;
    }
  }
}
</style>
