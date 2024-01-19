import { createRouter, createWebHistory } from "vue-router";
import UserView from "@/components/UserView.vue";
import CommonViewVue from "@/components/CommonView.vue";
import commentViewVue from "@/components/commentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: CommonViewVue,
      props: {
        url: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      },
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/new",
      name: "New",
      component: CommonViewVue,
      props: {
        url: "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
      },
    },
    {
      path: "/show",
      name: "Show",
      component: CommonViewVue,
      props: {
        url: "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty",
      },
    },

    {
      path: "/best",
      name: "best",
      component: CommonViewVue,
      props: {
        url: "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty",
      },
    },
    {
      path: "/ask",
      name: "Ask",
      component: CommonViewVue,
      props: {
        url: "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty",
      },
    },
    {
      path: "/jobs",
      name: "Jobs",
      component: CommonViewVue,
      props: {
        url: "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty",
      },
    },
    {
      path: "/user/:username",
      name: "Userinfo",
      component: UserView,
    },
    {
      path: "/news/:id/user/:username",
      redirect: "/user/:username",
    },
    {
      path: "/news/:id/details",
      name: "comments",
      component: commentViewVue,
    },
  ],
});

export default router;
