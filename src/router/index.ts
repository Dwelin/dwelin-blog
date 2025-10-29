import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Articles from "../pages/Articles.vue";
import ArticleDetail from "../pages/ArticleDetail.vue";
import About from "../pages/About.vue";
import Test from "../pages/Test.vue";
import ApiTest from "../pages/ApiTest.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/test", component: Test },
  { path: "/api-test", component: ApiTest },
  { path: "/articles", component: Articles },
  { path: "/articles/:id", component: ArticleDetail },
  { path: "/about", component: About },
  { path: "/:pathMatch(.*)*", component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
