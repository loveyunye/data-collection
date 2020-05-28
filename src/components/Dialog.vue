<template>
  <div class="dialog-wrapper">
    <transition name="fade">
      <div v-if="visible" class="dialog-mask" @click="colseDialog"></div>
    </transition>
    <div class="dialog-container" :style="{ width: visible ? width : 0 }">
      <div class="dialog-title">{{ title }}</div>
      <div class="dialog-self-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: '标题',
    },
    width: {
      default: '560px',
    },
    value: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      visible: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.visible = newVal;
    },
    visible(newVal) {
      this.$emit('input', newVal);
    },
  },
  methods: {
    colseDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="stylus">
.dialog-wrapper {
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 998;
  }
  .dialog-container {
    position: fixed;
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    transition: width 0.3s 0.2s ease-in-out;
    background:rgba(33,40,68,1);
    box-shadow: 0px -11px 21px 10px rgba(0, 0, 0, 0.2);
    border-radius:8px 0px 0px 8px;
    .dialog-title {
      padding: 16px 24px;
      font-size: 2rem;
      line-height: 3rem;
      font-weight: 500;
      color: #00abff;
    }
    .dialog-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #e8e8e8;
      padding: 10px 16px;
      text-align: right;
      border-radius: 0 0 4px 4px;
      button:nth-child(1) {
        margin-right: 10px;
      }
    }
    .dialog-self-body {
      max-height: calc(100vh - 3rem - 32px);
      overflow-y: scroll;
    }
  }
}
</style>
