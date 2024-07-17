<template>
  <div>
    <side-bar class="side" @update="activeChange"></side-bar>
    <div v-if="cards" class="navAndCont" id="cards">
      <nav-bar-all class="navBar"></nav-bar-all>
      <div class="cards">
        <meeting-cards
          v-for="card in cards"
          :key="card.id"
          :recordName="card.record_name"
        ></meeting-cards>
      </div>
      <router-view></router-view>
    </div>
    <div v-else class="navAndCont" id="empty">
      <nav-bar class="navBar"></nav-bar>
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

const router = useRouter();
const store = useStore();

onMounted(() => {
  console.log("onMounted");
  store.dispatch("records/fetchAllRecords");
});

const cards = computed(() => store.getters["record/getAllRecords"]);
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
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 28px 10vw 28px 28px;

  position: absolute;
  top: 48px;
  /* border: 1px; */
}
.navAndCont {
  background-color: #dcdfe6;
  position: absolute;
  left: 200px;
  width: auto;
  top: 0;
  right: 0;
}
.content {
  position: relative;
  margin: 0 auto;
  left: 45%;
  top: 30vh;
  bottom: 0;
}

@media screen and (max-width: 1440px) and (min-width: 1024px) {
  .navAndCont {
    left: 180px;
  }
}
</style>
