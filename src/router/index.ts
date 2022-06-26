import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../components/pages/Dashboard.vue";
import SurveyPage from "../components/pages/Survey.vue";

const routes = [
  { path: "/", component: SurveyPage },
  { path: "/dashboard", component: DashboardPage },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;