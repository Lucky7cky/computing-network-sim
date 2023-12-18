import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/country',
      name: 'about',
      children: [
        {
          path: '/country/:scene',
          name: 'country/scene',
          component: () => import('../pages/country/PublicComp.vue'),
          children: [
            {
              path: '/country/:scene/setting',
              name: 'setting',
              component: () => import('../pages/public/PublicSetting.vue')
            },
            {
              path: '/country/:scene/topology',
              name: 'topology',
              component: () => import('../pages/public/PublicTopology.vue')
            },
            {
              path: '/country/:scene/resource',
              name: 'resource',
              component: () => import('../pages/public/PublicResource.vue')
            },
            {
              path: '/country/:scene/network',
              name: 'network',
              component: () => import('../pages/public/PublicNetwork.vue')
            }
          ]
        }
        // {
        //   path: '/country/clearenergy',
        //   name: 'UserPassword',
        //   component: () => import('../pages/country/ClearEnergy.vue'),
        //   meta: {
        //     title: '修改密码'
        //   }
        // },
        // {
        //   path: '/country/poweraggregation',
        //   name: 'AdminArticle',
        //   component: () => import('../pages/country/PowerAggregation.vue'),
        //   meta: {
        //     title: '文章列表'
        //   }
        // }
      ]
    },
    {
      path: '/province',
      name: 'province',
      children: [
        {
          path: '/province/:scene',
          name: 'province/scene',
          component: () => import('../pages/province/PublicComp.vue'),
          children: [
            {
              path: '/province/:scene/setting',
              name: 'province-setting',
              component: () => import('../pages/province/PublicSetting.vue')
            },
            {
              path: '/province/:scene/topology',
              name: 'province-topology',
              component: () => import('../pages/province/PublicTopology.vue')
            },
            {
              path: '/province/:scene/resource',
              name: 'province-resource',
              component: () => import('../pages/province/PublicResource.vue')
            },
            {
              path: '/province/:scene/network',
              name: 'province-network',
              component: () => import('../pages/province/PublicNetwork.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
