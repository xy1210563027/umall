import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import store from "../store"
import { reqLogin } from '../utils/http'

// 7.将路由导出
export let routes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单管理",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色管理",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格",
    meta: {
      requireAuth: true,
    }
  }, {
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "vip",
    component: () => import("../pages/vip/vip"),
    name: "会员管理",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图管理",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀活动",
    meta: {
      requireAuth: true,
    }
  },
]


export default new Router({
  routes: [
    {
      path:"/",
      component: () => import("../pages/login/login"),
    },
    {
      path: "/login",
      component: () => import("../pages/login/login"),
    },
    {
      path: "/",
      component: () => import("../pages/index/index"),
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: "/home",
          component: () => import("../pages/home/home"),
          meta: {
            requireAuth: true,
          }
        },
        // 8.拼接
        ...routes
      ]
    },
  ]
})

