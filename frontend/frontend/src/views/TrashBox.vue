<template>
  <div>
    <side-bar></side-bar>
    <div class="navAndCont" id="trash">
      <trash-bar class="navBar"></trash-bar>
      <div class="cards">
        <trash-cards v-for="items in 16" :key="items"></trash-cards>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import TrashBar from "../components/TrashBar.vue";
import TrashCards from "../components/TrashCards.vue";
import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import store from "../store/store.js";

export default {
  name: "trashBox",
  components: {
    TrashBar,
    TrashCards,
    SideBar,
  },
  setup() {
    {
      const cards = computed(store.getters.getAllRecords);
      onMounted(async () => {
        console.log("onMounted");
        await store.dispatch("fetchTrashRecords");
        console.log("allRecords", store.getters.getTrashRecords);
      });
    }
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
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, 280px);
  margin: 28px 2vw 28px 28px;
  grid-auto-columns: minmax(auto, 50vw);
  /* grid-auto-flow: dense; */
  position: relative;
  top: 48px;
  /* border: 2px solid black; */
}
.navAndCont {
  background-color: #dcdfe6;
  position: absolute;
  left: 200px;
  width: auto;
  top: 0;
  right: 0;
}

@media screen and (max-width: 1440px) and (min-width: 1024px) {
}
</style>
