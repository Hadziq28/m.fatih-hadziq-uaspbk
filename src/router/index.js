import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MenuPage from '../pages/MenuPage.vue'
import OrderPage from '../pages/OrderPage.vue'
import AddMenuPage from '../pages/AddMenuPage.vue'
import CommunityPage from '../pages/CommunityPage.vue'
const routes = [
  { path: '/', component: HomePage },
  { path: '/menu', component: MenuPage },
  { path: '/order', component: OrderPage },
  { path: '/add-menu', component: AddMenuPage },
  { path: '/community', component: CommunityPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
