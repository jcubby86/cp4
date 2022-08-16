import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectionView from '../views/CollectionView.vue'
import ItemView from '../views/ItemView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/collections/:id',
    name: 'collection',
    component: CollectionView
  },
  {
    path: '/items/:id',
    name: 'item',
    component: ItemView
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
