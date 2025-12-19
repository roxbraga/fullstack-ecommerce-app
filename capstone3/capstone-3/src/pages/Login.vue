<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import api from '../api.js';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global.js';

const email = ref('');
const password = ref('');
const isEnabled = ref(false);
const isLoading = ref(false);

const router = useRouter();
const notyf = new Notyf();
const { user, getUserDetails } = useGlobalStore();

// Enable button only if both email and password are filled
watch([email, password], ([e, p]) => {
  isEnabled.value = e.trim() !== '' && p.trim() !== '';
});

// Redirect if already logged in
onBeforeMount(async () => {
  if (user?.token) {
    router.replace('/');
  } else if (localStorage.getItem('token')) {
    await getUserDetails(localStorage.getItem('token'));
    if (user?.token) router.replace('/');
  }
});

async function handleSubmit(e) {
  e.preventDefault();
  if (!isEnabled.value || isLoading.value) return;

  isLoading.value = true;
  try {
    const res = await api.post('/users/login', {
      email: email.value.trim(),
      password: password.value.trim(),
    });

    if (res.data.access) {
      localStorage.setItem('token', res.data.access);
      await getUserDetails(res.data.access);
      notyf.success('Login Successful');

      email.value = '';
      password.value = '';

      router.replace('/'); 
    }
  } catch (err) {
    if ([401, 404, 400].includes(err.response?.status)) {
      notyf.error(err.response.data.message || 'Invalid credentials');
    } else {
      notyf.error('Login failed. Please contact administrator.');
      console.error(err);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="my-5 pt-3 text-info text-center">Login Page</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-md-5 border rounded-3 mx-auto p-5">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="emailInput" class="form-label text-white">Email Address</label>
            <input type="email" class="form-control" id="emailInput" v-model="email" placeholder="Enter your email" autocomplete="new-email"/>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label text-white">Password</label>
            <input type="password" class="form-control" id="passwordInput" v-model="password" placeholder="Enter your password" autocomplete="new-password"/>
          </div>
          <div class="d-grid mt-5">
            <button type="submit" class="btn btn-info" :disabled="!isEnabled || isLoading">
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </div>
          <p class="text-center text-light mt-3 mb-0">
            Don't have an account? 
            <router-link to="/register" class="text-primary fw-semibold text-decoration-none">
              Register here
            </router-link>
          </p>

        </form>
      </div>
    </div>
  </div>
</template>
