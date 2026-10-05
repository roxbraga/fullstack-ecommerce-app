<script setup>
import { ref } from "vue"
import Banner from "../components/Banner.vue"

const WEB3FORMS_ACCESS_KEY = "ccbb74f7-4ceb-4247-b533-c7a8807ccd29"

const name = ref("")
const email = ref("")
const message = ref("")
const isLoading = ref(false)

const submitForm = async () => {
  isLoading.value = true

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })

    const result = await response.json()

    if (result.success) {
      alert("Message sent successfully")
      name.value = ""
      email.value = ""
      message.value = ""
    } else {
      alert("Failed to send message")
    }
  } catch (error) {
    console.error(error)
    alert("Error sending message")
  } finally {
    isLoading.value = false
  }
}
</script>


<template>
  <div id="home" class="page-offset">
    <Banner />
 
    <!-- BRAND LOGO CAROUSEL -->
<section class="brand-carousel py-5">
  <div class="container">
    <div id="brandCarousel" class="carousel slide" data-bs-ride="carousel">

      <div class="carousel-inner text-center">

        <!-- SLIDE 1 -->
        <div class="carousel-item active">
          <div class="d-flex justify-content-center gap-5 flex-wrap">

            <img src="/images/honda1.webp" class="brand-logo" alt="Honda">
            <img src="/images/bentley.png" class="brand-logo" alt="Bentley">
            <img src="/images/peugeot.png" class="brand-logo" alt="Peugeot">
            <img src="/images/hyundai.png" class="brand-logo" alt="Hyundai">
            <img src="/images/lexus.png" class="brand-logo" alt="Lexus">
            <img src="/images/nissan.png" class="brand-logo" alt="Nissan">

          </div>
        </div>

        <!-- SLIDE 2 -->
        <div class="carousel-item">
          <div class="d-flex justify-content-center gap-5 flex-wrap">

            <img src="/images/bmw.png" class="brand-logo" alt="BMW">
            <img src="/images/audi.png" class="brand-logo" alt="Audi">
            <img src="/images/mercedes.png" class="brand-logo" alt="Mercedes">
            <img src="/images/toyota.png" class="brand-logo" alt="Toyota">
            <img src="/images/lambo1.png" class="brand-logo" alt="Lamborghini">
            <img src="/images/mclaren.png" class="brand-logo" alt="McLaren">

          </div>
        </div>

      </div>

      <!-- LEFT ARROW -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#brandCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
      </button>

      <!-- RIGHT ARROW -->
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#brandCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
      </button>

    </div>
  </div>
</section>

    <!-- ABOUT -->
    <section id="about" class="section">
      <div class="container text-white">
        <div class="glass-card">
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
                Our builds are crafted with precision, glass balance,
                and respect for timeless automotive design.
              </p>
              <p class="about-text">
                Every project is treated as a signature piece,
                engineered for confidence and performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="section">
      <div class="container text-white">
        <div class="glass-card">
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
      </div>
    </section>

    <!-- DESIGN -->
    <section id="design" class="section">
      <div class="container text-white">
        <div class="glass-card">
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
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section">
      <div class="container text-white">
        <div class="glass-card">
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
              <form @submit.prevent= "submitForm" class="contact-form">
                <input v-model="name" type="text" class="form-control mb-3" placeholder="Your Name" />
                <input v-model="email" type="email" class="form-control mb-3" placeholder="Email Address" />
                <textarea
                  v-model="message"
                  rows="5"
                  class="form-control mb-3"
                  placeholder="Your Message"
                ></textarea>

                <button type="submit" class="btn w-100 submit-btn" :disabled="isLoading">
                  {{ isLoading ? "Sending..." : "Submit" }}
                </button>

                <div class="social-icons mt-4">
                  <i class="bi bi-facebook"></i>
                  <i class="bi bi-instagram"></i>
                  <i class="bi bi-twitter"></i>
                  <i class="bi bi-youtube"></i>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

           <!-- CAROUSEL -->
    <section class="carousel-section">
      <div id="carCarousel" class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">

          <div class="carousel-item active">
            <img
              src="/images/c1.jpg"
              class="d-block w-100 carousel-img"
              alt="Car"
            />
          </div>

          <div class="carousel-item">
            <img
              src="/images/c2.jpg"
              class="d-block w-100 carousel-img"
              alt="Car"
            />
          </div>

          <div class="carousel-item">
            <img
              src="/images/mustang.png"
              class="d-block w-100 carousel-img"
              alt="Mustang"
            />
          </div>

          <div class="carousel-item">
            <img
              src="/images/c1.png"
              class="d-block w-100 carousel-img"
              alt="Car"
            />
          </div>

          <div class="carousel-item">
            <img
              src="/images/86.png"
              class="d-block w-100 carousel-img"
              alt="Toyota 86"
            />
          </div>

        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>

        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>

      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="section">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">FAQ</h2>

        <div class="row justify-content-center">
          <div class="col-lg-8 faq-text">
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
    <footer class="footer-section text-center text-white">
      <p class="footer-copy">© 2026 Unicoss Garage. All rights reserved.</p>
      <p class="footer-credit">Cristino France Madali – Capstone-3</p>
    </footer>
  </div>
</template>

<style scoped>
.section {
  padding: 5rem 0;
  background: transparent;
}

.glass-card {
  background: linear-gradient(
    135deg,
    rgba(20,20,20,0.85),
    rgba(10,10,10,0.75)
  );
  backdrop-filter: blur(10px);
  border-radius: 22px;
  padding: 3rem 2.5rem;
  border: 1px solid rgba(255,193,7,0.15);
  box-shadow: 0 30px 60px rgba(0,0,0,0.7);
}

.section-title {
  color: #ffd84d;
}

.about-text,
.service-text,
.faq-text p,
.service-list li {
  text-shadow: 0 2px 6px rgba(0,0,0,.6);
}

.about-image {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
}

.video-wrapper {
  max-width: 520px;
  height: 300px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-wrapper {
  height: 350px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* CONTACT FORM  */
.contact-form {
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.55),
    rgba(20,20,20,0.75)
  );
  backdrop-filter: blur(6px);
  padding: 1.5rem;
  border-radius: 18px;
}

/* SEND MESSAGE  */
.submit-btn {
  background: #ffc107;
  color: #000;
  font-weight: 600;
  border: 1px solid #ffc107;
  transition: all 0.25s ease;
}

.submit-btn:hover {
  background: transparent;
  color: #ffc107;
}

/* SOCIAL ICONS */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}

.social-icons i {
  font-size: 1.6rem;
  cursor: pointer;
  color: #fff;
  transition: color 0.25s ease, transform 0.25s ease;
}

.social-icons i:hover {
  color: #ffc107;
  transform: translateY(-4px);
}

/* FOOTER */
.footer-section {
  background: rgba(0,0,0,.75);
  padding: 2rem 0;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .glass-card {
    padding: 2rem 1.5rem;
  }

  .about-image {
    width: 240px;
    height: 240px;
  }
}

.carousel-section {
  padding: 2rem 0 5rem;
}

.carousel-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 18px;
}
</style>
