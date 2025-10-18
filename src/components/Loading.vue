<template>
  <div class="loading">
	<div class="circle-wrapper" :style="{ transform: showMessage ? 'translateY(-50px)' : 'translateY(0px)' }">
    	<div class="loading-circle"></div>
	</div>

    <div class="message" :class="{ showMessage }">
      	Seems like we have a problem with connecting API<br>Contact administrator
		<div class="substring">
			{{ substr }}
		</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
  substr: string;
}>();

const showMessage = ref(false);

setTimeout(() => {
  showMessage.value = true;
}, 5000);
</script>

<style scoped>
.loading {
	width: 100%;
	height: 100%;
	display: flex;
	color: white;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 1001;
	background-color: rgba(0, 0, 0, 0.4242);
	backdrop-filter: blur(5);
	gap: 50px;
}

.message {
	position: absolute;
	text-align: center;
	font-size: 24px;
	font-weight: 600;
	transform: translateY(30px);
	opacity: 0;
	transition: transform 0.3s ease, opacity 0.3s ease;
}

.message.showMessage {
	transform: translateY(50px);
	opacity: 1;
}

.substring {
	margin-top: 10px;
	color: rgb(94, 94, 94);
	font-size: 16px;
	font-weight: 400;
}

.circle-wrapper {
	position: absolute;
	transition: transform 0.3s ease;
}

.loading-circle {
	width: 50px;
	height: 50px;
	border: 5px solid rgba(255, 255, 255, 0.3);
	border-top-color: white;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>