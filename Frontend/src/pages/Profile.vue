<template>
  <div class="user-root">
    <!-- CONTENT -->
    <div class="container py-5">
      <div class="profile-card mx-auto">
        <h2 class="page-title mb-4">My Profile</h2>

        <div class="info-row">
          <span>Name</span>
          <strong>{{ store.user.name || '—' }}</strong>
        </div>

        <div class="info-row">
          <span>Email</span>
          <strong>{{ store.user.email || '—' }}</strong>
        </div>

        <div class="info-row">
          <span>Mobile</span>
          <strong>{{ store.user.mobileNo || 'Not set' }}</strong>
        </div>

        <div class="info-row">
          <span>Role</span>
          <strong>{{ store.user.isAdmin ? 'Admin' : 'User' }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'


const store = useGlobalStore()
const router = useRouter()

const isLoggedIn = computed(() => store.isLoggedIn)

onMounted(async () => {
  if (!isLoggedIn.value) {
    router.replace('/login')
    return
  }

  // fetch user details if page refreshed
  if (!store.user.name) {
    await store.getUserDetails()
  }
})
</script>

<style scoped>
/* ROOT WITH WALLPAPER */
.user-root {
  min-height: 100vh;
  background: url('@/assets/rox09.jpg') center / cover no-repeat;
  position: relative;
}

.user-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
}

.container {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

/* PROFILE CARD */
.profile-card {
  background: linear-gradient(
    135deg,
    rgba(33, 37, 41, 0.75),
    rgba(18, 18, 18, 0.65)
  );
  backdrop-filter: blur(6px);
  padding: 2.5rem;
  border-radius: 18px;
  color: white;
  box-shadow: 0 25px 50px rgba(0,0,0,0.55);
}

/* TITLE */
.page-title {
  text-align: center;
  font-family: 'League Script', cursive;
  font-size: 2.5rem;
  color: #ffd84d;
}

/* INFO ROWS */
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.info-row span {
  color: #ccc;
}

.info-row strong {
  color: #fff;
}

/* MOBILE */
@media (max-width: 576px) {
  .profile-card {
    padding: 1.5rem;
  }

  .info-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .page-title {
    font-size: 2rem;
  }
}
</style>
