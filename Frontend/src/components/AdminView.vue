<template>
  <div class="admin-root">

    <!-- SIDEBAR -->
    <aside class="admin-sidebar d-flex flex-column">
      <h5 class="text-warning mb-3">Admin Panel</h5>
      <hr class="border-secondary" />

      <ul class="list-unstyled sidebar-nav">
        <li>
          <router-link class="sidebar-item" to="/admin">Dashboard</router-link>
        </li>

        <li>
          <router-link class="sidebar-item" to="/admin/create-product">
            Create Product
          </router-link>
        </li>

        <li>
          <router-link class="sidebar-item" to="/admin/product-list">
            Product List
          </router-link>
        </li>

        <li>
          <router-link class="sidebar-item" to="/admin/archived-products">
            Archived Products
          </router-link>
        </li>
        

        <!-- ORDERS -->
        <li>
          <button
            class="sidebar-item sidebar-toggle"
            @click="isOrdersOpen = !isOrdersOpen"
          >
            Orders
            <span class="chevron" :class="{ open: isOrdersOpen }">▾</span>
          </button>

          <ul v-if="isOrdersOpen" class="sidebar-subnav">
            <li>
              <router-link class="sidebar-subitem" to="/admin/orders/all">
                All Orders
              </router-link>
            </li>
            <li>
              <router-link class="sidebar-subitem" to="/admin/orders/drafts">
                Orders Draft
              </router-link>
            </li>
            <li>
              <router-link class="sidebar-subitem" to="/admin/orders/abandoned">
                Abandoned
              </router-link>
            </li>
          </ul>
        </li>
      </ul>

      <!-- USER -->
      <div class="mt-auto border-top pt-3">
        <div class="d-flex align-items-center mb-3">
          <div class="avatar me-2">{{ initials }}</div>
          <span>{{ store.user.name }}</span>
        </div>

        <button class="btn btn-outline-warning w-100" @click="logoutUser">
          Logout
        </button>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="admin-main">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'

const store = useGlobalStore()
const router = useRouter()
const isOrdersOpen = ref(false)

const initials = computed(() =>
  store.user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'A'
)

const logoutUser = () => {
  store.logout()
  router.replace('/login')
}
</script>

<style scoped>
:global(html), :global(body), :global(#app) {
  margin: 0;
  height: 100%;
}

/* ROOT */
.admin-root {
  display: flex;
  min-height: 100vh;
  background: url('../assets/rox09.jpg') center / cover no-repeat;
  position: relative;
}

.admin-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
}

/* SIDEBAR */
.admin-sidebar {
  width: 240px;
  padding: 1.25rem;
  background: linear-gradient(rgba(0,0,0,.85), rgba(0,0,0,.65));
  color: white;
  z-index: 1;
}

/* MAIN */
.admin-main {
  flex: 1;
  padding: 2rem;
  color: white;
  z-index: 1;
}

/* NAV ITEMS */
.sidebar-item {
  all: unset; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: white;
  font-weight: 600;
  padding: .5rem 0;
  cursor: pointer;
}

.sidebar-item:hover {
  color: #ffc107;
}

/* SUB NAV */
.sidebar-subnav {
  padding-left: 1rem;
  margin-top: .25rem;
}

.sidebar-subitem {
  display: block;
  color: #ddd;
  font-weight: 500;
  padding: .4rem 0;
  text-decoration: none;
}

.sidebar-subitem:hover {
  color: #ffc107;
}

/* CHEVRON */
.chevron {
  transition: transform .2s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

/* AVATAR */
.avatar {
  width: 32px;
  height: 32px;
  background: #0d6efd;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: bold;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .admin-root {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
  }

  .admin-main {
    padding: 1rem;
  }
}
</style>
