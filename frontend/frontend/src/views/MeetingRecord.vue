<template>
  <!-- <div class="all"> -->
  <side-bar class="sideBar"></side-bar>
  <nav-bar-main class="navBar" :meetingName="recordInfo.name"></nav-bar-main>

  <div class="navAndCont" id="new">
    <div class="tag">
      <!-- 標籤 -->
      <tag-place @show="showInfo" />
    </div>

    <div :class="meetingClass" v-if="showedInfo">
      <meeting @submit="reload" :recordInfo="recordInfo"></meeting>
      <div class="textBlock">
        <text-block
          v-for="block in blocks"
          :key="block.TextBox_id"
          @click="setBlockNow(block)"
          @add_cart="add_block(block)"
          :showAddBtn="showAddBtn"
          @deleteCart="deleteCart(block)"
          :content="block.textBox_content"
          :tags="block.Tag"
          :blockID="block.TextBox_id"
        />
      </div>
    </div>
    <div class="searchResult" v-else>
      <tag-search-content class="searchResult"></tag-search-content>
    </div>
  </div>
    
</template>

<script setup>
import { computed, ref, onUnmounted } from "vue";
// import axios from "axios";
import SideBar from "../components/SideBar.vue";
import NavBarMain from "../components/NavBarMain.vue";
import TagSearchContent from "@/components/TagSearchContent.vue";
import meeting from "../components/meeting.vue";
import TextBlock from "@/components/TextBlock.vue";
import TagPlace from "../components/TagPlace.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import store from "../store/store.js";
import { onMounted } from "vue";

const meetingClass = ref("meeting");
const recordInfo = computed(() => store.getters.getCurrRecord);
const isShowed = ref(false);
const router = useRouter();
const showedInfo = ref(true);
const quantity = ref(1);
const recordID = ref("");
const showAddBtn = ref(false);
const blocks = computed(() => store.getters.getCurrTextBoxes);

const reload = (value) => {
  store.dispatch("fetchOneRecord");
};

const deleteCart = async (block) => {
  store.dispatch("deleteBlock", block.TextBox_id);
};

const showInfo = (value) => {
  showedInfo.value = value;
  console.log(showedInfo.value);
};

const setBlockNow = (block) => {
  store.commit("setBlockNow", block);
};

const add_block = () => {
  store.dispatch("addBlock");
};

const showBtn = () => {
  showAddBtn.value = true;
};

onMounted(async () => {
  // await store.dispatch("fetchAllTags");
  await store.dispatch('fetchOneRecord');
});

onUnmounted(() =>{
  store.commit("resetRecord");
})
</script>

<style scoped>
.navBar {
  position: relative;
  top: 0;
  left: 200px;
  right: 0;
  /* grid-area: navBar; */
}
.sideBar {
  /* grid-area: sideBar; */
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
}
.navAndCont {
  background-color: #f2f3f5;
  /* display: flex; */
  position: fixed;
  overflow-y: scroll;

  left: 200px;
  top: 48px;
  height: 100vh;
  width: calc(100vw - 200px);
}
.info {
  position: relative;
}
.textBlock {
  position: relative;
  top: 8px;
  /* left: -65px; */
  display: grid;
  grid-row-gap: 8px;
  padding-bottom: 10px;
  /* gap: 8px; */
  background-color: #f2f3f5;
  margin-bottom: 16vh;
}
/* .textBlock :hover{
  left: -63px;
 } */

.meeting {
  position: absolute;
  display: inline-block;
  top: 20px;
  margin-bottom: 20px;
  left: 10%;
  width: calc(100vw - 200px - 15%);
  padding-bottom: 10px;
  background-color: none;
}

.showingClass {
  position: absolute;
  top: 20px;
  /* right: 430px; */
  left: 66px;
  padding-bottom: 20vh;
}

#backtop {
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  color: #c91f2f;
  padding: 9px 16px;
  justify-content: left;
  top: fixed(70px);
}

.icon {
  font-size: 14px;
}

.toolBar {
  display: flex;
  gap: 12px;
  top: 68px;
  margin-bottom: 12px;
  justify-content: right;
  text-align: right;
  /* width: 1fr; */
}
.tag {
  position: absolute;
  /* margin-left: 100px; */
  right: 32px;
  /* top: 68px; */
  z-index: 5;
}
.searchResult{
  left: 10%;
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
  .tag {
    right: 32px;
    top: 20px;
  }
  .textBlock {
    width: 665px;
  }
}
</style>
