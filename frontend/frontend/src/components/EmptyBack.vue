<template>
  <div id="background">
    <div id="center">
      <el-empty
        :image-size="200"
        description="點選新增建立新的會議紀錄"
        :root="--el - empty - fill - color - 0"
      >
        <el-button id="addBtn" @click="addClicked">
          <div id="buttonContent">
            <el-icon><circle-plus /></el-icon>新增
          </div>
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const date = new Date();

    // 獲取年份、月份和日期
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份是從0開始的，所以需要加1
    const day = date.getDate().toString().padStart(2, "0"); // 確保日期是兩位數

    // 格式化為 YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    const addClicked = () => {
      const body = {
        project_id: store.state.records.projectID,
        record_name: "",
        record_date: formattedDate,
        record_department: "",
        record_attendances: 0,
        record_host_name: "",
        record_place: "",
      };
      axios.post("http://34.81.219.139:5000/add_record", body);
      router.push("cards/newRecord");
    };

    return {
      addClicked,
    };
  },
};
</script>

<style>
#background {
  background-color: #f2f3f5;
  /* width: auto; */
  /* height: auto;     */
  /* flex-shrink: 1; */
  position: absolute;
  display: block;
  align-items: center; /* 在交叉轴上垂直居中 */
  justify-content: center;
}
#center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: absolute;
  left: 0;
}

#center #buttonContent {
  display: flex;
  height: 32px;
  min-height: 24px;
  max-height: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #fff;
  font-size: 13px;
  font-weight: 400;
  line-height: 22px; /* 169.231% */
}

#center #addBtn {
  border-radius: 2px;
  background: #c91f2f;
  padding: 4px 16px;
}

/* #empty{
      --el-empty-fill-color-1
    } */
</style>
