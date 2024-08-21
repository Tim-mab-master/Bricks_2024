<template>
  <div>
    <side-bar></side-bar>
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
    <div class="forever_delete_confirm" v-if="forever_delete_true">
      <div
        class="close_forever_delete_confirm"
        @click="close_delete_forever_confirm"
      ></div>
      <h4 class="forever_delete_title">永久刪除會議記錄</h4>
      <p class="forever_delete_content">
        確認結束此會議記錄？請注意，永久刪除後將無法復原
      </p>
      <div class="confirm_button_container">
        <div
          class="confirm_button cb_cancle"
          @click="close_delete_forever_confirm"
        >
          取消
        </div>
        <div
          class="confirm_button cb_confirm"
          @click="confirm_delete_forever_button"
        >
          永久刪除
        </div>
      </div>
    </div>
    <div class="navAndCont" id="trash">
      <trash-bar class="navBar"></trash-bar>
      <div class="cards">
        <trash-cards
          v-for="card in cards"
          :key="card.id"
          :recordName="card.record_name"
          :tags="card.tags"
          :recordID="card.record_id"
          >card</trash-cards
        >
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import TrashBar from "../components/TrashBar.vue";
import TrashCards from "../components/TrashCards.vue";
import NavBarAll from "../components/NavBarAll.vue";
import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import store from "../store/store.js";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "trashBox",
  components: {
    TrashBar,
    TrashCards,
    SideBar,
    NavBarAll,
  },
  setup() {
    onMounted(async () => {
      store.dispatch("fetchTrashRecords");
      console.log("allRecordsTrash", store.getters.getTrashRecords);
    });
    const forever_delete_true = ref(false);
    const close_forever_delete = () => {
      forever_delete_true.value = !forever_delete_true.value;
      store.commit("setForeverDeleteRecord");
    };
    const cards = computed(() => store.getters.getTrashRecords);

    const close_delete_forever_confirm = () => {
      store.commit("setForeverDeleteRecord");
      forever_delete_true.value = false;
    };

    // 確定永久刪除
    const confirm_delete_forever_button = () => {
      store.commit("setForeverDeleteRecord");
      // 關閉確認永久刪除視窗
      forever_delete_true.value = false;
      // 永久刪除api
      // const body = { record_id: record_id };
      // axios
      //   .post("http://35.201.168.185:5000//delete_record_permanent", body, {
      //     headers: {
      //       authorization: JSON.parse(localStorage.getItem("auth")),
      //     },
      //   })
      //   .then((res) => {
      //     ElMessage("您已永久刪除會議記錄");
      //     setTimeout(() => {
      //       unshown();
      //       router.go(0);
      //     }, 500);
      //   });
    };

    //監控"永久刪除會議記錄"被點擊
    store.subscribe((mutation, state) => {
      if (mutation.type === "setForeverDeleteRecord") {
        if (store.getters.getForeverDeleteRecord === true) {
          // 跳出彈出視窗
          forever_delete_true.value = true;
        }
      }
    });

    // const cards = store.getters.getTrashRecords;
    return {
      cards,
      forever_delete_true,
      close_forever_delete,
      close_delete_forever_confirm,
      confirm_delete_forever_button,
    };
  },
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
.sideBar {
  /* grid-area: sideBar; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  grid-column-gap: 16px;
  grid-row-gap: 20px;
  margin: 28px 1.5vw 28px 28px;
  /* border: 2px solid black; */
}

/* 確認刪除 */
.forever_delete_confirm {
  width: 380px;
  height: 160px;
  position: fixed;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.4);
  z-index: 12;
  left: 36%;
  top: 35%;
}

.close_forever_delete_confirm {
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
  top: 10px;
  left: 307px;
}

.close_forever_delete_confirm::before,
.close_forever_delete_confirm::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 17px;
  background-color: black;
}
.close_forever_delete_confirm::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close_forever_delete_confirm::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.forever_delete_title {
  font-size: 22px;
  font-weight: 950;
  position: relative;
  top: -30px;
  text-align: center;
  user-select: none;
}

.forever_delete_content {
  font-size: 14px;
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

.navAndCont {
  background-color: #dcdfe6;
  position: absolute;
  /* border: 2px solid black; */
  left: 200px;
  min-height: calc(100vh - 50px);
  height: auto;
  width: auto;
  top: 50px;
  right: 0;
}

@media screen and (max-width: 1440px) and (min-width: 1024px) {
}
</style>
