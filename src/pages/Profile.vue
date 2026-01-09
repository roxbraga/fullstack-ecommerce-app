<template>
  <div class="user-root">
    <div class="container py-5">
      <div class="profile-grid">

        <!--  : USER PROFILE -->
        <div class="profile-card">
          <div class="profile-header">
            <div class="avatar">
              <img
                src="/images/89.jpg"
                alt="User Avatar"
              />
              <span class="edit-dot"></span>
            </div>


            <div>
              <h4 class="user-id">USER_ID</h4>
              <span class="role">
                {{ store.user.isAdmin ? 'ADMIN' : 'USER' }}
              </span>
            </div>
          </div>

          <div class="form-grid">
            <div class="field">
              <label>First Name</label>
              <input type="text" :value="store.user.firstName || '—'" disabled />
            </div>

            <div class="field">
              <label>Last Name</label>
              <input type="text" :value="store.user.lastName || '—'" disabled />
            </div>

            <div class="field">
              <label>Mobile Number</label>
              <input type="text" :value="store.user.mobileNo || 'Not set'" disabled />
            </div>

            <div class="field">
              <label>Registered Email Address</label>
              <input type="text" :value="store.user.email || '—'" disabled />
            </div>
          </div>
        </div>

        <!-- : UPDATE PASSWORD -->
        <div class="profile-card">
          <h3 class="section-title">Update Password</h3>

          <div class="form-grid single">
            <div class="field">
              <label>New Password</label>
              <input type="password" v-model="newPassword" />
            </div>

            <div class="field">
              <label>Confirm New Password</label>
              <input type="password" v-model="confirmPassword" />
            </div>
          </div>

          <div class="actions">
            <button class="btn-outline" @click="handleUpdatePassword">
              UPDATE PASSWORD
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const store = useGlobalStore()
const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')

const notyf = new Notyf({
  duration: 2500,
  position: { x: 'right', y: 'top' }
})

const isLoggedIn = computed(() => store.isLoggedIn)

onMounted(async () => {
  if (!isLoggedIn.value) {
    router.replace('/login')
    return
  }

  if (!store.user.firstName) {
    await store.getUserDetails()
  }
})

const handleUpdatePassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    notyf.error('All fields are required')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    notyf.error('Passwords do not match')
    return
  }

  try {
    await store.updatePassword(newPassword.value)
    notyf.success('Password updated successfully')
    newPassword.value = ''
    confirmPassword.value = ''
  } catch {
    notyf.error('Failed to update password')
  }
}


</script>

<style scoped>
.container {
  max-width: 1200px;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
}

.profile-card {
  background: linear-gradient(
    135deg,
    rgba(20,20,20,0.85),
    rgba(10,10,10,0.75)
  );
  backdrop-filter: blur(10px);
  border-radius: 22px;
  padding: 2.3rem;
  color: #fff;
  box-shadow: 0 30px 60px rgba(0,0,0,0.7);
  border: 1px solid rgba(255,193,7,0.15);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.3rem;
  margin-bottom: 2.2rem;
}

.avatar {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #111;
  overflow: hidden;
  border: 2px solid #ffc107;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;  
  padding: 6px;          
}



.edit-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #ffc107;
  border-radius: 50%;
}

.user-id {
  margin: 0;
  letter-spacing: 2px;
}

.role {
  font-size: 0.7rem;
  color: #ffc107;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem 2rem;
}

.form-grid.single {
  grid-template-columns: 1fr;
}

.field {
  display: flex;
  flex-direction: column;
}

.field label {
  font-size: 0.7rem;
  color: #ffc107;
  letter-spacing: 1px;
  margin-bottom: 0.35rem;
}

.field input {
  background: rgba(255,255,255,0.05);
  border: none;
  border-bottom: 1px solid rgba(255,193,7,0.35);
  padding: 0.55rem 0;
  color: #fff;
  outline: none;
}

.actions {
  margin-top: 2.2rem;
}

.btn-outline {
  padding: 0.55rem 1.6rem;
  border: 1px solid #ffc107;
  background: transparent;
  color: #ffc107;
  font-size: 0.75rem;
  letter-spacing: 1px;
  cursor: pointer;
}

.btn-outline:hover {
  background: #ffc107;
  color: #000;
}

@media (max-width: 1024px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .profile-card {
    padding: 1.6rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .btn-outline {
    width: 100%;
    text-align: center;
  }
}
</style>
