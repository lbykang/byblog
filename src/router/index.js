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
const menuIndex = (r) =>
  require.ensure([], () => r(require("@/views/menuIndex.vue")), "menuIndex");
const DataCharts = (r) =>
  require.ensure([], () => r(require("@/views/DataCharts.vue")), "DataCharts");
const AddQuestionnaire = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/client/AddQuestionnaire.vue")),
    "AddQuestionnaire"
  );
  const kjtz = (r) =>
  require.ensure([], () => r(require("@/views/kjtz.vue")), "kjtz");
  
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
      {
        path: "/menuIndex",
        name: "menuIndex",
        component: menuIndex,
      },
      {
        path: "/dataCharts",
        name: "DataCharts",
        component: DataCharts,
      },
    ],
  },
  {
    path: "/addQuestionnaire",
    component: AddQuestionnaire,
    name: "AddQuestionnaire",
  },
  {
    path: "/kjtz",
    component: kjtz,
    name: "kjtz",
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
