import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

new Vue({
  render: h => h(App)
}).$mount("#app");
