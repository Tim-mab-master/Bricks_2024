<template>
  <div>
    <side-bar class="side" @update="activeChange"></side-bar>
    <div v-if="cards.length === 0" class="navAndCont" id="empty">
      <nav-bar class="navBar"></nav-bar>
      <empty-back class="content" @showAdd="show"></empty-back>
    </div>
    <div v-else class="navAndCont" id="cards">
      <nav-bar-all class="navBar"></nav-bar-all>
      <div class="cards">
        <meeting-cards
          v-for="card in cards"
          :key="card.cardID"
          :recordName="card.name"
          :tags="card.tags"
        ></meeting-cards>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import EmptyBack from "../components/EmptyBack.vue";
import NavBarAll from "../components/NavBarAll.vue";
import SideBar from "../components/SideBar.vue";
import MeetingCards from "../components/MeetingCards.vue";
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

export default {
  name: "RecordCard",
  components: {
    SideBar,
    NavBarAll,
    MeetingCards,
    EmptyBack,
    NavBar,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    const projectID = ref("94"); // 之後要放動態ID
    const currentID = ref(0);

    const cards = ref([]);

    // const tags = ref([]);
    // const currentID = ref(0);

    // side bar 作用中的 index
    const currentActive = ref("1-1");
    const activeOption = ref(0);

    const project = {
      project_id: 94,
    };

    onBeforeMount(() => {
      console.log("onBeforeMount");
      axios
        .post("http://104.199.143.218:5000/get_record_index", project)
        .then((res) => {
          console.log(res.data.record);
          res.data.record.forEach((record) => {
            const card = {
              cardID: currentID.value++,
              name: record.record_name,
              tags: record.tags,
            };
            cards.value.push(card);
            console.log("cardContent: " + cards);
          });
        });
    });

    const handleCardClick = (cardId) => {
      // 根据卡片点击情况进行路由导航
      router.push(`/all/cards/meetingRecord/${cardId}`);
    };

    const activeChange = () => {
      activeOption.value = computed(() => store.state.activeIndex);
    };

    return {
      cards,
      currentActive,
      // name,
      projectID,
      // recordName,
      // tags,
      handleCardClick,
      activeOption,
      activeChange,
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
</style>
