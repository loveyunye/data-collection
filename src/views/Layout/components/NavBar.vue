<template>
  <div class="nav-bar-wrapper">
    <ul class="router-container">
      <router-link
        v-for="item in routers"
        :key="item.name"
        tag="li"
        :to="item.path"
      >
        <Icon :type="item.icon" />
        <span>
          {{ item.zh_name }}
        </span>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { constantRouter } from '../../../router';

export default {
  name: 'nav-bar',
  data() {
    return {
      routers: constantRouter,
    };
  },
};
</script>
<style lang="stylus" scoped>
.nav-bar-wrapper {
  .router-container {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      height: 60px;
      line-height: 60px;
      padding-left: 40px;
      font-size: 1.6rem;
      color: #8891B1;
      cursor: pointer;
      &:hover {
        color: #ffffff;
      }
      span {
        margin-left: 10px;
      }
      &.active {
        width: 110%;
        background-color: #15192B;
        border-radius:0px 8px 8px 0px;
        color: #ffffff;
        position: relative;
        &::after {
          position: absolute;
          content: " ";
          top: 27px;
          right: 20px;
          width:6px;
          height:6px;
          background:rgba(251,157,188,1);
          border-radius:50%;
          box-shadow: 0px 0px 10px 2px #ffffff;
        }
      }
    }
  }
}
</style>
