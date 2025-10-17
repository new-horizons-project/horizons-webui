<template>
	<Transition name="fade">
		<div :class="['notification', typeClass]" @click="emit('close')">
			<div class="notification-block">
				<img height="55" :src="src">

				<div class="text-block">
					<h2><slot>{{ header }}</slot></h2>
					<p><slot>{{ message }}</slot></p>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps<{
	header: string,
	message: string,
	type?: 'error' | 'info' | 'success';
	src: string;
}>();

const typeClass = computed(() => {
  switch (props.type) {
    case 'success': return 'success';
    case 'error': return 'error';
    case 'info': return 'info';
    default: return '';
  }
});

</script>

<style scoped>
.notification {
	cursor: pointer;
	position: absolute;
	top: 10px;
	right: 10px;
	border: 1px solid rgba(255, 255, 255, 0.105);
	background-color: rgba(35, 35, 35, 0.5);
	box-shadow: 0 1px 10px rgba(135, 135, 135, 0.1);
	padding: 10px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-width: 300px;
	max-width: 400px;
	transition: transform 0.1s;
	opacity: 0;
	transform: translateX(10px);
	animation: appear 0.6s ease forwards;
}

.notification:hover {
	box-shadow: 0 2px 20px rgba(135, 135, 135, 0.1);
	transform: scale(1.02);
}

.notification-block {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
}

h2, p {
	padding: 0;
	margin: 0;
}

button {
	padding: 2px 12px;
	background: transparent;
	border: 2px solid rgba(255, 255, 255, 0.3);
	border-radius: 5px;
	color: white;
	font-size: 16px;
	cursor: pointer;
	transition: border-color 0.2s, transform 0.15s, color 0.2s, background-color 0.2s;
}

button:hover {
	border-color: white;
	background-color: rgba(255, 255, 255, 0.109);
	transform: translateY(-2px);
}

button:active {
	transform: translateY(1px);
	color: rgb(200, 200, 200);
}

@keyframes appear {
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>