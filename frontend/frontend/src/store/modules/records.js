import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';
const state = {
    allRecords: [],
    currRecord : {},
    projectID: 86,
    recordID: 3,
    currTextBoxes: [],
};
const getters = {
    getAllRecords(state){
        return state.allRecords;
    },
    getCurrRecord(state){
        return state.currRecord;
    },
    getCurrTextBoxes(state){
        return state.currTextBoxes;
    },
};
const mutations = {
    setAllRecords(state, records){
        state.allRecords = records;
    },
    setCurrRecord(state, payload) {
        state.currRecord = payload.record;
        state.currTextBoxes = payload.boxes;
    },
    addBlock(state, block){
        state.currTextBoxes.push({
            "id": state.currTextBoxes[state.currTextBoxes.length - 1]+1,
            "record_id": "3",
            "textBox_content": "",
            "textBox_update_time": new Date(),
        });
    },
};
const actions = {
    async fetchAllRecords({ state, commit }) {
        try {
          const body = {
            "project_id": 86,
          };
    
          const response = await axios.post('http://34.81.219.139:5000/get_record_index', body);
          commit("setAllRecords", response.data.record);
        } catch (error) {
          console.log("出錯了");
          
        }
      },
    async fetchOneRecord({state, commit}){
        try{
            const body = {
                "project_id": state.projectID,
                "record_id": state.recordID,
            };
    
            const response = await axios.post("http://34.81.219.139:5000/get_record", body);
            const payload = {
                record: response.data.record_info[0], // 提取单个记录对象
                boxes: response.data.textBox[0], // 假设你需要第一个 textBox 数组
            };
            commit("setCurrRecord", payload);
        }catch(error){
            console.log("無法獲得單個內容");
        }
        
    }
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};