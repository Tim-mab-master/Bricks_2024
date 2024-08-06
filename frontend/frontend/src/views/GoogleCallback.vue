<template>
  <div>
    <form ref="redirectForm" action="/google_login" method="post">
      <input
        v-for="(value, key) in args"
        :key="key"
        type="hidden"
        :name="key"
        :value="value"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "GoogleCallback",
  data() {
    return {
      args: {},
    };
  },
  created() {
    this.args = this.getQueryParams();
    this.submitForm();
  },
  methods: {
    getQueryParams() {
      const query = this.$route.query;
      let params = {};
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          params[key] = query[key];
        }
      }
      return params;
    },
    submitForm() {
      this.$nextTick(() => {
        this.$refs.redirectForm.submit();
      });
    },
  },
};
</script>
