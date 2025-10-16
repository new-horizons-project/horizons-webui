import api from "./axios";

export class User {
}

export async function loadUser() {
	const res = await api.get('/user');
	return res.data;
}