import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import numeral from 'numeral';

Vue.config.productionTip = false;

Vue.filter('formatNumber', function (value: number) {
  if (!value) return 0;
  return numeral(value).format('0,0.0');
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
