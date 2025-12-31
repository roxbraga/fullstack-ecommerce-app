<template>
  <div id="app">
    <NavbarComponent
      v-if="store.isLoggedIn && !store.user.isAdmin"
    />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGlobalStore } from './stores/global'
import { useOrdersStore } from './stores/orders'
import NavbarComponent from './components/NavbarComponent.vue'

const store = useGlobalStore()
const ordersStore = useOrdersStore()

onMounted(async () => {
  const token = localStorage.getItem('token')

  if (token) {
    await store.getUserDetails()
    await ordersStore.fetchMyOrders() // 🔥 THIS FIXES IT
  }
})
</script>


<style>

</style>
