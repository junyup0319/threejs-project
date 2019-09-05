import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/views/main';
import Example01 from '@/views/example01';

import Project01 from '@/views/project01';
import Project02 from '@/views/project02';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/example01',
      name: 'example01',
      component: Example01,
    },
    {
      path: '/project01',
      name: 'project01',
      component: Project01,
    },
    {
      path: '/project02',
      name: 'project02',
      component: Project02,
    },
  ],
});
