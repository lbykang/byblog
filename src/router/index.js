import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const menu = (r) =>
  require.ensure([], () => r(require("@/views/menu")), "menu");
const linkList = (r) =>
  require.ensure([], () => r(require("@/views/linkList")), "linkList");
const about = (r) =>
  require.ensure([], () => r(require("@/views/About.vue")), "about");
  const userList = (r) =>
  require.ensure([], () => r(require("@/views/UserList.vue")), "UserList");
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/menu",
    component: menu,
    name: "",
    children: [
      {
        path: "",
        component: about,
        meta: [],
      },
      {
        path: "/linkList",
        name: "linkList",
        component: linkList,
      },
      {
        path: "/userList",
        name: "userList",
        component: userList,
      },
      
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
