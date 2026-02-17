<template>
    <div :class="{ active: open, opacity: opacity }" class="message">
        {{ message }}
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

const open = ref(false);
const opacity = ref(false);
const message = ref('');

function changeVisibility(visible: boolean) {
	if (visible) {
		open.value = true;
		
		setTimeout(() => {
			opacity.value = true;
		}, 5);
		
		return;
	}

	opacity.value = false;

	setTimeout(() => {
		open.value = false;
	}, 200);
}

function setMessage(newMessage: string) {
    message.value = newMessage;
}

defineExpose({ setMessage, changeVisibility, open });

</script>

<style lang="scss" scoped>
.message {
    color: white;
    font-weight: 700;
    box-sizing: border-box;
    padding: 10px;
	opacity: 0;
	display: none;
	pointer-events: none;
	flex-direction: column;
    width: 100%;
    justify-content: center;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    align-items: center;
	transition: opacity 200ms !important;
    background-color: var(--red-btn-color);

	&.active {
		display: flex;
		pointer-events: initial;
	}

	&.opacity {
		opacity: 1;
        animation: pulse 1s ease;
	}
}


@keyframes pulse {
    0% {
        box-shadow: 0 0 0 rgba(255, 0, 0, 0.1);
    }
    50% {
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
    }
}
</style>