<script>
 
  import Navbar from './components/NavbarComponent.vue';
  import { useGlobalStore } from "./stores/global";
  import {onBeforeMount} from 'vue';

  export default {
    components: {
     
      Navbar
    },
    setup(){

      
      const { getUserDetails } = useGlobalStore();

      
      onBeforeMount(()=>getUserDetails(localStorage.getItem("token")));
    }
  }
</script>

<template>
  <div id="app" class="app-bg">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
.app-bg {
  min-height: 100vh;
  background-image: url("./assets/cs3bg.webp");
  background-size: cover;        
  background-position: center;   
  background-repeat: no-repeat;  
  background-attachment: fixed;  
}


.app-bg::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: -1;
}
</style>

