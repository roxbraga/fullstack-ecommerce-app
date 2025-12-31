<template>
  <div class="logout-container">
    <!-- A simple message confirming the logout action -->
    <p>You have been logged out successfully.</p>
    <p>Redirecting you to the login page...</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';  // Import the router to handle redirection
import { useGlobalStore } from '../stores/global';  // Import the Pinia store for user data

const router = useRouter();  // Access the Vue Router instance
const store = useGlobalStore();  // Access the global store

// Function to handle the logout process
const logout = () => {
  // Clear user data from the global store
  store.logout();

  // Remove the token from localStorage
  localStorage.removeItem('token');

  // Redirect to the login page
  setTimeout(() => {
    router.replace('/login');  // After a brief delay, redirect to login page
  }, 1000);  // Wait for 1 second before redirecting (you can adjust this if needed)
};

// Call the logout function as soon as the component is mounted
logout();
</script>