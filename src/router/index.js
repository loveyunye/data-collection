import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout';
import store from '../store';
import { findSelf } from '../api/user';

Vue.use(VueRouter);

export const constantRouter = [
  {
    path: '/overview',
    name: 'overview',
    zh_name: '总览',
    icon: 'dashboard',
    component: () => import('../views/Overview/index.vue'),
  },
  {
    path: '/database',
    name: 'database',
    zh_name: '数据源',
    icon: 'dataSource',
    component: () => import('../views/Database/index.vue'),
  },
  {
    path: '/application',
    name: 'application',
    zh_name: 'API',
    icon: 'api',
    component: () => import('../views/Api/index.vue'),
  },
  {
    path: '/compose',
    name: 'compose',
    zh_name: '组合',
    icon: 'compose',
    component: () => import('../views/Compose/index.vue'),
  },
  {
    path: '/project',
    name: 'project',
    zh_name: '项目',
    icon: 'project',
    component: () => import('../views/Project/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: {
        name: 'overview',
      },
      children: constantRouter,
    },
    {
      path: '/login',
      component: () => import('../views/Login'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    try {
      const user = await findSelf();
      store.commit('user/setUserInfo', user || {});
      next();
    } catch (err) {
      // 用户未登录，跳转到登录页
      location.href = '/login';
    }
  } else {
    next();
  }
});

export default router;
