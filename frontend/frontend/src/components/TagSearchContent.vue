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
const results = ref(getResult.value);

const sorting = ref(false);
const ordering = ref(false);

const orderMode = (status) =>{
  // ordering.value = true;
  results.value = orderingData(status, getResult.value);
  
}

const sortMode = (status) => {
  // sorting.value = true;
  results.value = sortingData(status, getResult.value);
  
}



const orderingData = (orderMode,data) => {
  // if(sorting.value){
  //   sortingData(orderMode,results.value);
  //   // sorting.value = false;
  // }
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
  if(date.isString){
    const input = date.slice(4,16);
    return input;
  }
  const input = date.toString().slice(4,16);
  return input;
}

const sortingData = (sortingMode, data) => {
  const now = new Date(); 
  console.log(`dateNow: ${now}`);

    switch(sortingMode){
      case 'today':
        const todayDate = new Date().toLocaleDateString(); // 获取今天的日期字符串

        const today = data.filter((block) => {
          const blockDate = new Date(block.upload_time).toLocaleDateString(); // 获取记录的日期字符串
          return blockDate === todayDate; // 只比较日期部分
        });
        console.log('today:', today);
        return today;
      case 'threeDays':
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(now.getDate() - 3);

        const threeDays = data.filter((block) => {
          const blockTime = new Date(block.upload_time);
          return blockTime >= threeDaysAgo && blockTime <= now;
        });
        return threeDays;
      case 'sevenDays':
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        const sevenDays = data.filter((block) => {
          const blockTime = new Date(block.upload_time);
          return blockTime >= sevenDaysAgo && blockTime <= now;
        });
        return sevenDays;
      case 'oneMonth':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        const oneMonth = data.filter((block) => {
          const blockTime = new Date(block.upload_time);
          return blockTime >= oneMonthAgo && blockTime <= now;
        });
        return oneMonth;
      case 'sixMonth':
        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth(now.getMonth() - 6);
        const sixMonth = data.filter((block) => {
          const blockTime = new Date(block.upload_time);
          return blockTime >= sixMonthAgo && blockTime <= now;
        });
        return sixMonth;
      case 'oneYear':
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        const oneYear = data.filter((block) => {
          const blockTime = new Date(block.upload_time);
          return blockTime >= oneYearAgo && blockTime <= now;
        });
        return oneYear;
      case 'threeYear':
        const threeYearAgo = new Date();
        threeYearAgo.setFullYear(now.getFullYear() - 3);
        const threeYear = data.filter((block) => {
          const blockTime = new Date(block.upload_time);
          return blockTime >= threeYearAgo && blockTime <= now;
        });
        return threeYear;
      default: 
        return data;
    }
};


</script>

<style scoped>
.result {
  position: absolute;
  display: grid;
  row-gap: 8px;
  top: 20px;
  padding-bottom: 7%;
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