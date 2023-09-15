import App from '../App.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from "@/pages/Index.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: Index,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
