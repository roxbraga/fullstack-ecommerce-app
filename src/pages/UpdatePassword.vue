<template>
  <form class="password-card" @submit.prevent="submit">
    <h3 class="card-title">Update Password</h3>

    <div class="field">
      <label>New Password</label>
      <input
        type="password"
        v-model="newPassword"
        required
        minlength="6"
      />
    </div>

    <div class="field">
      <label>Confirm New Password</label>
      <input
        type="password"
        v-model="confirmPassword"
        required
        minlength="6"
      />
    </div>

    <button type="submit" class="btn-warning">
      Update Password
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '../stores/global'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const store = useGlobalStore()

const newPassword = ref('')
const confirmPassword = ref('')

const notyf = new Notyf({
  duration: 2500,
  position: { x: 'right', y: 'top' }
})

const submit = async () => {
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
.password-card {
  background: linear-gradient(
    135deg,
    rgba(33,37,41,0.75),
    rgba(18,18,18,0.65)
  );
  backdrop-filter: blur(6px);
  padding: 2.5rem;
  border-radius: 18px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.55);
  color: white;
}

.card-title {
  color: #ffc107;
  margin-bottom: 1.5rem;
}

.field {
  margin-bottom: 1.25rem;
}

label {
  font-size: 0.75rem;
  color: #ffc107;
  display: block;
  margin-bottom: 0.35rem;
}

input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #ffc107;
  color: white;
  padding: 0.4rem 0;
}

input:focus {
  outline: none;
  border-bottom-color: #ffda4d;
}

.btn-warning {
  margin-top: 1rem;
  border: 1px solid #ffc107;
  background: transparent;
  color: #ffc107;
  padding: 0.5rem 1.5rem;
}

.btn-warning:hover {
  background: #ffc107;
  color: black;
}
</style>
