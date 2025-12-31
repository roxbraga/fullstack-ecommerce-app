<template>
  <div>
    <h1 class="mb-4">Admin Dashboard</h1>

    <table class="table table-dark table-striped align-middle">
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-end">Price</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Stock</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in productsStore.products" :key="p._id">
          <td>{{ p.name }}</td>
          <td class="text-end">₱{{ p.price.toLocaleString() }}</td>
          <td class="text-center">{{ p.quantity ?? 0 }}</td>
          <td class="text-center">{{ p.stock ?? 0 }}</td>
          <td class="text-center">
            <span class="badge" :class="p.isActive ? 'bg-success' : 'bg-secondary'">
              {{ p.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
        </tr>
        <tr v-if="!productsStore.products.length">
          <td colspan="5" class="text-center text-muted py-4">No products found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
onMounted(() => productsStore.fetchAllProducts())
</script>
