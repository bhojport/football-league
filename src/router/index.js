import Vue from 'vue'
import Router from 'vue-router'
import Results from '@/league/Results'
import NewResult from '@/league/NewResult'
import League from '@/league/League'
import EditResult from '@/league/EditResult.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Results',
      component: Results
    },
    {
      path: '/new',
      name: 'NewResult',
      component: NewResult
    },
    {
      path: '/league',
      name: 'League',
      component: League
    },
    {
      path: '/edit/:id',
      name: 'EditResult',
      component: EditResult,
      props: true
    }
  ]
})
