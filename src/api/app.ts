import { api } from "./axios";

export async function loadUser() {
	const res = await api.get('/user/');
	return res.data;
}

export async function ping() {
	const res = await api.get('/');
	return res;
}

export async function getImageUrl() {
	const res = await api.get('/ap/application.ui.logo_media_id?value_only=true');
	return import.meta.env.VITE_NH_API_URL + "static/" + res.data + "?size=thumbnail";
}