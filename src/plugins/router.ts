import App from '../App.vue';
import Board from '../pages/Board.vue'
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
  {
    path: '/:board-id',
    component: Board,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
