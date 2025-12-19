<template>
  <div class="container">
    <p v-if="user.isLoading">Loading...</p>
    <AdminView v-if="user.isAdmin && !user.isLoading" :productData="product.data" />
    <UserView v-if="!user.isAdmin && !user.isLoading" :productData="product.data" />
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue';
import { useGlobalStore } from '../stores/global.js';
import api from '../api.js';
import AdminView from '../components/AdminView.vue';
import UserView from '../components/UserView.vue';

const { user } = useGlobalStore();
const product = reactive({ data: [] });

const fetchProducts = async () => {
  try {
    if (user.isAdmin) {
      const { data } = await api.get('/product/all');
      product.data = data;
    } else {
      const { data } = await api.get('/product');
      product.data = data;
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    product.data = []; 
  }
};

watch(() => user.isLoading, (loading) => {
  if (!loading) fetchProducts();
}, { immediate: true });
</script>
