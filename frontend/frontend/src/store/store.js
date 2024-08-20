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
    newRecord: {},
    allTags: [],
  },

  mutations: {
    changePage(state, index) {
      state.activeIndex = index;
    },
    setMeetingName(state, meetingName) {
      state.meetingName = meetingName;
    },
    setNewRecord(state, newRecord) {
      state.newRecord = newRecord;
    },
    setProjectName(state, projectName) {
      state.projectName = projectName;
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
    setNewProject(state, newRecord){
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
    setAllTags(state, tags){
      state.allTags = tags;
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
    getTrashRecords(state) {
      console.log("值");
      console.log(state.trashRecords);
      return state.trashRecords;
    },
    getRecordID(state) {
      return state.recordID;
    },
    getCurrRecord(state) {
      if(state.currRecord != {}){
        return state.currRecord;
      }else{
        return state.newRecord;
      }
    },
    getCurrTextBoxes(state) {
      return state.currTextBoxes;
    },
    getProjectID(state) {
      return state.projectID;
    },
    getRecordID(state){
      return state.recordID;
    },
    getDeleteConfirm(state) {
      return state.delete_confirm;
    },
    getTerminateConfirm(state) {
      return state.terminate_confirm;
    },
    getBlockNow(state){
      return state.blockNow;
    },
    getAllTags(state){
      return state.allTags;
    },
  },
  actions: {
    async fetchAllRecords({ state, commit }) {
      console.log("fetchAllrecords");
      try {
        const body = {
          project_id: JSON.parse(localStorage.getItem("projectID")),
          // project_id: 94, //bricks
        };
        console.log("projID" + JSON.parse(localStorage.getItem("projectID")));
        await axios
          .post("http://35.201.168.185:5000/get_record_index", body, {
            headers: {
              authorization: JSON.parse(localStorage.getItem("auth")),
            },
          })

          .then((res) => {
            // console.log(JSON.parse(localStorage.getItem("auth"))); //確認auth是否正確
            commit("setAllRecords", res.data.record); //以array紀錄會議名稱
            console.log("回復", res.data.record);
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
            // console.log(JSON.parse(localStorage.getItem("auth"))); //確認auth是否正確
            commit("setTrashRecords", res.data.item); //以array紀錄會議名稱
            console.log("垃圾桶", res.data.item);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchOneRecord({ state, commit, dispatch }) {
      try {
        const body = {
          project_id: state.projectID,
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
          dispatch('addBlock');
        } else {
          payload.boxes = response.data.textBox;
        }

        commit("setCurrRecord", payload);
        console.log("payload", payload);
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
        "http://35.201.168.185:5000/add_textBox",newBlock,{
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        }
      );
      console.log(response.data.message);
      await dispatch("fetchOneRecord");
    },
    async deleteBlock({ state, dispatch }) {

      const deleteBlock = {
        "textBox_id": state.blockNow.textBox_id,
      };

      const response = await axios.post(
        "http://35.201.168.185:5000/delete_textBox",deleteBlock,{
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        }
      );
      console.log(response.data.message);
      await dispatch("fetchOneRecord");
    },
    async fetchAllTags({state}){
      const project = {
        project_id: state.projectID,
      }
      const response = await axios.post("http://35.201.168.185:5000/tag_index", project, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      }).catch(console.log("wrong"))
      // console.log(response.data.item);
      state.commit('setAllTags', response.data.item);
    },
  },

  plugins: [localStoragePlugin],
});

// export default store;
