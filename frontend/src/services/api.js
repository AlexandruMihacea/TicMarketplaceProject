const API_BASE_URL = "http://localhost:8080"; 

const api = {
  createUser: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      return { success: false, error: "Network error" };
    }
  },

  getUser: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method:'GET',
        headers: {"Content-Type": "application/json"},
      });

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      return { success: false, error: "Network error" };
    }
  }
};

export default api;
