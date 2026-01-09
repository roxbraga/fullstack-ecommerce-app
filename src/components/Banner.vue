<template>
  <section class="hero-banner text-white">
    <div class="container">
      <h1 class="display-4 fw-bold">
        PAINT and<br>
        <span class="text-warning">BODYKITS</span>
      </h1>

      <p class="mt-4 hero-text">
        We bring your sports car’s true personality to life through
        precision paintwork and custom body kits.
        Designed for performance, built for presence.
      </p>

      <div class="hero-actions mt-4">
        <a href="#contact" class="btn btn-warning me-2">
          Contact Us
        </a>

        <a href="#services" class="btn btn-outline-light">
          Book Now
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* HERO / BANNER */
.hero-banner {
  padding: 7rem 0 6rem;
  background: transparent; 
}

/* TEXT */
.hero-text {
  max-width: 520px;
  font-size: 1.05rem;
  opacity: 0.95;
}

/* BUTTONS */
.hero-actions .btn {
  padding: 0.6rem 1.5rem;
  font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-banner {
    padding: 5rem 0 4rem;
  }

  .display-4 {
    font-size: 2.4rem;
  }
}
</style>
