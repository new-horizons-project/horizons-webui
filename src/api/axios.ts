import axios from "axios";
import { useAuthStore } from "../storage/auth";

const api = axios.create({
	baseURL: import.meta.env.VITE_NH_API_URL,
	timeout: 5000,
	withCredentials: true
});

const refresh = axios.create({
	baseURL: import.meta.env.VITE_NH_API_URL,
	timeout: 5000,
	withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const authStore = useAuthStore();

    if (err.response?.status === 401 && !authStore.isLoggedIn) {
      try {
        const res = await refresh.post("/auth/renew_access", {}, { withCredentials: true });
        authStore.token = res.data.access_token;

        const config = err.config;
        config.headers['Authorization'] = `Bearer ${authStore.token}`;
        return api.request(config);
      } catch (refreshErr) {
        authStore.setLogout();
        throw refreshErr;
      }
    }

    throw err;
  }
);


export { api, refresh };