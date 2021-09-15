import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Verify from "../views/Verify.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Navigation guard to check if route requires authentication
router.beforeEach((to, from, next) => {
  // Check if token is present in localStorage before proceeding to
  // routes that requires authorization and get user details
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      // Retrieve and save user details if applicable
      store.dispatch("profile/getUserDetails");
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
