<template>
  <div class="logout-wrapper">
    <div class="nick" @click="logoutHandler">
      <Icon type="guanji" />
      <span>{{ userInfo.username || '' }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { logout } from '@/api/user';
import { mapMutations } from 'vuex';

export default {
  name: 'project',
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    logoutHandler() {
      this.$confirm('确定退出吗?', '提示')
        .then(async () => {
          try {
            await logout();
            this.setUserInfo({});
            this.$router.push('/login');
          } catch {
            return;
          }
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
};
</script>
<style lang="stylus" scoped>
.logout-wrapper {
  &:hover {
    color: #00abff;
    cursor: pointer;
  }
  span {
    margin-left: 2px;
  }
}
</style>
