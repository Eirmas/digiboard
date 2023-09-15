import Board from '@/pages/Board.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from '@/pages/Index.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/:id',
    name: 'Board',
    component: Board,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
