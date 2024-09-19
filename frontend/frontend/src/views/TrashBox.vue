<template>
  <side-bar></side-bar>
  <nav-bar-all class="navBar"></nav-bar-all>

  <div class="navAndCont" id="trash">
    <trash-bar class="navBar"></trash-bar>
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
    <div v-if="cards === null" class="navAndCont" id="trash">
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

    const cards = computed(() => store.getters.getTrashRecords);
    // const cards = store.getters.getTrashRecords;
    return { cards };
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
