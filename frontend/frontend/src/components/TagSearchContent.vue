<template>
    <div class="result">
      <div class="toolBar">
        <ordering />
        <sort />
      </div>
      <document-with-info v-for="item in 10" :key="item" />
    </div>
  
</template>

<script setup>
import Ordering from "../components/SharonBricks/Ordering.vue";
import sort from "../components/SharonBricks/Sort.vue";
import DocumentWithInfo from "@/components/KerwinBricks/DCMwithDate.vue";

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