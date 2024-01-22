import CommentView from '@/View/commentView.vue'
import CommonView from '@/View/commonView.vue'
import NotFound from '@/View/pageNotFount.vue'
import UserView from '@/View/userView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: CommonView,
      props: {
        url: 'topstories.json'
      }
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/new',
      name: 'New',
      component: CommonView,
      props: {
        url: 'newstories.json'
      }
    },
    {
      path: '/show',
      name: 'Show',
      component: CommonView,
      props: {
        url: 'showstories.json'
      }
    },

    {
      path: '/best',
      name: 'best',
      component: CommonView,
      props: {
        url: 'beststories.json'
      }
    },
    {
      path: '/ask',
      name: 'Ask',
      component: CommonView,
      props: {
        url: 'askstories.json'
      }
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: CommonView,
      props: {
        url: 'jobstories.json'
      }
    },
    {
      path: '/user/:username',
      name: 'Userinfo',
      component: UserView
    },
    {
      path: '/news/:id/user/:username',
      redirect: '/user/:username'
    },
    {
      path: '/news/:id/details',
      name: 'comments',
      component: CommentView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
