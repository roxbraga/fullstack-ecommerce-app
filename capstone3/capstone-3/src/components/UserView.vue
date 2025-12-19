<template>
  <div class="row">
    <div class="col-md-4 mb-3" v-for="product in productData" :key="product.id">
      <div class="card">
        <img :src="product.image" class="card-img-top" alt="Product Image" />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="fw-bold">₱{{ product.price }}</p>
          <small>Stock: {{ product.stock }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productData: {
    type: Array,
    required: true,
  },
});
</script>
