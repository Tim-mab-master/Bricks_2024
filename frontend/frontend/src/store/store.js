import { createStore } from "vuex";

export default createStore({
  state: {
    activeIndex: "/",
    //        isLogin: false,
    activeIndex: 0,
    testNum: 0,
    projectName: "專案名稱",
    meetingName: "未命名會議紀錄",
    auth: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiODE4MTV0aW1AZ21haWwuY29tIiwiZXhwIjoxNzIzNDc5NDUzfQ.AZ6q7gSJVI2vt16zHoitKCmf5ED9aORxVLSeDF6QZzU",
  },
  // actions: {
  //   setAuth(authorization) {
  //     SetAuth(authorization);
  //   },
  // },
  mutations: {
    changePage(state, index) {
      state.activeIndex = index;
    },
    setName(state, name) {
      state.meetingName = name;
    },
    // state() {
    //   return {
    //     activeIndex: 0,
    //     testNum: 0,
    //     projectName: "專案名稱",
    //     meetingName: "未命名會議紀錄",
    //   };
    // },
    setAuth(state, authorization) {
      state.auth = authorization;
    },
  },
  getters: {
    getAuth(state) {
      return state.auth;
    },
  },
});

// export default store;
