<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import api from '../api.js';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global.js';

const firstName = ref('');
const lastName = ref('');
const mobileNo = ref('');
const email = ref('');
const password = ref('');
const confirmPass = ref('');
const isEnabled = ref(false);
const isLoading = ref(false);

const router = useRouter();
const notyf = new Notyf();
const { user } = useGlobalStore();

// Enable button only if all fields filled and passwords match
watch([firstName, lastName, mobileNo, email, password, confirmPass], ([f, l, m, e, p, c]) => {
  isEnabled.value =
    f.trim() !== '' &&
    l.trim() !== '' &&
    m.trim() !== '' &&
    e.trim() !== '' &&
    p.trim() !== '' &&
    c.trim() !== '' &&
    p === c;
});

// Redirect if already logged in
onBeforeMount(() => {
  if (user?.token) router.replace('/');
});

async function handleSubmit(e) {
  e.preventDefault();
  if (!isEnabled.value || isLoading.value) return;

  isLoading.value = true;
  try {
    // Optional: check if email exists first
    await api.post('/users/check-email', { email: email.value });

    const res = await api.post('/users/register', {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      mobileNo: mobileNo.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    });

    if (res.status === 201) {
      notyf.success(res.data.message);

      firstName.value = '';
      lastName.value = '';
      mobileNo.value = '';
      email.value = '';
      password.value = '';
      confirmPass.value = '';

      router.replace('/login');
    } else {
      notyf.error('Registration failed. Please contact administrator.');
    }
  } catch (e) {
    notyf.error(e.response?.data?.message || 'Registration failed. Please contact administrator.');
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="my-5 pt-3 text-info text-center">Register Page</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-md-5 border rounded-3 mx-auto p-5">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label text-white">First Name</label>
            <input type="text" class="form-control" v-model="firstName" placeholder="Enter your first name"  />
          </div>
          <div class="mb-3">
            <label class="form-label text-white">Last Name</label>
            <input type="text" class="form-control" v-model="lastName" placeholder="Enter your last name"/>
          </div>
          <div class="mb-3">
            <label class="form-label text-white">Mobile Number</label>
            <input type="text" class="form-control" v-model="mobileNo" placeholder="Enter your mobile Number"/>
          </div>
          <div class="mb-3">
            <label class="form-label text-white">Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter your email" autocomplete="new-email"/>
          </div>
          <div class="mb-3">
            <label class="form-label text-white">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter your password" autocomplete="new-password"/>
          </div>
          <div class="mb-3">
            <label class="form-label text-white">Confirm Password</label>
            <input type="password" class="form-control" v-model="confirmPass" />
          </div>
          <div class="d-grid mt-5">
            <button type="submit" class="btn btn-info" :disabled="!isEnabled || isLoading">
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>
          </div>
          <p class="text-center text-light mt-3 mb-0">
            Already have an account? 
            <router-link to="/login" class="text-primary fw-semibold text-decoration-none">
              Login here
            </router-link>
          </p>

        </form>
      </div>
    </div>
  </div>
</template>
