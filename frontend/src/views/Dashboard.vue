<template>
  <div class="dashboard">
    <h2>Welcome, User!</h2>
    <p>Your User ID: {{ userId }}</p>
    <p>Your Email: {{ userEmail }}</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AuthService from "../services/AuthService";

export default {
setup() {
  const store = useStore();
  const router = useRouter();
  const { logout } = AuthService;

  // 🔹 Folosim `computed()` pentru a actualiza automat valoarea
  const userId = computed(() => store.state.userId);
  const userEmail = computed(() => store.getters.getUserEmail); // 🔹 Acum funcționează!

  const logoutUser = async () => {
    await logout();
    store.dispatch("logout");
    router.push("/");
  };

  return { userId, userEmail, logoutUser };
}
};
</script>

<style scoped>
.dashboard {
text-align: center;
padding: 20px;
}
button {
padding: 10px;
background-color: red;
color: white;
border: none;
cursor: pointer;
}
</style>
