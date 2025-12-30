<template>
	<div class="wrapper">
		<DynamicHeader />
		<router-view />
	</div>
    <Loading v-if="!uiStore.apiConnecitonChecked" :message="t('loading.connection.messages.header')" :substr="reconnectMessageSubstr"/>
    <NotificationController />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './storage/auth';
import { useUiStore } from './storage/ui';
import { reloadToken, loadUser } from './api/user';
import { useI18n } from 'vue-i18n';
import { ping } from './api/app';

import DynamicHeader from './components/DynamicHeader.vue';
import Loading from './components/Loading.vue';
import NotificationController from './components/NotificationController.vue';
// import { notificationController } from './scripts/notificationController';

const authStore = useAuthStore();
const uiStore = useUiStore();
const { t } = useI18n();
const reconnectMessageSubstr = ref<string>("");

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function testApi() {
    for (let i = 0; i < 5; i++) {
        reconnectMessageSubstr.value = t('loading.connection.messages.substring.1', { attempt: i + 1, attempts: 5 });

        try {
            const res = await ping();
            if (res.status === 200) {
                uiStore.apiConnecitonChecked = true;
                return true;
            }
        } catch {
            await sleep(5000);
        }
    }

    reconnectMessageSubstr.value = t('loading.connection.messages.substring.2');
    return false;
}

async function restoreUser() {
    try {
        const res = await reloadToken();
        if (res.status === 200) {
            authStore.token = res.data.access_token;
            const user = await loadUser();
            authStore.setLogin(user.username);
            uiStore.apiConnecitonChecked = true;
        }
    } catch (err: any) {
        if (err.status === 401) {
			return;
        }
        console.log(err);
    }
}

async function begin() {
    const apiConnected = await testApi();
    if (!apiConnected) return false;

    if (!authStore.isLoggedIn) {
        await restoreUser();
    }
}

(async () => {
    await begin();
})();
</script>

<style lang="scss">

.wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

</style>