<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <form @submit.prevent="handleSubmit"
          class="bg-white p-5 rounded shadow-sm"
          style="width: 360px; max-width: 90vw;">
      <h1 class="mb-4 text-center fw-bold text-primary">Register</h1>

      <div class="mb-4">
        <label for="firstName" class="form-label fw-semibold">First Name</label>
        <input type="text" id="firstName" class="form-control form-control-lg" v-model="firstName" placeholder="Enter First Name" autocomplete="off" required />
      </div>

      <div class="mb-4">
        <label for="lastName" class="form-label fw-semibold">Last Name</label>
        <input type="text" id="lastName" class="form-control form-control-lg" v-model="lastName" placeholder="Enter Last Name" autocomplete="off" required />
      </div>

      <div class="mb-4">
        <label for="mobileNo" class="form-label fw-semibold">Mobile Number</label>
        <input type="text" id="mobileNo" class="form-control form-control-lg" v-model="mobileNo" placeholder="Enter Mobile Number" autocomplete="off" required />
      </div>

      <div class="mb-4">
        <label for="email" class="form-label fw-semibold">Email</label>
        <input type="email" id="email" class="form-control form-control-lg" v-model="email" placeholder="Enter Email" autocomplete="new-email" required />
      </div>

      <div class="mb-4">
        <label for="password" class="form-label fw-semibold">Password</label>
        <input type="password" id="password" class="form-control form-control-lg" v-model="password" placeholder="Enter Password" autocomplete="new-password" required />
      </div>

      <div class="mb-4">
        <label for="confirmPass" class="form-label fw-semibold">Confirm Password</label>
        <input type="password" id="confirmPass" class="form-control form-control-lg" v-model="confirmPass" placeholder="Confirm Password" autocomplete="off" required />
      </div>

      <button
        type="submit"
        class="btn btn-primary btn-lg w-100"
        :disabled="!isEnabled || isLoading"
      >
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>

      <p class="text-center mt-3 mb-0">
        Already have an account? 
        <router-link to="/login" class="text-primary fw-semibold text-decoration-none">
          Login
        </router-link>
      </p>
    </form>
  </div>
</template>

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

const notyf = new Notyf();
const router = useRouter();
const { user } = useGlobalStore();

// Watch inputs and enable button only if all fields are filled and passwords match
watch(
  [firstName, lastName, mobileNo, email, password, confirmPass],
  ([f, l, m, e, p, c]) => {
    // Only check for empty strings; do not trim mobileNo
    isEnabled.value =
      f.trim() !== '' &&
      l.trim() !== '' &&
      m !== '' &&
      e.trim() !== '' &&
      p.trim() !== '' &&
      c.trim() !== '' &&
      p === c;
  }
);

// Handle form submission
async function handleSubmit() {
  if (!isEnabled.value || isLoading.value) return;

  isLoading.value = true;
  try {
    // Check if email is already registered
    await api.post('/users/check-email', { email: email.value });

    // Register user
    const res = await api.post('/users/register', {
      firstName: firstName.value,
      lastName: lastName.value,
      mobileNo: mobileNo.value,
      email: email.value,
      password: password.value,
    });

    if (res.status === 201) {
      notyf.success(res.data.message);

      // Clear inputs
      firstName.value = '';
      lastName.value = '';
      mobileNo.value = '';
      email.value = '';
      password.value = '';
      confirmPass.value = '';

      router.push('/login');
    } else {
      notyf.error('Registration Failed. Please contact administrator.');
    }
  } catch (e) {
    console.error(e);
    notyf.error(e.response?.data?.message || 'Registration Failed. Please contact administrator.');
  } finally {
    isLoading.value = false;
  }
}

// Redirect if already logged in
onBeforeMount(() => {
  if (user.token) router.push('/courses');
});
</script>
