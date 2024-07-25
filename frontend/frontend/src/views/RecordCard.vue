<template>
  <div>
    <side-bar class="side" @update="activeChange"></side-bar>
    <nav-bar-all class="navBar"></nav-bar-all>

    <div v-if="true" class="navAndCont" id="cards">
      <div class="cards">
        <h1>564654564</h1>
        <button @click="showinfo"></button>
        <meeting-cards
          v-for="card in cards"
          :key="card.id"
          :recordName="card.record_name"
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import store_js from "../store/modules/records.js";

const router = useRouter();
const store = useStore();

onMounted(async () => {
  console.log("onMounted");
  await store.dispatch("records/fetchAllRecords");
});

const showinfo = () => {
  alert("拿到");
  console.log("cards", cards);
  // 先用直接拿的方法拿到allRecords，之後要用getter
  console.log("所有records", store_js.state.allRecords);
};
const cards = computed(() => store_js.state.allRecords);
const activeOption = ref(0);
const handleCardClick = (cardId) => {
  // 根据卡片点击情况进行路由导航
  router.push(`/all/cards/meetingRecord/${cardId}`);
};

const activeChange = () => {
  activeOption.value = computed(() => store.state.activeIndex);
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

.cards {
  border: 2px solid black;

  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 28px 10vw 28px 28px;

  position: absolute;
  /* top: 48px; */
  /* border: 1px; */
}
.navAndCont {
  background-color: #dcdfe6;
  position: absolute;
  border: 2px solid yellow;
  left: 200px;
  width: calc(100vw - 210px);
  height: calc(100vh - 55px);
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
