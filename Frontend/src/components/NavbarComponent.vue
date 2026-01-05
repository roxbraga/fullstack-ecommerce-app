<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-glass">
    <div class="container-fluid px-2 px-lg-3">

      <!-- TOGGLER -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse mt-2 mt-lg-0" id="navMenu">

        <!-- LEFT -->
        <ul class="navbar-nav align-items-lg-center gap-1 gap-lg-2">
          <li class="nav-item greeting greeting-warning px-2">
            <span class="greet-hi">Hi,</span>
            <span class="greet-name">{{ firstName }}</span>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/">
              <i class="bi bi-house-door"></i> Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link nav-hover"
              :to="{ path: '/', hash: '#about' }"
            >
              <i class="bi bi-info-circle"></i> About
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link nav-hover"
              :to="{ path: '/', hash: '#services' }"
            >
              <i class="bi bi-tools"></i> Service
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link nav-hover"
              :to="{ path: '/', hash: '#design' }"
            >
              <i class="bi bi-palette"></i> Design
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link nav-hover"
              :to="{ path: '/', hash: '#contact' }"
            >
              <i class="bi bi-envelope"></i> Contact
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link nav-hover"
              :to="{ path: '/', hash: '#faq' }"
            >
              <i class="bi bi-question-circle"></i> FAQ
            </router-link>
          </li>
        </ul>

        <!-- SEARCH (DESKTOP ONLY) -->
        <form class="d-none d-lg-flex mx-lg-auto px-lg-3">
          <input
            class="form-control compact-search"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-warning compact-search-btn" type="button">
            Search
          </button>
        </form>

        <!-- RIGHT -->
        <ul class="navbar-nav ms-lg-auto align-items-lg-center gap-1 gap-lg-2">
          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/products">
              <i class="bi bi-box-seam"></i> Products
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/profile">
              <i class="bi bi-person-circle"></i> Profile
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/cart">
              <i class="bi bi-cart3"></i>
              Cart ({{ cart.totalItems }})
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/orders">
              <i class="bi bi-bag-check"></i>
              Orders ({{ ordersCount }})
            </router-link>
          </li>

          <li class="nav-item">
            <button
              class="btn btn-outline-warning btn-sm compact-logout"
              @click="logout"
            >
              Logout
            </button>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'
import { useCartStore } from '../stores/cart'
import { useOrdersStore } from '../stores/orders'

const store = useGlobalStore()
const cart = useCartStore()
const ordersStore = useOrdersStore()
const router = useRouter()

const firstName = computed(() =>
  store.user?.name ? store.user.name.split(' ')[0] : ''
)

const ordersCount = computed(() => ordersStore.totalOrders)

const logout = () => {
  store.logout()
  ordersStore.clear()
  router.replace('/login')
}
</script>

<style scoped>
/* FIXED NAVBAR */
.navbar-glass {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050;

  background: linear-gradient(
    180deg,
    rgba(33, 37, 41, 0.95),
    rgba(20, 22, 24, 0.95)
  );
  border-bottom: 1px solid rgba(255, 193, 7, 0.6);
}

/* NAV LINKS */
.nav-link {
  font-size: 0.8rem;
  padding: 0.25rem 0.35rem;
  color: #f8f9fa;
}

.nav-hover:hover {
  color: #ffc107 !important;
}

/* ICONS */
.nav-link i {
  font-size: 0.85rem;
  margin-right: 2px;
}

/* GREETING */
.greeting-warning {
  background: #ffc107;
  color: #000;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  font-weight: 600;
}

.greet-name {
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* SEARCH */
.compact-search {
  width: 260px;
  height: 34px;
  font-size: 0.8rem;
  border: 1px solid #ffc107;
  border-radius: 0.3rem 0 0 0.3rem;
}

.compact-search-btn {
  height: 34px;
  font-size: 0.8rem;
  border-radius: 0 0.3rem 0.3rem 0;
}

/* LOGOUT */
.compact-logout {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}
</style>
