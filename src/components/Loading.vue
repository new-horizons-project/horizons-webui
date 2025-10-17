<template>
	<div class="loading">
		<div class="loading-circle"></div>
	</div>
</template>

<style scoped>
.loading {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 1001;
	background-color: rgba(0, 0, 0, 0.4242);
	backdrop-filter: blur(5);
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