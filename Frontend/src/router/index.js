import { createRouter, createWebHistory } from 'vue-router'

// USER
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import Cart from '../pages/Cart.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import UserOrders from '../pages/UserOrders.vue'
import ProductsCatalog from '../pages/ProductCatalog.vue'

// ADMIN
import AdminView from '../components/AdminView.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import CreateProduct from '../pages/CreateProduct.vue'
import UpdateProduct from '../pages/UpdateProduct.vue'
import ProductsList from '../pages/ProductList.vue'
import ArchivedProducts from '../pages/ArchivedProducts.vue'
import OrdersAll from '../pages/OrdersAll.vue'
import OrdersAbandoned from '../pages/OrdersAbandoned.vue'
import OrdersDrafts from '../pages/OrdersDrafts.vue'

const routes = [
  // USER
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    component: UserOrders,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    component: ProductsCatalog
  },
  {
    path: '/products/:id',
    component: ProductDetails
  },

  // ADMIN
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, adminOnly: true },
    children: [
      { path: '', component: AdminDashboard },
      { path: 'create-product', component: CreateProduct },
      { path: 'product-list', component: ProductsList },
      { path: 'archived-products', component: ArchivedProducts },
      { path: 'products/:id/edit', component: UpdateProduct },
      { path: 'orders/all', component: OrdersAll },
      { path: 'orders/abandoned', component: OrdersAbandoned },
      { path: 'orders/drafts', component: OrdersDrafts }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // FOR NAV ITEM NAVIGATION
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  }
})

//  AUTH + ADMIN GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.meta.adminOnly && role !== 'admin') {
    return next('/login')
  }

  next()
})

export default router
