<template>
  <li class="nav-item">
    <router-link :to="to" class="nav-link">
      <slot />
    </router-link>
  </li>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}
</style>
