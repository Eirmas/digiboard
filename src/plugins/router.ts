import App from '../App.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: HelloWorld,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
