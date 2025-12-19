<template>
  <h1 class="text-center text-primary mt-5">Admin Dashboard</h1>
  <table class="table table-striped border">
    <thead>
      <tr>
        <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Availability</th><th colspan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productData" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <span :class="product.isActive ? 'text-success' : 'text-danger'">
            {{ product.isActive ? 'Available' : 'Unavailable' }}
          </span>
        </td>
        <td><button class="btn btn-primary" @click="openEdit(product)">Edit</button></td>
        <td><button class="btn btn-danger" @click="handleArchive(product.id)">Archive</button></td>
      </tr>
    </tbody>
  </table>

  <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content p-3">
        <h4>Edit Product</h4>
        <div class="mb-3">
          <label>Name</label>
          <input class="form-control" v-model="editData.name" />
        </div>
        <div class="mb-3">
          <label>Description</label>
          <textarea class="form-control" v-model="editData.description"></textarea>
        </div>
        <div class="mb-3">
          <label>Price</label>
          <input type="number" class="form-control" v-model="editData.price" />
        </div>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn btn-primary" @click="handleEdit(editData.id)">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api.js';
import { Notyf } from 'notyf';

const props = defineProps({
  productData: {
    type: Array,
    required: true,
  },
});

const notyf = new Notyf();
const showModal = ref(false);
const editData = ref({ id: '', name: '', description: '', price: 0 });

function openEdit(product) {
  editData.value = { ...product };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

async function handleEdit(productId) {
  try {
    const response = await api.patch(`/product/${productId}`, {
      name: editData.value.name,
      description: editData.value.description,
      price: editData.value.price,
    });
    if (response.status === 200) {
      notyf.success(response.data.message);
      location.reload();
    }
  } catch {
    notyf.error('Failed to update product');
  }
}

async function handleArchive(productId) {
  try {
    const response = await api.patch(`/product/${productId}/archive`);
    if (response.status === 200) {
      notyf.success(response.data.message);
      location.reload();
    }
  } catch {
    notyf.error('Failed to archive product');
  }
}
</script>
