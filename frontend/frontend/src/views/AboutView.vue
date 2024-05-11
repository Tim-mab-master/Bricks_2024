<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round @click="change">Success</el-button>
    <p>Current Num: {{ currentIndex }}</p>
  </div>
</template>
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  export default {
  
  setup() {
    const store = useStore();
    const currentIndex = computed(() => store.state.testNum);
    const change = () => store.commit('increment');
    
    return{
      store,
      currentIndex,
      change,
    }
    
  },
  
}
</script>
