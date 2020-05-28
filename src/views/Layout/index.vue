<template>
  <div class="layout-wrapper">
    <HeaderCom class="header-com" />
    <div class="container">
      <NavBar class="nav-bar" />
      <AppMain class="app-main" />
    </div>
  </div>
</template>
<script>
import NavBar from './components/NavBar';
import HeaderCom from './components/HeaderCom/index';
import AppMain from './components/AppMain';

export default {
  name: 'layout-wrapper',
  components: {
    NavBar,
    HeaderCom,
    AppMain,
  },
};
</script>
<style lang="stylus" scoped>
.layout-wrapper {
  width: 100%;
  height: 100vh;
  .header-com {
    height: 70px;
    background-color: #1C2139;
  }
  .container {
    height: calc(100% - 70px);
    display: flex;
    .nav-bar {
      width: 200px;
      height: 100%;
      background:rgba(33,40,68,1);
      box-shadow:0px 11px 21px 10px rgba(0, 0, 0, 0.2);
      border-radius:0px 8px 8px 0px;
      z-index: 1;
    }
    .app-main {
      height: 100%;
      overflow-y: scroll;
      flex: 1;
      padding: 20px 40px;
      background: linear-gradient(#34416C, 20%, #1D233E);
    }
  }
}
</style>
