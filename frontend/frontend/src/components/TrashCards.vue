<template>
  <div id="all" @click.right.prevent>
    <el-card id="box-card" @click.right="show" @click="unshown">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
      <div id="namePart">
        <span id="name">{{ record_name }}</span>
      </div>
      <div id="tagPart">
        <el-tag class="tag" v-for="item in tags" :key="item">{{ item }}</el-tag>
        <!-- <el-tag class="tag">新增標籤</el-tag> -->
      </div>
    </el-card>
    <!-- v-if="isShowed" -->
    <div id="rightClick" v-if="isShowed">
      <div id="container">
        <span id="recover" @click="recover">復原</span>
        <span id="delete" @click="deleteForever"
          ><deleteForever />永久刪除</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from "vue";
// import DeleteForever from '../KarenBricks/DeleteForever.vue';
import { ElNotification } from "element-plus";
import { ElMessage } from "element-plus";
import store from "../store/store.js";
import axios from "axios";
import router, { useRoute, useRouter } from "vue-router";
// import { tr } from "element-plus/es/locale/index.js";

export default {
  components: {},
  props: { recordName: String, tags: Array, recordID: String },

  setup(props, { emit }) {
    const isShowed = ref(false);
    const url =
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
    const normal = "#303133";
    const record_name = props.recordName;
    const tags = props.tags;
    const record_id = props.recordID;
    const router = useRouter();

    onMounted(async () => {
      console.log("onMountedname123123132", props.recordID);
    });

    const show = () => {
      isShowed.value = !isShowed.value;
      if (isShowed.value === true) {
        store.commit("setRecordID", record_id);
      }
    };

    const unshown = () => {
      isShowed.value = false;
    };

    const deleteForever = () => {
      // 控制確認永久刪除彈出視窗
      store.commit("setForeverDeleteRecord");
      store.commit("setRecordID", record_id);

      const body = { record_id: record_id };
      axios
        .post("http://35.201.168.185:5000//delete_record_permanent", body, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        })
        .then((res) => {
          ElMessage("您已永久刪除會議記錄");
          setTimeout(() => {
            unshown();
            router.go(0);
          }, 500);
        });
    };

    const recover = () => {
      const body = { record_id: record_id };
      axios
        .post("http://35.201.168.185:5000//recover_record", body, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("auth")),
          },
        })
        .then((res) => {
          setTimeout(() => {
            ElNotification({
              dangerouslyUseHTMLString: true,
              title: "成功復原會議記錄",
              message:
                '<a href="/path/to/recovery/file" style="color: #67C23A; text-decoration: underline;">點擊檢視復原檔案</a>',
              type: "success",
              position: "bottom-right",
            });
            unshown();
          }, 500);
          // router.go(0);
        });
    };

    return {
      show,
      normal,
      url,
      record_name,
      tags,
      record_id,
      isShowed,
      unshown,
      deleteForever,
      recover,
    };
  },
};
</script>

<style scoped>
#all {
  position: relative;
}
#box-card {
  display: flex;
  padding: 0 16px;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 12px;
  width: 244px;
  height: auto;
  position: relative;
  cursor: pointer;
}

#img {
  display: block;
  /* padding: 0; */
  height: 200px;
  width: auto;
  /* cursor:all-scroll; */
}
#namePart {
  position: relative;
  display: flex;
  padding: 16px 16px 16px 0;
  align-items: center;
  /* justify-content: center; */
}
#name {
  text-align: left;
  color: var(--base-color-text-el-text-color-primary, #303133);

  /* CN medium/Headline3-Medium */
  font-family: PingFang TC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
}

#namePart:hover {
  cursor: pointer;
  text-decoration: underline;
  /* font-weight: 600; */
}

#namePart img {
  position: absolute;
  right: 0;
  width: 18px;
  height: 18px;
}

#tagPart {
  padding: 0;
  display: flex;
  justify-content: left;
  width: 230px;
  height: 60px;
  flex-wrap: wrap;
  gap: 12px;
  overflow: hidden;
}
.tag {
  width: fit-content;
  flex-direction: column;
  display: flex;
  padding: 1px 10px;
  justify-content: center;
  align-items: center;

  border-radius: var(--radius-button-large-radius, 4px);
  border: 1px solid var(--base-color-info-el-color-info-5, #c8c9cc);
  background: var(--base-color-fill-el-fill-color-blank, #fff);

  color: var(--base-color-info-el-color-info, #909399);
  text-align: center;

  /* CN regular/body2-Regular */
  font-family: PingFang TC;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 169.231% */
}

#rightClick {
  display: flex;
  flex-direction: row;
  width: 116px;
  height: auto;
  flex-wrap: wrap;
  padding: 8px 0;
  border-radius: var(--radius-button-large-radius, 4px);
  border: 1px solid var(--base-color-border-el-border-color-light, #e4e7ed);
  background: var(--base-color-fill-el-fill-color-blank, #fff);
  /* light/--el-box-shadow */
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
    0px 8px 20px 0px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 285px;
  left: 285px;
  z-index: 10;
}
#container {
  display: block;
  /* font-size: 10px; */
  width: 116px;
  padding: 8px 0;
}

#container > span {
  color: var(--base-color-text-el-text-color-primary, #303133);
  font-family: Noto Sans TC;
  font-size: 14px;
  font-style: normal;
  /* font-weight: 400; */
  line-height: 24px; /* 171.429% */
  text-align: left;
  padding: 8px 12px;
  cursor: pointer;
}

#container > span:hover {
  color: #c91f2f;
  background-color: #fae4e7;
}

#recover {
  display: block;
  /* font-size: 10px; */
}

#delete {
  display: block;
}

/* @media screen and (min-width: 1024px) and (max-width: 1440px) {
  #box-card {
    display: flex;
    padding: 0 16px;
    flex-direction: column;
    align-items: center;
    text-align: left;
    gap: 12px;
    width: 220px;
    height: auto;
    position: relative;
    cursor: pointer;
    margin: 0px 0px;
  }
  img {
    display: block;
    /* padding: 0; */
/* height: auto;
    width: 95%;
    border-radius: 2%;
    margin: auto;
    cursor:all-scroll; */
/* }
  #namePart {
    position: relative;
    display: flex;
    padding: 12px 12px 12px 0;
    align-items: center;
    width: 84%;
    margin: auto;
    /* border: 2px solid black; */
/* justify-content: center; */
/*}
  #name {
    text-align: left;
    color: var(--base-color-text-el-text-color-primary, #303133);

    /* CN medium/Headline3-Medium */
/*font-family: PingFang TC;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
/* }

  #tagPart {
    padding: 0;
    display: flex;
    justify-content: left;
    /* width: 96%;
    height: auto; */
/* flex-wrap: wrap;
    gap: 12px;
    overflow: hidden;
    /* border: 2px solid black; */
/* }
}  */
</style>
