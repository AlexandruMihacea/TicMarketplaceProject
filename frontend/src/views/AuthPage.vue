<template>
  <div class="auth-container">
    <!-- Formular de Register -->
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="registerData.firstName" type="text" placeholder="First Name" required />
        <input v-model="registerData.lastName" type="text" placeholder="Last Name" required />
        <input v-model="registerData.email" type="email" placeholder="Email" required />
        <input v-model="registerData.password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p v-if="registerError" class="error">{{ registerError }}</p>
      </form>
    </div>

    <!-- Formular de Login -->
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="loginData.email" type="email" placeholder="Email" required />
        <input v-model="loginData.password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="loginError" class="error">{{ loginError }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "../services/api"; // 🔹 Import API pentru Register
import AuthService from "../services/AuthService"; // 🔹 Import pentru Login (Firebase)

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const loginData = ref({ email: "", password: "" });
    const registerData = ref({ firstName: "", lastName: "", email: "", password: "" });

    const loginError = ref("");
    const registerError = ref("");

    // 🔹 Register → Apelează backend-ul prin `api.js`
    const handleRegister = async () => {
      registerError.value = "";
      const response = await api.createUser("/users/register", registerData.value);

      if (response.success) {
        alert("Account created successfully! Please login.");
      } else {
        registerError.value = response.error;
      }
    };

    // 🔹 Login → Apelează Firebase direct
    const handleLogin = async () => {
        console.log("🔹 handleLogin() called");

        loginError.value = "";
        const response = await AuthService.login(loginData.value.email, loginData.value.password);

        console.log("🔹 Login response:", response); 

        if (response.success) {
          store.dispatch("login", { 
            userId: response.userId, 
            token: response.token, 
            userFirstName: response.firstName, 
            userLastName: response.lastName, 
            email: response.email 
          });
          router.push("/dashboard");
        } else {
          loginError.value = response.error;
        }
};

    return { loginData, registerData, loginError, registerError, handleLogin, handleRegister };
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}

.form-container {
  width: 40%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
