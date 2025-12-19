<template>
  <div class="row">
  <div class="col-md-4 mb-3" v-for="product in products" :key="product.id">
    <div class="card">
      <img :src="product.image" class="card-img-top" />
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



<script>
  import { ref, watch } from "vue";
  import { useGlobalStore } from "../stores/global";
  import { Notyf } from 'notyf';
  const notyf = new Notyf();


  export default {
    props: {
      productData: Object
    },

    setup({productData},{emit}) {
      const {user} = useGlobalStore();
      return {
        user
      }
    }
  }
</script>