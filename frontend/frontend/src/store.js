import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            activeIndex: 0,
            testNum:0,
        };
    },
    mutations: {
        changePage(state, index) {
            state.activeIndex = index;
        },
        increment(state){
            state.testNum++;
        }
    }
});
