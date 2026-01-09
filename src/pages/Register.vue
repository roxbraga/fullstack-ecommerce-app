<template>
  <div class="register-root">
    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div class="register-card col-11 col-sm-9 col-md-6 col-lg-4 p-5 rounded-4">
        <h1 class="mb-4 text-warning text-center">Register</h1>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label text-white">First Name</label>
            <input
              class="form-control"
              v-model="firstName"
              placeholder="Enter your first name"
            />
          </div>

          <div class="mb-3">
            <label class="form-label text-white">Last Name</label>
            <input
              class="form-control"
              v-model="lastName"
              placeholder="Enter your last name"
            />
          </div>

          <div class="mb-3">
            <label class="form-label text-white">Mobile Number</label>
            <input
              class="form-control"
              v-model="mobileNo"
              placeholder="09XXXXXXXXX"
            />
          </div>

          <div class="mb-3">
            <label class="form-label text-white">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Enter your email"
              autocomplete="new-email"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label text-white">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Create a password"
              autocomplete="new-password"
              required
            />
          </div>

          <div class="mb-4">
            <label class="form-label text-white">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              v-model="confirmPass"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-warning"
              :disabled="!isEnabled || isLoading"
            >
              {{ isLoading ? 'Registering…' : 'Register' }}
            </button>
          </div>

          <p class="text-center text-light mt-3 mb-0">
            Already have an account?
            <router-link to="/login" class="text-warning fw-semibold">
              Login here
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { Notyf } from 'notyf'
import api from '../api.js'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global.js'

const firstName = ref('')
const lastName = ref('')
const mobileNo = ref('')
const email = ref('')
const password = ref('')
const confirmPass = ref('')
const isEnabled = ref(false)
const isLoading = ref(false)

const router = useRouter()
const notyf = new Notyf()
const { user } = useGlobalStore()

watch(
  [firstName, lastName, mobileNo, email, password, confirmPass],
  ([f, l, m, e, p, c]) => {
    isEnabled.value =
      f.trim() &&
      l.trim() &&
      m.trim() &&
      e.trim() &&
      p.trim() &&
      c.trim() &&
      p === c
  }
)

onBeforeMount(() => {
  if (user?.token) router.replace('/')
})

async function handleSubmit() {
  if (!isEnabled.value || isLoading.value) return
  isLoading.value = true

  try {
    await api.post('/users/check-email', { email: email.value })

    const registerData = {
      firstName: firstName.value,
      lastName: lastName.value,
      mobileNo: mobileNo.value,
      email: email.value,
      password: password.value
    }

    const res = await api.post('/users/register', registerData)

    if (res.status === 201) {
      notyf.success(res.data.message)
      firstName.value = ''
      lastName.value = ''
      mobileNo.value = ''
      email.value = ''
      password.value = ''
      confirmPass.value = ''
      router.replace('/login')
    } else {
      notyf.error('Registration failed')
    }
  } catch (e) {
    notyf.error(e.response?.data?.message || 'Registration failed')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* ROOT BACKGROUND */
.register-root {
  min-height: 100vh;
  background: url('../assets/rox09.jpg') center / cover no-repeat;
  position: relative;
}

/* DARK OVERLAY */
.register-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 0;
}

/* GRADIENT CARD */
.register-card {
  position: relative;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.85),
    rgba(40, 40, 40, 0.85),
    rgba(0, 0, 0, 0.9)
  );
  border: 1px solid rgba(255, 193, 7, 0.35);
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* TITLE FONT */
h1 {
  font-family: 'League Script', cursive;
}

/* INPUT FOCUS */
.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.15rem rgba(255, 193, 7, 0.25);
}
</style>
