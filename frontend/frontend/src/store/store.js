import { createStore } from "vuex";
import axios from "axios";

const localStoragePlugin = (store) => {
  store.subscribe((mutation, { auth }) => {
    // 當執行 setUserData 時才執行以下程式碼
    if (mutation.type === "setAuth") {
      window.localStorage.setItem("auth", JSON.stringify(auth));
    }
  });
};

export default createStore({
  state: {
    activeIndex: "/",
    //        isLogin: false,
    activeIndex: 0,
    testNum: 0,
    projectName: "專案名稱",
    meetingName: "未命名會議紀錄",
    auth: "no_login_yet",
    userID: 44,
    allRecords: [],
    currRecord: {},
    projectID: 0,
    recordID: 3,
    currTextBoxes: [],
    blockNow: {},
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
    setAuth(state, authorization) {
      state.auth = authorization;
    },
    setAllRecords(state, records) {
      state.allRecords = records;
    },
    setCurrRecord(state, payload) {
      state.currRecord = payload.record;
      state.currTextBoxes = payload.boxes;
    },
    setBlockNow(state, block) {
      state.blockNow = block;
    },
    setProjectID(state, ID) {
      state.projectID = ID;
    },
    setRecordID(state, ID) {
      state.recordID = ID;
    },
    setUserID(state, ID) {
      state.userID = ID;
    },
  },
  getters: {
    getAuth(state) {
      return state.auth;
    },
    getAllRecords(state) {
      console.log("值");
      console.log(state.allRecords);
      return state.allRecords;
    },
    getCurrRecord(state) {
      return state.currRecord;
    },
    getCurrTextBoxes(state) {
      return state.currTextBoxes;
    },
    getProjectID(state) {
      return state.projectID;
    },
  },
  actions: {
    async fetchAllRecords({ state, commit }) {
      console.log("fetchAllrecords");
      try {
        const body = {
          project_id: state.projectID,
          // project_id: 94, //bricks
        };
        console.log("projID" + state.projectID);
        await axios
          .post("http://35.201.168.185:5000/get_record_index", body, {
            headers: {
              authorization: JSON.parse(localStorage.getItem("auth")),
            },
          })

          .then((res) => {
            console.log(JSON.parse(localStorage.getItem("auth"))); //確認auth是否正確
            commit("setAllRecords", res.data.record); //以array紀錄會議名稱
            console.log("回復", res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchOneRecord({ state, commit }) {
      try {
        const body = {
          project_id: state.projectID,
          record_id: state.recordID,
        };

        const response = await axios.post(
          "http://34.81.219.139:5000/get_record",
          body
        );

        const payload = {
          record: response.data.record_info[0],
          boxes: [],
        };

        if (response.data.textBox[0].length > 0) {
          payload.boxes = response.data.textBox[0];
        } else {
          payload.boxes.push({
            record_id: state.recordID,
            textBox_content: "",
          });
        }

        commit("setCurrRecord", payload);
      } catch (error) {
        console.log("無法獲得單個內容");
      }
    },
    async addBlock({ state, dispatch }) {
      const newBlock = {
        record_id: state.blockNow.record_id,
        textBox_content: state.blockNow.content,
      };

      const response = await axios.post(
        "http://34.81.219.139:5000/add_textBox",
        newBlock
      );
      console.log(response.data.message);
      await dispatch("records/fetchOneRecord");
    },
    async deleteBlock({ state, dispatch }) {
      const deleteBlock = {
        textBox_id: state.blockNow.id,
      };

      const response = await axios.post(
        "http://34.81.219.139:5000/delete_textBox",
        deleteBlock
      );
      console.log(response.data.message);
      await dispatch("records/fetchOneRecord");
    },
  },
  plugins: [localStoragePlugin],
  // modules: { records },
});

// export default store;
