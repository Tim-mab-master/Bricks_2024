<template>
  <div id="sidebar">
    <div id="container">
      <div id="title" @click="menu_clicked">
        <el-icon id="logo" :color="incolor"><elementPlus /></el-icon>
        <p id="title-name">{{ project_name }}</p>
      </div>
      <div id="btnBlock">
        <el-button id="addBtn" @click="addClicked">新增</el-button>
      </div>

      <!-- 選單部分 -->
      <div id="menuBar">
        <el-row class="tac">
          <el-col :span="24">
            <!-- :active-color = incolor -->
            <el-menu
              unique-opened="true"
              class="el-menu-vertical-demo"
              :active-text-color="incolor"
              @select="selectedItem"
              @open="handleOpen"
              @close="handleClose"
              :active-bg-color="active_color"
              :default-active="activeIndex"
            >
              <el-sub-menu index="1" class="menu">
                <template #title>
                  <el-icon><list /></el-icon>
                  <span>會議紀錄</span>
                </template>
                <el-menu-item index="1-1"
                  ><router-link to="/all/cards" class="menuText"
                    >全部</router-link
                  ></el-menu-item
                >
                <el-menu-item index="1-2"
                  ><router-link to="/all/trashBox" class="menuText"
                    >垃圾桶</router-link
                  ></el-menu-item
                >
              </el-sub-menu>
              <el-sub-menu index="2" class="menu">
                <template #title>
                  <el-icon><opportunity /></el-icon>
                  <span>提案區</span>
                </template>
                <el-menu-item index="2-1">全部</el-menu-item>
                <el-menu-item index="2-2">垃圾桶</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3" class="menu">
                <template #title>
                  <el-icon
                    ><span class="material-icons">&#xE4FD;</span></el-icon
                  >
                  <span>組織架構圖</span>
                </template>
                <el-menu-item index="3-1">全部</el-menu-item>
                <el-menu-item index="3-2">垃圾桶</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="blank">
      <button class="buttons" @click="terminate_project">結束專案</button>
      <button class="buttons" @click="delete_project">刪除專案</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import store from "../store/store.js";
import PersonalHomepageVue from "../views/PersonalHomepage.vue";

export default {
  components: {},
  props: {
    activeIndex: String,
  },

  setup(props, { emit }) {
    const active_color = ref("#fff");
    const project_name = "專案名稱";
    const incolor = "#C91F2F";
    const activeOption = ref(null);
    const isClicked = ref(false);
    // const activeIndex = ref("0");
    const router = useRouter();
    const activeIndex = ref(props.activeIndex);
    const menuClass = ref("menu");

    // 按下後字體改變顏色
    const menu_clicked = () => {
      active_color.value = "#FAE4E7";
    };

    // 提供父元件選擇的改變
    const selectedItem = (index) => {
      activeOption.value = index;
      emit("update", index);
    };

    // 提供父元件點擊事件
    const addClicked = (value) => {
      const date = new Date();

      // 獲取年份、月份和日期
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份是從0開始的，所以需要加1
      const day = date.getDate().toString().padStart(2, "0"); // 確保日期是兩位數

      // 格式化為 YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day}`;

      const body = {
        // "user_id": "0",
        project_id: store.state.records.projectID,
        record_name: "",
        record_date: formattedDate,
        record_department: "",
        record_attendances: 0,
        record_host_name: "",
        record_place: "",
      };
      axios.post("http://34.81.219.139:5000/add_record", body);
      value = true;
      // emit('showAdd',value);
      router.push({ name: "newRecord" });
    };

    const selected = () => {
      menuClass.value = "selected";
    };

    const terminate_project = () => {
      const body = { project_id: store.getters.getProjectID, state: "end" };
      axios
        .post("http://35.201.168.185:5000/set_project_end", body, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        })
        .then((res) => {
          console.log(res);
        });
      router.push("../personalHomepage");
    };

    const delete_project = () => {
      const body = { project_id: store.getters.getProjectID };
      axios
        .post("http://35.201.168.185:5000/to_trashcan", body, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        })
        .then((res) => {
          console.log(res);
        });
      router.push("../personalHomepage");
    };

    return {
      project_name,
      incolor,
      active_color,
      menu_clicked,
      selectedItem,
      activeOption,
      // router,
      addClicked,
      // stopShowing,
      isClicked,
      // setActiveIndex,
      activeIndex,
      selected,
      terminate_project,
      delete_project,
    };
  },
};
</script>

<style scoped>
#sidebar {
  z-index: 100;
  display: flex;
  width: 200px;
  height: 100vh;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  vertical-align: top;
  flex-shrink: 0;
  position: fixed;
  /* top: 0;
    left: 0; */
  border-right: 1px solid #e4e7ed;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
}

#container {
  width: 100%;
}

#title {
  display: flex;
  width: 100%;
  padding: 0px 16px;
  justify-content: left;
  align-items: center;
  height: 48px;
  position: relative;
  top: 0;
  left: 0px;
  /* padding-left: 16px; */
}

#title #logo {
  display: block;
  width: auto;
  height: auto;
  padding: 4px;
}

#title #title-name {
  color: #303133;
  /* CN bold/Headline3-Bold */
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  z-index: 10;
}

#addBtn {
  display: flex;
  width: 99%;
  min-height: 24px;
  max-height: 40px;
  padding: 20px 16px;
  justify-content: center;
  align-items: center;
  gap: var(--space-size-small, 8px);
  flex: 1 0 0;

  border-radius: 999px;
  color: #fff;
  background: #c91f2f;
  position: relative;
  top: 0;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
}

#btnBlock {
  padding: 12px;
  position: relative;
  top: 0;
}

.el-menu-vertical {
}

#menuBar {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  widows: 100%;
  /* border: 2px solid black; */
}

/* #menuBar .menu{
    color: #C91F2F;
  } */

.menu :hover {
  background-color: #fae4e7;
  color: #c91f2f;
}

.link {
  text-decoration: none;
}

.selected {
  background-color: #fae4e7;
  color: #c91f2f;
}

.menuText {
  text-decoration: none;
  color: black;
}

#blank {
  width: 200px;
  /* border: 2px solid black; */
  position: absolute;
  display: flex;
  bottom: 38px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.buttons {
  height: 34px;
  margin-top: 13px;

  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  border: 0px black solid;
  cursor: pointer;

  border-radius: 999px;
  color: #fff;
  background: #8b8b8bad;
  top: 0;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
}
</style>
