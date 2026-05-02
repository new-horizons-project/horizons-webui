import { useAuthStore } from "../storage/auth";
import { logout as apiLogout } from "../api/user";

export async function logout() {
    const authStore = useAuthStore();
    authStore.setLogout();
    await apiLogout();
}

export function canManageData() {
    const authStore = useAuthStore();
	const role = authStore.user?.role
	return role !== undefined && ["admin", "moderator"].includes(role)
}

export function canAdministerData() {
    const authStore = useAuthStore();
	const role = authStore.user?.role
	return role !== undefined && ["admin"].includes(role)
}