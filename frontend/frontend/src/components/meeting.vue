<template>
  <div class="button-container">
    <el-backtop visibility-height="0" class="backtop">
      <div id="backtop">
        <el-icon class="icon"><upload /></el-icon>
      </div>
    </el-backtop>

    <el-button type="button" @click="showBasicInfo" class="button"
      ><el-icon><Edit /></el-icon>會議基本資訊</el-button
    >
    <el-button :plain="true" @click="copyLinkBtn"
      ><el-icon><Link /></el-icon
    ></el-button>
  </div>
  <div class="form-container">
    <table class="form-table">
      <tr>
        <td class="left-bar">
          <label for="meetingName">會議名稱</label>
        </td>
        <td class="input-cell">
          <input
            type="text"
            id="meetingName"
            v-model="meetingName"
            class="text-input"
            :placeholder="placeholder"
            @focus="clearPlaceholder"
            @blur="restorePlaceholder"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td class="left-bar">
          <label for="time">時間</label>
        </td>
        <td class="input-cell">
          <input
            type="place"
            id="time"
            v-model="time"
            class="text-input"
            placeholder="-"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td class="left-bar">
          <label for="attend">出席人員</label>
        </td>
        <td class="input-cell">
          <el-tag
            class="ml-2"
            type="danger"
            v-for="(option, index) in optionsA"
            :key="index"
            >{{ option.label }}</el-tag
          >
          <!-- <input type="attend" id="attend" v-model="attends" class="text-input" placeholder="-"> -->
        </td>
      </tr>
      <tr>
        <td class="left-bar">
          <label for="place">地點</label>
        </td>
        <td class="input-cell">
          <input
            type="place"
            id="place"
            v-model="place"
            class="text-input"
            placeholder="-"
            readonly
          />
        </td>
      </tr>
      <tr>
        <td class="left-bar">
          <label for="absent">缺席人員</label>
        </td>
        <td class="input-cell">
          <el-tag
            class="ml-2"
            type="danger"
            v-for="(option, index) in optionsB"
            :key="index"
            >{{ option.label }}</el-tag
          >

          <!-- <input type="absent" id="absent" v-model="absents" class="text-input" placeholder="-"> -->
        </td>
      </tr>
      <tr>
        <td class="left-bar">
          <label for="record">紀錄人員</label>
        </td>
        <td class="input-cell">
          <el-tag
            class="ml-2"
            type="danger"
            v-for="(option, index) in optionsC"
            :key="index"
            >{{ option.label }}</el-tag
          >
          <!-- <input type="record" id="record" v-model="recorder" class="text-input" placeholder="-"> -->
        </td>
      </tr>
    </table>
  </div>

  <div class="overlay" v-show="showOverlay"></div>
  <div class="form" v-show="form.show">
    <p class="formName">
      設定會議基本資訊
      <button class="close-button" type="button" @click="close">
        <el-icon><Close /></el-icon>
      </button>
    </p>
    <el-form :model="form">
      <el-form-item label="會議名稱">
        <el-input
          v-model="form.data.formName"
          :style="{ width: '500px' }"
          placeholder="輸入會議名稱"
        />
      </el-form-item>
      <el-form-item label="日期">
        <div class="demo-date-picker">
          <el-date-picker
            v-model="form.data.date"
            type="date"
            placeholder="Pick a date"
            :default-value="new Date()"
            :style="{ width: '500px' }"
          />
        </div>
      </el-form-item>
      <el-form-item label="開會時間">
        <div class="demo-range">
          <el-time-picker
            v-model="form.data.time"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
            :default-value="[new Date(), new Date()]"
          />
        </div>
      </el-form-item>
      <el-form-item label="出席人員">
        <el-select
          v-model="valueA"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="true"
          placeholder="選擇出席人員"
          :style="{ width: '500px' }"
          @change="handleSelectChangeA"
        >
          <el-option
            v-for="item in optionsA"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="會議進行地點">
        <el-input
          v-model="form.data.place"
          :style="{ width: '500px' }"
          placeholder="輸入會議地點"
        />
      </el-form-item>
      <el-form-item label="缺席人員">
        <el-select
          v-model="valueB"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="選擇缺席人員"
          :style="{ width: '500px' }"
          @change="handleSelectChangeB"
        >
          <el-option
            v-for="item in optionsB"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="紀錄負責人員">
        <el-select
          v-model="valueC"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="選擇會議記錄人員"
          :style="{ width: '500px' }"
          @change="handleSelectChangeC"
        >
          <el-option
            v-for="item in optionsC"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button class="commit_button" @click="onSubmit">
          <el-icon><DocumentChecked /></el-icon>
          <span style="margin-left: 8px">儲存</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <BasicInfo /> -->
  <!-- <Delete /> -->
