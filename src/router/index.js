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
  const kjtz = (r) =>
  require.ensure([], () => r(require("@/views/kjtz.vue")), "kjtz");
  const qsEdit = (r) =>
  require.ensure([], () => r(require("@/views/client/QS-edit.vue")), "qsEdit");



import qsList from '@/views/client/QS-list.vue'
import qsData from '@/views/client/QS-data.vue'
import qsFill from '@/views/client/QS-fill.vue'
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
    path: "/kjtz",
    component: kjtz,
    name: "kjtz",
  },
  {
    path: '/data',
    name: 'qsData',
    component: qsData
  },
  {
    path: '/qsList',
    name: 'qsList',
    component: qsList
  },
  {
    path: '/fill/:num',
    name: 'qsFill',
    component: qsFill
  },
  {
    path: '/qsEdit/:nume',
    name: 'qsEdit',
    component: qsEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
