import Vue from 'vue'
import App from './App.vue'
// import BattleField from "./BattleField";

Vue.config.productionTip = false;

// const gg = new BattleField();
// console.log(gg);

new Vue({
  render: h => h(App),
}).$mount('#app')
