<script setup>
import Banner from '../components/Banner.vue'

</script>

<template>
  

  <div id="home" class="page-offset">
    <Banner />
    <!-- ABOUT -->
    <section id="about" class="section dark">
      <div class="container text-white">
        <h2 class="section-title text-center mb-5">About Unicoss Garage</h2>

        <div class="row align-items-center gy-4">
          <div class="col-lg-6 d-flex justify-content-center">
            <img src="/images/2.jpg" class="about-image" />
          </div>

          <div class="col-lg-6">
            <p class="about-text">
              At Unicoss Garage, we believe a car is more than just a machine 
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
              <textarea
                rows="5"
                class="form-control mb-3"
                placeholder="Your Message"
              ></textarea>

              <button class="btn w-100 send-btn">
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

    <!-- FAQ -->
    <section id="faq" class="section dark">
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
  background: transparent; /* FULL TRANSPARENT */
}

/* REMOVE DARK OVERLAY */
.section.dark {
  background: transparent;
}

/* TITLES */
.section-title {
  color: #ffd84d;
}

/* TEXT READABILITY */
.about-text,
.service-text,
.faq-text p,
.service-list li {
  text-shadow: 0 2px 6px rgba(0,0,0,.6);
}

/* ABOUT / DESIGN IMAGE */
.about-image {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
}

/* VIDEO */
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

/* MAP */
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

/* CONTACT FORM (GLASS EFFECT) */
.contact-form {
  background: rgba(0,0,0,.35);
  backdrop-filter: blur(6px);
  padding: 1.5rem;
  border-radius: 18px;
}

.contact-form .form-control {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 1px solid #ffc107;
}

.contact-form .form-control::placeholder {
  color: #ffffff;
  opacity: 0.9;
}

/* SEND BUTTON */
.send-btn {
  background-color: #ffc107;
  color: #000;
  font-weight: 600;
  border: 1px solid #ffc107;
  transition: all 0.25s ease;
}

.send-btn:hover {
  background-color: transparent;
  color: #ffc107;
}

/* SOCIAL ICONS */
.social-icons i {
  font-size: 1.4rem;
  margin: 0 0.5rem;
  cursor: pointer;
  color: #ffffff;
  transition: color 0.25s ease, transform 0.25s ease;
}

.social-icons i:hover {
  color: #ffc107;
  transform: translateY(-3px);
}

/* FOOTER */
.footer-section {
  background: rgba(0,0,0,.75);
  padding: 2rem 0;
}

.footer-copy {
  opacity: 0.7;
}

.footer-credit {
  opacity: 0.5;
  font-size: 0.85rem;
}

html {
  scroll-behavior: smooth;
}

</style>
