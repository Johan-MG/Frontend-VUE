<template>
  <Navbar></Navbar>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar: navbar
  }
});
</script>

<style>
a{
  cursor: pointer;
}
.nav-item{
  align-self: center;
}
</style>
