<template>
  <div class="kerwin">
    <p>4</p>
    <!-- <TagSearchArea />
    <div style="margin: 20px"></div>
    <documentArea />
    <div style="margin: 20px"></div>
    <documentAreaWithInfo /> -->
    <button @click="showid"></button>
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
import store from "../store/store.js";
export default {
  name: "Kerwin",
  setup() {
    const route = useRoute();

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
