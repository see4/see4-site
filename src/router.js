import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase';
import Home from "./views/Home.vue";
import Welcome from "@/components/Welcome.vue";
import Profile from '@/views/Profile.vue';
import Admin from '@/views/Admin.vue';

Vue.use(Router);

let router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      beforeEnter: (to, from, next)=>{
        if (!firebase.auth().currentUser) {
          next('/')
        }else{
          next();
        }
      }
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
      beforeEnter: (to, from, next)=>{
        if (!firebase.auth().currentUser) {
          next('/')
        }else{
          next();
        }
      }
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
     beforeEnter: (to, from, next)=>{
      if (!firebase.auth().currentUser) {
        next('/')
      }else{
        next();
      }
    }
    },
    
  ]
});
// router.beforeEach((to, from, next)=>{
//   let current = firebase.auth().currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if(requiresAuth && !current){
//     next('/');
//   }else if(!requiresAuth && current){
//     next('home');
//   }else{
//     next();
//   }
// })

export default router;