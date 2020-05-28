// 我的数据相关
export default {
  namespaced: true,
  state: {
    dataSources: [],
    apiSources: [],
    projectSources: [],
    projectId: 1,
    searchStr: '',
  },
  mutations: {
    SET_DATA_SOURCES(state, val) {
      state.dataSources = val;
    },
    SET_API_SOURCES(state, val) {
      state.apiSources = val;
    },
    SET_PROJECT_SOURCES(state, val) {
      state.projectSources = val;
    },
    SET_PROJECT_ID(state, id) {
      state.projectId = id;
    },
    SET_SEARCH_STR(state, str) {
      state.searchStr = str;
    },
  },
  actions: {
    setDataSources({ commit }, val) {
      commit('SET_DATA_SOURCES', val);
    },
    setApiSources({ commit }, val) {
      commit('SET_API_SOURCES', val);
    },
    setProjectSources({ commit }, val) {
      commit('SET_PROJECT_SOURCES', val);
    },
    setProjectId({ commit }, val) {
      commit('SET_PROJECT_ID', val);
    },
  },
};
