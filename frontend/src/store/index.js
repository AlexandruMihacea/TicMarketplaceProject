import { createStore } from "vuex";

export default createStore({
  state: {
    userId: null,
    token: null,
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
    }
  },
  actions: {
    login({ commit }, { userId, token }) {
      commit("setUser", { userId, token });
    },
    logout({ commit }) {
      commit("logout");
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUserId: state => state.userId,
  }
});
