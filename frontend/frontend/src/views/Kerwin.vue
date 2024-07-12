<template>
  <div class="kerwin">
    <p>4</p>
    <!-- <TagSearchArea />
    <div style="margin: 20px"></div>
    <documentArea />
    <div style="margin: 20px"></div>
    <documentAreaWithInfo /> -->
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

export default {
  name: "Kerwin",
  setup() {
    const data = ref();
    const callback = (response) => {
      console.log(response);
      // data.value = response;
    };

    return {
      data,
      callback,
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
