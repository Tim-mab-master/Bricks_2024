<template>
  <div>
    <side-bar></side-bar>
    <div class="navAndCont" id="trash">
      <trash-bar class="navBar"></trash-bar>
      <div class="cards">
        <trash-cards
          v-for="card in cards"
          :key="card.id"
          :recordName="card.record_name"
          :tags="card.tags"
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
