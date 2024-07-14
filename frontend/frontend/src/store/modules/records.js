import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
const state = {
  userID: 44,
  allRecords: [],
  currRecord: {},
  projectID: 86,
  recordID: 3,
  currTextBoxes: [],
  blockNow: {},
};
const getters = {
  getAllRecords(state) {
    return state.allRecords;
  },
  getCurrRecord(state) {
    return state.currRecord;
  },
  getCurrTextBoxes(state) {
    return state.currTextBoxes;
  },
};
const mutations = {
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
};
const actions = {
  async fetchAllRecords({ state, commit }) {
    try {
      const body = {
        // project_id: state.projectID,
        project_id: 96,
      };
      console.log("projID" + state.projectID);

      const response = await axios
        .post("http://35.201.168.185:5000/get_record_index", body, {
          headers: { authorization: JSON.parse(localStorage.getItem("auth")) },
        })
        .then((res) => {
          console.log(res);
        });
      commit("setAllRecords", response.data.record);
    } catch (error) {
      console.log("出錯了");
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
