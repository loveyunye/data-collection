<template>
  <div class="header-wrapper">
    <Logo />
    <div class="search-user">
      <Search />
      <Logout />
      <Project />
      <!-- <User /> -->
    </div>
  </div>
</template>
<script>
import Logo from './Logo';
import Search from './Search';
// import User from './User';
import Project from './Project';
import Logout from './Logout';

export default {
  name: 'header-wrapper',
  data() {
    return {
      name: '1232',
    };
  },
  components: {
    Logo,
    Search,
    Project,
    // User,
    Logout,
  },
};
</script>
<style lang="stylus" scoped>
.header-wrapper {
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  .search-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
