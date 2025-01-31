<script setup>
import { RouterLink, RouterView } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import AuthService from "./services/AuthService";

const store = useStore();

// Verifică dacă utilizatorul este autentificat
const isAuthenticated = computed(() => store.getters.isAuthenticated);

// Funcția pentru logout
const logoutUser = async () => {
  await AuthService.logout();
  store.dispatch("logout");
};
</script>

<template>
  <header>
    <nav>
      <RouterLink v-if="!isAuthenticated" to="/auth">Login / Register</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/dashboard">Dashboard</RouterLink>
      <button v-if="isAuthenticated" @click="logoutUser">Logout</button>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #2c3e50;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: red;
  color: white;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

button:hover {
  background-color: darkred;
}
</style>
