import { api, refresh } from "./axios";

export interface UserDTO {
	id: string
	username: string
	role: string
	is_disabled: boolean
	registration_date: Date
}

export class User {
	username: string
	role: string
	rolePretty!: string
	isDisabled: boolean
	registrationDate: Date

	constructor(dto: UserDTO) {
		this.username = dto.username;
		this.role = dto.role;

		switch (dto.role) {
			case "admin":
				this.rolePretty = "Administrator";
				break;
			case "moderator":
				this.rolePretty = "Moderator";
				break;
			case "user":
				this.rolePretty = "User";
				break;
		}

		this.isDisabled = dto.is_disabled;
		this.registrationDate = new Date(dto.registration_date);
	}

	static async create(): Promise<User> {
		const res = await api.get<UserDTO>("/user");
		return new User(res.data);
	}
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

export async function changePassword(username: string, password: string, newPassword: string) {
	const res = await api.patch('/user/reset_password',
		{
			old_password: password,
			new_password: newPassword
		},
		{
			params: {
				username
			},
			headers: { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		},
	);

	return res;
}

export async function reloadToken() {
	const res = await refresh.post("/auth/renew_access", {}, { withCredentials: true });
	return res;
}

export async function logout() {
	await api.post('/auth/logout');
}