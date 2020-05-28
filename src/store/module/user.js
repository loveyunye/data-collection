export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
  },
};
