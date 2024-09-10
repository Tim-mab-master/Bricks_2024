<template>
    <div class="result">
      <div class="toolBar">
        <ordering @Selection="orderMode"/>
        <sort @Selection="sortMode"/>
      </div>
      <document-with-info v-for="block in results" :key="block.TextBox_id" :Tags="block.Tag" :textValue="block.textBox_content" :date="block.upload_time" :blockID="block.TextBox_id"/>
    </div>
  
</template>

<script setup>
import Ordering from "../components/SharonBricks/Ordering.vue";
import sort from "../components/SharonBricks/Sort.vue";
import DocumentWithInfo from "@/components/KerwinBricks/DCMwithDate.vue";
import { computed,ref } from "vue";
import store from "@/store/store.js";
import { now } from "lodash";

const getResult = computed(() => store.getters.getTagSearchResult);
const results = ref(getResult);

const orderMode = (status) =>{
  results.value = orderingData(status, getResult.value);
}

const sortMode = (status) => {
  results.value = sortingData(status, getResult.value);
}



const orderingData = (orderMode,data) => {
  
  data.sort((a, b) => {

    const dateA = new Date(a.upload_time);
    const dateB = new Date(b.upload_time);
    if(orderMode === 'recently'){
      return dateB - dateA;
    }else{
      return dateA - dateB;
    }
  });
}

const formatDate = (date) =>{
  const input = new Date(date).getDate();
  return input;
}

const sortingData = (sortingMode, data) => {
  const now = new Date(); 

  if (sortingMode === "today") {
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(todayStart).setDate(todayStart.getDate() + 1);

    return data.filter((item) => {
      const uploadDate = new Date(item.upload_time);
      return uploadDate >= todayStart && uploadDate < todayEnd;
    });
  } else if (sortingMode === "threeDays") {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);

    return data.filter((item) => {
      const uploadDate = new Date(item.upload_time);
      return uploadDate >= threeDaysAgo && uploadDate <= now;
    });
  } else {
    return data; // 默认返回原始数据
  }
};


</script>

<style scoped>
.result {
  position: absolute;
  display: grid;
  row-gap: 8px;
  top: 20px;
  /* left: 46px; */
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

</style>