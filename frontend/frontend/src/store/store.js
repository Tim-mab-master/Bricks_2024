import { createStore } from "vuex";

export default createStore({
  state: {
    activeIndex: "/",
    //        isLogin: false,
    activeIndex: 0,
    testNum: 0,
    projectName: "專案名稱",
    meetingName: "未命名會議紀錄",
  },
  mutations: {
    changePage(state, index) {
      state.activeIndex = index;
    },
    setName(state, name){
      state.meetingName = name;
    },
    state() {
      return {
        activeIndex: 0,
        testNum: 0,
        projectName: "專案名稱",
        meetingName: "未命名會議紀錄"
      };
    },
    
  },

});

// export default store;
