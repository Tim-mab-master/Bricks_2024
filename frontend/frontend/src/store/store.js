import { createStore } from "vuex";
import axios from "axios";

const localStoragePlugin = (store) => {
  store.subscribe((mutation, { auth }) => {
    // 當執行 setUserData 時才執行以下程式碼
    if (mutation.type === "setAuth") {
      window.localStorage.setItem("auth", JSON.stringify(auth));
    }
  });
  // store.subscribe((mutation, { name }) => {
  //   // 當執行 setProjectName 時才執行以下程式碼
  //   if (mutation.type === "setProjectName") {
  //     );
  //     alert(JSON.parse(localStorage.getItem("projectName")));
  //   }
  // });
};

export default createStore({
  state: {
    testNum: 0,
    projectName: "專案名稱",
    meetingName: "未命名會議紀錄",
    auth: "no_login_yet",
    userID: 44,
    allRecords: [],
    trashRecords: [],
    currRecord: {},
    projectID: 0,
    recordID: 51,
    currTextBoxes: [],
    blockNow: {},
    delete_confirm: false,
    terminate_confirm: false,
    forever_delete_record_confirm: false,
    newRecord: {},
    allTags: [],
    saveMessage: "",
  },

  mutations: {
    setMeetingName(state, meetingName) {
      state.meetingName = meetingName;
    },
    setProjectName(state, projectName) {
      state.projectName = projectName;
      window.localStorage.setItem("projectName", JSON.stringify(projectName));
    },
    setAuth(state, authorization) {
      state.auth = authorization;
    },
    setAllRecords(state, records) {
      state.allRecords = records;
    },
    setTrashRecords(state, records) {
      state.trashRecords = records;
    },
    setCurrRecord(state, payload) {
      state.currRecord = payload.record;
      state.currTextBoxes = payload.boxes;
      state.meetingName = payload.record.record_name;
    },
    setNewProject(state, newRecord) {
      state.newRecord = newRecord;
      state.meetingName = newRecord.record_name;
    },
    setBlockNow(state, block) {
      state.blockNow = block;
    },
    setProjectID(state, ID) {
      state.projectID = ID;
      window.localStorage.setItem("projectID", ID);
    },
    setRecordID(state, ID) {
      state.recordID = ID;
    },
    setUserID(state, ID) {
      state.userID = ID;
    },
    setDeleteConfirm(state) {
      state.delete_confirm = !state.delete_confirm;
    },
    setTerminateConfirm(state) {
      state.terminate_confirm = !state.terminate_confirm;
    },
    // 控制彈出視窗
    setForeverDeleteRecord(state) {
      state.forever_delete_record_confirm =
        !state.forever_delete_record_confirm;
    },
    setAllTags(state, tags) {
      state.allTags = tags;
    },
    resetRecord(state) {
      state.currRecord = {};
      console.log("reseted");
    },
    setSaveMessage(state, message) {
      state.saveMessage = message;
      setTimeout(() => {
        state.saveMessage = "";
      }, 3000);
    },
  },
  getters: {
    getAuth(state) {
      return state.auth;
    },
    getAllRecords(state) {
      return state.allRecords;
    },
    getTrashRecords(state) {
      return state.trashRecords;
    },
    getRecordID(state) {
      return state.recordID;
    },

    // 需要確定
    getCurrRecord(state) {
      return state.currRecord;
    },
    getCurrTextBoxes(state) {
      return state.currTextBoxes;
    },
    getProjectID(state) {
      return state.projectID;
    },
    getRecordID(state) {
      return state.recordID;
    },
    getProjectName(state) {
      return JSON.parse(window.localStorage.getItem("projectName"));
    },
    getDeleteConfirm(state) {
      return state.delete_confirm;
    },
    getTerminateConfirm(state) {
      return state.terminate_confirm;
    },
    getForeverDeleteRecord(state) {
      return state.forever_delete_record_confirm;
    },
    getBlockNow(state) {
      return state.blockNow;
    },
    getAllTags(state) {
      return state.allTags;
    },
    getSaveMessage(state) {
      return state.saveMessage;
    },
  },
  actions: {
    async fetchAllRecords({ state, commit }) {
      try {
        const body = {
          project_id: JSON.parse(localStorage.getItem("projectID")),
          // project_id: 94, //bricks
        };
        await axios
          .post("http://35.201.168.185:5000/get_record_index", body, {
            headers: {
              authorization: JSON.parse(localStorage.getItem("auth")),
            },
          })

          .then((res) => {
            // console.log(JSON.parse(localStorage.getItem("auth"))); //確認auth是否正確
            commit("setAllRecords", res.data.record); //以array紀錄會議名稱
          });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchTrashRecords({ state, commit }) {
      try {
        const body = {
          project_id: JSON.parse(localStorage.getItem("projectID")),
          // project_id: 94, //bricks
        };
        await axios
          .post("http://35.201.168.185:5000/trashcan_record", body, {
            headers: {
              authorization: JSON.parse(localStorage.getItem("auth")),
            },
          })

          .then((res) => {
            commit("setTrashRecords", res.data.item); //以array紀錄會議名稱
          });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchOneRecord({ state, commit, dispatch }) {
      try {
        const body = {
          project_id: JSON.parse(localStorage.getItem("projectID")),
          record_id: state.recordID,
        };

        const response = await axios.post(
          "http://35.201.168.185:5000/get_record",
          body,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("auth")),
            },
          }
        );

        const payload = {
          record: response.data.record_info[0],
          boxes: [],
        };

        if (response.data.textBox.length == 0) {
          dispatch("addBlock");
        } else {
          payload.boxes = response.data.textBox;
        }

        commit("setCurrRecord", payload);
      } catch (error) {
        console.log("無法獲得單個內容");
      }
    },
    async addBlock({ state, dispatch }) {
      const newBlock = {
        record_id: state.recordID,
        textBox_content: "",
      };

      const response = await axios.post(
        "http://35.201.168.185:5000/add_textBox",
        newBlock,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        }
      );
      // console.log(response.data.message);
      await dispatch("fetchOneRecord");
    },
    async deleteBlock({ state, dispatch }) {
      const deleteBlock = {
        textBox_id: state.blockNow.TextBox_id.toString(),
      };

      const response = await axios.post(
        "http://35.201.168.185:5000/delete_textBox",
        deleteBlock,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        }
      );
      console.log(response.data.message);
      await dispatch("fetchOneRecord");
    },
    async fetchAllTags({ state }) {
      const project = {
        project_id: JSON.parse(localStorage.getItem("projectID")),
      };
      const response = await axios
        .post("http://35.201.168.185:5000/tag_index", project, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        })
        .catch(console.log("wrong"));
      // console.log(response.data.item);
      state.commit("setAllTags", response.data.item);
    },
  },

  plugins: [localStoragePlugin],
});

// export default store;
