<template>
    <div :class="{ active: open, opacity: opacity }" class="message">
        <div class="text">{{ message }}</div>
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
    color: var(--color-red);
    font-weight: 700;
    box-sizing: border-box;
	opacity: 0;
	display: none;
	pointer-events: none;
	flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
	transition: opacity 500ms !important;

	&.active {
		display: flex;
		pointer-events: initial;
	}

	&.opacity {
		opacity: 1;
	}
}
</style>