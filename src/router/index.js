import { createRouter, createWebHistory } from 'vue-router'
import SelectQuestions from '@/views/SelectQuestions/Index.vue'
import Questions from '@/views/Questions/Index.vue'
import Results from '@/views/Results/Index.vue'

const routes = [

  {
    path: '/',
    name: 'SelectQuestions',
    component: SelectQuestions
  },

  {
    path: '/test/:test',
    name: 'Questions',
    component: Questions
  },

  {
    path: '/results/:test',
    name: 'Results',
    component: Results
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
