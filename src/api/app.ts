import { api } from "./axios";

export async function loadUser() {
	const res = await api.get('/user/');
	return res.data;
}

export async function ping() {
	const res = await api.get('/');
	return res;
}