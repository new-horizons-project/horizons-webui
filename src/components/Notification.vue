<template>
	<div :class="['notification', typeClass, show ? 'show' : 'hide']" @click="handleClose">
		<div class="notification-block">
			<img v-if="src" :src="src" height="55" class="notif-img"/>

			<div class="text-block">
				<h3>{{ header }}</h3>
				<p>{{ message }}</p>
			</div>
		</div>

		<div class="progress-bar" :style="{ width: progress + '%' }"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
const emit = defineEmits(['close']);

const props = defineProps<{
	header: string,
	message: string,
	type?: 'error' | 'info' | 'success',
	src?: string
}>();

const show = ref(false);
const progress = ref(100);
let interval: number;

const typeClass = computed(() => {
  switch (props.type) {
	case 'success': return 'success';
	case 'error': return 'error';
	case 'info': return 'info';
	default: return '';
  }
});

onMounted(() => {
	show.value = true;

	const time = 5000;
	const step = 50;

	interval = window.setInterval(() => {
		progress.value -= step / time * 100;

		if (progress.value <= 0) {
			clearInterval(interval);
			hideAndClose();
		}
	}, step);
});

onBeforeUnmount(() => {
	clearInterval(interval);
});

function hideAndClose() {
	show.value = false;
	setTimeout(() => emit('close'), 350);
}

function handleClose() {
	clearInterval(interval);
	hideAndClose();
}
</script>


<style scoped lang="sass">

.notification
	cursor: pointer
	border-radius: 12px
	display: flex
	flex-direction: column
	padding: 12px
	min-width: 300px
	max-width: 400px
	backdrop-filter: blur(12px)
	background-color: rgba(35,35,35,0.35)
	border: 1px solid rgba(255,255,255,0.15)
	box-shadow: 0 8px 30px rgba(0,0,0,0.3)
	transform: scale(0.9)
	opacity: 0
	transition: all 0.35s cubic-bezier(0.25,1,0.5,1)
	gap: 5px;

	&.show
		opacity: 1
		transform: scale(1)

	&.hide
		opacity: 0
		transform: scale(0.85)

.notification-block
	display: flex
	align-items: center
	gap: 12px

.notif-img
	padding-left: 5px
	filter: invert(1)
	width: 40px;
	height: 40px;

.text-block
	display: flex
	flex-direction: column
	gap: 4px

h3
	margin: 0
	font-size: 16px
	font-weight: 600
	color: white

p
	margin: 0
	font-size: 14px
	color: #ddd

.progress-bar
	height: 4px
	border-radius: 2px
	margin-top: 6px
	transition: width 0.05s linear

.notification.success .progress-bar
	background-color: rgba(76, 175, 80, 0.8)

.notification.error .progress-bar
	background-color: rgba(244, 67, 54, 0.8)

.notification.info .progress-bar
	background-color: rgba(33, 150, 243, 0.8)

</style>
