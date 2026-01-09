<template>
  <div id="home" class="login-page min-vh-100">

    <!-- HERO + LOGIN -->
    <section class="container py-5 text-white">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <h1 class="display-4 fw-bold">
            Capstone-3<br>
            <span class="text-warning">Full Stack Project</span>
          </h1>

          <p class="mt-4">
            This project represents my journey into full-stack development building the frontend, backend, and database layer from scratch to create a functional, real world e-commerce platform.
            <br><br>
            From interface design to server side logic, this system reflects hands-on experience in developing a complete full-stack application with real business use cases.
          </p>

          <!-- ACTION BUTTONS -->
          <div class="d-flex gap-3 mt-4 flex-wrap">
            <a href="#contact" class="btn btn-warning contact-btn">
              CONTACT US
            </a>

            <a
              href="mailto:cristinofrancemadali@gmail.com"
              class="btn btn-outline-light hire-btn"
            >
              HIRE ME
            </a>
          </div>
        </div>

        <!-- LOGIN CARD -->
        <div class="col-lg-5 d-flex justify-content-center mt-3">
          <div class="card bg-dark bg-opacity-75 text-white p-4 login-card">
            <h2 class="text-center text-dark bg-warning rounded py-2 mb-4">
              Login Here
            </h2>

            <form @submit.prevent="handleSubmit">
              <input
                type="email"
                v-model="email"
                class="form-control mb-3"
                placeholder="Input email here"
                autocomplete="new-email"
                required
              />

              <input
                type="password"
                v-model="password"
                class="form-control mb-3"
                placeholder="Input password here"
                autocomplete="new-password"
                required
              />

              <button type="submit" class="btn btn-warning w-100 mb-3">
                {{ isLoading ? 'Logging in...' : 'LOGIN' }}
              </button>
            </form>

            <div class="login-social text-center mb-3">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-instagram"></i>
              <i class="bi bi-twitter"></i>
              <i class="bi bi-google"></i>
            </div>

            <p class="text-center">
              Don't have an account?
              <router-link to="/register" class="text-warning fw-bold">
                Sign up here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '../api'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'

const email = ref('')
const password = ref('')
const isEnabled = ref(false)
const isLoading = ref(false)

const router = useRouter()
const store = useGlobalStore()

watch([email, password], ([e, p]) => {
  isEnabled.value = e.trim() && p.trim()
})

onMounted(() => {
  if (store.isLoggedIn) router.replace('/')
})

const handleSubmit = async () => {
  if (!isEnabled.value || isLoading.value) return
  isLoading.value = true

  try {
    const res = await api.post('/users/login', {
      email: email.value.trim(),
      password: password.value.trim()
    })

    localStorage.setItem('token', res.data.access)
    store.user.token = res.data.access
    await store.getUserDetails()

    store.user.isAdmin ? router.replace('/admin') : router.replace('/')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-card {
  max-width: 350px;
  border-radius: 1rem;
}

.login-card .form-control {
  background: rgba(0,0,0,.5);
  color: #fff;
  border: 1px solid #ffc107;
}

.login-card .form-control::placeholder {
  color: #fff;
  opacity: .9;
}

/* CONTACT BUTTON */
.contact-btn,
.hire-btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

/* CONTACT BUTTON HOVER */
.contact-btn:hover {
  background: transparent;
  color: #ffc107;
  border: 1px solid #ffc107;
}

/* HIRE ME BUTTON */
.hire-btn {
  border: 1px solid #ffffff;
  color: #ffffff;
  background: transparent;
  transition: all 0.25s ease;
}

/* HIRE ME HOVER */
.hire-btn:hover {
  background: white;
  color: #000;
  border-color: white;
}


/* SOCIAL ICONS */
.login-social i {
  font-size: 1.5rem;
  margin: 0 .6rem;
  cursor: pointer;
  transition: color .3s, transform .3s;
}

.login-social i:hover {
  color: #ffc107;
  transform: translateY(-3px);
}

html {
  scroll-behavior: smooth;
}
</style>
