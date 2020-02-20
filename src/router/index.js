import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/aside'

import User from './module/user'
import Task from './module/task'
import Datasheets from './module/datasheets'

const Home = () => import(/* webpackChunkName: "homepage" */ '@/views/home')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login')
const Agreement = () => import(/* webpackChunkName: "agreement" */ '@/views/agreement') // 用户协议

const UserReg = () => import(/* webpackChunkName: "user-reg" */ '@/views/reg')
const FindPwd = () => import(/* webpackChunkName: "find-pwd" */ '@/views/find-pwd')

const NoAuthPage = () => import(/* webpackChunkName: "no-auth-page" */ '@/views/error-page/401')
const NotFoundPage = () => import(/* webpackChunkName: "not-found-page" */ '@/views/error-page/404')

const Redirect = () => import(/* webpackChunkName: "redirect" */ '../views/redirect')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard')

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
  {
    path: '/reg',
    name: 'reg',
    component: UserReg,
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  {
    path: '/user-agree',
    component: Agreement
  },
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },

  {
    path: '/home',
    name: 'home',
    component: Home,
    hidden: true,
    meta: {
      title: 'home',
      noCache: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: Redirect
      }
    ]
  },
  {
    path: '/home',
    hidden: true,
    component: Layout,
    redirect: '/home/dashboard',
    meta: {
      title: 'dashboard',
      icon: 's-home'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/findpwd',
    name: 'findpwd',
    component: FindPwd,
    hidden: true,
    meta: {
      title: '找回密码',
      noCache: true
    }
  },
  {
    path: '/401',
    component: () => NoAuthPage,
    hidden: true
  },
  {
    path: '/404',
    component: NotFoundPage,
    hidden: true
  },
  User,
  Datasheets, // 数据部分
  Task // 任务

]

// 解决vue-router 新版本bug
const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default router
