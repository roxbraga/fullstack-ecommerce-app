<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <form @submit.prevent="handleSubmit"
          class="bg-white p-5 rounded shadow-sm"
          style="width: 360px; max-width: 90vw;">
      <h1 class="mb-4 text-center fw-bold text-primary">Login</h1>


      <div class="mb-4">
        <label class="form-label fw-semibold">Email</label>
        <input type="email"
               class="form-control form-control-lg"
               v-model="email"
               placeholder="Enter email"
               autocomplete="new-email"
               required />
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold">Password</label>
        <input type="password"
               class="form-control form-control-lg"
               v-model="password"
               placeholder="Enter password"
               autocomplete="new-password"
               required />
      </div>

      <button type="submit"
              class="btn btn-primary btn-lg w-100"
              :disabled="!isEnabled || isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>

      <p class="text-center mt-3 mb-0">
        Already have an account? 
        <router-link to="/register" class="text-primary fw-semibold text-decoration-none">
          Register
        </router-link>
      </p>
    </form>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { Notyf } from 'notyf';
import api from '../api.js';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global';

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const router = useRouter();
const notyf = new Notyf();
const { user, getUserDetails } = useGlobalStore();

const isEnabled = computed(() => email.value !== '' && password.value !== '');

if (user.token) {
  router.replace('/');
}

async function handleSubmit() {
  if (!isEnabled.value || isLoading.value) return;

  isLoading.value = true;
  try {
    const res = await api.post('/users/login', {
      email: email.value,
      password: password.value,
    });

    if (res.data.access) {
      notyf.success('Login Successful');
      localStorage.setItem('token', res.data.access);
      await getUserDetails(res.data.access);

      email.value = '';
      password.value = '';

      router.push('/');
    }
  } catch (e) {
    if (e.response?.status === 401) {
      notyf.error(e.response.data.message);
    } else {
      notyf.error('Login Failed. Please contact administrator.');
      console.error(e);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
