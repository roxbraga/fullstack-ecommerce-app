<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-glass sticky-top">
    <div class="container-fluid px-2 px-sm-3 px-lg-4">

      <!-- LOGO -->
      <router-link to="/" class="navbar-brand logo d-flex align-items-center">
        <i class="bi bi-car-front-fill me-2"></i>
        Unicoss Garage
      </router-link>

      <!-- TOGGLER -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- COLLAPSE -->
      <div
        class="collapse navbar-collapse mt-3 mt-lg-0"
        id="navMenu"
      >
        <!-- SEARCH -->
        <form class="d-flex mx-lg-auto my-2 my-lg-0 w-100 w-lg-auto">
          <input
            class="form-control large-search-bar"
            type="search"
            placeholder="Search here"
          />
          <button class="btn btn-warning search-btn" type="button">
            Search
          </button>
        </form>

        <!-- LINKS -->
        <ul
          class="navbar-nav ms-lg-auto mt-3 mt-lg-0 align-items-lg-center gap-2 gap-lg-3 px-1"
        >
          <!-- GREETING -->
          <li class="nav-item greeting px-2 px-lg-0">
            <span class="greet-hi">Hi,</span>
            <span class="greet-name">{{ firstName }}</span>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/">
              <i class="bi bi-house-door me-1"></i> Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/profile">
              <i class="bi bi-person-circle me-1"></i> Profile
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/cart">
              <i class="bi bi-cart3 me-1"></i>
              Cart ({{ cart.totalItems }})
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link nav-hover" to="/orders">
              <i class="bi bi-bag-check me-1"></i>
              Orders ({{ ordersCount }})
            </router-link>
          </li>

          <li class="nav-item">
            <button
              class="btn btn-outline-warning btn-sm logout-btn w-100 w-lg-auto"
              @click="logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'
import { useCartStore } from '../stores/cart'
import { useOrdersStore } from '../stores/orders'

const store = useGlobalStore()
const cart = useCartStore()
const ordersStore = useOrdersStore()
const router = useRouter()

const firstName = computed(() => {
  if (!store.user?.name) return ''
  return store.user.name.split(' ')[0]
})

//  REACTIVE – auto updates
const ordersCount = computed(() => ordersStore.totalOrders)

const logout = () => {
  store.logout()
  ordersStore.clear()
  router.replace('/login')
}
</script>


<style scoped>

/*NAVBAR BACKGROUND*/
.navbar-glass {
  background: linear-gradient(
    180deg,
    rgba(33, 37, 41, 0.95),
    rgba(20, 22, 24, 0.95)
  );
  border-bottom: 1px solid rgba(255, 193, 7, 0.6);
  z-index: 1050;
}


/*LOGO*/

.logo {
  font-weight: 700;
  font-size: 1.35rem;
  color: #ffc107;
  text-decoration: none;
}

/*NAV LINKS*/

.nav-link {
  color: #f8f9fa;
  font-weight: 500;
  white-space: nowrap;
  padding: 0.35rem 0.5rem;
}

.nav-hover:hover {
  color: #ffc107 !important;
}

 /*GREETING*/

.greeting {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  color: #f8f9fa;
  white-space: nowrap;
}

.greet-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

 /*SEARCH*/

.large-search-bar {
  width: 420px;
  border-radius: 0.375rem 0 0 0.375rem;
  border: 1px solid #ffc107;
  height: 40px;
}

.search-btn {
  height: 40px;
  border-radius: 0 0.375rem 0.375rem 0;
}

/*LOGOUT BUTTON*/

.logout-btn {
  color: #ffc107;
  border-color: #ffc107;
}

.logout-btn:hover {
  background-color: #ffc107;
  color: #000;
}


/*MOBILE & TABLET TUNING*/

@media (max-width: 992px) {
  /* overall navbar height */
  .navbar {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }

  /* collapse spacing */
  .navbar-collapse {
    margin-top: 0.5rem;
  }

  /* nav list */
  .navbar-nav {
    padding: 0.25rem 0;
    gap: 0.4rem;
  }

  /* greeting spacing */
  .greeting {
    margin-bottom: 0.25rem;
  }

  /* search full width */
  .large-search-bar {
    width: 100%;
  }

  /* logout spacing */
  .logout-btn {
    margin-top: 0.4rem;
  }
}

 /*SMALL DEVICES*/

@media (max-width: 576px) {
  
  .navbar {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  .navbar-nav {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  
  .greet-name {
    max-width: 90px;
  }

  
  .greet-hi {
    display: none;
  }
}

</style>
