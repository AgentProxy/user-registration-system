import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Verify from "../views/Verify.vue";
import NotFound from "../views/NotFound.vue";

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
    meta: {
      resumeSession: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      resumeSession: true,
    },
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "404 Page",
    component: NotFound,
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
      // Retrieve and save user details if not yet available
      // and check if user is verified and allowed to that route
      if (
        store.state &&
        store.state.profile &&
        !store.state.profile.userDetails
      ) {
        store.dispatch("profile/getUserDetails", to.name);
      } else {
        // No need to get user details if userDetails was retrieved before and
        // store hasn't been reset. Check if user is verified and allowed to that route
        store.dispatch("profile/checkIfVerified", to.name);
      }
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some((record) => record.meta.resumeSession)) {
    // If a previous session was detected, redirect user to home page
    if (localStorage.getItem("token")) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
