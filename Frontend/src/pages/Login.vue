<template>
  <div class="login-page min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <!-- Logo & Icon -->
        <div class="navbar-brand">
          <h2 class="logo">Unicoss <br>&nbsp;&nbsp;&nbsp;Garage</h2>
        </div>
        <!-- Hamburger Button for smaller devices -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" href="#">HOME</a></li>
            <li class="nav-item"><a class="nav-link" href="#">ABOUT</a></li>
            <li class="nav-item"><a class="nav-link" href="#">SERVICE</a></li>
            <li class="nav-item"><a class="nav-link" href="#">DESIGN</a></li>
            <li class="nav-item"><a class="nav-link" href="#">CONTACT</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content Section -->
    <div class="container py-5 text-white">
      <div class="row align-items-center">
        <!-- Text & Call-to-Action -->
        <div class="col-lg-7">
          <h1 class="display-4 fw-bold">PAINT and<br><span class="text-warning">BODYKITS</span></h1>
          <p class="mt-4">
            We bring your sports car’s true personality to life with premium paintwork and custom body kits.<br />
            From sleek, aerodynamic enhancements to bold color finishes, our expert team delivers precision craftsmanship and head-turning style.<br />
            Whether you're upgrading for the track or the streets, we’ll help you stand out with a look that’s uniquely yours.
          </p>
          <!-- Contact Us Button with Hover Effect -->
          <a href="#" class="btn btn-warning contact-btn mt-3">CONTACT US</a>
        </div>

        <!-- Login Form -->
        <div class="col-lg-5 d-flex justify-content-center align-items-start mt-3">
          <div class="card bg-dark bg-opacity-75 text-white p-4" style="width: 100%; max-width: 350px; border-radius: 1rem;">
            <h2 class="card-title text-center text-dark bg-warning rounded py-2 mb-4">Login Here</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Enter Email"
                  autocomplete="new-email"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Enter Password"
                  autocomplete="new-password"
                  required
                />
              </div>
              <!-- Login Button with Hover Effect (same as Contact Us button) -->
              <button type="submit" class="btn btn-warning login-btn w-100 mb-3">
                {{ isLoading ? 'Logging in...' : 'LOGIN' }}
              </button>
            </form>
            <p class="text-center mb-1">
              Don't have an account?
              <router-link to="/register" class="text-warning fw-bold text-decoration-none">Sign up here</router-link>
            </p>
            <p class="text-center mt-3 mb-1">Log in with</p>
            <div class="d-flex justify-content-center gap-3">
              <!-- Social Media Icons with Hover Effect using Bootstrap Icons -->
              <a href="#" class="social-icon fs-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-icon fs-3"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-icon fs-3"><i class="bi bi-twitter"></i></a>
              <a href="#" class="social-icon fs-3"><i class="bi bi-skype"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Signature Section: Fixed on Bottom Left -->
    <div class="signature position-fixed bottom-0 start-0 d-flex align-items-center p-2 text-white w-100">
      <div class="signature-content">
        <img src="../assets/55.jpg" alt="Cristino France Madali" width="50" class="me-2" />
        <h5 class="m-0" style="font-family: 'League Script', cursive;">Cristino France Madali</h5>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue'
import { Notyf } from 'notyf'
import api from '../api'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'

const email = ref('')
const password = ref('')
const isEnabled = ref(false)
const isLoading = ref(false)

const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

watch([email, password], ([e, p]) => {
  isEnabled.value = e.trim() && p.trim()
})

onMounted(async () => {
  // if already logged in, redirect
  if (store.isLoggedIn) {
    router.replace('/')
  }
})

const handleSubmit = async () => {
  if (!isEnabled.value || isLoading.value) return

  isLoading.value = true
  try {
    const res = await api.post('/users/login', {
      email: email.value.trim(),
      password: password.value.trim()
    })

    // save token
    localStorage.setItem('token', res.data.access)

    //  sync token to store
    store.user.token = res.data.access

    //  fetch user immediately
    await store.getUserDetails()

    notyf.success('Login Successful')

    email.value = ''
    password.value = ''

    // redirect based on role
    if (store.user.isAdmin) {
      router.replace('/admin')
    } else {
      router.replace('/')
    }
  } catch (err) {
    notyf.error(err.response?.data?.message || 'Login failed')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom Styles for the Page */
h1 span {
  font-weight: bold;
}

.card input::placeholder {
  color: #fff;
  opacity: 1;
}

.card input:focus {
  outline: none;
  box-shadow: none;
}

.card button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Styles for the Login Page */
.login-page {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 50%), url('../assets/rox09.jpg');
  background-position: center;
  background-size: cover;
  height: 109vh;
  position: relative;
}

.card input {
  background: transparent;
  border-bottom: 1px solid #fff200;
  color: #fff;
}

.card .btn-warning {
  background: #fff200;
  border: none;
}

/* Signature Section Styling */
.signature {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 50%), url('../assets/rox09.jpg');
  background-position: center;
  background-size: cover;
  padding: 10px 0;
  color: white;
  font-size: 20px;
  font-family: "League Script", cursive;
  text-align: left;
  z-index: 100;
  padding-left: 10px;
}

.signature-content {
  display: flex;
  align-items: center;
}

.signature img {
  width: 50px;
  margin-right: 10px;
}


.navbar-nav .nav-item .nav-link {
  transition: color 0.3s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #fff200;
}

/* Button Hover Effects */
.contact-btn, .login-btn {
  transition: background 0.3s ease, color 0.3s ease, border 0.3s ease;
}

.contact-btn:hover, .login-btn:hover {
  background-color: transparent;
  color: white;
  border: 1px solid #fff200;
}

/* Social Media Icon Hover */
.social-icon {
  color: white;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #fff200; 
}

/* Center the Navbar items */
.navbar-nav {
  display: flex;
  justify-content: center; 
  width: 100%;
}

.navbar-nav .nav-item {
  margin: 0 10px; /* Add some space between items */
}

/* Center Login Form and Search Bar */
.d-flex {
  display: flex;
  justify-content: center; /* Center both search and login forms */
  align-items: center;
  gap: 15px;
  margin-top: 50px;
}

@media (max-width: 992px) {
  /* For medium screens like tablets */
  .navbar {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .login-page {
    height: auto;
    background-position: top center;
  }

  .container {
    padding-left: 15px;
    padding-right: 15px;
  }

  .col-lg-7 {
    text-align: center;
    margin-bottom: 30px;
  }

  .card {
    width: 100%;
    margin-top: 20px;
  }

  .navbar-nav {
    text-align: center;
    margin-top: 10px;
  }

  .navbar-nav .nav-item {
    margin: 5px 0;
  }

  .navbar-nav .nav-link {
    font-size: 16px;
  }
}

/* Large Screen Adjustments */
@media (min-width: 1200px) {
  .container {
    max-width: 1200px; /* Limit content width on large screens */
    margin: auto;
  }

  .login-page {
    height: 100vh; /* Full height on large screens */
    background-position: center center;
  }

  .d-flex {
    gap: 30px; /* More space between login form and search on larger screens */
  }
}

.form-control::placeholder {
  color: white;
  font-size: 15px;
}
</style>