</template>

<script setup>
import store from "../store/store.js";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import { ElNotification, ElMessage } from "element-plus";

const router = useRouter();
// const props = defineProps(['recordInfo']);
const emit = defineEmits(["submit"]);
const props = defineProps(["recordInfo"]);

// 定義響應式數據
const form = reactive({
  show: false,
  data: {
    formName: "",
    date: new Date(),
    time: [new Date(), new Date(Date.now() + 60 * 60 * 1000)],
    place: "",
    // 其他表單項目
  },
});

// const recordInfo = computed(() => store.getters.getCurrRecord);
const meetingName = ref("");
const time = ref("");
const place = ref("");
const showOverlay = ref(false);
const placeholder = ref("輸入會議名稱");

const valueA = ref([]);
const optionsA = ref([]);
const valueB = ref([]);
const optionsB = ref([]);
const valueC = ref([]);
const optionsC = ref([]);

const clearPlaceholder = () => {
  placeholder.value = "";
};

const restorePlaceholder = () => {
  if (!meetingName.value) {
    placeholder.value = "輸入會議名稱";
  }
};

const recover = () => {
  ElNotification({
    dangerouslyUseHTMLString: true,
    title: "成功復原會議記錄",
    message:
      '<a href="/path/to/recovery/file" style="color: #67C23A; text-decoration: underline;">點擊檢視復原檔案</a>',
    type: "success",
    position: "bottom-right",
  });
};

const copyLinkBtn = () => {
  ElMessage({
    message: "會議記錄連結已複製",
    type: "success",
    position: "bottom-right",
  });
};

const deleteForever = () => {
  ElMessage("您已永久刪除會議記錄");
};

const deleteRecord = () => {
  ElMessage.error("您已刪除會議記錄");
};

const showBasicInfo = () => {
  showOverlay.value = true;
  form.show = true;
};

const close = () => {
  showOverlay.value = false;
  form.show = false;
};

const handleSelectChangeA = (selectedValues) => {
  handleSelectChange(selectedValues, optionsA.value, valueA.value);
};

const handleSelectChangeB = (selectedValues) => {
  handleSelectChange(selectedValues, optionsB.value, valueB.value);
};

const handleSelectChangeC = (selectedValues) => {
  handleSelectChange(selectedValues, optionsC.value, valueC.value);
};

const checkNone = (input, values, options) =>{
  if(typeof input === 'string' && input !== "None" && input !== ""){
    const result = input.split(',');
    result.forEach((person) => {
      options.push({
        value: person.trim(), // 確保去除前後空白
        label: person.trim()
      });
    values.push(person.trim());
    })
  }else{
      values = [];
      options = [];
  }
}



// const ifNone = (input, values, option) => {
//   // 檢查 input 是否是有效的字串
//   if (typeof input === 'string' && input !== "None") {
//     // 將 input 分割成陣列
//     const result = input.split(',');

//     // 遍歷分割後的結果，並更新 values 和 option
//     result.forEach((person) => {
//       option.push({
//         value: person.trim(), // 確保去除前後空白
//         label: person.trim()
//       });
//       values.push(person.trim());
//     });
//   } else {
//     // 如果 input 是 "None" 或其他非字串，清空 values 和 option
//     values = [];
//     option = [];
//   }

//   console.log('Values:', values, 'and Input:', input);
// };


const handleSelectChange = (selectedValues, options, value) => {
  for (let i = 0; i < selectedValues.length; i++) {
    const existsInOptions = options.some(
      (option) => option.value === selectedValues[i]
    );
    if (!existsInOptions) {
      options.push({
        value: selectedValues[i],
        label: selectedValues[i],
      });
    }

    const existsInValue = value.includes(selectedValues[i]);
    if (!existsInValue) {
      value.push(selectedValues[i]);
    }
  }
  for (let i = options.length - 1; i >= 0; i--) {
    if (!selectedValues.includes(options[i].value)) {
      options.splice(i, 1);
    }
  }
};

