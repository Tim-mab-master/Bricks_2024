import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from 'vuex-persistedstate';
import debounce from 'lodash/debounce';

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
    tagsDate: [],
    tagsThing:[],
    tagsTeam: [],
    saveMessage: "",
    tagSearchResult:[],
  },

  mutations: {
    setMeetingName(state, meetingName) {
      state.meetingName = meetingName;
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
    setBlockNow(state, block) {
      state.blockNow = block;
    },
    setProjectID(state, ID) {
      state.projectID = ID;
      window.localStorage.setItem("projectID", ID);
    },
    setRecordID(state, ID) {
      state.recordID = ID;
      window.localStorage.setItem("recordID", ID);
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
      tags.map((tag) => {
        switch(tag.tag_class){
          case "日期":
            state.tagsDate = tag.tag_names;
          case "事項":
            state.tagsThing = tag.tag_names;
          case "組別":
            state.tagsTeam = tag.tag_names;
        }
      })
    },
    resetRecord(state){
      state.currRecord = {};
      console.log("reseted");
    },
    setSaveMessage(state, message){
      state.saveMessage = message;
      setTimeout(() => {
        state.saveMessage = "";
      }, 3000)
    },
    setTagSearchResult(state, result){
      state.tagSearchResult = result;
    },
    resetSearchResult(state){
      state.tagSearchResult = [];
    }
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
    getProjectID() {
      return localStorage.getItem("projectID");
    },
    getCurrRecord(state) {
      return state.currRecord;
    },
    getCurrTextBoxes(state) {
      return state.currTextBoxes;
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
    getSaveMessage(state){
      return state.saveMessage;
    },
    getTagsDate(state){
      const formatted = state.tagsDate.map((tag) => {
            return {label: tag, checked: false}
          })
      return formatted;
    },
    getTagsThing(state){
      const formatted = state.tagsThing.map((tag) => {
        return {label: tag, checked: false}
      })
      return formatted;
    },
    getTagsTeam(state){
      const formatted = state.tagsTeam.map((tag) => {
        return {label: tag, checked: false}
      })
      return formatted;
    },
    getTagSearchResult(state){
      // console.log('result',state.tagSearchResult);
      return state.tagSearchResult;
    },
    

  },
  actions: {
    async resultFilter({ commit }, payload) {
      const filtered = payload.concated
        .map(item => {
          // 计算每个 item 中 Tag_name 符合关键词的数量
          const matchCount = item.Tag.reduce((count, tagArray) => {
            return count + tagArray.reduce((innerCount, tag) => {
              return innerCount + payload.keywords.reduce((keywordCount, keyword) => {
                return keywordCount + (tag.Tag_name.includes(keyword) ? 1 : 0);
              }, 0);
            }, 0);
          }, 0);
    
          return { ...item, matchCount }; // 添加匹配计数
        })
        .filter(item => item.matchCount > 0)  // 保留至少符合一个关键字的项
        .sort((a, b) => b.matchCount - a.matchCount); // 根据匹配计数降序排列
    
      commit("setTagSearchResult", filtered);
      console.log("filterResult:", filtered);
      console.log("keywords:", payload.keywords);
    },
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
          project_id: JSON.parse(localStorage.getItem("projectID")),
          record_id: JSON.parse(localStorage.getItem('recordID')),
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
        // await dispatch('fetchAllTags');
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
    async deleteBlock({ state, dispatch }, blockID) {
      const deleteBlock = {
        "textBox_id": blockID,
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
    async fetchAllTags({state, commit}){
      const project = {
        project_id: JSON.parse(localStorage.getItem("projectID")),
      }
      const response = await axios.post("http://35.201.168.185:5000/tag_index", project, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      }).catch(console.log("wrong"))
      commit('setAllTags', response.data.item);
    },
    async addTag({dispatch},payload){
      const newTag = {
        "textBox_id": payload.blockID,
        "tag_name": payload.inputValue,
        "tag_class": payload.tagClass
      }
      const response = await axios.post("http://35.201.168.185:5000/add_tag",newTag,{
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      })
      // await dispatch('fetchOneRecord');
      await dispatch('fetchAllTags');
  
    },
    async deleteTag({dispatch},payload){
      const deleteTag = {
        "textBox_id": payload.blockID,
        "tag_id": payload.tagID,
      };
      const response = await axios.post("http://35.201.168.185:5000/delete_tag", deleteTag, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("auth")),
        },
      })
      console.log(response)
      // await dispatch('fetchOneRecord');
      await dispatch('fetchAllTags');
    }
  },
  
  plugins: [
    createPersistedState({
      storage: window.localStorage, // 可以是 localStorage 或 sessionStorage
    }),
  ],
});

// export default store;
