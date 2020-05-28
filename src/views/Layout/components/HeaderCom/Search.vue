<template>
  <div class="search-wrapper" @click="inputFocus">
    <Icon type="search" />
    <input
      :class="inputClass"
      type="search"
      :value="searchStr"
      @keydown.enter="searchHandler"
      @input="__inputHandler"
      ref="searchInput"
      placeholder="search source, index, api... "
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
const debounce = function(fn, interval = 300) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
};

export default {
  name: 'search-wrapper',
  data() {
    return {
      inputStatus: false,
    };
  },
  methods: {
    ...mapMutations('data', ['SET_SEARCH_STR']),
    inputFocus() {
      this.$refs.searchInput.focus();
      this.inputStatus = true;
    },
    inputHide(event) {
      const value = this.$refs.searchInput.value;
      if (event.target.parentNode === this.$el) {
        return;
      }
      if (!value.length > 0 && this.inputStatus === true) {
        this.inputStatus = false;
      }
    },
    changeHandler() {
      this.SET_SEARCH_STR(this.$refs.searchInput.value);
    },
  },
  computed: {
    ...mapState('data', ['searchStr']),
    inputClass() {
      return this.inputStatus ? 'show' : '';
    },
  },
  mounted() {
    window.addEventListener('click', this.inputHide);
  },
  created() {
    this.__inputHandler = debounce(this.changeHandler);
  },
  destroyed() {
    window.removeEventListener('click', this.inputHide);
  },
};
</script>
<style lang="stylus" scoped>
.search-wrapper {
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  i {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.4rem;
  }
  input {
    width: 0px;
    height: 36px;
    outline: none;
    border: none;
    transition: 0.3s ease-in 0.1s;
    padding: 0 0 0 36px;
    border-radius: 36px;
    background-color: rgba(255, 255, 255, 0);
    // font-size: 14px;
    &.show {
      width: 300px;
      background-color: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding-right: 10px;
    }
  }
  input[type="search"] {
    -webkit-appearance: textfield;
    box-sizing: content-box;
  }
  &:hover {
    input {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