const onSubmit = () => {
  store.commit("setName", form.data.formName);
  meetingName.value = form.data.formName;
  place.value = form.data.place;

  const date = form.data.date;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份是從0開始的，所以需要加1
  const day = date.getDate().toString().padStart(2, "0"); // 確保日期是兩位數
  // const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = `${year}/${month}/${day}`;
  const formatted = `${year}-${month}-${day}`;

  const format = { hour: "2-digit", minute: "2-digit", hour12: false };
  const formattedTime = form.data.time.map((date) =>
    date.toLocaleTimeString("en-US", format)
  );
  const addTime = `${formattedTime[0].substring(
    0,
    5
  )}-${formattedTime[1].substring(0, 5)}`;
  time.value = `${formattedDate} ${addTime}`;
  emit("submit");
  // emit("recordInfo", form.value);

  const editInfo = {
    "record_id": store.state.recordID,
    "record_name": form.data.meetingName,
    "record_date": formatted,
    "record_attendees_name": valueA.value,
    "record_absentees_name": valueB.value,
    "record_recorder_name": valueC.value,
    "record_place": form.data.place,

  };
  axios.post("http://35.201.168.185:5000/edit_record", editInfo, {
    headers:{
      authorization: store.state.auth
    }
  }).then((res) => {
    console.log(res.data.message);
  });

  ElMessage({
    message: "已儲存會議基本資訊",
    type: "success",
  });
  showOverlay.value = false;
  form.show = false;

  store.dispatch("fetchOneRecords");
};



// 在組件掛載時執行初始化請求
onMounted(() => {
  console.log(props.recordInfo);
  if (props.recordInfo) {
    meetingName.value = props.recordInfo.record_name;
    time.value = props.recordInfo.record_creation_time;
    form.data.formName = props.recordInfo.record_name;
    
    if(props.recordInfo.record_place == "None"){
      place.value = "";
      form.data.place = "";
    }else{
      place.value = props.recordInfo.record_place;
      form.data.place = props.recordInfo.record_place;
    }

    checkNone(props.recordInfo.record_attendees_name,valueA.value,optionsA.value);
    checkNone(props.recordInfo.record_absentees_name,valueB.value,optionsB.value);
    checkNone(props.recordInfo.record_recorder_name,valueC.value,optionsC.value);
  }
});
</script>

<style scoped>
.demo-range .el-date-editor {
  width: 100%;
}

.form-container {
  border-radius: 4px;
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  gap: 14px;
  width: 910px;
  border-collapse: collapse;
}

.left-bar {
  padding: 12px;
  padding-left: 16px;
  width: 73px;
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  border: 1px solid #ccc;
  background-color: #ebeef5; /* 添加背景顏色 */
}

.input-cell {
  padding: 8px;
  border: 1px solid #ccc;
  width: 837px;
  background-color: white;
}

.text-input {
  width: 100%;
  border: none;
  outline: none;
  /* -webkit-appearance: none; */
  font-size: 14px;
}

.button-container {
  display: flex;
  height: 40px;
  width: 910px;
  margin-bottom: 14px;
  justify-content: flex-end;
}
.button-container button:nth-child(2) .el-icon {
  margin: 10px; /* 设置图标与文本之间的右边距 */
}
.button-container button:nth-child(3) {
  margin-right: 0px;
  width: 50px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.cart_container {
  margin-left: 383px;
  display: flex;
  align-items: flex-start;
}
.formName {
  display: flex;
  justify-content: space-between;
  /* 第一个子元素在容器的起始位置，最后一个子元素在容器的末尾位置 */
  align-items: center;
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  width: 500px;
}

button.close-button {
  border: none;
  background: none;
  margin-left: 290px;
  outline: none;
  font-size: 1em;
  cursor: pointer;
}
p {
  margin-top: 0;
  margin-bottom: 15px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
  z-index: 9; /* 放在最上层 */
}
.form {
  width: 500px;
  position: absolute;
  top: -2%;
  left: 300px;
  z-index: 10;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 2px solid black;
}
.form .el-form-item {
  /* margin-bottom: 25px; */
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 垂直方向布局 */
  align-items: flex-start; /* 靠左对齐 */
}

/* input內的字 */
.el-input {
  font-size: 15px;
}
.demo-range .el-form-item .el-time-picker {
  width: 100%;
}

.commit_button {
  margin-left: 418px;
  background: #eb2348;
  border: 1px solid #eb2348;
  display: flex;
  color: #ffffff;
  justify-content: flex-end; /* 将内容靠右对齐 */
}
#backtop {
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  color: #c91f2f;
  padding: 9px 16px;
  justify-content: left;
  position: fixed;
  /* left: 255px; */
  /* top: 70px; */
}
.input-cell {
  text-align: left;
}
.el-tag {
  margin-left: 5px;
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
  .form-container,
  .button-container {
    /* width: 60vw; */
    width: 685px;
    transform-origin: left top;
    font-size: 12px;
  }
  /* .button-container{
      margin-bottom: 0px;
    } */
  .form {
    transform: scale(0.75);
    /* top: -140px; */
    transform-origin: left top;
    /* top: 0.01vh; */
  }
  .button-container {
    margin-bottom: 5px;
  }
  .left-bar,
  .text-input {
    font-size: 12px;
    padding: auto 9px;
  }
  .button {
    font-size: 12px;
  }
}
</style>
