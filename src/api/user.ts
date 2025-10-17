import api from "./axios";

export async function loadUser() {
	const res = await api.get('/user');
	return res.data;
}

export async function loginUser(username: string, password: string) {
	const params = new URLSearchParams();
	params.append('grant_type', 'password');
	params.append('username', username);
	params.append('password', password);

	const res = await api.post('/auth/login', params,
		{ 
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
		},
	);
	return res;
}