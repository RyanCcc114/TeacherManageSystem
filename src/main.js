import Vue from "vue";
import ElementUI from "element-ui"; // 引入 element 组件
import "element-ui/lib/theme-chalk/index.css"; // 加上 element 样式
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "../src/pages/home/Home.vue";

import Outline from "../src/pages/home/teachOutline/Outline.vue";
import outlineEdit from "../src/pages/home/teachOutline/outlineEdit.vue";
import outlineList from "../src/pages/home/teachOutline/outlineList.vue";

import TeachPlan from "../src/pages/home/product/TeachPlan.vue";
import planList from "../src/pages/home/product/planList.vue";
import planEdit from "../src/pages/home/product/planEdit.vue";

import Content from "../src/pages/home/teachContent/Content.vue";
import contentList from "../src/pages/home/teachContent/contentList.vue";
import contentEdit from "../src/pages/home/teachContent/contentEdit.vue";

import Homework from "../src/pages/home/homework/Homework.vue";
import homeworkEdit from "../src/pages/home/homework/homeworkEdit.vue";
import homeworkList from "../src/pages/home/homework/homeworkList.vue";

import Calendar from "../src/pages/home/teachCalendar/Calendar.vue";

import Login from "../src/pages/Login.vue";
import { getGlobalData } from "../src/utils/globalData";

Vue.use(ElementUI); // 在 Vue 里使用 Element

Vue.use(VueRouter); // 使用 vue-router


// 配置路由信息
const routes = [
  {
    path: "/", // 父路由路径
    component: App, // 父路由组件，传入 vue component
    name: "App", // 路由名称
    // 设置子路由
    children: [
      { 
        path: "login", // 子路由路径
        component: Login, // 子路由组件，会替换父组件中<router-view>中的内容
        name: "Login" // 路由名称
      },
      {
        // 应用首页
        path: "home", component: Home,  name: "Home",
        children: [
          // 产品容器
          { path: "TeachPlan", component: TeachPlan, name: "TeachPlan",
            children: [ // 子路由内容
              // 产品列表
              { path: "list", component: planList, name: "planList" },
              // 产品新增
              { path: "add/0", component: planEdit, name: "planAdd" },
              // 产品编辑
              { path: "edit/:id", component: planEdit, name: "planEdit" },
              
            ]
          },
          {path:"outline",component:Outline,name:"Outline",
            children:[
              { path:"outlineList",component:outlineList,name:"outlineList" },
              { path: "add/0", component: outlineEdit, name: "OutlineAdd" },
              { path: "edit/:id", component: outlineEdit, name: "OutlineEdit" }
            ]
          },
          {path:"content",component:Content,name:"Content",
            children:[
              { path:"teachContent",component:contentList,name:"contentList" },
              { path: "add/0", component: contentEdit, name: "ContentAdd" },
              { path: "edit/:id", component: contentEdit, name: "ContentEdit" }
            ]
          },
          {path:"homework",component:Homework,name:"Homework",
            children:[
              { path:"homeworkList",component:homeworkList,name:"homeworkList" },
              { path: "add/0", component: homeworkEdit, name: "HomeworkAdd" },
              { path: "edit/:id", component: homeworkEdit, name: "homeworkEdit" }
            ]
          },
          {path:"Calendar",component:Calendar,name:"Calendar"}
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login") {
    // 非 login 页面，检查是否登录
    // 这里简单前端模拟是否填写了用户名，真实环境需要走后台登录，缓存到本地
    if (!getGlobalData("username")) {
      next({ name: "Login" });
    }
  }
  // 其他情况正常执行
  next();
});

// 启动一个 Vue 应用
new Vue({
  el: "#app",
  router, // 传入路由能力
  render: h => h(App)
});