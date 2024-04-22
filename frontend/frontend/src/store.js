import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            activeIndex: 0,
            testNum:0,
            projectName: "專案名稱",
        };
    },
    mutations: {
        changePage(state, index) {
            state.activeIndex = index;
        },
        increment(state){
            state.testNum++;
        },
        showName(state, name){
            state.projectName = name;
        },
    }
});
