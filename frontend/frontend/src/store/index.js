import { createStore } from "vuex";
import records from "./modules/records.js";

export default createStore({
  modules: {
    records,
  },
});
