import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/home/login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import one from '@/components/one/one'
import Details from '@/components/one/Details'
import two from '@/components/two/two'
import add from '@/components/two/add'
import examine from '@/components/two/examine'
import three from '@/components/three/three'
import four from '@/components/four/four'
import empl_add from '@/components/four/empl_add'
import Update from '@/components/four/Update'
import six from '@/components/six/six'
import admin_add from '@/components/six/admin_add'
import admin_freeze from '@/components/six/admin_freeze'
import admin_update from '@/components/six/admin_update'

import updatePost from '@/components/six/updatePost'

import add_biandong from '@/components/four/add_biandong'
import update_biandong from '@/components/four/update_biandong'
import add_lizhi from '@/components/four/add_lizhi'
import update_lizhi from '@/components/four/update_lizhi'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    // 默认进入路由[写在第一个] //重定向
    {path: '/', redirect: '/login', keepAlive: false},

    {path: '/login', name: 'login', component: login, meta: {needLogin: false}},

    {
      path: '/', name: 'Home', component: Home, meta: {needLogin: false, keepAlive: false},

      children: [
        {
          path: 'Welcome',
          component: Welcome,
          name: 'Welcome',
          meta: {needLogin: true, keepAlive: true, pathIndex: "5"}
        },
        {path: 'one', component: one, name: 'one', meta: {keepAlive: true, pathIndex: "1"}},
        {path: 'two', component: two, name: 'two', meta: {keepAlive: true, pathIndex: "2"}},
        {path: 'add', component: add},
        {path: 'three', component: three, name: 'three', meta: {keepAlive: true, pathIndex: "3"}},
        {path: 'four', component: four, name: "four", meta: {keepAlive: true, pathIndex: "4"}},//
        {path: 'Update', name: 'Update', component: Update},
        {path: 'empl_add', component: empl_add},
        {path: 'add_biandong', component: add_biandong},
        {path: 'update_biandong', name: 'update_biandong', component: update_biandong},
        {path: 'add_lizhi', component: add_lizhi},
        {path: 'update_lizhi', name: 'update_lizhi', component: update_lizhi},

        {path: 'six', component: six, meta: {keepAlive: true}},
        {path: 'admin_add', component: admin_add},
        {path: 'admin_freeze', name: 'admin_freeze', component: admin_freeze},
        {path: 'admin_update', name: 'admin_update', component: admin_update},

        {path: 'updatePost', name: 'updatePost', component: updatePost}
      ]

    },
    {path: '/Details', component: Details, name: 'Details'},
    {path: '/examine', component: examine, name: 'examine'},
    // 错误路由[写在最后一个]//重定向
    {path: '**', redirect: '/login'}
  ]
})
