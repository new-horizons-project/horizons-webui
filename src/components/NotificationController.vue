<template>
    <div class="notification-stack">
        <Notification
            v-for="notif in notifications" 
            :key="notif.id"
            :header="notif.header"
            :message="notif.message"
            :src="notif.src"
            :type="notif.type"
            @close="removeNotification(notif.id)"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Notification from './Notification.vue';
import { notificationController } from '../scripts/notificationController';

const notifications = computed(() => notificationController.all);

const removeNotification = (id: string) => notificationController.removeNotification(id);
</script>

<style scoped lang="sass">

.notification-stack
    position: fixed
    top: 20px
    right: 20px
    display: flex
    flex-direction: column
    gap: 10px
    z-index: 1001

</style>
