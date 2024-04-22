import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      activeIndex: "/",
      //        isLogin: false,
      activeIndex: 0,
      testNum: 0,
      projectName: "專案名稱",
    };
  },
  mutations: {
    changePage(state, index) {
      state.activeIndex = index;
    },
    increment(state) {
      state.testNum++;
    },
    showName(state, name) {
      state.projectName = name;
    },
    // userStatus(state, flag) {
    //   state.isLogin = flag;
    // },
  },

  //   state: {
  //     activeIndex: "/",
  //     isLogin: false,
  //   },

  //   getters: {
  //     isLogin: (state) => state.isLogin,
  //   },
  mutations: {
    // userStatus(state, flag) {
    //   state.isLogin = flag;
    // },
    updateActiveIndex(state, index) {
      state.activeIndex = index;
    },
  },
  //   actions: {
  //     setUser({ commit }, flag) {
  //       commit("userStatus", flag);
  //     },
  //   },
});

// export default store;
