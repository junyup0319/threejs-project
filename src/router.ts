import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/views/main';
import Example01 from '@/views/example01';
import Example02 from '@/views/example02';
import Example03 from '@/views/example03';

import Project01 from '@/views/project01';
import Project02 from '@/views/project02';
import Project03 from '@/views/project03';
import Project04 from '@/views/project04';

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
      path: '/example02',
      name: 'example02',
      component: Example02,
    },
    {
      path: '/example03',
      name: 'example03',
      component: Example03,
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
    {
      path: '/project03',
      name: 'project03',
      component: Project03,
    },
    {
      path: '/project04',
      name: 'project04',
      component: Project04,
    },
  ],
});
