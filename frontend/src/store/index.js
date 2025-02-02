import { createStore } from "vuex";

export default createStore({
  state: {
    userId: null,
    token: null,
    userFirstName: null,
    userLastName: null,
    email: null,
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.userFirstName = payload.userFirstName;
      state.userLastName = payload.userLastName;
      state.email = payload.email;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.userFirstName = null;
      state.userLastName = null;
      state.email = null;
    },
  },
  actions: {
    login({ commit }, { userId, token, userFirstName, userLastName, email
     }) {
      commit("setUser", { userId, token, userFirstName, userLastName, email });
    },
    logout({ commit }) {
      commit("logout");
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUserId: state => state.userId,
    getUserFirstName: state => state.userFirstName,
    getUserLastName: state => state.userLastName,
    getUserEmail: state => state.email,
  }
});
