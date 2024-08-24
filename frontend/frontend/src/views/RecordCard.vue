<template>
  <div>
    <side-bar class="side" @update="activeChange"></side-bar>
    <nav-bar-all class="navBar"></nav-bar-all>
    <div class="terminate_confirm" v-if="close_terminate">
      <div
        class="close_terminate_delete_confirm"
        @click="close_terminate_confirm"
      ></div>
      <h4 class="confirm_title">結束專案</h4>
      <p class="confirm_content">
        確認結束此專案？執行後請至「已結束專案」查看
      </p>
      <div class="confirm_button_container">
        <div class="confirm_button cb_cancle" @click="close_terminate_confirm">
          取消
        </div>
        <div
          class="confirm_button cb_confirm"
          @click="confirm_terminate_button"
        >
          確定
        </div>
      </div>
    </div>
    <div class="delete_confirm" v-if="close_delete">
      <div
        class="close_terminate_delete_confirm"
        @click="close_delete_confirm"
      ></div>
      <h4 class="confirm_title">刪除專案</h4>
      <p class="confirm_content">確認刪除此專案？執行後請至「垃圾桶」查看</p>
      <div class="confirm_button_container">
        <div class="confirm_button cb_cancle" @click="close_delete_confirm">
          取消
        </div>
        <div class="confirm_button cb_confirm" @click="confirm_delete_button">
          確定
        </div>
      </div>
    </div>

    <div v-if="true" class="navAndCont" id="cards">
      <div class="cards">
        <meeting-cards
          v-for="card in cards"
          :key="card.id"
          :recordName="card.record_name"
          :recordID="card.record_id"
          :tags="card.tags"
          @click="toRecord(card.record_id)"
          >card</meeting-cards
        >
      </div>

      <div v-if="false" class="cover">
        <div></div>
      </div>

      <router-view></router-view>
    </div>

    <div v-else class="navAndCont" id="empty">
      <empty-back class="content" @showAdd="show"></empty-back>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import EmptyBack from "../components/EmptyBack.vue";
import NavBarAll from "../components/NavBarAll.vue";
import SideBar from "../components/SideBar.vue";
import MeetingCards from "../components/MeetingCards.vue";
import {
  ref,
  computed,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  watch,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import store from "../store/store.js";
import { mapGetters } from "vuex";
import axios from "axios";

const router = useRouter();
// const store = useStore();

onMounted(async () => {
  console.log("onMounted");
  store.dispatch("fetchAllRecords");
});

const minuteExistMethod = () => {
  let minuteExist = true;
  if (store.state.allRecords.length != 0) {
    minuteExist = true;
  }
  return minuteExist;
};

const cards = computed(() => store.getters.getAllRecords);

onMounted(async () => {
  console.log("onMounted");
  // console.log("allRecords", store.getters.getAllRecords.length);
  await store.dispatch("fetchAllRecords");
  console.log("cardsAll", cards);
});

const activeOption = ref(0);

// 確認刪除視窗，之後要改成接收sidebar的點擊
let close_delete = ref(false);
let close_terminate = ref(false);

const open_terminate_confirm = () => {
  close_terminate.value = true;
};

const close_terminate_confirm = () => {
  close_terminate.value = false;
  //把deleteConfirm改回false
  store.commit("setTerminateConfirm");
};

const open_delete_confirm = () => {
  close_delete.value = true;
};

const close_delete_confirm = () => {
  close_delete.value = false;
  //把deleteConfirm改回false
  store.commit("setDeleteConfirm");
};

const confirm_terminate_button = () => {
  const body = { project_id: store.getters.getProjectID, state: "end" };
  axios
    .post("http://35.201.168.185:5000/set_project_end", body, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("auth")),
      },
    })
    .then((res) => {
      console.log(res);
    });
  router.push("../personalHomepage");
};

const confirm_delete_button = () => {
  const body = { project_id: store.getters.getProjectID };
  axios
    .post("http://35.201.168.185:5000/to_trashcan", body, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("auth")),
      },
    })
    .then((res) => {
      console.log(res);
    });
  router.push("../personalHomepage");
};

const activeChange = () => {
  activeOption.value = computed(() => store.state.activeIndex);
};

//監控左下角的用戶刪除專案
store.subscribe((mutation, state) => {
  if (mutation.type === "setDeleteConfirm") {
    if (store.getters.getDeleteConfirm === true) {
      open_delete_confirm();
    }
  }
});

//監控左下角的用戶結束專案
store.subscribe((mutation, state) => {
  if (mutation.type === "setTerminateConfirm") {
    if (store.getters.getTerminateConfirm === true) {
      open_terminate_confirm();
    }
  }
});
const toRecord = async (cardID) => {
  store.commit("setRecordID", cardID); // 等後端回傳
  await store.dispatch("fetchOneRecord");
  // await store.dispatch('fetchAllTags');
  router.push("cards/meetingRecord");
};
</script>

<style scoped>
.navBar {
  position: absolute;
  top: 0;
  left: 200px;
  right: 0;

  /* grid-area: navBar; */
}
.side {
  /* grid-area: sideBar; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

/* 確認刪除、結束專案跳出視窗 */
.terminate_confirm {
  width: 344px;
  height: 160px;
  position: fixed;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.4);
  z-index: 6;
  left: calc((100vw - 344px + 234px) / 2);
  top: 35%;
}

.delete_confirm {
  width: 344px;
  height: 160px;
  position: fixed;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.4);
  z-index: 6;
  left: calc((100vw - 344px + 234px) / 2);
  top: 35%;
}

.close_terminate_delete_confirm {
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
  top: 10px;
  left: 307px;
}

.close_terminate_delete_confirm::before,
.close_terminate_delete_confirm::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 17px;
  background-color: black;
}
.close_terminate_delete_confirm::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close_terminate_delete_confirm::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.confirm_title {
  font-size: 22px;
  font-weight: 950;
  position: relative;
  top: -30px;
  text-align: center;
  user-select: none;
}

.confirm_content {
  font-size: 13px;
  font-weight: 600;
  position: relative;
  top: -44px;
  text-align: center;
  user-select: none;
}

.confirm_button_container {
  width: 280px;
  height: 36px;
  /* border: 2px solid black; */
  top: -38px;
  left: 50%;
  transform: translate(-50%);

  display: flex;
  position: relative;
  justify-content: space-around;

  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 1.25px;
}

.confirm_button {
  width: 120px;
  height: 38px;
  border-radius: 12px;

  text-align: center;

  cursor: pointer;
  user-select: none;
}

.cb_cancle {
  background-color: #fff;
  color: black;
  font-weight: 950;
}

.cb_confirm {
  background-color: #b82c30;
  color: white;
  font-weight: 700;
}

.cards {
  /* border: 2px solid black; */
  display: flex;
  flex-wrap: wrap;
  grid-column-gap: 16px;
  grid-row-gap: 20px;
  margin: 28px 1.5vw 28px 28px;
}

.navAndCont {
  /* border: 2px solid black; */

  background-color: #dcdfe6;
  position: absolute;
  left: 200px;
  min-height: calc(100vh - 50px);
  height: auto;
  top: 50px;
  right: 0;
}

.cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  color: black;
  background-color: rgba(59, 56, 56, 0.5);
}

.content {
  position: absolute;
  top: 20%;
  left: 40%;
  /* margin: 0 auto; */
}

@media screen and (max-width: 1440px) and (min-width: 1024px) {
  /* .navAndCont {
    left: 180px;
  } */
}
</style>
