<template>
  <div class="kerwin">
    <p>4</p>
    <!-- <TagSearchArea />
    <div style="margin: 20px"></div>
    <documentArea />
    <div style="margin: 20px"></div>
    <documentAreaWithInfo /> -->
    <button @click="info"></button>
    <div>
      <GoogleLogin :callback="callback" />
      <p>
        {{ data }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import store from "../store/modules/records.js";
import { computed, onMounted } from "vue";

export default {
  name: "Kerwin",
  setup() {
    const store = useStore();

    const route = useRoute();

    const cards = () => {
      store.getters.getAllRecords;
    };

    const info = () => {
      console.log(store.state.allRecords);
    };

    let id = route.params.authorization;
    const data = ref();
    const callback = (response) => {
      console.log(response);
      // data.value = response;
    };

    const showid = () => {
      console.log(store.getters.getAuth);
    };

    return {
      data,
      callback,
      id,
      route,
      showid,
      cards,
      info,
    };
  },
};
</script>

<style scoped>
.kerwin {
  /* background-color: #ccc;
  height: 200vh;
  width: 100%; */
  /* margin: 2rem; */
  /* padding: 2rem; */
}
p {
  margin-top: 12px;
  word-break: break-all;
}
</style>
