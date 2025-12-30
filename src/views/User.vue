<template>
  Logged in as {{ authStore.username }}
  <button @click="logoutBtn()"></button>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../storage/auth';
import { logout } from '../api/user';
import router from '../router';

const authStore = useAuthStore();

async function logoutBtn () {
  authStore.setLogout();
  await logout();
  router.push('/');
};

</script>

<style>
</style>
