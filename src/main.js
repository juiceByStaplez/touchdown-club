import Vue from "vue";
import App from "./App.vue";
import EventHub from "vue-event-hub";
Vue.config.productionTip = false;

Vue.use(EventHub);

new Vue({
  render: h => h(App)
}).$mount("#app");
