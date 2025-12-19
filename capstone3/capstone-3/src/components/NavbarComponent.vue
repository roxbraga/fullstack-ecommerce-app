<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4" style="z-index: 1000;">
    
    <router-link to="/" class="navbar-brand d-flex align-items-center text-info text-decoration-none">
      <span class="fw-bold">CS-3</span>
    </router-link>

    <!-- Toggler -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
     
     	<form class="d-flex mx-auto my-2 my-lg-0 w-50" role="search" v-if="isLoggedIn">
		  <input class="form-control me-2 flex-grow-1" type="search" placeholder="Search products..." aria-label="Search">
		  <button class="btn btn-outline-light px-4" type="submit">Search</button>
		</form>


      
      <ul class="navbar-nav ms-auto align-items-center">
        <!-- Logged out -->
        <template v-if="!isLoggedIn">
          <li class="nav-item me-2">
            <router-link to="/login" class="btn btn-outline-info">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="btn btn-info">Register</router-link>
          </li>
        </template>

        <!-- Logged in -->
        <template v-else>
          <li class="nav-item me-3">
            <router-link to="/cart" class="nav-link text-light">
              <i class="bi bi-cart-fill" style="font-size: 1.4rem;"></i>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" href="#">
              <i class="bi bi-person-circle me-1" style="font-size: 1.4rem;"></i>
              {{ user.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item text-danger" @click="logout">Logout</button>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useGlobalStore } from '../stores/global.js';

export default {
  name: 'NavbarComponent',
  setup(props, { emit }) {
    const store = useGlobalStore();

    const isLoggedIn = computed(() => !!store.user?.token);
    const user = computed(() => store.user || { name: 'User' });

    function logout() {
      localStorage.removeItem('token');
      store.getUserDetails(null);
      emit('logout'); 
    }

    return { isLoggedIn, user, logout };
  },
};
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 1000;
}

@media (max-width: 576px) {
  form.d-flex {
    width: 100%;
    flex-direction: column;
  }
  form.d-flex input {
    margin-bottom: 0.5rem;
  }
}
</style>
