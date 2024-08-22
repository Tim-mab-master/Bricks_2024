<template>
  <div id="all">
    <div class="shadow" v-if="shadowOn"></div>
    <side-bar @update="activeChange" class="sideBar" />
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import SideBar from "../components/SideBar.vue";
import { useRouter } from "vue-router";
import store from "../store/store.js";

export default {
  components: { SideBar },
  setup() {
    const router = useRouter();
    const activeOption = ref("0");

    let shadowOn = ref(false);

    const activeChange = (index) => {
      activeOption.value = index;
      console.log(activeOption.value);
      if (activeOption.value === "1-1") {
        router.push("/all/cards");
      } else if (activeOption.value === "1-2") {
        router.push("/all/trashBox");
      }
    };

    //監控"永久刪除會議記錄"被點擊，跳出背景陰影
    store.subscribe((mutation, state) => {
      if (mutation.type === "setForeverDeleteRecord") {
        if (store.getters.getForeverDeleteRecord === true) {
          shadowOn.value = true;
        }
      }
    });
    //監控"關閉永久刪除會議記錄視窗"被點擊，關閉
    store.subscribe((mutation, state) => {
      if (mutation.type === "setForeverDeleteRecord") {
        if (store.getters.getForeverDeleteRecord === false) {
          shadowOn.value = false;
        }
      }
    });
    return {
      activeOption,
      activeChange,
      shadowOn,
    };
  },
};
</script>

<style scoped>
#all {
  /* transform-origin: top left;
        transform: scale(0.75); */
  /* zoom:75%; */
}

.shadow {
  position: fixed;
  top: 0;
  /* left: -100; */
  width: 100%;
  height: 100%;
  background-color: grey;
  z-index: 10;
  opacity: 0.7;
}

.sideBar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
}
</style>
