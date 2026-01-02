<template>
  <div id="home" class="login-page min-vh-100">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark sticky-navbar">
      <div class="container">
        <div class="navbar-brand">
          <h2 class="logo">Unicoss <br>&nbsp;&nbsp;&nbsp;Garage</h2>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" href="#home">HOME</a></li>
            <li class="nav-item"><a class="nav-link" href="#about">ABOUT</a></li>
            <li class="nav-item"><a class="nav-link" href="#services">SERVICE</a></li>
            <li class="nav-item"><a class="nav-link" href="#design">DESIGN</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">CONTACT</a></li>
            <li class="nav-item"><a class="nav-link" href="#faq">FAQ</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- HERO + LOGIN -->
    <section class="container py-5 text-white">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <h1 class="display-4 fw-bold">
            PAINT and<br>
            <span class="text-warning">BODYKITS</span>
          </h1>

          <p class="mt-4">
            We bring your sports car’s true personality to life through
            precision paintwork and custom body kits.
            Designed for performance, built for presence.
          </p>

          <a href="#contact" class="btn btn-warning mt-3 contact-btn">
            CONTACT US
          </a>
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

    <!-- ABOUT -->
    <section id="about" class="section dark about-offset">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">About Unicoss Garage</h2>

        <div class="row align-items-center gy-4">
          <div class="col-lg-6 d-flex justify-content-center">
            <img src="/images/2.jpg" class="about-image" />
          </div>

          <div class="col-lg-6">
            <p class="about-text">
              At Unicoss Garage, we believe a car is more than just a machine —
              it is a reflection of identity, passion, and intent.
            </p>
            <p class="about-text">
              Our builds are crafted with precision, balance,
              and respect for timeless automotive design.
            </p>
            <p class="about-text">
              Every project is treated as a signature piece,
              engineered for confidence and performance.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="section">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">Services</h2>

        <div class="row align-items-center gy-4">
          <div class="col-lg-6">
            <p class="service-text">
              We specialize in precision paint restoration, body kit installation,
              and exterior refinishing using professional-grade techniques.
            </p>

            <ul class="service-list">
              <li>Paint & Dent Restoration</li>
              <li>Custom Body Kits Installation</li>
              <li>Exterior Refinishing</li>
              <li>Design Consultation</li>
            </ul>
          </div>

          <div class="col-lg-6 d-flex justify-content-center">
            <div class="video-wrapper">
              <video src="/images/3d.mp4" autoplay loop muted playsinline></video>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DESIGN -->
    <section id="design" class="section dark">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">Design Philosophy</h2>

        <div class="row align-items-center gy-4">
          <div class="col-lg-6 d-flex justify-content-center">
            <img src="/images/43.webp" class="about-image" />
          </div>

          <div class="col-lg-6">
            <p class="about-text">
              Our design philosophy is rooted in purpose and proportion.
            </p>
            <p class="about-text">
              We balance aggression with refinement to create confident builds.
            </p>
            <p class="about-text">
              Design that ages gracefully and performs beautifully.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">Contact Us</h2>

        <div class="row gy-4 align-items-stretch">
          <div class="col-lg-6">
            <div class="map-wrapper">
              <iframe
                src="https://maps.google.com/maps?q=Lucban%20Quezon%20Philippines&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div class="col-lg-6">
            <form class="contact-form">
              <input class="form-control mb-3" placeholder="Your Name" />
              <input class="form-control mb-3" placeholder="Email Address" />
              <textarea rows="5" class="form-control mb-3" placeholder="Your Message"></textarea>

              <button class="btn btn-warning w-100 send-btn">
                Send Message
              </button>

              <div class="social-icons text-center mt-4">
                <i class="bi bi-facebook"></i>
                <i class="bi bi-instagram"></i>
                <i class="bi bi-twitter"></i>
                <i class="bi bi-youtube"></i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ (FOOTER STYLE) -->
    <section id="faq" class="section dark">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">FAQ</h2>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <p><strong>Do you accept custom builds?</strong><br>
              Yes. Every project starts with a consultation to understand your vision.
            </p>

            <p><strong>How long does a build take?</strong><br>
              Timelines vary depending on scope and complexity.
            </p>

            <p><strong>Do you work on all car models?</strong><br>
              We focus mainly on sports and performance vehicles.
            </p>

            <p><strong>Where are you located?</strong><br>
              Lucban, Quezon, Philippines.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-section">
      <div class="container text-white text-center">
        <p class="footer-copy">© 2026 Unicoss Garage. All rights reserved.</p>
        <p class="footer-credit">Cristino France Madali – Capstone-3</p>
      </div>
    </footer>

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
.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 999;
  background: rgba(0,0,0,.85);
  backdrop-filter: blur(6px);
}

#about,
#services,
#design,
#contact,
#faq {
  scroll-margin-top: 120px;
}

.section { padding: 5rem 0; }
.section.dark { background: rgba(0,0,0,.65); }
.section-title { color: #ffd84d; }

.login-card { max-width: 350px; border-radius: 1rem; }

.login-card .form-control,
.contact-form .form-control {
  background: rgba(0,0,0,.5);
  color: #fff;
  border: 1px solid #ffc107;
}

.login-card .form-control::placeholder,
.contact-form .form-control::placeholder {
  color: #fff;
  opacity: .9;
}

.contact-btn:hover,
.send-btn:hover {
  background: transparent;
  color: #ffc107;
  border: 1px solid #ffc107;
}

.login-social i,
.social-icons i {
  font-size: 1.5rem;
  margin: 0 .5rem;
  cursor: pointer;
  transition: color .3s, transform .3s;
}

.login-social i:hover,
.social-icons i:hover {
  color: #ffc107;
  transform: translateY(-3px);
}

.about-offset { margin-top: 10rem; }

.about-image {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 25px 50px rgba(0,0,0,.6);
}

.video-wrapper {
  width: 100%;
  max-width: 520px;
  height: 300px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,.6);
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-wrapper {
  width: 100%;
  height: 350px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,.6);
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.footer-section {
  background: #0b0b0b;
  padding: 2rem 0;
}

.footer-copy { opacity: .7; }
.footer-credit { opacity: .5; font-size: .85rem; }

html { scroll-behavior: smooth; }
</style>
