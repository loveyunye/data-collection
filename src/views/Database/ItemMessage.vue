<template>
  <div class="message">
    <div class="message-item">
      <span>类型:</span>
      <span class="name">{{ item.type }}</span>
    </div>
    <div class="message-item">
      <span>主机名:</span>
      <span class="name">{{ item.host }}</span>
    </div>
    <div class="message-item">
      <span>端口号:</span>
      <span class="name">{{ item.port }}</span>
    </div>
    <div class="message-item">
      <span>数据库名:</span>
      <span class="name">{{ item.dbName }}</span>
    </div>
    <div class="message-item">
      <span>用户名:</span>
      <span class="name">{{ item.username }}</span>
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
