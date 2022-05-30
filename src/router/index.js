import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
 
//export导出路由组件给每个对应模块使用
export const IndexRoutes=[
  {
    path:"cate",
    component:()=>import('../views/cate/cate.vue'),
    meta:{
      title:"商品分类"
    }
  },
  {
    path:"goods",
    component:()=>import('../views/goods/goods.vue'),
    meta:{
      title:"商品管理"
    }
  },
  {
    path:"manage",
    component:()=>import('../views/manage/manage.vue'),
    meta:{
      title:"管理员管理"
    }
  },
  {
    path:"member",
    component:()=>import('../views/member/member.vue'),
    meta:{
      title:"会员管理"
    }
  },
  {
    path:"menu",
    component:()=>import('../views/menu/menu.vue'),
    meta:{
      title:'菜单管理'
    }
  },
  {
    path:"role",
    component:()=>import('../views/role/role.vue'),
    meta:{
      title:"角色管理"
    }
  },
  {
    path:"miao",
    component:()=>import('../views/miao/miao.vue'),
    meta:{
      title:"秒杀活动"
    }
  },
  {
    path:"banner",
    component:()=>import('../views/banner/banner.vue'),
    meta:{
      title:"轮播图管理"
    }
  },
  {
    path:"specs",
    component:()=>import('../views/specs/specs.vue'),
    meta:{
      title:"商品规格"
    }
  },
]

const routes = [
  {
    path:"/login",
    component:()=>import("../views/login/login.vue")
  },
  {
    path:"/",
    component:()=>import("../views/index/index.vue"),
    children:[
      {
        path:"home",
        component:()=>import('../views/home/home.vue')
      },
     ...IndexRoutes,
      {
        path:"",
        redirect:"home"
      }
    ]
  },
 
  
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
