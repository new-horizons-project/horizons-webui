<template>
	<div class="wrapper" v-if="appReady">
		<DynamicHeader />
		<router-view />
	</div>
    <Loading v-if="!uiStore.apiConnecitonChecked" :message="t('loading.connection.messages.header')" :substr="reconnectMessageSubstr"/>
    <NotificationController />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useAuthStore } from './storage/auth';
import { useDark, useFavicon, useTitle } from '@vueuse/core';
import { useUiStore } from './storage/ui';
import { reloadToken, User } from './api/user';
import { useI18n } from 'vue-i18n';
import { ping } from './api/app';
import { useRoute } from 'vue-router';
import DynamicHeader from './components/DynamicHeader.vue';
import Loading from './components/Loading.vue';
import NotificationController from './components/NotificationController.vue';
// import { notificationController } from './scripts/notificationController';

const authStore = useAuthStore();
const uiStore = useUiStore();
const { t } = useI18n();
const reconnectMessageSubstr = ref<string>("");
const appReady = ref<boolean>(false);
const isDarkTheme = useDark();
const faviconRef = useFavicon();
const title = useTitle();
const route = useRoute();

// Useful functions
const fullCurrentTitle = computed(() => {
    return uiStore.titleExtend 
        ? `${uiStore.titleBase} — ${uiStore.titleExtend}` 
        : uiStore.titleBase;
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function restoreUser() {
    try {
        const res = await reloadToken();
        if (res.status === 200) {
            authStore.token = res.data.access_token;
			authStore.user = await User.create();
			authStore.isLoggedIn = true;
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

	appReady.value = true;
}

// Testing connection
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

// Watching values
watch(isDarkTheme, async (theme) => {
    await uiStore.initImage( 
        theme ? "dark" : 'light'
    );

    faviconRef.value = uiStore.imageUrl + '?size=thumbnail'
}, { immediate: true });

watch(fullCurrentTitle, (newValue: string) => {
    title.value = newValue;
});

watch(() => route.fullPath, () => {
    uiStore.titleExtend = '';
});

onMounted(async () => {
    document.documentElement.setAttribute('data-theme', "auto");
    
    await begin();
});

</script>

<style lang="scss">

#app .wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>