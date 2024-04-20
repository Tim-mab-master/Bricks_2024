import { createStore } from "vuex";

const store = createStore({
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

export default store;
