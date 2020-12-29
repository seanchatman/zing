const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LandingPage.vue") }],
  },
  {
    path: "/survey/:project_node_id",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SurveyPage.vue") }],
  },
  {
    path: "/survey",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SurveyPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
