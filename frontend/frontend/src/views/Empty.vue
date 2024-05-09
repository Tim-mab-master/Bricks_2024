<template>
  <div>
    <div class="navAndCont" id="empty">
      <nav-bar class="navBar"></nav-bar>
      <empty-back class="content" @showAdd="show"></empty-back>

      <div trigger="click" class="tagsPlace" @click="showTags">
        <span class="el-dropdown-link">
          標籤<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
      </div>
      <tag-search-area v-show="tagShowed" class="tagInside"></tag-search-area>
    </div>
  </div>
</template>

<script>
import EmptyBack from "../components/EmptyBack.vue";
import NavBar from "../components/NavBar.vue";
import TagSearchArea from "../components/KerwinBricks/TagSearchArea.vue";
import { useRouter } from "vue-router";
export default {
  name: "empty",
  components: {
    SideBar,
    EmptyBack,
    NavBar,
    TagSearchArea,
    RecordCard,
  },
  setup() {
    const router = useRouter();
    const activeIndex = ref("0");
    const activeChange = (index) => {
      activeIndex.value = index;
      toNextPage(activeIndex.value);
    };
    const toNextPage = (index) => {
      if (index === "1-1") {
        router.push("/recordCards");
      }
    };
    return {
      activeIndex,
      activeChange,
      router,
    };
  },
};
</script>

<style scoped>
.navAndCont {
  background-color: #dcdfe6;
  position: absolute;
  left: 200px;
  width: auto;
  top: 0;
  right: 0;
}

.tagsPlace {
  position: absolute;
  right: 32px;
  top: 68px;
  border-radius: var(--radius-button-large-radius, 4px);
  border: 1px solid var(--base-color-border-el-border-color, #dcdfe6);
  background: #fff;
  padding: 4px 16px;
}

.el-dropdown-link {
  display: flex;
  gap: 8px;
  cursor: pointer;
}

.el-dropdown-link {
  color: #c91f2f;
}

.tagInside {
  position: absolute;
  right: 32px;
  top: 114px;
  z-index: 10;
}

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
.content {
  position: fixed;
  left: 600px;
  top: 30vh;
  bottom: 0;
}
</style>
