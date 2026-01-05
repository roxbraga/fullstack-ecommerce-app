<template>
  <div id="app" class="app-wrapper">
    <!-- NAVBAR ALWAYS MOUNTED -->
    <NavbarComponent
      v-show="showNavbar"
    />

    <!-- PAGE CONTENT -->
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGlobalStore } from './stores/global'
import { useOrdersStore } from './stores/orders'
import NavbarComponent from './components/NavbarComponent.vue'

const store = useGlobalStore()
const ordersStore = useOrdersStore()


const showNavbar = computed(() =>
  store.isLoggedIn && !store.user.isAdmin
)

onMounted(async () => {
  const token = localStorage.getItem('token')

  if (token) {
    await store.getUserDetails()
    await ordersStore.fetchMyOrders()
  }
})
</script>

<style>
html, body {
  height: 100%;
}

#app {
  min-height: 100%;
}
</style>
