<template>
  <div class="logout-container">
    <p>You have been logged out successfully.</p>
    <p>Redirecting you to the login page...</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';  
import { useGlobalStore } from '../stores/global';  

const router = useRouter();  
const store = useGlobalStore();  

// Function to handle the logout process
const logout = () => {
  // Clear user data from the global store
  store.logout();

  // Remove the token from localStorage
  localStorage.removeItem('token');

  // Redirect to the login page
  setTimeout(() => {
    router.replace('/login');  
  }, 1000);  
};

// Call the logout function as soon as the component is mounted
logout();
</script>