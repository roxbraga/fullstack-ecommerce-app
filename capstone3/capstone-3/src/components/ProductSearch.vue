<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="card-title mb-3">Search Product</h4>
            <form @submit.prevent="searchProduct" style="max-width: 500px;">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter product name"
                  v-model="productName"
                  required
                />
                <button class="btn btn-primary" type="submit" :disabled="isSearching">
                  {{ isSearching ? 'Searching...' : 'Search' }}
                </button>
              </div>
            </form>

            <div v-if="product.length > 0">
              <h6 class="mt-4">Search Result</h6>
              <div class="row">
                <UserView v-for="item in product" :key="item.id" :productData="[item]" />
              </div>
            </div>

            <div v-else-if="hasSearched" class="alert alert-warning mt-4">
              No product found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Notyf } from 'notyf';
import api from '../api.js';
import UserView from './UserView.vue';

const productName = ref('');
const product = ref([]);
const isSearching = ref(false);
const hasSearched = ref(false);
const notyf = new Notyf();

async function searchProduct() {
  if (!productName.value.trim()) {
    notyf.error('Please enter a product name');
    return;
  }
  isSearching.value = true;
  hasSearched.value = false;
  try {
    const response = await api.post('/product/search', {
      productName: productName.value,
    });
    product.value = response.data || [];
    hasSearched.value = true;
    if (product.value.length === 0) {
      notyf.error('No matching product found');
    } else {
      notyf.success(`${product.value.length} product(s) found`);
    }
  } catch (error) {
    notyf.error(error.response?.data?.message || 'Failed to search product');
  } finally {
    isSearching.value = false;
  }
}
</script>
