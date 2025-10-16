import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.NH_API_URL,
	timeout: 5000
});

export default api;