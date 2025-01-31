<template>
    <div class="dashboard">
      <h2>Welcome, User!</h2>
      <p>Your User ID: {{ userId }}</p>
      <button @click="logoutUser">Logout</button>
    </div>
  </template>
  
  <script>
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import AuthService from "../services/AuthService";
  
  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      const { logout } = AuthService; 
      
      const userId = store.state.userId; 
  
      const logoutUser = async () => {
        await logout();
        store.dispatch("logout");
        router.push("/");
      };
  
      return { userId, logoutUser };
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
  