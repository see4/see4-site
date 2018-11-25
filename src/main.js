import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue';
import VueSwal from 'vue-swal';
import firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import  '@/firebase/init';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueSwal);

const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
  store.dispatch('setUser', user);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");

  unsubscribe();
})

